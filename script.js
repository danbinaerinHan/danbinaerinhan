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
      const activateSidebar = () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, idx) => {
          if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            sidebarLinks[idx].classList.add('active');
          }
        });
      };
      window.addEventListener('scroll', activateSidebar);
      activateSidebar();
    }
});
