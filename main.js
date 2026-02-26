(function () {
  const navLinks = Array.from(document.querySelectorAll('.day-link'));
  const sections = Array.from(document.querySelectorAll('.day-section'));

  if (!navLinks.length || !sections.length) return;

  function setActiveById(id) {
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.dataset.target === id);
    });
  }

  // 點按：平滑捲動 + 高亮
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.dataset.target;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      history.replaceState(null, '', `#${id}`);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveById(id);
    });
  });

  // 捲動：觀察目前在哪個 day，自動高亮
  const io = new IntersectionObserver((entries) => {
    // 找出最「可見」的 section
    const visible = entries
      .filter(en => en.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActiveById(visible.target.id);
  }, { threshold: [0.25, 0.4, 0.6] });

  sections.forEach(sec => io.observe(sec));

  // 進頁若有 hash，初始化高亮
  const hash = (location.hash || '').replace('#', '');
  if (hash) setActiveById(hash);
})();
