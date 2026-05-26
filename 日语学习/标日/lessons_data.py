"""标日全部课程数据 · 紧凑 DSL（高度容错）
helper 支持多种调用形式，能消化 agent 写成各种格式的数据。
"""
import re


def _parse_word_line(line):
    """'jp|furi|cn|pos' → tuple；也容忍 'jp/furi/cn/pos' '/' 分隔"""
    parts = re.split(r'[|｜]', line)
    while len(parts) < 4:
        parts.append('')
    return tuple(p.strip() for p in parts[:4])


def W(*args):
    """两种用法：
    1) W('''多行 jp|furi|cn|pos''') → list[tuple]
    2) W(jp, furi, cn, pos='N') → tuple（用于 agent 误用为单词调用）
    """
    if len(args) == 1 and isinstance(args[0], str):
        s = args[0]
        if '\n' in s:
            return [_parse_word_line(l.strip()) for l in s.strip().splitlines() if l.strip()]
        if '|' in s or '｜' in s:
            return [_parse_word_line(s.strip())]
        # 单个词，无分隔符
        return [(s, '', '', 'N')]
    # 多参数：jp, furi, cn, pos
    jp = args[0] if len(args) > 0 else ''
    furi = args[1] if len(args) > 1 else ''
    cn = args[2] if len(args) > 2 else ''
    pos = args[3] if len(args) > 3 else 'N'
    return (jp, furi, cn, pos)


def _parse_passage_str(s):
    """多行 'speaker|jp|cn' → list[tuple]。容忍 ：/： 分隔，缺 cn 填空。"""
    out = []
    for line in s.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        # 优先 | 分隔
        if '|' in line or '｜' in line:
            parts = re.split(r'[|｜]', line, maxsplit=2)
        elif '：' in line:
            parts = line.split('：', 2)
        elif ':' in line:
            parts = line.split(':', 2)
        else:
            parts = ['', line, '']
        while len(parts) < 3:
            parts.append('')
        out.append(tuple(p.strip() for p in parts[:3]))
    return out


def P(*args, **kwargs):
    """多种用法：
    1) P('''多行 speaker|jp|cn''')
    2) P([(spk, jp, cn), ...])  或  P([(spk, jp), ...]) - cn 缺则填空
    3) P('label', [...])  - 忽略 label，处理列表
    4) P(spk, jp, cn) - 单行
    5) P(core=[...], ext=[...]) - 返回 dict 给 L() 拆分
    """
    if kwargs and ('core' in kwargs or 'ext' in kwargs):
        out = {}
        if 'core' in kwargs:
            out['core'] = P(kwargs['core'])
        if 'ext' in kwargs:
            out['ext'] = P(kwargs['ext'])
        return out
    if len(args) == 1:
        x = args[0]
        if isinstance(x, str):
            return _parse_passage_str(x)
        if isinstance(x, (list, tuple)):
            out = []
            for t in x:
                # nested list（来自 P() 调用的返回）
                if isinstance(t, list) and len(t) > 0 and isinstance(t[0], (list, tuple)) and not isinstance(t[0][0], (list, tuple)):
                    out.extend(t)
                elif isinstance(t, (list, tuple)):
                    tt = tuple(t)
                    while len(tt) < 3:
                        tt = tt + ('',)
                    out.append(tt[:3])
                elif isinstance(t, str):
                    out.extend(_parse_passage_str(t))
            return out
    elif len(args) == 2 and isinstance(args[1], (list, tuple)):
        # P('core', [...])
        return P(args[1])
    elif len(args) >= 2:
        # P(spk, jp, cn)
        spk = args[0]
        jp = args[1]
        cn = args[2] if len(args) > 2 else ''
        return [(spk, jp, cn)]
    return []


def G(*args, **kwargs):
    """G(title, tag, explain, egs, tip=None, table='')
    或 G(point=, meaning=, examples=[(jp,cn) | 'jp（cn）'], tip=, summary=)
    """
    title = kwargs.get('title') or kwargs.get('point') or (args[0] if len(args) > 0 else '')
    tag = kwargs.get('tag') or kwargs.get('pattern') or (args[1] if len(args) > 1 else '')
    explain = (kwargs.get('explain') or kwargs.get('meaning') or kwargs.get('summary')
               or (args[2] if len(args) > 2 else ''))
    raw_egs = kwargs.get('egs') or kwargs.get('examples') or (args[3] if len(args) > 3 else [])
    tip = kwargs.get('tip') or (args[4] if len(args) > 4 else None)
    table = kwargs.get('table') or (args[5] if len(args) > 5 else '')

    egs = []
    for e in (raw_egs or []):
        if isinstance(e, (list, tuple)):
            t = tuple(e)
            while len(t) < 2:
                t = t + ('',)
            egs.append((t[0], t[1]))
        elif isinstance(e, str):
            # 'jp（cn）' 或 'jp(cn)'
            m = re.match(r'(.+?)\s*[（(](.+?)[)）]\s*$', e)
            if m:
                egs.append((m.group(1).strip(), m.group(2).strip()))
            else:
                egs.append((e.strip(), ''))
    return {'title': title or '', 'tag': tag or '', 'explain': explain or '',
            'egs': egs, 'tip': tip, 'table': table or ''}


