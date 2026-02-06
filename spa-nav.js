// ═══════════════════════════════════════════════════
// SPA Navigation — 페이지 전환 시 배경 유지
// 모든 페이지를 미리 캐시하여 즉시 전환
// ═══════════════════════════════════════════════════
(function () {
  var NAV_PAGES = ['index.html', 'education.html', 'research.html', 'others.html', 'gallery.html'];
  var NAV_SET = {};
  NAV_PAGES.forEach(function (p) { NAV_SET[p] = true; });

  // Pre-parsed page cache: { pageName: { content: innerHTML, title: string } }
  var cache = {};

  function getPageName(url) {
    var path = url.split('/').pop().split('?')[0].split('#')[0];
    return path || 'index.html';
  }

  // Pre-fetch and cache all pages on load
  function preloadAll() {
    NAV_PAGES.forEach(function (pageName) {
      fetch(pageName)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var content = doc.querySelector('.page-content');
          var title = doc.querySelector('title');
          if (content) {
            cache[pageName] = {
              content: content.innerHTML,
              title: title ? title.textContent : ''
            };
          }
        })
        .catch(function () {});
    });
  }

  // Re-initialize page-specific scripts after content swap
  function initPageScripts(pageName) {
    // Image drag prevention (ui-block)
    document.querySelectorAll('.page-content img').forEach(function (img) {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', function (e) { e.preventDefault(); });
    });

    // Year toggle buttons (index.html)
    var yearButtons = document.querySelectorAll('.year-btn');
    var newsLists = Array.from(document.querySelectorAll('[id^="news-"]'));
    if (yearButtons.length && newsLists.length) {
      var setActiveYear = function (year) {
        yearButtons.forEach(function (b) { b.classList.remove('active'); });
        newsLists.forEach(function (list) { list.classList.add('hidden'); });
        var activeBtn = Array.from(yearButtons).find(function (b) {
          return b.dataset.year === year;
        });
        var activeList = document.getElementById('news-' + year);
        if (activeBtn) activeBtn.classList.add('active');
        if (activeList) activeList.classList.remove('hidden');
      };
      yearButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          setActiveYear(btn.dataset.year);
        });
      });
      var defaultBtn = Array.from(yearButtons).find(function (b) {
        return b.classList.contains('active');
      });
      if (defaultBtn) setActiveYear(defaultBtn.dataset.year);
    }


    // Gallery rendering (gallery.html)
    if (pageName === 'gallery.html') {
      var grid = document.getElementById('gallery-grid');
      if (grid && grid.children.length === 0) {
        var renderGallery = function (items) {
          if (!grid || !Array.isArray(items)) return;
          items.forEach(function (item) {
            var card = document.createElement('a');
            card.className = 'gallery-card';
            card.href = item.page;
            var img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = item.title;
            img.setAttribute('draggable', 'false');
            var title = document.createElement('div');
            title.className = 'gallery-card-title';
            title.textContent = item.title;
            card.appendChild(img);
            card.appendChild(title);
            grid.appendChild(card);
          });
        };
        fetch('gallery_thumbnail.json')
          .then(function (r) { return r.json(); })
          .then(function (data) { renderGallery(data.items); })
          .catch(function () {
            if (Array.isArray(window.galleryItems)) {
              renderGallery(window.galleryItems);
            }
          });
      }
    }
  }

  function swapContent(pageName, pushState) {
    var cached = cache[pageName];
    if (!cached) {
      // Not cached yet — full reload fallback
      window.location.href = pageName;
      return;
    }

    // Swap content instantly from cache
    var currentContent = document.querySelector('.page-content');
    currentContent.innerHTML = cached.content;

    // Update title
    if (cached.title) document.title = cached.title;

    // Update active tab
    document.querySelectorAll('.notebook-tab').forEach(function (tab) {
      var tabHref = tab.getAttribute('href');
      if (tabHref === pageName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
    var notebookPage = document.querySelector('.notebook-page');
    if (notebookPage) notebookPage.scrollTop = 0;

    // Push state
    if (pushState) {
      history.pushState({ page: pageName }, '', pageName);
    }

    // Re-initialize page scripts
    initPageScripts(pageName);
  }

  // Intercept tab clicks
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.notebook-tab');
    if (!tab) return;

    var href = tab.getAttribute('href');
    if (!href || !NAV_SET[getPageName(href)]) return;

    e.preventDefault();
    swapContent(getPageName(href), true);
  });

  // Handle back/forward
  window.addEventListener('popstate', function () {
    var pageName = getPageName(window.location.href);
    if (NAV_SET[pageName]) {
      swapContent(pageName, false);
    }
  });

  // Set initial state + preload all pages
  history.replaceState({ page: getPageName(window.location.href) }, '');
  preloadAll();
})();
