// Language data is now imported from data.js

// Current language
let currentLang = 'en';

// Function to update text content
function updateLanguage(lang) {
  // console.log('=== updateLanguage called with:', lang);
  currentLang = lang;
  document.body.className = lang === 'ko' ? 'lang-ko' : 'lang-en';

  // Update all elements with data-key attributes
  const elements = document.querySelectorAll('[data-key]');
  // console.log('Found elements with data-key:', elements.length);

  elements.forEach((element, index) => {
    const key = element.getAttribute('data-key');
    // console.log(`Element ${index}: key="${key}"`);

    if (languages[lang] && languages[lang][key]) {
      const oldText = element.textContent;
      const newText = languages[lang][key];
      element.textContent = newText;
      // console.log(`Updated: "${oldText}" -> "${newText}"`);
    } else {
      // console.log(`No translation found for key: ${key} in language: ${lang}`);
    }
  });

  // Update lang attribute
  document.documentElement.lang = lang;
  // console.log('=== Language update completed');
}

document.addEventListener("DOMContentLoaded", function () {
  // console.log('=== DOM Content Loaded ===');

  const toggleBtn = document.getElementById("lang-toggle");
  // console.log('Toggle button element:', toggleBtn);

  if (toggleBtn) {
    // console.log('Adding click event listener to toggle button');

    toggleBtn.addEventListener("click", function (event) {
      // console.log('=== BUTTON CLICKED ===');

      event.preventDefault(); // a 태그의 기본 동작 방지
      const newLang = currentLang === 'en' ? 'ko' : 'en';
      // console.log('New language will be:', newLang);
      updateLanguage(newLang);
      return false; // 추가 보험
    });

    // 초기 언어 설정 (첫 로드 시 영어로 설정)
    // console.log('Setting initial language to English');
    updateLanguage('en');
  } else {
    // console.error('=== TOGGLE BUTTON NOT FOUND ===');
  }

  // Menu item hover effect and click navigation
  const menuItems = document.querySelectorAll('.menu-item');
  let isScrolling = false; // Prevent multiple scroll actions
  let scrollTimeout; // Store timeout reference

  // console.log('🎯 Found menu items:', menuItems.length);
  // console.log('📋 Menu items:', Array.from(menuItems).map(item => ({
  //   text: item.textContent.trim(),
  //   section: item.getAttribute('data-section')
  // })));

  const handleMenuClick = function(e) {
    // Prevent all default behaviors
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Prevent multiple clicks while scrolling
    if (isScrolling) {
      console.log('⏳ Already scrolling, ignoring click');
      return false;
    }

    const sectionId = this.getAttribute('data-section');
    console.log('🎯 Menu clicked:', sectionId, 'Element:', this);

    if (sectionId) {
      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        console.log('✅ Target section found, scrolling to:', sectionId);

        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        isScrolling = true; // Set flag to prevent multiple actions

        // Remove active and hover classes from all menu items
        menuItems.forEach(menuItem => {
          menuItem.classList.remove('active');
          menuItem.classList.remove('hover');
        });

        // Add active class to clicked menu item
        this.classList.add('active');
        console.log('✅ Active class added to menu item');

        // Smooth scroll to target section with offset for sidebar
        const scrollToSection = () => {
          const rect = targetSection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetTop = scrollTop + rect.top - 80; // 80px offset for sidebar

          console.log('📐 Scroll calculations:', { rectTop: rect.top, scrollTop, targetTop });

          // Use scrollTo with smooth behavior for better control
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });

          // Reset scrolling flag after animation completes (longer timeout for safety)
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Remove any lingering hover states after scrolling
            menuItems.forEach(item => {
              item.classList.remove('hover');
            });
            console.log('🔄 Scrolling flag reset');
          }, 800); // Increased timeout for better safety
        };

        scrollToSection();
        console.log('🚀 Scrolling initiated to:', sectionId);
      } else {
        console.error('❌ Section not found:', sectionId);
      }
    } else {
      console.error('❌ No data-section attribute on clicked item');
    }

    return false; // Extra prevention
  };

  menuItems.forEach((item, index) => {
    // console.log(`Menu item ${index}:`, item.textContent.trim(), 'data-section:', item.getAttribute('data-section'));

    // Ensure proper cursor and accessibility
    item.style.cursor = 'pointer';
    item.setAttribute('aria-pressed', 'false');

    // Hover effects - use CSS classes instead of inline styles
    item.addEventListener('mouseenter', () => {
      if (!isScrolling && !item.classList.contains('active')) {
        item.classList.add('hover');
      }
    });
    item.addEventListener('mouseleave', () => {
      if (!isScrolling) {
        item.classList.remove('hover');
      }
    });

    // Click event for smooth scrolling
    item.addEventListener('click', handleMenuClick);

    // Keyboard navigation support
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMenuClick.call(this, e);
      }
    });
  });

  // Auto-update active menu item based on scroll position
  function updateActiveMenuOnScroll() {
    // Skip menu updates while scrolling from menu click
    if (isScrolling) {
      return;
    }

    const sections = ['cover', 'news', 'education', 'research', 'talks', 'prize', 'projects'];
    const scrollPosition = window.scrollY + window.innerHeight * 0.5; // 화면 중앙에서 감지

    // Remove active and hover classes from all menu items
    menuItems.forEach(item => {
      item.classList.remove('active');
      item.classList.remove('hover');
    });

    let activatedSection = null;

    // Find the current section in view (화면 중앙이 속한 섹션 찾기)
    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // 스크롤 위치가 섹션 범위 내에 있는지 확인
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activatedSection = sections[i];

          // Find the corresponding menu item and activate it
          const activeMenuItem = document.querySelector(`.menu-item[data-section="${sections[i]}"]`);
          if (activeMenuItem) {
            activeMenuItem.classList.add('active');
          }
          break;
        }
      }
    }

    // 만약 어떤 섹션에도 속하지 않는다면, 가장 가까운 섹션을 찾음
    if (!activatedSection) {
      let closestSection = null;
      let minDistance = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionCenter = sectionTop + section.offsetHeight / 2;
          const distance = Math.abs(scrollPosition - sectionCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = sections[i];
          }
        }
      }

      if (closestSection) {
        const activeMenuItem = document.querySelector(`.menu-item[data-section="${closestSection}"]`);
        if (activeMenuItem) {
          activeMenuItem.classList.add('active');
        }
      }
    }
  }

  // Throttle scroll events for better performance
  let scrollThrottle;
  window.addEventListener('scroll', function() {
    if (!scrollThrottle) {
      scrollThrottle = setTimeout(function() {
        updateActiveMenuOnScroll();
        scrollThrottle = null;
      }, 50); // Throttle to 20fps
    }
  });

  // Project toggle functionality
  // More button toggle functionality
  const moreBtn = document.getElementById('more-btn');
  const projectExpanded = document.getElementById('project-expanded');

  if (moreBtn && projectExpanded) {
    moreBtn.addEventListener('click', () => {
      const isExpanded = projectExpanded.classList.contains('expanded');
      const expandedContent = projectExpanded.querySelector('.expanded-content');

      if (isExpanded) {
        // Collapse
        projectExpanded.classList.remove('expanded');
        projectExpanded.style.maxHeight = '0';
        moreBtn.textContent = languages[currentLang]['projects.more'] || 'More';
        moreBtn.classList.remove('active');
      } else {
        // Calculate actual content height
        if (expandedContent) {
          const contentHeight = expandedContent.scrollHeight;
          // console.log('Content height:', contentHeight);

          // Temporarily set height to auto to get actual height
          projectExpanded.style.maxHeight = 'none';
          const actualHeight = projectExpanded.scrollHeight;
          projectExpanded.style.maxHeight = '0';

          // Set the calculated height
          projectExpanded.style.maxHeight = actualHeight + 30 + 'px'; // Add some padding
        }

        // Expand
        projectExpanded.classList.add('expanded');
        moreBtn.textContent = languages[currentLang]['projects.less'] || 'Less';
        moreBtn.classList.add('active');

        // Scroll to projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          setTimeout(() => {
            projectsSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    });
  }

  // Year button functionality
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

  // Initial call to set active menu item on page load
  updateActiveMenuOnScroll();
});