def _normalize_ex(ex):
    """exercise 可能是 dict 或 tuple (title, items, answer)"""
    if isinstance(ex, dict):
        return {
            'title': ex.get('title') or ex.get('subject') or '',
            'items': ex.get('items') or ex.get('questions') or [],
            'answer': ex.get('answer') or ex.get('answers') or '',
        }
    if isinstance(ex, (list, tuple)):
        t = list(ex)
        while len(t) < 3:
            t.append('' if len(t) == 2 else [])
        return {'title': t[0], 'items': t[1] if isinstance(t[1], list) else [t[1]], 'answer': t[2]}
    return {'title': '', 'items': [], 'answer': ''}


_DEFAULT_FOLDER_BY_FILE = {
    '_data_l1a': '初级上', '_data_l1b': '初级上', '_data_l1c': '初级上',
    '_data_l2a': '初级下', '_data_l2b': '初级下', '_data_l2c': '初级下', '_data_l2d': '初级下',
    '_data_l3a': '中级上', '_data_l3b': '中级上', '_data_l3c': '中级上',
    '_data_l4a': '中级下', '_data_l4b': '中级下', '_data_l4c': '中级下',
}


def L(num=None, folder=None, title='', subtitle='', lead='',
      words=None, core=None, ext=None, grammar=None, exercises=None,
      kicker=None, core_caption='対話', ext_caption='対話', prev=None, next_=None,
      # 兼容字段
      id=None, number=None, lesson=None, no=None,
      dialogue=None, dialogues=None, ext_dialogue=None, phrases=None,
      core_dialogue=None, examples=None, **extra):
    # num 兼容 id="L07" / number=7 / lesson=7 / no=7
    if num is None:
        for alt in (number, lesson, no):
            if alt is not None:
                num = int(alt)
                break
    if num is None and id:
        m = re.match(r'L?0*(\d+)', str(id))
        if m:
            num = int(m.group(1))
    if num is None:
        raise ValueError(f'L(): need num or id (got id={id})')

    # folder 兼容：从调用栈找出来源文件
    if folder is None:
        import inspect
        frame = inspect.currentframe().f_back
        mod_name = frame.f_globals.get('__name__', '')
        folder = _DEFAULT_FOLDER_BY_FILE.get(mod_name, '初级上')

    # phrases 兼容（可能是 dict 包含 core/ext，或被解析过的列表）
    if isinstance(phrases, dict):
        if core is None and 'core' in phrases:
            core = phrases['core']
        if ext is None and 'ext' in phrases:
            ext = phrases['ext']

    # core / ext 兼容多种命名
    if core is None:
        if dialogue is not None:
            core = dialogue
        elif core_dialogue is not None:
            core = core_dialogue
        elif dialogues is not None:
            # dialogues 可能是 [P("core", ...), P("ext", ...)] 已被 P 返回 list
            if isinstance(dialogues, list) and len(dialogues) > 0:
                first = dialogues[0]
                if isinstance(first, list):
                    core = first
                    if ext is None and len(dialogues) > 1:
                        ext = dialogues[1]
                else:
                    core = dialogues
    if ext is None and ext_dialogue is not None:
        ext = ext_dialogue

    # 处理 words
    if words is None:
        words_list = []
    elif isinstance(words, str):
        words_list = W(words)
    elif isinstance(words, list):
        # 可能是 list[tuple] 或 list of W() 返回值（可能嵌套）
        words_list = []
        for w in words:
            if isinstance(w, list):
                words_list.extend(w)
            else:
                words_list.append(w)
    else:
        words_list = list(words)

    # 处理 core/ext
    if core is None:
        core_list = []
    elif isinstance(core, str):
        core_list = P(core)
    elif isinstance(core, list):
        core_list = P(core)
    else:
        core_list = []

    if ext is None:
        ext_list = []
    elif isinstance(ext, str):
        ext_list = P(ext)
    elif isinstance(ext, list):
        ext_list = P(ext)
    else:
        ext_list = []

    # grammar：可能是 list of dict（G 返回）或 list of 别的
    grammar_list = []
    for g in (grammar or []):
        if isinstance(g, dict):
            grammar_list.append(g)
        elif isinstance(g, (list, tuple)):
            grammar_list.append(G(*g))

    # exercises
    ex_list = [_normalize_ex(e) for e in (exercises or [])]

    if kicker is None:
        kicker = f'第 {num} 課 · LESSON {num}'

    return {
        'num': num, 'folder': folder, 'title': title, 'subtitle': subtitle,
        'kicker': kicker, 'lead': lead,
        'words': words_list, 'core': core_list, 'ext': ext_list,
        'core_caption': core_caption, 'ext_caption': ext_caption,
        'grammar': grammar_list, 'exercises': ex_list,
        'prev': prev, 'next': next_,
    }


# 从分级数据文件汇总（支持按字母分批：_data_l1a, _data_l1b, ...）
import importlib, os, sys

LESSONS = []
_here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _here)

for _name in sorted(os.listdir(_here)):
    if _name.startswith('_data_l') and _name.endswith('.py'):
        _mod_name = _name[:-3]
        try:
            _m = importlib.import_module(_mod_name)
            if hasattr(_m, 'LESSONS_PART'):
                LESSONS.extend(_m.LESSONS_PART)
        except Exception as e:
            print(f"[WARN] {_mod_name}: {e}")

LESSONS.sort(key=lambda x: (
    {'初级上': 1, '初级下': 2, '中级上': 3, '中级下': 4}.get(x['folder'], 9),
    x['num']
))
