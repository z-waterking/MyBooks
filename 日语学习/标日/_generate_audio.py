"""标日全部课程音频批量生成（Nanami Neural）
- L01-L10 数据保留在本文件内
- L11+ 数据从 _lessons_audio_index.json 读取（由 _build_lessons.py 生成）
"""
import asyncio, os, sys, io, json
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

VOICE = "ja-JP-NanamiNeural"
RATE = "-5%"
OUTPUT_BASE = "audio"

# 数据：{ lesson_id: { file_id: jp_text } }
LESSONS = {
    "L01": {
        # 基本课文
        "c01": "李さんですか。",
        "c02": "はい、わたしは李です。",
        "c03": "はじめまして。森です。どうぞよろしくお願いします。",
        "c04": "こちらこそ、よろしくお願いします。",
        "c05": "李さんは中国人ですか。",
        "c06": "はい、中国人です。北京から来ました。",
        # 应用课文
        "e01": "小野さん、こちらは李さんです。",
        "e02": "はじめまして。小野です。どうぞよろしく。",
        "e03": "こちらこそ。李です。よろしくお願いします。",
        "e04": "李さんは会社員ですか、学生ですか。",
        "e05": "わたしは会社員です。JC企画の社員です。",
        "e06": "そうですか。よろしくお願いします。",
        # 语法 1
        "g1-1": "わたしは李です。",
        "g1-2": "森さんは日本人です。",
        "g1-3": "小野さんは会社員です。",
        # 语法 2
        "g2-1": "わたしは日本人ではありません。",
        "g2-2": "あの人は先生じゃありません。",
        "g2-3": "李さんは学生ではありません。",
        # 语法 3
        "g3-1": "あなたは中国人ですか。",
        "g3-2": "森さんは先生ですか、学生ですか。",
        "g3-3": "あの人はどなたですか。",
        # 语法 4
        "g4-1": "わたしはJC企画の社員です。",
        "g4-2": "森さんは東京大学の先生ですか。",
        "g4-3": "これは日本語の本です。",
    },
    "L02": {
        "c01": "森さん、これは何ですか。",
        "c02": "それは日本語の辞書です。",
        "c03": "森さんの辞書ですか。",
        "c04": "いいえ、わたしのではありません。小野さんのです。",
        "c05": "あの本も小野さんのですか。",
        "c06": "いいえ、あれはわたしのです。",
        "e01": "皆さん、この傘はだれのですか。",
        "e02": "それはわたしのではありません。",
        "e03": "あ、それはわたしのです。ありがとうございます。",
        "e04": "どうぞ。あのかばんも李さんのですか。",
        "e05": "いいえ、あれは違います。だれのかばんでしょうか。",
        "g1-1": "これは雑誌です。",
        "g1-2": "それは何ですか。",
        "g1-3": "あれは新聞です。",
        "g2-1": "この本は日本語の本です。",
        "g2-2": "そのカメラはわたしのです。",
        "g2-3": "あのかばんはだれのですか。",
        "g3-1": "これは森さんの本です。",
        "g3-2": "あれは日本のカメラです。",
        "g3-3": "これは森さんの日本語の辞書です。",
        "g4-1": "この傘はわたしのです。",
        "g4-2": "あのかばんは森さんのではありません。",
        "g4-3": "この辞書は李さんのですか、小野さんのですか。",
    },
    "L03": {
        "c01": "すみません、デパートはどこですか。",
        "c02": "デパートはあそこです。",
        "c03": "トイレはどこですか。",
        "c04": "トイレはそこです。入口の左側です。",
        "c05": "ありがとうございます。",
        "e01": "いらっしゃいませ。",
        "e02": "すみません、これは何ですか。",
        "e03": "それは京都のお土産です。お菓子です。",
        "e04": "いくらですか。",
        "e05": "千五百円です。",
        "e06": "じゃ、これをください。",
        "g1-1": "ここは図書館です。",
        "g1-2": "そこは森さんの会社ですか。",
        "g1-3": "トイレはどこですか。",
        "g2-1": "食堂は二階です。",
        "g2-2": "銀行はあそこです。",
        "g2-3": "事務所はどこですか。",
        "g3-1": "この本はいくらですか。",
        "g3-2": "九百八十円です。",
        "g3-3": "そのお土産は二千五百円です。",
        "g4-1": "これをください。",
        "g4-2": "そのカメラを三つください。",
        "g4-3": "あのお菓子をください。",
    },
}

async def gen_one(lesson_id, file_id, text):
    folder = os.path.join(OUTPUT_BASE, lesson_id)
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, f"{file_id}.mp3")
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return f"[SKIP] {lesson_id}/{file_id}.mp3"
    try:
        c = edge_tts.Communicate(text, VOICE, rate=RATE)
        await c.save(path)
        size = os.path.getsize(path)
        return f"[OK]   {lesson_id}/{file_id}.mp3  ({size:,} B)  {text[:30]}"
    except Exception as e:
        return f"[FAIL] {lesson_id}/{file_id}.mp3  ERR: {e}"

async def main():
    # 合并 L11+ 数据
    json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_lessons_audio_index.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            extra = json.load(f)
        for lid, items in extra.items():
            if lid not in LESSONS:
                LESSONS[lid] = items
        print(f"[INFO] Merged {len(extra)} lessons from _lessons_audio_index.json")

    total = sum(len(v) for v in LESSONS.values())
    print(f"Total: {total} sentences across {len(LESSONS)} lessons")
    print(f"Voice: {VOICE}  Rate: {RATE}")
    print(f"Output base: {OUTPUT_BASE}/")
    print("-" * 60)

    sem = asyncio.Semaphore(4)
    async def run(lid, fid, text):
        async with sem:
            r = await gen_one(lid, fid, text)
            print(r, flush=True)
            await asyncio.sleep(0.08)

    tasks = [run(lid, fid, text) for lid, items in LESSONS.items() for fid, text in items.items()]
    await asyncio.gather(*tasks)
    print("-" * 60)
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
