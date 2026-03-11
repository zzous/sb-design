import { useState, useEffect } from 'react';
import { OverviewPage } from './pages/OverviewPage';
import { SendPage } from './pages/SendPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { BannerRegisterPage } from './pages/BannerRegisterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import EventRegisterPage from './pages/event-register/EventRegisterPage';

type View = 'overview' | 'send' | 'components' | 'banner' | 'event-register' | 'analytics';

const VIEW_CONFIG: Record<View, { label: string; breadcrumb: string[] }> = {
  overview:         { label: '대시보드',      breadcrumb: ['홈', '대시보드'] },
  send:             { label: '이체하기',      breadcrumb: ['홈', '금융', '이체하기'] },
  banner:           { label: '배너등록',      breadcrumb: ['홈', '운영관리', '배너등록'] },
  analytics:        { label: '데이터 분석',   breadcrumb: ['홈', '분석', '데이터 분석'] },
  components:       { label: '디자인 시스템', breadcrumb: ['홈', '디자인 시스템'] },
  'event-register': { label: '이벤트 등록',  breadcrumb: ['홈', '이벤트 관리', '이벤트 등록'] },
};

const MENU = [
  {
    id: 'admin',
    label: '관리자',
    children: [
      { id: 'overview'        as View, label: '대시보드' },
      { id: 'send'            as View, label: '이체하기' },
      { id: 'analytics'       as View, label: '데이터 분석' },
      { id: 'banner'          as View, label: '배너등록' },
      { id: 'event-register'  as View, label: '이벤트 등록' },
      { id: 'components'      as View, label: '디자인 시스템' },
    ],
  },
];

const FAVORITES: View[] = ['overview', 'send', 'event-register'];

export default function App() {
  const [view, setView] = useState<View>('overview');
  const [navHidden, setNavHidden] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['admin']);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleMenu = (id: string) =>
    setOpenMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  const { label, breadcrumb } = VIEW_CONFIG[view];

  return (
    <div id="App" className={navHidden ? 'nav-hide' : ''}>
      {/* ── Header ── */}
      <header id="adminHeader">
        <h1></h1>
        <ul className="util">
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode(d => !d)}
              aria-label={darkMode ? '라이트 모드' : '다크 모드'}
              title={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
          <li><a href="#" className="pw">비밀번호 변경</a></li>
          <li><a href="#" className="user">김케어</a></li>
          <li><a href="#" className="session">세션만료 남은시간 <span>00:00:00</span></a></li>
          <li><a href="#" className="logout">로그아웃</a></li>
        </ul>
      </header>

      {/* ── Nav ── */}
      <nav id="adminNav">
        <button type="button" className="nav-toggle" onClick={() => setNavHidden(p => !p)}>
          <span className="offscreen">메뉴숨기기</span>
        </button>
        <div className="admin-nav-scroller">
          {/* 즐겨찾기 */}
          <div className="admin-fav-wrap">
            <div className="admin-fav-head">
              <h2>즐겨찾기</h2>
              <ul className="admin-fav-util">
                <li><button type="button" className="admin-fav-util-item reload"><span className="offscreen">새로고침</span></button></li>
                <li><button type="button" className="admin-fav-util-item setting"><span className="offscreen">즐겨찾기 메뉴 설정</span></button></li>
              </ul>
            </div>
            <div className="admin-fav-list">
              <ul>
                {FAVORITES.map(id => (
                  <li key={id}>
                    <button type="button" className="admin-fav-item" onClick={() => setView(id)}>
                      {VIEW_CONFIG[id].label}
                    </button>
                    <span className="admin-fav-check active" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 메뉴 */}
          <div className="admin-menu-wrap">
            <ul>
              {MENU.map(({ id, label: menuLabel, children }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`admin-menu-item dep1${openMenus.includes(id) ? ' active' : ''}`}
                    onClick={() => toggleMenu(id)}
                  >
                    {menuLabel}
                  </button>
                  {openMenus.includes(id) && (
                    <ul>
                      {children.map(child => (
                        <li key={child.id}>
                          <button
                            type="button"
                            className={`admin-menu-item dep2 no-child${view === child.id ? ' active' : ''}`}
                            onClick={() => setView(child.id)}
                          >
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Container ── */}
      <div id="adminContainer">
        <div className="contents">
          <ol className="breadcrumb">
            {breadcrumb.map((item, i) => (
              <li key={i} className={`breadcrumb-item${i === breadcrumb.length - 1 ? ' active' : ''}`}>
                {i === breadcrumb.length - 1
                  ? <span aria-current="location">{item}</span>
                  : <a href="#">{item}</a>
                }
              </li>
            ))}
          </ol>
          <div className="ui-title-2">
            <h2>{label}</h2>
          </div>
          <section className="s1">
            {view === 'overview'        && <OverviewPage />}
            {view === 'send'            && <SendPage />}
            {view === 'analytics'       && <AnalyticsPage />}
            {view === 'banner'          && <BannerRegisterPage />}
            {view === 'event-register'  && <EventRegisterPage />}
            {view === 'components'      && <ComponentsPage />}
          </section>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer id="adminFooter">
        ⓒ2023 KB Ins. All rights Reserved1
      </footer>
    </div>
  );
}
