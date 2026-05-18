// 共享交互
(function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    // 返回顶部
    const totop = document.querySelector('.totop');
    if (totop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) totop.classList.add('show');
            else totop.classList.remove('show');
        });
        totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                const tgt = document.querySelector(href);
                if (tgt) {
                    e.preventDefault();
                    tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 词汇页：分类筛选
    const filters = document.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('[data-cat]');
    if (filters.length && items.length) {
        filters.forEach(f => f.addEventListener('click', () => {
            const cat = f.dataset.filter;
            filters.forEach(x => x.classList.remove('active'));
            f.classList.add('active');
            items.forEach(it => {
                if (cat === 'all' || it.dataset.cat === cat) it.style.display = '';
                else it.style.display = 'none';
            });
        }));
    }

    // 阅读页：题型折叠
    document.querySelectorAll('[data-acc]').forEach(h => {
        h.addEventListener('click', () => {
            const body = h.nextElementSibling;
            h.classList.toggle('open');
            if (body) body.classList.toggle('open');
        });
    });
})();
