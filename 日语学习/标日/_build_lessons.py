"""标日课文 HTML 生成器
读取 lessons_data.py 中的结构化课程数据，按模板生成每课 HTML，同时输出 audio 任务清单。
用法: python _build_lessons.py
"""
import os, sys, io, json, html

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from lessons_data import LESSONS  # noqa: E402

PLAY_SVG = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'


def esc(s):
    return html.escape(s, quote=True)


def word_block(w):
    """w: (jp, furi, cn, pos) furi 可空"""
    jp, furi, cn, pos = w
    furi_html = f'<span class="furi">{esc(furi)}</span>' if furi else ''
    return f'<div class="word"><span class="w-jp">{esc(jp)}{furi_html}</span><span class="w-cn">{esc(cn)}</span><span class="w-pos">{esc(pos)}</span></div>'


def passage_html(lines, lesson_id, prefix):
    """lines: [(speaker, jp, cn), ...]  prefix: 'c' or 'e'"""
    rows = []
    for i, (sp, jp, cn) in enumerate(lines, 1):
        fid = f'{prefix}{i:02d}'
        audio = f'../audio/{lesson_id}/{fid}.mp3'
        rows.append(
            f'<div class="pa-line"><span class="speaker">{esc(sp)}</span>'
            f'<button class="pa-play" data-play data-audio="{audio}">{PLAY_SVG}</button>'
            f'<span class="pa-jp" data-play data-audio="{audio}">{esc(jp)}</span>'
            f'<span class="pa-cn">{esc(cn)}</span></div>'
        )
    return '\n  '.join(rows)


def grammar_html(g_index, g, lesson_id):
    """g: dict(title, tag, explain, egs[(jp,cn)], tip?, table?)"""
    rows = []
    for j, (jp, cn) in enumerate(g['egs'], 1):
        fid = f'g{g_index}-{j}'
        audio = f'../audio/{lesson_id}/{fid}.mp3'
        marker = ['①', '②', '③', '④', '⑤'][j - 1]
        rows.append(
            f'<div class="eg"><span class="eg-num">{marker}</span>'
            f'<span class="eg-jp" data-play data-audio="{audio}">{jp}</span>'
            f'<span class="eg-cn">{esc(cn)}</span>'
            f'<button class="eg-play" data-play data-audio="{audio}">{PLAY_SVG}</button></div>'
        )
    eg_list = '\n    '.join(rows)
    table_html = g.get('table', '')
    tip_html = f'<div class="tip">{g["tip"]}</div>' if g.get('tip') else ''
    tag = g.get('tag', '')
    pattern_span = f'<span class="pattern">{esc(tag)}</span>' if tag else ''
    return f'''<div class="grammar">
  <h4><span class="num">G{g_index}.</span>{g['title']}{pattern_span}</h4>
  <p class="explain">{g['explain']}</p>
  {table_html}
  <div class="eg-list">
    {eg_list}
  </div>
  {tip_html}
</div>'''


def exercise_html(idx, ex):
    items = '\n      '.join(f'<li>{x}</li>' for x in ex['items'])
    return f'''<div class="exercise">
  <h4>{idx}. {ex['title']}</h4>
  <ol>
      {items}
  </ol>
  <details><summary>▸ 答案</summary><div class="ans">
    {ex['answer']}
  </div></details>
</div>'''


PAGE_TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>第 {num} 課 · {title} · 標準日本語</title>
<link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header class="masthead">
  <div class="masthead-inner">
    <a href="../index.html" class="brand" style="border:none;">標準日本語<small>{lesson_id} · {subtitle}</small></a>
    <ul class="nav">
      <li><a href="../index.html">总目录</a></li>
      {prev_link}
      {next_link}
    </ul>
  </div>
</header>

<main class="page">
<section>
  <span class="kicker">{kicker}</span>
  <h1>{title}</h1>
  <p class="lead">{lead}</p>
</section>

<div class="audio-control">
  <span class="ac-label">语速:</span><input type="range" min="0.6" max="1.3" step="0.05" value="0.9"><span class="rate-val" style="font-family:var(--mono);font-size:11px;">0.90x</span><button class="btn-stop">■ 停止</button><span class="ac-status">点击日语句子单独播放 · ESC 停止</span>
</div>

<h2>新出単語</h2>
<div class="word-list">
{words_html}
</div>

<h2>基本課文 <span style="font-family:var(--mono);font-size:11px;color:var(--ink-3);letter-spacing:0.1em;font-weight:400;margin-left:8px;">CORE · {core_caption}</span></h2>
<div class="passage">
  {core_html}
</div>

<h2>応用課文 <span style="font-family:var(--mono);font-size:11px;color:var(--ink-3);letter-spacing:0.1em;font-weight:400;margin-left:8px;">EXTENDED · {ext_caption}</span></h2>
<div class="passage">
  {ext_html}
</div>

