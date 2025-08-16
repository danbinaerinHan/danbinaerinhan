document.addEventListener('DOMContentLoaded', function() {
  const enBtn = document.getElementById('switch-en');
  const koBtn = document.getElementById('switch-ko');

  if (enBtn) {
    enBtn.addEventListener('click', function() {
      document.body.classList.remove('lang-ko');
      document.body.classList.add('lang-en');
    });
  }

  if (koBtn) {
    koBtn.addEventListener('click', function() {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ko');
    });
  }

  const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
  const sections = Array.from(sidebarLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sidebarLinks.length && sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector('.sidebar a[href="#' + id + '"]');
          if (entry.isIntersecting && activeLink) {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(section => observer.observe(section));
  }
});
