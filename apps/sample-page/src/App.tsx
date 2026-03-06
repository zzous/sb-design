import React, { useState } from 'react';
import {
  Button, Card, Badge, Typography, Input,
  FileInput, Modal, Select, useToast,
} from '@starbanking/design-system';
import styles from './App.module.css';

/* ── Icons (inline SVG) ── */
const IconArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 4v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 2.5L7 9M13.5 2.5L9 13.5L7 9M13.5 2.5L2.5 6.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v7M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Data ── */
const transactions = [
  { id: 1, name: '스타벅스 강남점',      date: '2026-03-05', amount: -6800,  category: '식음료',   status: 'success' as const },
  { id: 2, name: '급여 입금',             date: '2026-03-04', amount: 3200000, category: '급여',    status: 'success' as const },
  { id: 3, name: '넷플릭스',              date: '2026-03-03', amount: -17000,  category: '구독',    status: 'success' as const },
  { id: 4, name: 'GS25 편의점',           date: '2026-03-03', amount: -3500,   category: '식음료',  status: 'success' as const },
  { id: 5, name: '해외 송금 수수료',      date: '2026-03-02', amount: -5000,   category: '수수료',  status: 'warning' as const },
  { id: 6, name: '한국전력',              date: '2026-03-01', amount: -45200,  category: '공과금',  status: 'success' as const },
  { id: 7, name: '카카오페이 충전',       date: '2026-02-28', amount: -100000, category: '송금',    status: 'success' as const },
  { id: 8, name: '프리랜서 정산',         date: '2026-02-27', amount: 500000,  category: '수입',    status: 'pending' as const },
];

const statusBadgeMap = {
  success: { variant: 'success' as const, label: '완료' },
  warning: { variant: 'warning' as const, label: '처리중' },
  pending: { variant: 'neutral' as const, label: '대기' },
  error:   { variant: 'error'   as const, label: '실패' },
};

function formatAmount(n: number) {
  const abs = Math.abs(n).toLocaleString('ko-KR');
  return n >= 0 ? `+${abs}원` : `-${abs}원`;
}

/* ── Sub-views ── */
type View = 'overview' | 'send' | 'components' | 'banner';

const VIEW_CONFIG: Record<View, { label: string; breadcrumb: string[] }> = {
  overview:   { label: '대시보드',      breadcrumb: ['홈', '대시보드'] },
  send:       { label: '이체하기',      breadcrumb: ['홈', '금융', '이체하기'] },
  banner:     { label: '배너등록',      breadcrumb: ['홈', '운영관리', '배너등록'] },
  components: { label: '디자인 시스템', breadcrumb: ['홈', '디자인 시스템'] },
};

const MENU = [
  {
    id: 'admin',
    label: '관리자',
    children: [
      { id: 'overview'   as View, label: '대시보드' },
      { id: 'send'       as View, label: '이체하기' },
      { id: 'banner'     as View, label: '배너등록' },
      { id: 'components' as View, label: '디자인 시스템' },
    ],
  },
];

const FAVORITES: View[] = ['overview', 'send', 'banner'];

