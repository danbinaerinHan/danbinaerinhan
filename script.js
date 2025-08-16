document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("lang-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (document.body.classList.contains("lang-ko")) {
        document.body.classList.remove("lang-ko");
        document.body.classList.add("lang-en");
      } else {
        document.body.classList.remove("lang-en");
        document.body.classList.add("lang-ko");
      }
    });
  }

    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    const sections = Array.from(sidebarLinks)
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

  if (sidebarLinks.length && sections.length) {
    const activateSidebar = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let found = false;
      sections.forEach((section, idx) => {
        if (
          !found &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          sidebarLinks.forEach((link) => link.classList.remove("active"));
          sidebarLinks[idx].classList.add("active");
          found = true;
        }
      });
      if (!found) {
        sidebarLinks.forEach((link) => link.classList.remove("active"));
      }
    };
    window.addEventListener("scroll", activateSidebar);
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
      activateSidebar();
    }

    const yearButtons = document.querySelectorAll('.year-btn');
    const news2024 = document.getElementById('news-2024');
    const news2025 = document.getElementById('news-2025');

    if (yearButtons.length && news2024 && news2025) {
      yearButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          yearButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          if (btn.dataset.year === '2024') {
            news2024.classList.remove('hidden');
            news2025.classList.add('hidden');
          } else {
            news2025.classList.remove('hidden');
            news2024.classList.add('hidden');
          }
        });
      });
    }
  });
