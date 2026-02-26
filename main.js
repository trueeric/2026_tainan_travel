(function () {
  const navLinks = Array.from(document.querySelectorAll('.day-link'));
  if (!navLinks.length) return;

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.dataset.target; // 例如 day-1
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      history.replaceState(null, '', `#${id}`); // 需要保留 hash 就留著
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
