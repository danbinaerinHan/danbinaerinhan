// ──────────────────────────────────────────────────────────────
// 🌐 전역 변수들
// • 현재 선택된 언어 상태 관리
// • 스크롤 및 인터랙션 상태 플래그들
// ──────────────────────────────────────────────────────────────

// 현재 선택된 언어 (기본값: 영어)
let currentLang = 'en';

// ──────────────────────────────────────────────────────────────
// 🎯 언어 업데이트 함수
// • data.js의 다국어 데이터를 사용하여 텍스트 동적 변경
// • 모든 data-key 속성을 가진 요소에 적용
// ──────────────────────────────────────────────────────────────
function updateLanguage(lang) {
  // console.log('=== updateLanguage called with:', lang);
  currentLang = lang;
  document.body.className = lang === 'ko' ? 'lang-ko' : 'lang-en';

  // ──────────────────────────────────────────────────────────────
  // 🔄 다국어 텍스트 업데이트 로직
  // • 모든 data-key 속성을 가진 요소를 찾아서 텍스트 교체
  // • languages 객체에서 해당 언어의 번역 데이터 가져오기
  // ──────────────────────────────────────────────────────────────

  // data-key 속성을 가진 모든 요소 선택
  const elements = document.querySelectorAll('[data-key]');
  // console.log('Found elements with data-key:', elements.length);

  // 각 요소에 대해 번역 적용
  elements.forEach((element, index) => {
    const key = element.getAttribute('data-key');
    // console.log(`Element ${index}: key="${key}"`);

    // 해당 언어의 번역 데이터가 존재하는지 확인 후 적용
    if (languages[lang] && languages[lang][key]) {
      const oldText = element.textContent;
      const newText = languages[lang][key];
      element.textContent = newText;
      // console.log(`Updated: "${oldText}" -> "${newText}"`);
    } else {
      // 번역 데이터가 없는 경우 경고 (디버깅용)
      // console.log(`No translation found for key: ${key} in language: ${lang}`);
    }
  });

  // ──────────────────────────────────────────────────────────────
  // 🌐 HTML 문서 언어 속성 업데이트
  // • 접근성 및 SEO를 위한 lang 속성 설정
  // • 스크린 리더가 올바른 언어로 콘텐츠 읽도록 지원
  // ──────────────────────────────────────────────────────────────
  document.documentElement.lang = lang;
  // console.log('=== Language update completed');
}

// ──────────────────────────────────────────────────────────────
// 🚀 DOM 로드 완료 이벤트 리스너
// • 페이지 로드 시 모든 인터랙션 기능 초기화
// • 언어 토글, 메뉴 네비게이션, 프로젝트 토글 등 설정
// ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  // console.log('=== DOM Content Loaded ===');

  // ──────────────────────────────────────────────────────────────
  // 🌐 언어 전환 버튼 초기화
  // • 우상단 언어 토글 버튼 이벤트 설정
  // • 영어 ↔ 한국어 전환 기능 구현
  // ──────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  // 📋 사이드바 메뉴 네비게이션 초기화
  // • 메뉴 아이템 호버 효과 및 클릭 시 스크롤 기능
  // • 키보드 접근성 지원 (Enter, Space 키)
  // • 중복 스크롤 방지 메커니즘
  // ──────────────────────────────────────────────────────────────
  const menuItems = document.querySelectorAll('.menu-item');
  let isScrolling = false; // 중복 스크롤 액션 방지 플래그
  let scrollTimeout; // 스크롤 타임아웃 참조 저장

  // console.log('🎯 Found menu items:', menuItems.length);
  // console.log('📋 Menu items:', Array.from(menuItems).map(item => ({
  //   text: item.textContent.trim(),
  //   section: item.getAttribute('data-section')
  // })));

  // ──────────────────────────────────────────────────────────────
  // 🖱️ 메뉴 클릭 이벤트 핸들러
  // • 메뉴 클릭 시 해당 섹션으로 스무스 스크롤
  // • 활성 메뉴 상태 업데이트 및 시각적 피드백
  // • 중복 클릭 방지 및 안전한 이벤트 처리
  // ──────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  // 📍 스크롤 기반 메뉴 활성화 상태 업데이트
  // • 사용자가 스크롤할 때 현재 보이는 섹션에 맞춰 메뉴 활성화
  // • 화면 중앙을 기준으로 가장 가까운 섹션 감지
  // • 실시간으로 메뉴 상태 동기화
  // ──────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  // ⚡ 스크롤 이벤트 최적화 (스로틀링)
  // • 과도한 스크롤 이벤트 호출 방지를 위한 디바운싱
  // • 50ms 간격으로 메뉴 업데이트 (약 20fps)
  // • 성능 향상을 위한 이벤트 최적화
  // ──────────────────────────────────────────────────────────────
  let scrollThrottle;
  window.addEventListener('scroll', function() {
    if (!scrollThrottle) {
      scrollThrottle = setTimeout(function() {
        updateActiveMenuOnScroll();
        scrollThrottle = null;
      }, 50); // Throttle to 20fps
    }
  });

  // ──────────────────────────────────────────────────────────────
  // 🎨 프로젝트 상세 내용 토글 기능
  // • "더보기"/"접기" 버튼으로 프로젝트 상세 정보 표시/숨김
  // • 부드러운 애니메이션 효과와 함께 컨텐츠 높이 조정
  // • 스크롤 위치 자동 조정으로 사용자 경험 향상
  // ──────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  // 📅 뉴스 연도별 필터링 기능
  // • 2024년, 2025년 뉴스 선택 버튼
  // • 클릭 시 해당 연도의 뉴스만 표시하고 나머지는 숨김
  // • 활성 버튼 상태 시각적 표시
  // ──────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  // 🎯 초기 설정 및 메뉴 활성화
  // • 페이지 로드 시 현재 스크롤 위치에 맞는 메뉴 활성화
  // • 모든 이벤트 리스너와 기능이 정상 작동하는지 확인
  // ──────────────────────────────────────────────────────────────
  updateActiveMenuOnScroll();
});
