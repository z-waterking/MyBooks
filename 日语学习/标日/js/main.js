// 标日学习页共享音频引擎
(function () {
  const audioEl = window._stdAudio = new Audio();
  audioEl.preload = 'auto';
  let currentEl = null;
  let rate = 0.9;

  // 注：音频路径由 data-audio 属性提供（相对路径）
  window.playJp = function (text, el, audioPath) {
    if (currentEl) currentEl.classList.remove('playing');
    if (el) {
      el.classList.add('playing');
      currentEl = el;
    }
    audioEl.src = audioPath;
    audioEl.playbackRate = rate;
    audioEl.onended = () => {
      if (currentEl) { currentEl.classList.remove('playing'); currentEl = null; }
    };
    audioEl.onerror = () => {
      if (currentEl) { currentEl.classList.remove('playing'); currentEl = null; }
      // 回退到 Web Speech API
      if (window.speechSynthesis && text) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        u.rate = rate;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    };
    audioEl.play().catch(() => {
      // 自动播放被阻止
    });
  };

  window.stopJp = function () {
    audioEl.pause();
    audioEl.currentTime = 0;
    if (currentEl) { currentEl.classList.remove('playing'); currentEl = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  window.setJpRate = function (r) {
    rate = r;
    audioEl.playbackRate = r;
  };

  // 自动绑定 [data-play] 元素
  document.addEventListener('click', function (e) {
    const tgt = e.target.closest('[data-play]');
    if (!tgt) return;
    e.preventDefault();
    const text = tgt.dataset.text || tgt.textContent;
    const path = tgt.dataset.audio;
    if (!path) return;
    // 优先找包含的"行"容器作为高亮元素
    const container = tgt.closest('.pa-line, .word, .eg') || tgt;
    window.playJp(text, container, path);
  });

  // 控制条
  const ctl = document.querySelector('.audio-control');
  if (ctl) {
    const rateInput = ctl.querySelector('input[type=range]');
    const rateVal = ctl.querySelector('.rate-val');
    const stopBtn = ctl.querySelector('.btn-stop');
    if (rateInput) {
      rateInput.addEventListener('input', () => {
        const v = parseFloat(rateInput.value);
        window.setJpRate(v);
        if (rateVal) rateVal.textContent = v.toFixed(2) + 'x';
      });
    }
    if (stopBtn) stopBtn.addEventListener('click', window.stopJp);
  }

  // ESC 停止
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.stopJp();
  });
})();
