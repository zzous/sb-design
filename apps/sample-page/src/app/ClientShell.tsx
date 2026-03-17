'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastProvider } from '@starbanking/design-system';

type View = 'overview' | 'components' | 'banner' | 'event-register' | 'analytics' | 'ab-chart';

const VIEW_CONFIG: Record<View, { label: string; breadcrumb: string[]; path: string }> = {
  overview:         { label: '대시보드',         path: '/',               breadcrumb: ['홈', '대시보드'] },
  banner:           { label: '배너등록',          path: '/banner',         breadcrumb: ['홈', '운영관리', '배너/이벤트 관리', '배너관리', '배너등록'] },
  analytics:        { label: '데이터 분석',       path: '/analytics',      breadcrumb: ['홈', '분석', '데이터분석', '분석현황', '데이터 분석'] },
  'ab-chart':       { label: '데이터분석(차트)',  path: '/ab-chart',       breadcrumb: ['홈', '분석', '데이터분석', '분석현황', '데이터분석(차트)'] },
  components:       { label: '디자인 시스템',     path: '/components',     breadcrumb: ['홈', '시스템설정', '디자인 시스템', 'UI 컴포넌트', '디자인 시스템'] },
  'event-register': { label: '이벤트 등록',       path: '/event-register', breadcrumb: ['홈', '운영관리', '배너/이벤트 관리', '이벤트관리', '이벤트 등록'] },
};

function pathToView(pathname: string): View {
  const found = (Object.entries(VIEW_CONFIG) as [View, (typeof VIEW_CONFIG)[View]][])
    .find(([, cfg]) => cfg.path === pathname);
  return found ? found[0] : 'overview';
}

interface MenuLeaf { id: View; label: string }
interface Menu3    { id: string; label: string; children: MenuLeaf[] }
interface Menu2    { id: string; label: string; children: Menu3[] }
interface Menu1    { id: string; label: string; view?: View; children?: Menu2[] }

const MENU: Menu1[] = [
  { id: 'home', label: '홈', view: 'overview' },
  {
    id: 'operation', label: '운영관리',
    children: [
      {
        id: 'banner-mgmt', label: '배너/이벤트 관리',
        children: [
          { id: 'banner-group', label: '배너관리', children: [{ id: 'banner', label: '배너등록' }] },
          { id: 'event-group', label: '이벤트관리', children: [{ id: 'event-register', label: '이벤트 등록' }] },
        ],
      },
    ],
  },
  {
    id: 'analytics-top', label: '분석',
    children: [
      {
        id: 'data-analytics', label: '데이터분석',
        children: [
          { id: 'analytics-group', label: '분석현황', children: [{ id: 'analytics', label: '데이터 분석' }, { id: 'ab-chart', label: '데이터분석(차트)' }] },
        ],
      },
    ],
  },
  {
    id: 'system', label: '시스템설정',
    children: [
      {
        id: 'design-sys', label: '디자인 시스템',
        children: [
          { id: 'ui-components', label: 'UI 컴포넌트', children: [{ id: 'components', label: '디자인 시스템' }] },
        ],
      },
    ],
  },
];

const FAVORITES: View[] = ['overview', 'event-register', 'banner'];

function findTopId(v: View): string {
  for (const item of MENU) {
    if (item.view === v) return item.id;
    if (item.children) {
      for (const dep2 of item.children)
        for (const dep3 of dep2.children)
          for (const dep4 of dep3.children)
            if (dep4.id === v) return item.id;
    }
  }
  return MENU[0].id;
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const currentView = pathToView(pathname ?? '/');

  const [activeTop, setActiveTop] = useState<string>(() => findTopId(currentView));
  const [navHidden, setNavHidden] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [darkMode, setDarkMode]   = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setDarkMode(saved === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    setActiveTop(findTopId(currentView));
  }, [currentView]);

  const toggleMenu = (id: string) =>
    setOpenMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  const handleViewChange = (v: View) => router.push(VIEW_CONFIG[v].path);

  const handleTopClick = (item: Menu1) => {
    if (item.view) handleViewChange(item.view);
    else setActiveTop(item.id);
  };

  const { label, breadcrumb } = VIEW_CONFIG[currentView];
  const activeTopItem = MENU.find(m => m.id === activeTop);
  const leftMenuItems = activeTopItem?.children ?? [];

  return (
    <ToastProvider position="topRight">
      <div id="App" className={navHidden ? 'nav-hide' : ''}>
        {/* ── Header ── */}
        <header id="adminHeader">
          <h1></h1>
          <nav id="adminTopNav">
            <ul>
              {MENU.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`top-menu-item${activeTop === item.id ? ' active' : ''}`}
                    onClick={() => handleTopClick(item)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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
                      <button type="button" className="admin-fav-item" onClick={() => handleViewChange(id)}>
                        {VIEW_CONFIG[id].label}
                      </button>
                      <span className="admin-fav-check active" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {leftMenuItems.length > 0 && (
              <div className="admin-menu-wrap">
                <ul>
                  {leftMenuItems.map(dep2 => (
                    <li key={dep2.id}>
                      <button
                        type="button"
                        className={`admin-menu-item dep2${openMenus.includes(dep2.id) ? ' active' : ''}`}
                        onClick={() => toggleMenu(dep2.id)}
                      >
                        {dep2.label}
                      </button>
                      {openMenus.includes(dep2.id) && (
                        <ul>
                          {dep2.children.map(dep3 => (
                            <li key={dep3.id}>
                              <button
                                type="button"
                                className={`admin-menu-item dep3${openMenus.includes(dep3.id) ? ' active' : ''}`}
                                onClick={() => toggleMenu(dep3.id)}
                              >
                                {dep3.label}
                              </button>
                              {openMenus.includes(dep3.id) && (
                                <ul>
                                  {dep3.children.map(dep4 => (
                                    <li key={dep4.id}>
                                      <button
                                        type="button"
                                        className={`admin-menu-item dep4 no-child${currentView === dep4.id ? ' active' : ''}`}
                                        onClick={() => handleViewChange(dep4.id)}
                                      >
                                        {dep4.label}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              {children}
            </section>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer id="adminFooter">
          ⓒ2023 KB Ins. All rights Reserved1
        </footer>
      </div>
    </ToastProvider>
  );
}