export default function App() {
  const [view, setView] = useState<View>('overview');
  const [navHidden, setNavHidden] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['admin']);

  const toggleMenu = (id: string) =>
    setOpenMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  const { label, breadcrumb } = VIEW_CONFIG[view];

  return (
    <div id="App" className={navHidden ? 'nav-hide' : ''}>
      {/* ── Header ── */}
      <header id="adminHeader">
        <h1></h1>
        <ul className="util">
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
            {view === 'overview'   && <OverviewPage />}
            {view === 'send'       && <SendPage />}
            {view === 'banner'     && <BannerRegisterPage />}
            {view === 'components' && <ComponentsPage />}
          </section>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer id="adminFooter">
        ⓒ2023 KB Ins. All rights Reserved
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Overview                                                   */
/* ────────────────────────────────────────────────────────── */
function OverviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">안녕하세요, 김대박님 👋</Typography>
          <Typography variant="body2" color="muted">2026년 3월 5일 (목)</Typography>
        </div>
        <div className="row gap-2">
          <Button variant="outline" size="sm" leftIcon={<IconDownload />}>내역 다운로드</Button>
          <Button size="sm" leftIcon={<IconPlus />}>새 계좌 추가</Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <SummaryCard
          label="총 잔액"
          value="12,450,830원"
          delta="+3.2%"
          deltaPositive
          sub="전월 대비"
        />
        <SummaryCard
          label="이번달 지출"
          value="487,500원"
          delta="+12.1%"
          deltaPositive={false}
          sub="전월 대비"
        />
        <SummaryCard
          label="이번달 수입"
          value="3,700,000원"
          delta="+0%"
          deltaPositive
          sub="전월 대비"
        />
        <SummaryCard
          label="대기 중 거래"
          value="1건"
          delta=""
          deltaPositive
          sub="처리 예정"
          badge={<Badge variant="warning" dot>확인 필요</Badge>}
        />
      </div>

      {/* Accounts */}
      <div className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>
          내 계좌
        </Typography>
        <div className={styles.accountGrid}>
          <AccountCard
            name="Star 입출금 통장"
            number="110-123-456789"
            balance="8,234,200원"
            color="var(--color-primary-500)"
          />
          <AccountCard
            name="Star 저축 예금"
            number="222-987-654321"
            balance="4,216,630원"
            color="var(--color-secondary-600)"
          />
        </div>
      </div>

      {/* Transactions */}
      <div className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>
          최근 거래내역
        </Typography>
        <Card variant="raised" size="sm">
          <div className={styles.txHeader}>
            <Input
              placeholder="거래내역 검색"
              prefix={<IconSearch />}
              size="sm"
              style={{ width: 260 }}
            />
          </div>
          <div className={styles.txList}>
            {transactions.map((tx) => {
              const badge = statusBadgeMap[tx.status];
              const isIncome = tx.amount > 0;
              return (
                <div key={tx.id} className={styles.txRow}>
                  <div className={[styles.txIcon, isIncome ? styles.txIconIn : styles.txIconOut].join(' ')}>
                    {isIncome ? <IconArrowDown /> : <IconArrowUp />}
                  </div>
                  <div className={styles.txInfo}>
                    <Typography variant="label" as="div" className="truncate">{tx.name}</Typography>
                    <Typography variant="caption" color="muted">{tx.date} · {tx.category}</Typography>
                  </div>
                  <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                  <Typography
                    variant="label"
                    color={isIncome ? 'success' : 'default'}
                    className={styles.txAmount}
                  >
                    {formatAmount(tx.amount)}
                  </Typography>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  sub: string;
  badge?: React.ReactNode;
}
function SummaryCard({ label, value, delta, deltaPositive, sub, badge }: SummaryCardProps) {
  return (
    <Card variant="raised" size="md">
      <Typography variant="caption" color="muted" as="div">{label}</Typography>
      <Typography variant="h4" as="div" className={styles.summaryValue}>{value}</Typography>
      {badge ?? (
        <div className="row gap-1">
          {delta && (
            <Typography
              variant="caption"
              color={deltaPositive ? 'success' : 'error'}
              as="span"
            >
              {delta}
            </Typography>
          )}
          <Typography variant="caption" color="muted" as="span">{sub}</Typography>
        </div>
      )}
    </Card>
  );
}

interface AccountCardProps {
  name: string;
  number: string;
  balance: string;
  color: string;
}
function AccountCard({ name, number, balance, color }: AccountCardProps) {
  return (
    <div className={styles.accountCard} style={{ '--accent': color } as React.CSSProperties}>
      <div className={styles.accountCardTop}>
        <Typography variant="label" color="default" as="div">{name}</Typography>
        <Typography variant="caption" color="muted" as="div">{number}</Typography>
      </div>
      <Typography variant="h4" as="div" className={styles.accountBalance}>{balance}</Typography>
      <div className="row gap-2">
        <Button variant="outline" size="sm" leftIcon={<IconSend />} style={{ flex: 1 }}>이체</Button>
        <Button variant="ghost" size="sm" style={{ flex: 1 }}>내역</Button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Send                                                       */
/* ────────────────────────────────────────────────────────── */
function SendPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ bank: '', account: '', name: '', amount: '', memo: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.bank)    e.bank    = '은행을 입력해주세요.';
    if (!form.account) e.account = '계좌번호를 입력해주세요.';
    if (!form.name)    e.name    = '예금주명을 입력해주세요.';
    if (!form.amount || isNaN(Number(form.amount.replace(/,/g, ''))))
      e.amount = '올바른 금액을 입력해주세요.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  }

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.sendSuccess}>
          <div className={styles.successIcon}>✓</div>
          <Typography variant="h4">이체가 완료되었습니다!</Typography>
          <Typography variant="body2" color="muted">
            {form.name}님 계좌로{' '}
            <strong>{Number(form.amount.replace(/,/g, '')).toLocaleString('ko-KR')}원</strong>이
            이체되었습니다.
          </Typography>
          <Button variant="outline" onClick={() => { setDone(false); setForm({ bank:'', account:'', name:'', amount:'', memo:'' }); }}>
            다시 이체하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <Typography variant="h3">이체하기</Typography>
      </header>
      <div className={styles.sendWrapper}>
        <Card variant="raised" size="lg" style={{ maxWidth: 520 }}>
          <form onSubmit={handleSubmit} noValidate className="stack gap-4">
            <Input
              label="은행"
              placeholder="예) 스타뱅크"
              value={form.bank}
              onChange={(e) => setForm({ ...form, bank: e.target.value })}
              error={!!errors.bank}
              errorText={errors.bank}
              required
            />
            <Input
              label="계좌번호"
              placeholder="숫자만 입력"
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
              error={!!errors.account}
              errorText={errors.account}
              required
            />
            <Input
              label="예금주명"
              placeholder="받는 분 이름"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              errorText={errors.name}
              required
            />
            <Input
              label="이체 금액"
              placeholder="0"
              suffix={<span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)', fontWeight: 500 }}>원</span>}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              error={!!errors.amount}
              errorText={errors.amount}
              required
            />
            <Input
              label="메모 (선택)"
              placeholder="받는 분에게 보낼 메모"
              value={form.memo}
              onChange={(e) => setForm({ ...form, memo: e.target.value })}
              helperText="최대 20자"
            />
            <div className="row gap-2" style={{ marginTop: 'var(--space-2)' }}>
              <Button variant="outline" fullWidth type="button" onClick={() => setForm({ bank:'', account:'', name:'', amount:'', memo:'' })}>
                초기화
              </Button>
              <Button fullWidth type="submit" loading={loading} leftIcon={<IconSend />}>
                이체하기
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Components showcase                                        */
/* ────────────────────────────────────────────────────────── */
function ComponentsPage() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fileList, setFileList] = useState<File[]>([]);
  const toast = useToast();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">디자인 시스템</Typography>
          <Typography variant="body2" color="muted">@starbanking/design-system 컴포넌트 쇼케이스</Typography>
        </div>
      </header>

      {/* Buttons */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Button</Typography>
        <div className="stack gap-6">
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>Variants</Typography>
            <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>Sizes</Typography>
            <div className="row gap-2" style={{ alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>With Icons</Typography>
            <div className="row gap-2">
              <Button leftIcon={<IconSend />}>이체하기</Button>
              <Button variant="outline" rightIcon={<IconDownload />}>다운로드</Button>
              <Button variant="secondary" leftIcon={<IconPlus />}>추가</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Badge</Typography>
        <div className="row gap-2" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success" dot>완료</Badge>
          <Badge variant="warning" dot>처리중</Badge>
          <Badge variant="error" dot>실패</Badge>
          <Badge variant="info">정보</Badge>
          <Badge variant="neutral">중립</Badge>
          <Badge variant="success" size="lg">Large</Badge>
          <Badge variant="neutral" size="sm">Small</Badge>
        </div>
      </section>

      {/* Inputs */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Input</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
          <Input
            label="검색"
            placeholder="검색어 입력"
            prefix={<IconSearch />}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Input label="필수 항목" placeholder="필수 값" required />
          <Input
            label="오류 상태"
            placeholder="잘못된 값"
            error
            errorText="올바른 형식으로 입력해주세요."
          />
          <Input
            label="도움말"
            placeholder="입력"
            helperText="8자 이상 입력해주세요."
          />
          <Input label="비활성화" placeholder="입력 불가" disabled />
        </div>
      </section>

      {/* Select */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Select</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <Select
            label="기본 선택"
            placeholder="선택하세요"
            options={[
              { value: 'option1', label: '옵션 1' },
              { value: 'option2', label: '옵션 2' },
              { value: 'option3', label: '옵션 3' },
            ]}
            value={selectVal}
            onChange={(e) => setSelectVal(e.target.value)}
          />
          <Select
            label="Small"
            size="sm"
            placeholder="선택"
            options={[{ value: 'a', label: 'Small A' }, { value: 'b', label: 'Small B' }]}
          />
          <Select
            label="Large"
            size="lg"
            placeholder="선택"
            options={[{ value: 'a', label: 'Large A' }, { value: 'b', label: 'Large B' }]}
          />
          <Select
            label="오류 상태"
            placeholder="선택하세요"
            error
            errorText="항목을 선택해주세요."
            options={[{ value: 'a', label: '옵션 A' }]}
          />
          <Select
            label="도움말"
            placeholder="선택"
            helperText="하나를 선택해주세요."
            options={[{ value: 'a', label: '옵션 A' }, { value: 'b', label: '옵션 B' }]}
          />
          <Select
            label="비활성화"
            placeholder="선택 불가"
            disabled
            options={[{ value: 'a', label: '옵션 A' }]}
          />
        </div>
      </section>

      {/* FileInput */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>FileInput</Typography>
        <div className="stack gap-4" style={{ maxWidth: 520 }}>
          <FileInput
            label="기본 파일 업로드"
            helperText="모든 파일 형식 허용"
            onChange={setFileList}
          />
          <FileInput
            label="이미지 전용"
            accept=".jpg,.jpeg,.png,.webp"
            maxSize={5 * 1024 * 1024}
            helperText="JPG, PNG, WEBP · 최대 5MB"
            onChange={setFileList}
          />
          {fileList.length > 0 && (
            <Typography variant="caption" color="muted">
              선택된 파일: {fileList.map((f) => f.name).join(', ')}
            </Typography>
          )}
          <FileInput label="비활성화" disabled onChange={() => {}} />
        </div>
      </section>

      {/* Modal */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Modal</Typography>
        <div className="row gap-2">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => { setModalSize(size); setModalOpen(true); }}
            >
              {size.toUpperCase()} 모달 열기
            </Button>
          ))}
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`${modalSize.toUpperCase()} 모달`}
          size={modalSize}
          footer={
            <div className="row gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
              <Button onClick={() => setModalOpen(false)}>확인</Button>
            </div>
          }
        >
          <div className="stack gap-3">
            <Typography variant="body2">
              모달 컴포넌트입니다. 사이즈는 sm / md / lg 를 지원합니다.
            </Typography>
            <Input label="모달 내부 입력" placeholder="텍스트 입력" />
            <Select
              label="모달 내부 선택"
              placeholder="선택하세요"
              options={[
                { value: '1', label: '옵션 1' },
                { value: '2', label: '옵션 2' },
              ]}
            />
          </div>
        </Modal>
      </section>

      {/* Toast */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Toast</Typography>
        <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            onClick={() => toast.success('성공!', { message: '작업이 성공적으로 완료되었습니다.' })}
          >
            Success Toast
          </Button>
          <Button
            variant="danger"
            onClick={() => toast.error('오류 발생', { message: '처리 중 문제가 발생했습니다.' })}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning('주의', { message: '이 작업은 되돌릴 수 없습니다.' })}
          >
            Warning Toast
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast.info('안내', { message: '새로운 업데이트가 있습니다.' })}
          >
            Info Toast
          </Button>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Card</Typography>
        <div className="grid-3">
          <Card variant="raised" title="Raised Card" description="기본 그림자 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card variant="flat" title="Flat Card" description="테두리만 있는 플랫 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card
            variant="raised"
            title="With Footer"
            description="푸터가 있는 카드입니다."
            footer={
              <div className="row gap-2">
                <Button size="sm" variant="outline">취소</Button>
                <Button size="sm">확인</Button>
              </div>
            }
          >
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Typography</Typography>
        <div className="stack gap-3">
          {(['h1','h2','h3','h4','h5','h6'] as const).map((v) => (
            <Typography key={v} variant={v}>{v.toUpperCase()} — StarBanking 디자인 시스템</Typography>
          ))}
          <div style={{ height: 'var(--space-2)' }} />
          <Typography variant="body1">Body1 — 본문 텍스트. StarBanking 디자인 시스템은 뱅킹 서비스에 최적화된 React 컴포넌트 라이브러리입니다.</Typography>
          <Typography variant="body2">Body2 — 보조 본문 텍스트. 좀 더 작은 본문에 사용됩니다.</Typography>
          <Typography variant="caption">Caption — 보조 설명 텍스트</Typography>
          <Typography variant="overline">Overline — 섹션 레이블</Typography>
          <Typography variant="label">Label — 폼 레이블</Typography>
          <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
            {(['primary','secondary','success','warning','error','muted'] as const).map((c) => (
              <Typography key={c} variant="label" color={c}>{c}</Typography>
            ))}
          </div>
        </div>
      </section>

      {/* Color Tokens */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Color Tokens</Typography>
        <div className="stack gap-4">
          {[
            {
              label: 'Brand / UI',
              colors: [
                { name: 'Nav / Primary', value: '#253349' },
                { name: 'Secondary (Button)', value: '#ffcc00' },
                { name: 'Highlight', value: '#ffbc00' },
                { name: 'Badge Yellow', value: '#fed700' },
              ],
            },
            {
              label: 'Semantic',
              colors: [
                { name: 'Point / Link', value: '#287eff' },
                { name: 'Error / Danger', value: '#ff3232' },
                { name: 'Hover bg', value: '#f2f2f2' },
                { name: 'Base bg', value: '#f7f7f7' },
              ],
            },
            {
              label: 'Text',
              colors: [
                { name: 'Strong text', value: '#222' },
                { name: 'Base text', value: '#444' },
                { name: 'Muted text', value: '#767676' },
                { name: 'Placeholder', value: '#999' },
                { name: 'Disabled text', value: '#ababab' },
              ],
            },
            {
              label: 'Border / Line',
              colors: [
                { name: 'Base border', value: '#d2d2d2' },
                { name: 'Light border', value: '#ebebeb' },
              ],
            },
          ].map(({ label, colors }) => (
            <div key={label}>
              <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>{label}</Typography>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                {colors.map(({ name, value }) => (
                  <div key={name} style={{ minWidth: 100, flex: '0 0 auto' }}>
                    <div
                      style={{
                        height: 40,
                        borderRadius: 3,
                        backgroundColor: value,
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    />
                    <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.4 }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#767676', fontFamily: 'monospace' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Banner Register                                            */
/* ────────────────────────────────────────────────────────── */
const POSITION_OPTIONS = [
  { value: 'main-top',    label: '메인 상단' },
  { value: 'main-bottom', label: '메인 하단' },
  { value: 'sidebar',     label: '사이드바' },
  { value: 'popup',       label: '팝업' },
];

const STATUS_OPTIONS = [
  { value: 'active',   label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'reserved', label: '예약' },
];

const statusVariantMap: Record<string, 'success' | 'neutral' | 'warning'> = {
  active:   'success',
  inactive: 'neutral',
  reserved: 'warning',
};
const statusLabelMap: Record<string, string> = {
  active: '활성', inactive: '비활성', reserved: '예약',
};

interface BannerForm {
  title: string;
  linkUrl: string;
  position: string;
  status: string;
  startDate: string;
  endDate: string;
}

function BannerRegisterPage() {
  const toast = useToast();
  const [form, setForm] = useState<BannerForm>({
    title: '', linkUrl: '', position: '', status: 'active',
    startDate: '', endDate: '',
  });
  const [errors, setErrors] = useState<Partial<BannerForm>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function set(key: keyof BannerForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleFiles(selected: File[]) {
    setFiles(selected);
    if (selected[0]) {
      const url = URL.createObjectURL(selected[0]);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  function validate() {
    const e: Partial<BannerForm> = {};
    if (!form.title)     e.title    = '배너명을 입력해주세요.';
    if (!form.linkUrl)   e.linkUrl  = '링크 URL을 입력해주세요.';
    if (!form.position)  e.position = '노출 위치를 선택해주세요.';
    if (!form.startDate) e.startDate = '시작일을 선택해주세요.';
    if (!form.endDate)   e.endDate   = '종료일을 선택해주세요.';
    if (form.startDate && form.endDate && form.startDate > form.endDate)
      e.endDate = '종료일은 시작일 이후여야 합니다.';
    if (files.length === 0) e.title = e.title ?? ''; // 이미지 없으면 별도 처리
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) {
      toast.error('배너 이미지를 업로드해주세요.');
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('배너가 등록되었습니다.', { message: `"${form.title}" 배너가 성공적으로 등록되었습니다.` });
      setForm({ title: '', linkUrl: '', position: '', status: 'active', startDate: '', endDate: '' });
      setFiles([]);
      setPreviewUrl(null);
    }, 1200);
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">배너등록</Typography>
          <Typography variant="body2" color="muted">새 배너를 등록하고 노출 설정을 관리합니다.</Typography>
        </div>
        <Badge variant={statusVariantMap[form.status] ?? 'neutral'} dot>
          {statusLabelMap[form.status] ?? ''}
        </Badge>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.bannerLayout}>
          {/* 왼쪽: 기본 정보 */}
          <div className={styles.bannerMain}>
            <Card variant="raised" size="lg">
              <Typography variant="overline" as="div" className={styles.sectionLabel}>기본 정보</Typography>
              <div className="stack gap-4">
                <Input
                  label="배너명"
                  placeholder="배너 이름을 입력하세요"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  error={!!errors.title}
                  errorText={errors.title}
                  required
                />
                <Input
                  label="링크 URL"
                  placeholder="https://example.com"
                  value={form.linkUrl}
                  onChange={(e) => set('linkUrl', e.target.value)}
                  error={!!errors.linkUrl}
                  errorText={errors.linkUrl}
                  required
                />
                <Select
                  label="노출 위치"
                  options={POSITION_OPTIONS}
                  placeholder="위치를 선택하세요"
                  value={form.position}
                  onChange={(e) => set('position', e.target.value)}
                  error={!!errors.position}
                  errorText={errors.position}
                  required
                />
                <Select
                  label="배너 상태"
                  options={STATUS_OPTIONS}
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                />
                <div className="grid-2">
                  <Input
                    label="노출 시작일"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set('startDate', e.target.value)}
                    error={!!errors.startDate}
                    errorText={errors.startDate}
                    required
                  />
                  <Input
                    label="노출 종료일"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set('endDate', e.target.value)}
                    error={!!errors.endDate}
                    errorText={errors.endDate}
                    required
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* 오른쪽: 이미지 업로드 */}
          <div className={styles.bannerSide}>
            <Card variant="raised" size="lg">
              <Typography variant="overline" as="div" className={styles.sectionLabel}>배너 이미지</Typography>
              <FileInput
                label="이미지 업로드"
                accept=".jpg,.jpeg,.png,.webp"
                maxSize={5 * 1024 * 1024}
                helperText="JPG, PNG, WEBP · 최대 5MB"
                onChange={handleFiles}
                required
              />
              {previewUrl && (
                <div className={styles.bannerThumb}>
                  <img src={previewUrl} alt="배너 미리보기" className={styles.bannerThumbImg} />
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className={styles.bannerActions}>
          <Button
            variant="outline"
            type="button"
            onClick={() => setPreviewOpen(true)}
            disabled={!form.title && !previewUrl}
          >
            미리보기
          </Button>
          <div className="row gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setForm({ title: '', linkUrl: '', position: '', status: 'active', startDate: '', endDate: '' });
                setFiles([]);
                setPreviewUrl(null);
                setErrors({});
              }}
            >
              초기화
            </Button>
            <Button type="submit" loading={loading}>
              배너 등록
            </Button>
          </div>
        </div>
      </form>

      {/* 미리보기 모달 */}
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="배너 미리보기"
        size="md"
        footer={
          <Button variant="outline" onClick={() => setPreviewOpen(false)}>닫기</Button>
        }
      >
        <div className={styles.bannerPreview}>
          {previewUrl
            ? <img src={previewUrl} alt="배너" className={styles.bannerPreviewImg} />
            : <div className={styles.bannerPreviewEmpty}><Typography variant="body2" color="muted">이미지 없음</Typography></div>
          }
          <div className="stack gap-2" style={{ marginTop: 'var(--space-4)' }}>
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>배너명</Typography>
              <Typography variant="label">{form.title || '—'}</Typography>
            </div>
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>링크</Typography>
              <Typography variant="label">{form.linkUrl || '—'}</Typography>
            </div>
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>위치</Typography>
              <Typography variant="label">
                {POSITION_OPTIONS.find((o) => o.value === form.position)?.label || '—'}
              </Typography>
            </div>
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>기간</Typography>
              <Typography variant="label">
                {form.startDate && form.endDate ? `${form.startDate} ~ ${form.endDate}` : '—'}
              </Typography>
            </div>
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>상태</Typography>
              <Badge variant={statusVariantMap[form.status] ?? 'neutral'} size="sm" dot>
                {statusLabelMap[form.status]}
              </Badge>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
