// ──────────────────────────────────────────────────────────────
// 🌐 다국어 데이터 객체
// • 웹사이트의 모든 텍스트를 영어/한국어로 제공
// • script.js에서 이 데이터를 사용하여 동적 언어 전환 구현
// ──────────────────────────────────────────────────────────────
const languages = {
  // ──────────────────────────────────────────────────────────────
  // 🇺🇸 영어 데이터 섹션
  // • 기본 언어로 설정되어 초기 로드 시 사용됨
  // • 모든 키에 대한 영어 번역 제공
  // ──────────────────────────────────────────────────────────────
  en: {
    // ──────────────────────────────────────────────────────────────
    // 📋 메뉴 아이템들
    // • 사이드바 네비게이션 메뉴의 텍스트
    // • 각 메뉴는 data-section 속성과 연결됨
    // ──────────────────────────────────────────────────────────────
    "menu.news": "News",
    "menu.education": "Education",
    "menu.research": "Research",
    "menu.talks": "Talks",
    "menu.prize": "Prize",
    "menu.projects": "Bittering Danbi",

    // ──────────────────────────────────────────────────────────────
    // 👤 이름 및 연구 키워드들
    // • 메인 타이틀과 연구 분야 소개에 사용
    // • 커버 섹션의 keyword 클래스에 적용
    // ──────────────────────────────────────────────────────────────
    "name": "Danbinaerin Han",
    "keyword.music": "Korean traditional music",
    "keyword.mir": "music information retrieval",
    "keyword.computational": "computational musicology",
    "keyword.ai": "music AI",

    // ──────────────────────────────────────────────────────────────
    // 📝 소개글 단락들
    // • 커버 섹션의 메인 소개 텍스트
    // • 연구자 배경과 관심 분야 설명
    // ──────────────────────────────────────────────────────────────
    "intro.p1": "I am a Ph.D. student at the Music and Audio Computing Lab (MACLab), advised by Professors Juhan Nam and Dasaem Jeong.",
    "intro.p1.strong1": "I am a Ph.D. student",
    "intro.p1.strong2": "Music and Audio Computing Lab (MACLab)",
    "intro.p2": "My research applies Music Information Retrieval (MIR) and music AI to Gugak (Korean traditional music), focusing on its unique idioms and expressive characteristics that are often overlooked in conventional analysis.",
    "intro.p2.strong1": "Music Information Retrieval (MIR)",
    "intro.p2.strong2": "music AI",
    "intro.p2.strong3": "Gugak (Korean traditional music)",
    "intro.p3": "With over 15 years of experience as a haegeum performer, I combine performance-based musical intuition with data-driven analytical methods to investigate what constitutes the \"Korean-ness\" in our music.",
    "intro.p3.strong1": "15 years",
    "intro.p3.strong2": "haegeum performer",
    "intro.p4": "My work aims to illuminate the musical significance of these expressive features and to articulate the value of Korean traditional music within the broader context of contemporary global music.",
    "intro.p4.strong1": "Korean traditional music",
    // ──────────────────────────────────────────────────────────────
    // 📧 연락처 정보
    // • 이메일 주소 표시
    // • 커버 섹션 하단에 위치
    // ──────────────────────────────────────────────────────────────
    "contact": "E-mail: naerin71@kaist.ac.kr | danbinaerin@naver.com",
    "contact.email": "E-mail:",

    // ──────────────────────────────────────────────────────────────
    // 🏷️ 섹션 제목들
    // • 각 메인 섹션의 헤더 텍스트
    // • h2 태그에 적용됨
    // ──────────────────────────────────────────────────────────────
    "section.news": "🤗 News",
    "section.education": "Education",
    "section.research": "Research",
    "section.talks": "Talks",
    "section.prize": "Prize",
    "section.projects": "Bittering Danbi",

    // ──────────────────────────────────────────────────────────────
    // 🎨 프로젝트 관련 데이터
    // • 프로젝트 섹션의 목록 및 상세 정보
    // • 더보기/접기 기능과 연동
    // ──────────────────────────────────────────────────────────────
    "projects.item1": "Project | Restoration Korean Old Music using AI, collaboration with National Gugak Center (2024)",
    "projects.item2": "Exhibition | 『FLOW』 Producer, Sound designer (2023)",
    "projects.detail.title": "Project Details",
    "projects.detail.national.title": "🇰🇷 National Gugak Center Collaboration Project",
    "projects.detail.national.desc": "Collaboration with National Gugak Center for AI-powered restoration of Korean traditional music.",
    "projects.detail.flow.title": "🎨 『FLOW』 Exhibition",
    "projects.detail.flow.desc": "Producer and sound designer for 『FLOW』 exhibition.",
    "projects.detail.additional.title": "🎵 Additional Projects",
    "projects.detail.additional.desc": "Various research and artistic activities in the field of Korean traditional music.",
    "projects.detail.year": "Year:",
    "projects.detail.year.2024": "2024",
    "projects.detail.year.2023": "2023",
    "projects.detail.role": "Role:",
    "projects.detail.role.research": "Research & Development",
    "projects.detail.role.producer": "Producer, Sound Designer",
    "projects.detail.tech": "Technology:",
    "projects.detail.tech.ai": "AI, Machine Learning, Audio Synthesis",
    "projects.detail.theme": "Theme:",
    "projects.detail.theme.flow": "Music and Art Flow",
    "projects.detail.additional.ismir": "ISMIR Conference Paper Presentation: Korean Folk Song Analysis Research",
    "projects.detail.additional.academic": "Academic Conference Presentations: Jeongganbo Notation Recognition Research",
    "projects.detail.additional.performance": "Performance Participation: AI-Generated Korean Traditional Music",
    "projects.more": "More",
    "projects.less": "Less",
    "lang.switch": "EN/KO"
  },

  // ──────────────────────────────────────────────────────────────
  // 🇰🇷 한국어 데이터 섹션
  // • 언어 전환 버튼 클릭 시 사용되는 데이터
  // • 모든 영어 키에 대한 한국어 번역 제공
  // ──────────────────────────────────────────────────────────────
  ko: {
    // ──────────────────────────────────────────────────────────────
    // 📋 메뉴 아이템들 (한국어)
    // • 사이드바 네비게이션 메뉴의 한국어 텍스트
    // • 영어와 동일한 data-section 속성과 연결됨
    // ──────────────────────────────────────────────────────────────
    "menu.news": "소식",
    "menu.education": "학력",
    "menu.research": "연구",
    "menu.talks": "발표",
    "menu.prize": "수상",
    "menu.projects": "씁쓸 단비",

    // ──────────────────────────────────────────────────────────────
    // 👤 이름 및 연구 키워드들 (한국어)
    // • 한국어 메인 타이틀과 연구 분야 소개
    // • 영어 버전과 동일한 keyword 클래스에 적용
    // ──────────────────────────────────────────────────────────────
    "name": "한 단비내린",
    "keyword.music": "한국 전통음악",
    "keyword.mir": "음악정보검색",
    "keyword.computational": "전산음악학",
    "keyword.ai": "음악 인공지능",

    // ──────────────────────────────────────────────────────────────
    // 📝 소개글 단락들 (한국어)
    // • 한국어 커버 섹션의 메인 소개 텍스트
    // • 연구자 배경과 관심 분야의 한국어 설명
    // ──────────────────────────────────────────────────────────────
    "intro.p1": "카이스트 문화기술대학원 음악및오디오컴퓨팅연구실(MACLab)에서 남주한, 정다샘 교수님의 지도를 받으며 박사과정을 밟고 있습니다.",
    "intro.p1.strong1": "카이스트 문화기술대학원",
    "intro.p1.strong2": "음악및오디오컴퓨팅연구실(MACLab)",
    "intro.p2": "음악정보처리(MIR) 기술과 음악 AI를 한국 전통음악(국악)에 적용하여, 기존 분석에서 간과되기 쉬운 고유한 어법과 표현적 특징을 탐구합니다.",
    "intro.p2.strong1": "음악정보처리(MIR)",
    "intro.p2.strong2": "음악 AI",
    "intro.p2.strong3": "한국 전통음악(국악)",
    "intro.p3": "15년 이상의 해금 연주 경험을 바탕으로, 연주자적 직관과 데이터 기반 분석 방법을 결합하여 한국음악의 정체성을 탐구합니다.",
    "intro.p3.strong1": "15년",
    "intro.p3.strong2": "해금 연주",
    "intro.p4": "이러한 표현적 특징들의 음악적 의미를 밝히고, 현대 글로벌 음악 맥락에서 한국 전통음악의 가치를 새롭게 조명하는 연구를 수행합니다.",
    "intro.p4.strong1": "한국 전통음악",
    // ──────────────────────────────────────────────────────────────
    // 📧 연락처 정보 (한국어)
    // • 한국어 이메일 주소 표시
    // • 영어 버전과 동일한 커버 섹션 위치
    // ──────────────────────────────────────────────────────────────
    "contact": "이메일: naerin71@kaist.ac.kr | danbinaerin@naver.com",
    "contact.email": "이메일:",

    // ──────────────────────────────────────────────────────────────
    // 🏷️ 섹션 제목들 (한국어)
    // • 각 메인 섹션의 한국어 헤더 텍스트
    // • 영어 버전과 동일한 h2 태그에 적용
    // ──────────────────────────────────────────────────────────────
    "section.news": "🤗 소식",
    "section.education": "학력",
    "section.research": "연구",
    "section.talks": "발표",
    "section.prize": "수상",
    "section.projects": "씁쓸 단비",

    // ──────────────────────────────────────────────────────────────
    // 🎨 프로젝트 관련 데이터 (한국어)
    // • 한국어 프로젝트 섹션의 목록 및 상세 정보
    // • 영어 버전과 동일한 더보기/접기 기능과 연동
    // ──────────────────────────────────────────────────────────────
    "projects.item1": "프로젝트 | 국립국악원 협업, AI를 활용한 한국 고음악 복원 (2024)",
    "projects.item2": "전시 | 『FLOW』 프로듀서, 사운드 디자이너 (2023)",
    "projects.detail.title": "프로젝트 상세 정보",
    "projects.detail.national.title": "🇰🇷 국립국악원 협업 프로젝트",
    "projects.detail.national.desc": "국립국악원과 협업하여 AI 기술을 활용한 한국 고음악 복원 프로젝트입니다.",
    "projects.detail.flow.title": "🎨 『FLOW』 전시",
    "projects.detail.flow.desc": "『FLOW』 전시의 프로듀서 및 사운드 디자이너로 참여하였습니다.",
    "projects.detail.additional.title": "🎵 추가 프로젝트",
    "projects.detail.additional.desc": "국악 분야에서의 다양한 연구 및 예술 활동에 참여하고 있습니다.",
    "projects.detail.year": "기간:",
    "projects.detail.year.2024": "2024년",
    "projects.detail.year.2023": "2023년",
    "projects.detail.role": "역할:",
    "projects.detail.role.research": "연구 및 개발 참여",
    "projects.detail.role.producer": "프로듀서, 사운드 디자이너",
    "projects.detail.tech": "기술:",
    "projects.detail.tech.ai": "머신러닝, 딥러닝, 음성 합성",
    "projects.detail.theme": "주제:",
    "projects.detail.theme.flow": "음악과 예술의 흐름",
    "projects.detail.additional.ismir": "ISMIR 학회 논문 발표: 한국 민요 분석 연구",
    "projects.detail.additional.academic": "학술대회 발표: 정간보 음표 인식 연구",
    "projects.detail.additional.performance": "공연 참여: AI 생성 국악 공연",
    "projects.more": "더보기",
    "projects.less": "접기",
    "lang.switch": "영/한"
  }
};
