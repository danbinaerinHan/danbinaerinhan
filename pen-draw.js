// 만년필 드로잉 + 텍스트 하이라이트 기능
(function() {
  // 캔버스 (펜 드로잉 + 하이라이트용)
  const canvas = document.createElement('canvas');
  canvas.id = 'pen-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(canvas);

  // 하이라이트용 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    ::selection {
      background: rgba(255, 230, 120, 0.6) !important;
    }
    ::-moz-selection {
      background: rgba(255, 230, 120, 0.6) !important;
    }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let isHighlighting = false;
  let lastX = 0;
  let lastY = 0;
  let currentStroke = [];
  let strokes = [];
  let highlightRects = []; // { rects, opacity }
  let fadeTimeout = null;
  let highlightFadeTimeout = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redrawAll();
  }

  function redrawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 하이라이트 그리기
    highlightRects.forEach(highlight => {
      drawHighlightRects(highlight.rects, highlight.opacity);
    });

    // 펜 스트로크 그리기
    strokes.forEach(stroke => {
      drawStroke(stroke.points, stroke.opacity);
    });
  }

  function drawHighlightRects(rects, opacity = 1) {
    ctx.fillStyle = `rgba(255, 230, 120, ${0.5 * opacity})`;
    rects.forEach(rect => {
      // 하단 40% 영역에만 하이라이트
      const highlightHeight = rect.height * 0.4;
      const highlightY = rect.y + rect.height - highlightHeight;
      ctx.fillRect(rect.x, highlightY, rect.width, highlightHeight);
    });
  }

  function drawStroke(points, opacity = 1) {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = `rgba(58, 82, 118, ${0.6 * opacity})`;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  function isTextElement(element) {
    if (!element) return false;

    // 텍스트가 있는 태그인지 확인
    const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'STRONG', 'EM', 'B', 'I', 'LABEL'];

    // 해당 요소나 부모가 텍스트 태그인지
    if (textTags.includes(element.tagName)) return true;
    if (element.closest('p, span, h1, h2, h3, h4, h5, h6, li')) return true;

    return false;
  }

  function isInteractiveElement(element) {
    if (!element) return false;
    return element.closest('a, button, .more-btn, .gallery-cta, .gallery-card, .gallery-cta-btn, input, select, textarea, .sidebar, .mobile-nav');
  }

  // Research 섹션 내부인지 확인
  function isInResearchSection(element) {
    if (!element) return false;
    return element.closest('#research') !== null;
  }

  function startDrawing(e) {
    const element = document.elementFromPoint(e.clientX, e.clientY);

    // 인터랙티브 요소 위에서는 아무것도 하지 않음
    if (isInteractiveElement(element)) {
      isDrawing = false;
      isHighlighting = false;
      return;
    }

    // 텍스트 요소 위에서는 하이라이트 모드 (Research 섹션 제외)
    if (isTextElement(element)) {
      if (isInResearchSection(element)) {
        // Research 섹션에서는 하이라이트 비활성화, 기본 선택만 허용
        isHighlighting = false;
        isDrawing = false;
        return;
      }
      isHighlighting = true;
      isDrawing = false;
      if (highlightFadeTimeout) {
        clearTimeout(highlightFadeTimeout);
        highlightFadeTimeout = null;
      }
      return; // 브라우저 기본 텍스트 선택 허용
    }

    // 그 외 빈 공간에서 펜 드로잉
    isHighlighting = false;
    isDrawing = true;
    lastX = e.clientX;
    lastY = e.clientY;
    currentStroke = [{ x: lastX, y: lastY }];

    if (fadeTimeout) {
      clearTimeout(fadeTimeout);
      fadeTimeout = null;
    }
  }

  function draw(e) {
    if (isHighlighting) return;
    if (!isDrawing) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'rgba(58, 82, 118, 0.6)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    currentStroke.push({ x: currentX, y: currentY });

    lastX = currentX;
    lastY = currentY;
  }

  function stopDrawing() {
    if (isHighlighting) {
      // 텍스트 선택 완료 - 하이라이트 적용
      applyHighlight();
      isHighlighting = false;
      return;
    }

    if (!isDrawing) return;
    isDrawing = false;

    if (currentStroke.length > 1) {
      strokes.push({ points: currentStroke, opacity: 1 });
    }
    currentStroke = [];

    fadeTimeout = setTimeout(startFadeOut, 2000);
  }

  function applyHighlight() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.toString().trim() === '') return;

    // 선택 영역의 bounding rects 가져오기
    const range = selection.getRangeAt(0);
    const clientRects = range.getClientRects();

    if (clientRects.length === 0) return;

    const rects = [];
    for (let i = 0; i < clientRects.length; i++) {
      const rect = clientRects[i];
      rects.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      });
    }

    highlightRects.push({ rects, opacity: 1 });
    selection.removeAllRanges();
    redrawAll();

    // 2초 후 fade out
    highlightFadeTimeout = setTimeout(startHighlightFadeOut, 2000);
  }

  function startHighlightFadeOut() {
    if (highlightRects.length === 0) return;

    const fadeInterval = setInterval(() => {
      let allFaded = true;

      highlightRects.forEach(highlight => {
        if (highlight.opacity > 0) {
          highlight.opacity -= 0.05;
          if (highlight.opacity > 0) allFaded = false;
        }
      });

      redrawAll();

      if (allFaded) {
        clearInterval(fadeInterval);
        highlightRects = [];
      }
    }, 30);
  }

  function startFadeOut() {
    if (strokes.length === 0) return;

    let opacity = 1;
    const fadeInterval = setInterval(() => {
      opacity -= 0.05;

      if (opacity <= 0) {
        clearInterval(fadeInterval);
        strokes = [];
        redrawAll();
      } else {
        strokes.forEach(stroke => {
          stroke.opacity = opacity;
        });
        redrawAll();
      }
    }, 30);
  }

  function clearCanvas() {
    if (fadeTimeout) {
      clearTimeout(fadeTimeout);
      fadeTimeout = null;
    }
    if (highlightFadeTimeout) {
      clearTimeout(highlightFadeTimeout);
      highlightFadeTimeout = null;
    }
    strokes = [];
    currentStroke = [];
    highlightRects = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // 스크롤 시 하이라이트 위치 업데이트 (고정 위치이므로 클리어)
  function handleScroll() {
    if (highlightRects.length > 0) {
      highlightRects = [];
      redrawAll();
    }
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('mousedown', startDrawing);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', stopDrawing);
  document.addEventListener('mouseleave', stopDrawing);
  document.addEventListener('dblclick', clearCanvas);

  resizeCanvas();
})();
