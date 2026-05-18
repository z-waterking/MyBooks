/* ============================================
   日语学习路线 · 共享测验引擎
   每个 quiz.html 需在加载本脚本前设置 window.QUIZ_DATA
   ============================================ */
(function(){
  'use strict';

  const D = window.QUIZ_DATA;
  if(!D){ console.error('window.QUIZ_DATA not set'); return; }

  const $ = (sel,root)=> (root||document).querySelector(sel);
  const $$ = (sel,root)=> Array.from((root||document).querySelectorAll(sel));
  const shuffle = arr => arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
  const pick = (arr,n,exclude) => {
    const pool = exclude!=null ? arr.filter(x=>x!==exclude) : arr.slice();
    return shuffle(pool).slice(0,n);
  };

  // 当前会话
  let state = {
    types: [],     // 选中题型
    count: 20,
    questions: [],
    idx: 0,
    score: 0,
    answered: false
  };

  // ===== Build questions =====
  function buildQuestions(){
    const qs = [];
    const allTypes = state.types;
    const perType = Math.ceil(state.count / allTypes.length);

    allTypes.forEach(t => {
      const pool = D[t] || [];
      if(pool.length === 0) return;
      // pick up to perType random items
      const sampled = shuffle(pool).slice(0, perType);
      sampled.forEach(item => {
        const q = makeQuestion(t, item, pool);
        if(q) qs.push(q);
      });
    });

    return shuffle(qs).slice(0, state.count);
  }

  function makeQuestion(type, item, pool){
    if(type === 'kana'){
      // 显示假名，问罗马音；或反之
      const dir = Math.random() > 0.5 ? 'k2r' : 'r2k';
      if(dir === 'k2r'){
        const others = pick(pool.map(x=>x.a).filter(x=>x!==item.a), 3);
        return {
          typeLabel: '假名 → 罗马音',
          prompt: item.q,
          promptSub: '',
          correct: item.a,
          options: shuffle([item.a, ...others])
        };
      } else {
        const others = pick(pool.map(x=>x.q).filter(x=>x!==item.q), 3);
        return {
          typeLabel: '罗马音 → 假名',
          prompt: item.a,
          promptSub: '',
          correct: item.q,
          options: shuffle([item.q, ...others])
        };
      }
    }
    if(type === 'vocab'){
      // 日 → 中 或 中 → 日，50/50
      const dir = Math.random() > 0.5 ? 'j2c' : 'c2j';
      const otherItems = pool.filter(x => x !== item && x.cn !== item.cn);
      const distractors = pick(otherItems, 3);
      if(dir === 'j2c'){
        return {
          typeLabel: '词汇 · 日 → 中',
          prompt: item.jp,
          promptSub: item.kana || '',
          correct: item.cn,
          options: shuffle([item.cn, ...distractors.map(x=>x.cn)])
        };
      } else {
        return {
          typeLabel: '词汇 · 中 → 日',
          prompt: item.cn,
          promptSub: '',
          correct: item.kana ? (item.jp + ' / ' + item.kana) : item.jp,
          options: shuffle([
            item.kana ? (item.jp + ' / ' + item.kana) : item.jp,
            ...distractors.map(x => x.kana ? (x.jp + ' / ' + x.kana) : x.jp)
          ])
        };
      }
    }
    if(type === 'grammar'){
      return {
        typeLabel: '语法选择',
        prompt: item.q,
        promptSub: item.hint || '',
        correct: item.a,
        options: item.options ? shuffle(item.options) : [],
        explain: item.explain || ''
      };
    }
  }

  // ===== Render setup =====
  function renderSetup(){
    const root = $('#quiz-root');
    root.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'quiz-setup';

    const has = (t) => Array.isArray(D[t]) && D[t].length > 0;
    const availableTypes = [
      {k:'kana', label:'假名 ↔ 罗马音', avail: has('kana')},
      {k:'vocab', label:'词汇 日 ↔ 中', avail: has('vocab')},
      {k:'grammar', label:'语法选择', avail: has('grammar')}
    ].filter(t => t.avail);

    if(state.types.length === 0){
      // 默认全选
      state.types = availableTypes.map(t=>t.k);
    }

    wrap.innerHTML = `
      <h3>开始测验 · ${D.level || ''}</h3>
      <p>从下面的题库中随机抽题。可以选择题型和题数。键盘按 <strong>1 2 3 4</strong> 快速选答案，按 <strong>Enter</strong> 下一题。</p>
      <div class="quiz-controls">
        <div class="qc-group">
          <h5>题型</h5>
          <div class="qc-options" id="qc-types"></div>
        </div>
        <div class="qc-group">
          <h5>题数</h5>
          <div class="qc-options" id="qc-count"></div>
        </div>
      </div>
      <div class="quiz-start"><button id="quiz-start-btn">开始</button></div>
    `;
    root.appendChild(wrap);

    // Types
    const tBox = $('#qc-types', wrap);
    availableTypes.forEach(t => {
      const b = document.createElement('button');
      b.textContent = t.label;
      b.dataset.k = t.k;
      if(state.types.includes(t.k)) b.classList.add('on');
      b.addEventListener('click', () => {
        if(state.types.includes(t.k)){
          if(state.types.length > 1){
            state.types = state.types.filter(x=>x!==t.k);
            b.classList.remove('on');
          }
        } else {
          state.types.push(t.k);
          b.classList.add('on');
        }
      });
      tBox.appendChild(b);
    });

    // Count
    const cBox = $('#qc-count', wrap);
    [10, 20, 30, 50].forEach(n => {
      const b = document.createElement('button');
      b.textContent = n + ' 题';
      b.dataset.n = n;
      if(state.count === n) b.classList.add('on');
      b.addEventListener('click', () => {
        state.count = n;
        $$('#qc-count button', wrap).forEach(x=>x.classList.remove('on'));
        b.classList.add('on');
      });
      cBox.appendChild(b);
    });

    $('#quiz-start-btn').addEventListener('click', startQuiz);
  }

  // ===== Start quiz =====
  function startQuiz(){
    state.questions = buildQuestions();
    state.idx = 0;
    state.score = 0;
    if(state.questions.length === 0){
      alert('题库为空，无法测验');
      return;
    }
    renderQuestion();
  }

  function renderQuestion(){
    const q = state.questions[state.idx];
    state.answered = false;
    const root = $('#quiz-root');
    root.innerHTML = '';

    const board = document.createElement('div');
    board.className = 'quiz-board';

    const total = state.questions.length;
    const progPct = (state.idx / total) * 100;

    board.innerHTML = `
      <div class="quiz-meta">
        <span class="progress-num">${state.idx + 1} / ${total}</span>
        <span class="score">得分 ${state.score}</span>
      </div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${progPct}%"></div></div>
      <div class="quiz-card">
        <div class="quiz-type-tag">${q.typeLabel}</div>
        <div class="quiz-prompt">${escapeHTML(q.prompt)}</div>
        ${q.promptSub ? `<div class="quiz-prompt-sub">${escapeHTML(q.promptSub)}</div>` : ''}
        <div class="quiz-options" id="quiz-opts"></div>
        <div class="quiz-feedback" id="quiz-fb"></div>
        <div class="quiz-next" id="quiz-next"></div>
      </div>
    `;
    root.appendChild(board);

    const opts = $('#quiz-opts');
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.dataset.opt = opt;
      b.innerHTML = `<span class="key">${i+1}</span><span>${escapeHTML(opt)}</span>`;
      b.addEventListener('click', () => selectOption(opt));
      opts.appendChild(b);
    });
  }

  function selectOption(opt){
    if(state.answered) return;
    state.answered = true;
    const q = state.questions[state.idx];
    const isOk = (opt === q.correct);
    if(isOk) state.score++;

    $$('#quiz-opts .quiz-opt').forEach(b => {
      const v = b.dataset.opt;
      b.disabled = true;
      if(v === q.correct){
        b.classList.add('correct');
      } else if(v === opt){
        b.classList.add('wrong');
      } else {
        b.classList.add('dim');
      }
    });

    const fb = $('#quiz-fb');
    if(isOk){
      fb.className = 'quiz-feedback ok';
      fb.innerHTML = '✓ 正确';
    } else {
      fb.className = 'quiz-feedback bad';
      fb.innerHTML = '✗ 正确答案是：<span class="ans">' + escapeHTML(q.correct) + '</span>';
    }
    if(q.explain){
      fb.innerHTML += '<div style="margin-top:8px;font-size:13px;color:var(--ink-3)">' + escapeHTML(q.explain) + '</div>';
    }

    // Update score in meta
    $('.quiz-meta .score').textContent = '得分 ' + state.score;

    // Show next button
    const nx = $('#quiz-next');
    const isLast = (state.idx + 1 >= state.questions.length);
    nx.innerHTML = '<button id="quiz-next-btn">' + (isLast ? '查看结果' : '下一题') + '</button>';
    $('#quiz-next-btn').addEventListener('click', nextQuestion);
  }

  function nextQuestion(){
    if(state.idx + 1 >= state.questions.length){
      renderResult();
    } else {
      state.idx++;
      renderQuestion();
    }
  }

  function renderResult(){
    const root = $('#quiz-root');
    const total = state.questions.length;
    const pct = Math.round((state.score / total) * 100);

    let verdict = '继续保持！';
    let kanji = '良';
    if(pct >= 90){ verdict = '太厉害了 —— 这一关你已经掌握。'; kanji = '優'; }
    else if(pct >= 75){ verdict = '掌握得不错 —— 继续把错题刷一遍。'; kanji = '良'; }
    else if(pct >= 60){ verdict = '基本及格 —— 错题要重点回顾。'; kanji = '可'; }
    else { verdict = '需要再来一轮 —— 不慌，把今天错的明天再做一次。'; kanji = '進'; }

    root.innerHTML = `
      <div class="quiz-meta">
        <span class="progress-num">完成 · ${total} / ${total}</span>
        <span class="score">得分 ${state.score} / ${total}</span>
      </div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:100%"></div></div>
      <div class="quiz-result">
        <h3>${kanji}</h3>
        <div class="score-big">${pct}<small>%</small></div>
        <div class="verdict">${verdict}</div>
        <div class="actions">
          <button id="retry-btn">再来一次</button>
          <button class="outline" id="setup-btn">重新设置</button>
        </div>
      </div>
    `;
    $('#retry-btn').addEventListener('click', startQuiz);
    $('#setup-btn').addEventListener('click', renderSetup);
  }

  // ===== Keyboard support =====
  document.addEventListener('keydown', (e) => {
    if(['1','2','3','4'].includes(e.key)){
      const btns = $$('#quiz-opts .quiz-opt');
      const i = parseInt(e.key, 10) - 1;
      if(btns[i] && !btns[i].disabled){ btns[i].click(); }
    }
    if(e.key === 'Enter'){
      const b = $('#quiz-next-btn');
      if(b) b.click();
    }
  });

  // ===== Util =====
  function escapeHTML(str){
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // ===== Boot =====
  document.addEventListener('DOMContentLoaded', renderSetup);
})();
