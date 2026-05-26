(function(){
  const level = (location.pathname.match(/\/(n[1-5])\//) || [,'n5'])[1];
  const data = JLPT_CONTENT[level];
  if(!data) return;
  const coreVocab = (window.JLPT_VOCAB_CORE && window.JLPT_VOCAB_CORE[level]) || [];
  const seenVocab = new Set(data.vocab.map(([jp,kana,cn]) => `${jp}|${kana}|${cn}`));
  coreVocab.forEach(item => {
    const key = `${item[0]}|${item[1]}|${item[2]}`;
    if(!seenVocab.has(key)) {
      seenVocab.add(key);
      data.vocab.push(item);
    }
  });
  const $ = s => document.querySelector(s);
  const renderVocab = () => {
    $('#content-vocab').innerHTML = data.vocab.map(([jp,kana,cn,eg]) => `<div class="word"><div class="top"><span class="jp">${jp}</span><span class="cn">${cn}</span></div><span class="kana">${kana || 'カタカナ'}</span><div class="cn">${eg}</div></div>`).join('');
  };
  const renderGrammar = () => {
    $('#content-grammar').innerHTML = data.grammar.map(([pattern,meaning,eg],i) => `<div class="grammar"><div class="g-head"><span class="g-num">${String(i+1).padStart(2,'0')}</span><span class="g-pattern">${pattern}</span><span class="g-meaning">${meaning}</span></div><div class="g-example"><span class="jp">${eg}</span></div></div>`).join('');
  };
  const renderTexts = () => {
    $('#content-texts').innerHTML = data.texts.map(t => `<article class="lesson"><h4>${t.title}</h4><div class="eg"><span class="jp">${t.body}</span></div><div class="tip">任务：${t.tasks.join(' / ')}</div></article>`).join('');
  };
  let score = 0;
  const renderQuiz = () => {
    $('#content-quiz').innerHTML = data.quiz.map((q,i) => `<div class="quiz-mini" data-answer="${q.a}"><p><strong>${i+1}. ${q.q}</strong></p><div class="qc-options">${q.options.map(o=>`<button type="button">${o}</button>`).join('')}</div><p class="feedback"></p></div>`).join('') + `<div class="quiz-feedback" id="content-score">得分 ${score} / ${data.quiz.length}</div>`;
  };
  document.addEventListener('click', e => {
    const btn = e.target.closest('.quiz-mini button');
    if(!btn) return;
    const box = btn.closest('.quiz-mini');
    if(box.classList.contains('done')) return;
    box.classList.add('done');
    const ok = btn.textContent === box.dataset.answer;
    if(ok) score += 1;
    btn.classList.add(ok ? 'correct' : 'wrong');
    box.querySelector('.feedback').textContent = ok ? '正确' : `正确答案：${box.dataset.answer}`;
    $('#content-score').textContent = `得分 ${score} / ${data.quiz.length}`;
  });
  $('#content-title').textContent = data.title;
  $('#content-subtitle').textContent = data.subtitle;
  $('#stat-vocab').textContent = data.vocab.length;
  $('#stat-grammar').textContent = data.grammar.length;
  $('#stat-texts').textContent = data.texts.length;
  $('#stat-quiz').textContent = data.quiz.length;
  renderVocab(); renderGrammar(); renderTexts(); renderQuiz();
})();