<h2>文法</h2>

{grammar_html}

<h2>練習</h2>
{exercises_html}

<div class="lesson-nav">{prev_btn}<a href="../index.html">↺ 总目录</a>{next_btn}</div>
</main>

<footer><div>© 標準日本語 · 第 {num} 課</div><div>Nanami Neural</div></footer>
<script src="../js/main.js"></script>
</body></html>
'''


def build_lesson(L):
    lesson_id = f"L{L['num']:02d}"
    prev_link = f'<li><a href="{L["prev"]}">← 上一课</a></li>' if L.get('prev') else ''
    next_link = f'<li><a href="{L["next"]}">下一课 →</a></li>' if L.get('next') else ''
    prev_btn = f'<a href="{L["prev"]}">← 上一课</a>' if L.get('prev') else '<span></span>'
    next_btn = f'<a href="{L["next"]}">下一课 →</a>' if L.get('next') else '<span></span>'

    words_html = '\n'.join(word_block(w) for w in L['words'])
    core_html = passage_html(L['core'], lesson_id, 'c')
    ext_html = passage_html(L['ext'], lesson_id, 'e')
    g_html = '\n\n'.join(grammar_html(i + 1, g, lesson_id) for i, g in enumerate(L['grammar']))
    ex_html = '\n'.join(exercise_html(i + 1, ex) for i, ex in enumerate(L['exercises']))

    return PAGE_TEMPLATE.format(
        num=L['num'],
        lesson_id=lesson_id,
        title=L['title'],
        subtitle=L['subtitle'],
        kicker=L['kicker'],
        lead=L['lead'],
        prev_link=prev_link,
        next_link=next_link,
        prev_btn=prev_btn,
        next_btn=next_btn,
        words_html=words_html,
        core_caption=L.get('core_caption', '対話'),
        core_html=core_html,
        ext_caption=L.get('ext_caption', '対話'),
        ext_html=ext_html,
        grammar_html=g_html,
        exercises_html=ex_html,
    )


def collect_audio(L):
    """返回 { 'cNN':text, 'eNN':text, 'gK-J':text }，用于生成 mp3"""
    lesson_id = f"L{L['num']:02d}"
    d = {}
    for i, (_, jp, _) in enumerate(L['core'], 1):
        d[f'c{i:02d}'] = jp
    for i, (_, jp, _) in enumerate(L['ext'], 1):
        d[f'e{i:02d}'] = jp
    for gi, g in enumerate(L['grammar'], 1):
        for ej, (jp, _) in enumerate(g['egs'], 1):
            # 去掉 <strong> 等标签
            import re
            clean = re.sub(r'<[^>]+>', '', jp)
            d[f'g{gi}-{ej}'] = clean
    return lesson_id, d


def main():
    base = os.path.dirname(os.path.abspath(__file__))
    audio_index = {}
    count = 0
    issues = []
    for L in LESSONS:
        lid = f"L{L['num']:02d}"
        # 形状校验
        if len(L['words']) < 8:
            issues.append(f"{lid}: 词汇仅 {len(L['words'])} 个（期望 ≥ 8）")
        if len(L['core']) < 4:
            issues.append(f"{lid}: 基本课文仅 {len(L['core'])} 行（期望 ≥ 4）")
        if len(L['ext']) < 3:
            issues.append(f"{lid}: 应用课文仅 {len(L['ext'])} 行（期望 ≥ 3）")
        if len(L['grammar']) < 1:
            issues.append(f"{lid}: 语法块为空")
        for gi, g in enumerate(L['grammar'], 1):
            for k in ('title', 'explain', 'egs'):
                if k not in g:
                    issues.append(f"{lid} G{gi}: 缺少字段 {k}")
            if 'egs' in g and len(g['egs']) < 1:
                issues.append(f"{lid} G{gi}: 例句为空")

        folder = L['folder']
        out_dir = os.path.join(base, folder)
        os.makedirs(out_dir, exist_ok=True)
        path = os.path.join(out_dir, f"{lid}.html")
        with open(path, 'w', encoding='utf-8') as f:
            f.write(build_lesson(L))
        cid, ad = collect_audio(L)
        audio_index[cid] = ad
        count += 1
        print(f"[OK] {folder}/{lid}.html ({len(ad)} audio sentences)")

    out_audio = os.path.join(base, '_lessons_audio_index.json')
    with open(out_audio, 'w', encoding='utf-8') as f:
        json.dump(audio_index, f, ensure_ascii=False, indent=2)
    print(f"\nTotal: {count} lessons. Audio index → _lessons_audio_index.json")

    if issues:
        print(f"\n[WARN] {len(issues)} 形状问题（不致命）:")
        for it in issues[:20]:
            print(f"  - {it}")
        if len(issues) > 20:
            print(f"  ... 还有 {len(issues) - 20} 条")


if __name__ == '__main__':
    main()
