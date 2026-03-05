import React, { useState } from 'react';
import { Button, Card, Badge, Typography, Input } from '@starbanking/design-system';
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
type View = 'overview' | 'send' | 'components';

export default function App() {
  const [view, setView] = useState<View>('overview');

  return (
    <div className={styles.app}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>S</div>
          <Typography variant="h6" color="default" as="span" className={styles.logoText}>
            StarBanking
          </Typography>
        </div>

        <nav className={styles.nav}>
          {(
            [
              { id: 'overview',    label: '대시보드' },
              { id: 'send',        label: '이체하기' },
              { id: 'components',  label: '디자인 시스템' },
            ] as { id: View; label: string }[]
          ).map(({ id, label }) => (
            <button
              key={id}
              className={[styles.navItem, view === id ? styles.navItemActive : ''].join(' ')}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarUser}>
          <div className={styles.avatar}>KD</div>
          <div>
            <Typography variant="label" as="div">김대박</Typography>
            <Typography variant="caption" as="div" color="muted">★★★ VIP</Typography>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        {view === 'overview' && <OverviewPage />}
        {view === 'send' && <SendPage />}
        {view === 'components' && <ComponentsPage />}
      </main>
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
            { label: 'Primary', shades: ['50','100','200','300','400','500','600','700','800','900'], prefix: 'primary' },
            { label: 'Secondary', shades: ['50','100','200','300','400','500','600','700','800','900'], prefix: 'secondary' },
            { label: 'Neutral', shades: ['50','100','200','300','400','500','600','700','800','900'], prefix: 'neutral' },
          ].map(({ label, shades, prefix }) => (
            <div key={label}>
              <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>{label}</Typography>
              <div className="row" style={{ gap: 4 }}>
                {shades.map((shade) => (
                  <div key={shade} style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        height: 40,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: `var(--color-${prefix}-${shade})`,
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    />
                    <Typography variant="caption" color="muted" as="div" style={{ textAlign: 'center', marginTop: 4 }}>
                      {shade}
                    </Typography>
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
