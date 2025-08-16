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
        sidebarLinks[sections.length - 1].classList.add("active");
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
});
