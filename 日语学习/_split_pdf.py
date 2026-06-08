"""把扫描版标日 PDF 拆成 < 100MB 的若干份，便于 Claude 读取。
依赖：pip install pypdf
用法：python _split_pdf.py
输出：在同目录生成 标日初级上_part1.pdf 等
"""
import os
import sys
import io

if hasattr(sys.stdout, 'buffer'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    sys.stderr.write("缺少 pypdf。请先运行：pip install pypdf\n")
    sys.exit(1)

HERE = os.path.dirname(os.path.abspath(__file__))

# 源文件名 -> 输出前缀
TARGETS = {
    '标准日本与 初级上（74面）_彩印双面_浅蓝色皮纹纸胶装_扫描版.pdf': '标日初级上',
    '标准日本语  初级下（74面）_彩印双面_浅蓝色皮纹纸胶装_扫描版.pdf': '标日初级下',
    '标准日本语 中级上（98面）_彩印双面_浅蓝色皮纹纸胶装_扫描版.pdf': '标日中级上',
    '标准日本与 中级下（98面）_彩印双面_浅蓝色皮纹纸胶装_扫描版.pdf': '标日中级下',
}

# 目标单份大小：< 95MB，留点余量
TARGET_MB = 95


def split_one(src_path, out_prefix):
    size_mb = os.path.getsize(src_path) / 1024 / 1024
    reader = PdfReader(src_path)
    total_pages = len(reader.pages)

    # 估算需要拆几份；向上取整再 +1 保险
    parts = max(2, int(size_mb / TARGET_MB) + 1)
    pages_per_part = (total_pages + parts - 1) // parts

    print(f"\n=== {os.path.basename(src_path)} ===")
    print(f"  大小 {size_mb:.1f}MB · 总页 {total_pages} · 拆 {parts} 份 · 每份 ~{pages_per_part} 页")

    for i in range(parts):
        start = i * pages_per_part
        end = min(start + pages_per_part, total_pages)
        if start >= total_pages:
            break

        writer = PdfWriter()
        for p in range(start, end):
            writer.add_page(reader.pages[p])

        out_name = f"{out_prefix}_part{i+1}.pdf"
        out_path = os.path.join(HERE, out_name)
        with open(out_path, 'wb') as f:
            writer.write(f)

        out_mb = os.path.getsize(out_path) / 1024 / 1024
        flag = '' if out_mb < 100 else '  [WARN > 100MB]'
        print(f"  → {out_name}  页 {start+1}-{end}  {out_mb:.1f}MB{flag}")


def main():
    missing = []
    for src in TARGETS:
        path = os.path.join(HERE, src)
        if not os.path.exists(path):
            missing.append(src)

    if missing:
        print("找不到以下文件：")
        for m in missing:
            print(f"  - {m}")
        return

    for src, prefix in TARGETS.items():
        split_one(os.path.join(HERE, src), prefix)

    print("\n完成。新文件放在 日语学习/ 目录下。")
    print("把生成的文件名告诉 Claude 即可。")


if __name__ == '__main__':
    main()
