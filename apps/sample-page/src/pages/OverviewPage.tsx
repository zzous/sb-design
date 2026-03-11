import { Button, Card, Badge, Typography, Icon } from '@starbanking/design-system';
import styles from '../App.module.css';

/* ── Data ── */
const MAU_TREND = [
  { month: '2025-10', mau: '1,108,420', dau: '36,947', newUser: '28,340', leave: '4,120', total: '4,821,200' },
  { month: '2025-11', mau: '1,142,880', dau: '38,096', newUser: '31,210', leave: '3,980', total: '4,849,100' },
  { month: '2025-12', mau: '1,189,340', dau: '39,645', newUser: '35,820', leave: '4,560', total: '4,880,600' },
  { month: '2026-01', mau: '1,218,700', dau: '40,623', newUser: '30,100', leave: '3,870', total: '4,906,830' },
  { month: '2026-02', mau: '1,219,850', dau: '41,200', newUser: '29,640', leave: '3,490', total: '4,933,000' },
  { month: '2026-03', mau: '1,284,520', dau: '42,318', newUser: '11,240', leave: '1,320', total: '4,943,000' },
];

const TRADE_STATS = [
  { type: '이체', count: '2,342,100', amount: '890억',   delta: '+9.2%',  up: true  },
  { type: '결제', count: '1,200,340', amount: '230억',   delta: '+7.8%',  up: true  },
  { type: '충전', count: '299,750',   amount: '80억',    delta: '-2.1%',  up: false },
  { type: '합계', count: '3,842,190', amount: '1,200억', delta: '+8.7%',  up: true  },
];

const RECENT_EVENTS = [
  { name: '3월 출석체크 이벤트',  type: '출석', period: '2026-03-01 ~ 2026-03-31', participants: '184,320', status: 'active' as const },
  { name: '봄맞이 럭키드로우',    type: '룰렛', period: '2026-03-10 ~ 2026-03-20', participants: '42,810',  status: 'active' as const },
  { name: '금융 퀴즈 왕',         type: '퀴즈', period: '2026-03-05 ~ 2026-03-15', participants: '98,440',  status: 'active' as const },
  { name: '신규 가입 환영 이벤트',type: '일반', period: '2026-02-01 ~ 2026-02-28', participants: '211,500', status: 'ended'  as const },
  { name: '설날 세배돈 이벤트',   type: '룰렛', period: '2026-01-20 ~ 2026-02-05', participants: '320,980', status: 'ended'  as const },
];

const EVT_STATUS_MAP = {
  active:  { variant: 'success' as const, label: '진행중' },
  ended:   { variant: 'neutral' as const, label: '종료' },
  pending: { variant: 'warning' as const, label: '예정' },
};

/* ── SummaryCard ── */
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
            <Typography variant="caption" color={deltaPositive ? 'success' : 'error'} as="span">
              {delta}
            </Typography>
          )}
          <Typography variant="caption" color="muted" as="span">{sub}</Typography>
        </div>
      )}
    </Card>
  );
}

/* ── Page ── */
export function OverviewPage() {
  const today = MAU_TREND[MAU_TREND.length - 1];

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">서비스 현황 대시보드</Typography>
          <Typography variant="body2" color="muted">기준일: 2026년 3월 11일</Typography>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Icon name="download" />}>리포트 다운로드</Button>
      </header>

      {/* KPI Cards */}
      <div className={styles.summaryGrid}>
        <SummaryCard label="MAU (월간 활성 이용자)" value={`${today.mau}명`} delta="+5.3%" deltaPositive sub="전월 대비" />
        <SummaryCard label="DAU (일간 활성 이용자)" value={`${today.dau}명`} delta="+2.7%" deltaPositive sub="전일 대비" />
        <SummaryCard label="이번달 거래 건수" value="3,842,190건" delta="+8.7%" deltaPositive sub="전월 대비" />
        <SummaryCard label="이번달 거래 금액" value="1,200억원" delta="+11.2%" deltaPositive sub="전월 대비" />
      </div>

      {/* 이용자 현황 */}
      <div className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>이용자 현황 (최근 6개월)</Typography>
        <Card variant="raised" size="sm">
          <div className="tbl-wrap">
            <div className="table-list">
              <table className="table list" style={{ width: '100%' }}>
                <colgroup>
                  <col style={{ width: 120 }} />
                  <col /><col /><col /><col /><col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">기준월</th>
                    <th scope="col">MAU</th>
                    <th scope="col">DAU</th>
                    <th scope="col">신규 가입</th>
                    <th scope="col">탈퇴</th>
                    <th scope="col">누적 회원</th>
                  </tr>
                </thead>
                <tbody>
                  {MAU_TREND.map((row, i) => (
                    <tr key={row.month} style={i === MAU_TREND.length - 1 ? { fontWeight: 'bold', backgroundColor: '#f5f8ff' } : {}}>
                      <td className="t-center">{row.month}</td>
                      <td className="t-right">{row.mau}명</td>
                      <td className="t-right">{row.dau}명</td>
                      <td className="t-right" style={{ color: 'var(--color-success)' }}>+{row.newUser}명</td>
                      <td className="t-right" style={{ color: 'var(--color-error)' }}>-{row.leave}명</td>
                      <td className="t-right">{row.total}명</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* 주요 거래 지표 */}
      <div className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>주요 거래 지표 (2026년 3월)</Typography>
        <Card variant="raised" size="sm">
          <div className="tbl-wrap">
            <div className="table-list">
              <table className="table list" style={{ width: '100%' }}>
                <colgroup>
                  <col style={{ width: 120 }} />
                  <col /><col />
                  <col style={{ width: 140 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">거래 유형</th>
                    <th scope="col">거래 건수</th>
                    <th scope="col">거래 금액</th>
                    <th scope="col">전월 대비</th>
                  </tr>
                </thead>
                <tbody>
                  {TRADE_STATS.map(row => (
                    <tr key={row.type} style={row.type === '합계' ? { fontWeight: 'bold', backgroundColor: '#f5f8ff' } : {}}>
                      <td className="t-center">{row.type}</td>
                      <td className="t-right">{row.count}건</td>
                      <td className="t-right">{row.amount}</td>
                      <td className="t-center">
                        <span style={{ color: row.up ? 'var(--color-success)' : 'var(--color-error)', display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                          {row.up ? <Icon name="arrowUp" /> : <Icon name="arrowDown" />}{row.delta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* 최근 이벤트 현황 */}
      <div className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>최근 이벤트 현황</Typography>
        <Card variant="raised" size="sm">
          <div className="tbl-wrap">
            <div className="table-list">
              <table className="table list" style={{ width: '100%' }}>
                <colgroup>
                  <col />
                  <col style={{ width: 80 }} />
                  <col style={{ width: 260 }} />
                  <col style={{ width: 120 }} />
                  <col style={{ width: 90 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">이벤트명</th>
                    <th scope="col">유형</th>
                    <th scope="col">이벤트 기간</th>
                    <th scope="col">참여자 수</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_EVENTS.map((evt, i) => {
                    const s = EVT_STATUS_MAP[evt.status];
                    return (
                      <tr key={i}>
                        <td style={{ textAlign: 'left' }}>{evt.name}</td>
                        <td className="t-center">{evt.type}</td>
                        <td className="t-center">{evt.period}</td>
                        <td className="t-right">{evt.participants}명</td>
                        <td className="t-center">
                          <Badge variant={s.variant} size="sm">{s.label}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
