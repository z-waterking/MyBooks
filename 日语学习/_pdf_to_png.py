"""把 PDF 指定页转成 PNG 图片，供 Claude 视觉读取。
用法：python _pdf_to_png.py <pdf_file> <start_page> <end_page> [--out outdir] [--dpi 200]
页码从 1 开始（与教材页一致），含两端。
"""
import os
import sys
import io
import argparse

if hasattr(sys.stdout, 'buffer'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import fitz  # pymupdf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf', help='PDF 文件路径')
    ap.add_argument('start', type=int, help='起始页（1-based，含）')
    ap.add_argument('end', type=int, help='结束页（1-based，含）')
    ap.add_argument('--out', default='_pdf_pages', help='输出目录')
    ap.add_argument('--dpi', type=int, default=180, help='渲染 DPI（默认 180）')
    args = ap.parse_args()

    if not os.path.exists(args.pdf):
        print(f'找不到 {args.pdf}')
        sys.exit(1)

    os.makedirs(args.out, exist_ok=True)

    doc = fitz.open(args.pdf)
    total = len(doc)
    start = max(1, args.start)
    end = min(total, args.end)

    base = os.path.splitext(os.path.basename(args.pdf))[0]
    zoom = args.dpi / 72.0
    mat = fitz.Matrix(zoom, zoom)

    for p in range(start, end + 1):
        page = doc[p - 1]
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out_name = f'{base}_p{p:03d}.png'
        out_path = os.path.join(args.out, out_name)
        pix.save(out_path)
        size_kb = os.path.getsize(out_path) / 1024
        print(f'  → {out_path}  ({pix.width}x{pix.height}  {size_kb:.0f}KB)')

    print(f'\n共导出 {end - start + 1} 页到 {args.out}/')


if __name__ == '__main__':
    main()
