from __future__ import annotations

import html
import json
import re
import sys
import textwrap
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
OUTPUT = SITE_ROOT / "assets" / "news-data.js"

FEEDS = [
    ("BBC World", "https://feeds.bbci.co.uk/news/world/rss.xml"),
    ("BBC Science", "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml"),
    ("NPR World", "https://feeds.npr.org/1004/rss.xml"),
    ("The Guardian World", "https://www.theguardian.com/world/rss"),
]

STOPWORDS = {
    "about", "after", "again", "against", "among", "because", "before", "being",
    "between", "could", "every", "first", "from", "have", "into", "more", "most",
    "over", "people", "should", "their", "there", "these", "they", "this", "those",
    "through", "under", "where", "which", "while", "would", "with", "without",
    "world", "news", "says", "said", "will", "been", "were", "when", "what",
}


def fetch(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "SentenceStudioNewsBot/1.0 (+local study project)",
            "Accept": "application/rss+xml, application/xml, text/xml, */*",
        },
    )
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read()


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    text = re.sub(r"<[^>]+>", " ", value)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def split_sentences(text: str) -> list[str]:
    pieces = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"'])", text)
    sentences: list[str] = []
    for piece in pieces:
        sentence = piece.strip(" \t\n\r\"'")
        words = re.findall(r"[A-Za-z]+(?:[-'][A-Za-z]+)?", sentence)
        if 6 <= len(words) <= 36 and sentence not in sentences:
            sentences.append(sentence)
    return sentences


def keywords(sentence: str) -> list[str]:
    words = re.findall(r"[A-Za-z]+(?:-[A-Za-z]+)?", sentence.lower())
    result: list[str] = []
    for word in words:
        if len(word) < 5 or word in STOPWORDS or word in result:
            continue
        result.append(word)
        if len(result) == 5:
            break
    return result


def pattern(sentence: str) -> str:
    lower = sentence.lower()
    if " although " in f" {lower} " or lower.startswith("although") or " while " in f" {lower} ":
        return "让步/对比结构：although / while + 主句"
    if lower.startswith("if ") or " if " in lower:
        return "条件结构：if 从句 + 主句"
    if " because " in lower or " since " in lower:
        return "原因结构：because / since 引导原因"
    if " which " in lower or " who " in lower or " that " in lower:
        return "定语从句/补充说明结构"
    if " but " in lower or " however " in lower:
        return "转折结构：but / however 连接对比信息"
    if "," in sentence:
        return "信息扩展结构：逗号后补充背景或细节"
    return "新闻陈述句：主语 + 谓语 + 核心信息"


def task(sentence: str) -> str:
    keys = keywords(sentence)[:3]
    if keys:
        return "朗读后用这些词复述新闻主旨：" + " / ".join(keys)
    return "朗读后用一句自己的英文复述新闻主旨。"


def parse_feed(source: str, content: bytes) -> list[dict]:
    root = ET.fromstring(content)
    items = root.findall(".//item")
    if not items:
        items = root.findall(".//{http://www.w3.org/2005/Atom}entry")

    parsed = []
    for item in items[:10]:
        title = clean_text(find_text(item, "title"))
        summary = clean_text(find_text(item, "description") or find_text(item, "summary"))
        link = clean_text(find_text(item, "link"))
        if not link:
            link_node = item.find("{http://www.w3.org/2005/Atom}link")
            link = link_node.attrib.get("href", "") if link_node is not None else ""
        published = clean_text(find_text(item, "pubDate") or find_text(item, "published") or find_text(item, "updated"))

        source_sentences = []
        for sentence in split_sentences(". ".join(part for part in [title, summary] if part))[:3]:
            source_sentences.append(
                {
                    "text": sentence,
                    "pattern": pattern(sentence),
                    "keywords": keywords(sentence),
                    "task": task(sentence),
                }
            )
        if title and source_sentences:
            parsed.append(
                {
                    "source": source,
                    "title": title,
                    "link": link,
                    "published": published,
                    "sentences": source_sentences,
                }
            )
    return parsed


def find_text(item: ET.Element, tag: str) -> str:
    direct = item.find(tag)
    if direct is not None and direct.text:
        return direct.text
    namespaced = item.find(f"{{http://www.w3.org/2005/Atom}}{tag}")
    if namespaced is not None and namespaced.text:
        return namespaced.text
    content = item.find(f"{{http://purl.org/rss/1.0/modules/content/}}encoded")
    if tag == "description" and content is not None and content.text:
        return content.text
    return ""


def build() -> dict:
    all_items: list[dict] = []
    used_titles: set[str] = set()
    errors: list[str] = []
    for source, url in FEEDS:
        try:
            for item in parse_feed(source, fetch(url)):
                title_key = item["title"].lower()
                if title_key in used_titles:
                    continue
                used_titles.add(title_key)
                all_items.append(item)
        except Exception as exc:  # keep the daily job resilient
            errors.append(f"{source}: {exc}")

    return {
        "updatedAt": datetime.now(timezone.utc).astimezone().isoformat(timespec="minutes"),
        "sources": [name for name, _ in FEEDS],
        "errors": errors,
        "items": all_items[:36],
    }


def write_js(payload: dict) -> None:
    data = json.dumps(payload, ensure_ascii=False, indent=2)
    OUTPUT.write_text("window.NEWS_SENTENCES = " + data + ";\n", encoding="utf-8")


def main() -> int:
    payload = build()
    if not payload["items"]:
        print("No news items were collected.", file=sys.stderr)
        for error in payload.get("errors", []):
            print(error, file=sys.stderr)
        return 1
    write_js(payload)
    print(textwrap.dedent(f"""
    Updated: {OUTPUT}
    Items: {len(payload['items'])}
    Sources: {', '.join(payload['sources'])}
    Errors: {len(payload.get('errors', []))}
    """).strip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())