"""Generate 五十音造句.pdf directly via reportlab. Romaji is rendered above each kana via inline table."""
import io, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# === Fonts: Japanese mincho + Chinese SimSun ===
pdfmetrics.registerFont(TTFont('JP', 'C:/Windows/Fonts/msmincho.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('CN', 'C:/Windows/Fonts/simsun.ttc', subfontIndex=0))

# === Romaji map (kana → romaji) ===
KANA_RO = {
    # Hiragana
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','を':'wo','ん':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ゃ':'ya','ゅ':'yu','ょ':'yo','っ':'·',
    # Katakana
    'ア':'a','イ':'i','ウ':'u','エ':'e','オ':'o',
    'カ':'ka','キ':'ki','ク':'ku','ケ':'ke','コ':'ko',
    'サ':'sa','シ':'shi','ス':'su','セ':'se','ソ':'so',
    'タ':'ta','チ':'chi','ツ':'tsu','テ':'te','ト':'to',
    'ナ':'na','ニ':'ni','ヌ':'nu','ネ':'ne','ノ':'no',
    'ハ':'ha','ヒ':'hi','フ':'fu','ヘ':'he','ホ':'ho',
    'マ':'ma','ミ':'mi','ム':'mu','メ':'me','モ':'mo',
    'ヤ':'ya','ユ':'yu','ヨ':'yo',
    'ラ':'ra','リ':'ri','ル':'ru','レ':'re','ロ':'ro',
    'ワ':'wa','ヲ':'wo','ン':'n',
    'ガ':'ga','ギ':'gi','グ':'gu','ゲ':'ge','ゴ':'go',
    'ザ':'za','ジ':'ji','ズ':'zu','ゼ':'ze','ゾ':'zo',
    'ダ':'da','ヂ':'ji','ヅ':'zu','デ':'de','ド':'do',
    'バ':'ba','ビ':'bi','ブ':'bu','ベ':'be','ボ':'bo',
    'パ':'pa','ピ':'pi','プ':'pu','ペ':'pe','ポ':'po',
    'ャ':'ya','ュ':'yu','ョ':'yo','ッ':'·','ー':'—',
}

# === Parse data from existing HTML ===
with io.open('五十音造句.html', 'r', encoding='utf-8') as f:
    html = f.read()

events = []
for m in re.finditer(r'<div class="section-label">([^<]+)</div>', html):
    events.append((m.start(), 'section', m.group(1).strip()))
for m in re.finditer(r'<div class="row-label">([^<]+?)\s*<span class="en">', html):
    events.append((m.start(), 'row', m.group(1).strip()))
card_pat = re.compile(
    r'<div class="sen-card">\s*'
    r'<div class="sen-head">'
    r'<span class="sen-kana">(.)<small class="ro">([^<]+)</small></span>'
    r'<span class="sen-word">'
    r'<span class="jp">([^<]+)</span>'
    r'(?:<span class="furi">([^<]*)</span>)?'
    r'(?:<span class="cn">([^<]*)</span>)?'
    r'</span>'
    r'</div>\s*'
    r'<div class="sen-jp">([^<]+)</div>\s*'
    r'<div class="sen-read">([^<]+)</div>\s*'
    r'<div class="sen-cn">([^<]+)</div>\s*'
    r'<span class="sen-tag">([^<]+)</span>',
    re.DOTALL
)
for m in card_pat.finditer(html):
    events.append((m.start(), 'card', m.groups()))
events.sort(key=lambda x: x[0])
print(f'Parsed {sum(1 for e in events if e[1]=="card")} cards')

# === Styles ===
title_style = ParagraphStyle('title', fontName='CN', fontSize=18, leading=20, alignment=TA_CENTER)
sub_style = ParagraphStyle('sub', fontName='CN', fontSize=11, leading=13, alignment=TA_CENTER, spaceAfter=10)
section_style = ParagraphStyle('section', fontName='CN', fontSize=14, leading=16)
row_label_style = ParagraphStyle('row', fontName='JP', fontSize=13, leading=15)
header_style = ParagraphStyle('header', fontName='CN', fontSize=12, leading=14, alignment=TA_LEFT)
header_c_style = ParagraphStyle('headerc', fontName='CN', fontSize=12, leading=14, alignment=TA_CENTER)
jp_style = ParagraphStyle('jp', fontName='JP', fontSize=12, leading=14)
word_style = ParagraphStyle('w', fontName='JP', fontSize=12, leading=14)
cn_style = ParagraphStyle('cn', fontName='CN', fontSize=11.5, leading=13)
gr_style = ParagraphStyle('gr', fontName='CN', fontSize=10.5, leading=12)
kana_big_style = ParagraphStyle('kbig', fontName='JP', fontSize=24, leading=26, alignment=TA_CENTER)
kana_ro_style = ParagraphStyle('kro', fontName='JP', fontSize=10, leading=11, alignment=TA_CENTER)

# For inline ruby
ro_small = ParagraphStyle('rs', fontName='JP', fontSize=7.5, leading=8.5, alignment=TA_CENTER)
kana_inline = ParagraphStyle('ki', fontName='JP', fontSize=12, leading=13, alignment=TA_CENTER)

def make_ruby(reading):
    """Build romaji-above-kana, wrapping into multiple lines if too long."""
    chunks = reading.split(' ')
    chars = []
    for ci, chunk in enumerate(chunks):
        for c in chunk:
            if c.strip():
                chars.append(c)
        if ci < len(chunks) - 1:
            chars.append(' ')
    if not chars:
        return Paragraph(reading, jp_style)

    # Max kana per line: ~18 to fit ~10.5cm at 0.55cm per cell
    MAX = 18
    # Split into lines, preferring break at space (word boundary)
    lines = []
    cur = []
    for c in chars:
        cur.append(c)
        if len(cur) >= MAX:
            # try to break at last space
            for i in range(len(cur)-1, max(0, len(cur)-6), -1):
                if cur[i] == ' ':
                    lines.append(cur[:i])
                    cur = cur[i+1:]
                    break
            else:
                lines.append(cur)
                cur = []
    if cur:
        lines.append(cur)

    sub_tables = []
    for line in lines:
        if not line:
            continue
        romaji_row = []
        kana_row = []
        col_widths = []
        for c in line:
            if c == ' ':
                romaji_row.append('')
                kana_row.append('')
                col_widths.append(0.15*cm)
            else:
                ro = KANA_RO.get(c, '')
                romaji_row.append(Paragraph(ro, ro_small))
                kana_row.append(Paragraph(c, kana_inline))
                col_widths.append(0.55*cm)
        t = Table([romaji_row, kana_row], colWidths=col_widths)
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        sub_tables.append([t])

    if len(sub_tables) == 1:
        return sub_tables[0][0]
    # Stack lines vertically
    outer = Table(sub_tables, colWidths=[10.6*cm])
    outer.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    return outer

# === Build PDF ===
doc = SimpleDocTemplate(
    '五十音造句.pdf', pagesize=A4,
    leftMargin=0.5*cm, rightMargin=0.5*cm,
    topMargin=0.5*cm, bottomMargin=0.5*cm,
)

story = []
story.append(Paragraph('五十音造句练习 · 92 句', title_style))
story.append(Paragraph('每个假名一个词 · 每句一个语法 · 假名上方标罗马音', sub_style))

# Table
table_data = []
# Header
table_data.append([
    Paragraph('<b>假名</b>', header_c_style),
    Paragraph('<b>词</b>', header_style),
    Paragraph('<b>例句 + 读音</b>', header_style),
    Paragraph('<b>翻译</b>', header_style),
    Paragraph('<b>语法</b>', header_style),
])
row_idx = 1
section_rows = []
row_label_rows = []

for ev in events:
    kind = ev[1]
    data = ev[2]
    if kind == 'section':
        table_data.append([Paragraph('<b>'+data+'</b>', section_style), '', '', '', ''])
        section_rows.append(row_idx)
        row_idx += 1
    elif kind == 'row':
        table_data.append([Paragraph('<b>'+data+'</b>', row_label_style), '', '', '', ''])
        row_label_rows.append(row_idx)
        row_idx += 1
    elif kind == 'card':
        kana, ro, jp_w, furi, cn_m, sen_jp, sen_read, sen_cn, sen_tag = data
        # Kana column: big char + romaji below
        kana_cell = [
            Paragraph(kana, kana_big_style),
            Paragraph(ro, kana_ro_style)
        ]
        # Word column
        word_parts = '<b>'+jp_w+'</b>'
        if furi:
            word_parts += ' <font size="9">'+furi+'</font>'
        if cn_m:
            word_parts += '<br/><font name="CN" size="10">'+cn_m+'</font>'
        word_cell = Paragraph(word_parts, word_style)
        # Sentence + ruby
        sen_cell = [
            Paragraph(sen_jp, jp_style),
            make_ruby(sen_read.rstrip('。．'))
        ]
        cn_cell = Paragraph(sen_cn.strip(), cn_style)
        gr_cell = Paragraph(sen_tag, gr_style)
        table_data.append([kana_cell, word_cell, sen_cell, cn_cell, gr_cell])
        row_idx += 1

col_widths = [1.5*cm, 3.2*cm, 11.0*cm, 3.0*cm, 1.8*cm]
table = Table(table_data, colWidths=col_widths, repeatRows=1)
ts = TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#dddddd')),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#bbbbbb')),
    ('LEFTPADDING', (0,0), (-1,-1), 4),
    ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
])
for r in section_rows:
    ts.add('BACKGROUND', (0, r), (-1, r), colors.HexColor('#e8d8d4'))
    ts.add('SPAN', (0, r), (-1, r))
for r in row_label_rows:
    ts.add('BACKGROUND', (0, r), (-1, r), colors.HexColor('#f4efe2'))
    ts.add('SPAN', (0, r), (-1, r))
table.setStyle(ts)
story.append(table)

doc.build(story)
print('PDF built OK')
