// 法考客观题速通 · 交互脚本
document.addEventListener('DOMContentLoaded', () => {
  // 题目选项点击：标记正确答案
  document.querySelectorAll('.question').forEach(q => {
    const opts = q.querySelectorAll('.options li');
    const ans = q.getAttribute('data-answer'); // e.g. "A" or "ABC"
    opts.forEach(o => {
      o.addEventListener('click', () => {
        const letter = o.getAttribute('data-letter');
        if (ans && ans.includes(letter)) {
          o.classList.add('correct');
        } else {
          o.style.background = '#fbe8e8';
          o.style.borderColor = '#c44848';
          o.style.color = '#8b2c2c';
        }
      });
    });
  });

  // 自动生成目录锚点ID
  document.querySelectorAll('.article h2, .article h3').forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + i;
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 进度跟踪（localStorage）
  const path = location.pathname.split('/').pop();
  if (path && path.endsWith('.html') && path !== 'index.html') {
    const visited = JSON.parse(localStorage.getItem('fakao-visited') || '[]');
    if (!visited.includes(path)) {
      visited.push(path);
      localStorage.setItem('fakao-visited', JSON.stringify(visited));
    }
  }
});
