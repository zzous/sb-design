import { useState } from 'react';
import { Typography, Badge, Icon } from '@starbanking/design-system';
import styles from '../App.module.css';

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */

const TREND_DAU = [42, 45, 43, 50, 55, 52, 60, 58, 63, 70, 68, 75, 80, 78, 85];
const TREND_MAU = [310, 318, 325, 330, 342, 355, 360, 370, 375, 382, 390, 400, 412, 418, 430];
const TREND_LABELS = ['3/1','3/2','3/3','3/4','3/5','3/6','3/7','3/8','3/9','3/10','3/11','3/12','3/13','3/14','3/15'];

const BANNERS = [
  { id: 1, name: '봄맞이 이벤트', impressions: 48200, clicks: 3850, ctr: 7.9, status: 'active' },
  { id: 2, name: '신규 적금 출시',  impressions: 32100, clicks: 1920, ctr: 5.9, status: 'active' },
  { id: 3, name: '이체 수수료 면제', impressions: 28500, clicks: 2560, ctr: 8.9, status: 'active' },
  { id: 4, name: '카드론 특판',      impressions: 19800, clicks:  890, ctr: 4.5, status: 'paused' },
  { id: 5, name: '앱 업데이트 안내', impressions: 15300, clicks:  612, ctr: 4.0, status: 'ended'  },
];

const FUNNEL = [
  { step: '앱 진입',    count: 85000, color: '#253349' },
  { step: '로그인',     count: 72000, color: '#3a4f6b' },
  { step: '상품 조회',  count: 38000, color: '#4e6d9a' },
  { step: '이체 시작',  count: 18000, color: '#287eff' },
  { step: '이체 완료',  count: 14500, color: '#00b074' },
];

const TOP_EVENTS = [
  { name: '계좌조회',     count: 54320, delta: +12.3 },
  { name: '이체하기',     count: 31250, delta: +8.1  },
  { name: '카드내역',     count: 28910, delta: -2.4  },
  { name: '적금가입',     count: 19440, delta: +22.7 },
  { name: '알림설정',     count: 12830, delta: -5.1  },
  { name: '비밀번호변경', count:  9210, delta: +1.8  },
];

const SCREEN_TIME = [
  { screen: '메인홈',     sec: 42 },
  { screen: '이체화면',   sec: 95 },
  { screen: '상품안내',   sec: 127 },
  { screen: '계좌내역',   sec: 68 },
  { screen: '알림함',     sec: 31 },
];

const RATINGS = [5, 4, 3, 2, 1].map(star => ({
  star,
  count: [1240, 830, 320, 110, 58][5 - star],
}));
const TOTAL_RATINGS = RATINGS.reduce((s, r) => s + r.count, 0);
const AVG_RATING = RATINGS.reduce((s, r) => s + r.star * r.count, 0) / TOTAL_RATINGS;

const NPS = { promoters: 52, passives: 31, detractors: 17 };
const NPS_SCORE = NPS.promoters - NPS.detractors;

const AB_TESTS = [
  {
    id: 1,
    name: '이체 CTA 버튼 문구',
    status: 'running',
    variants: [
      { name: 'A (이체하기)',   users: 12400, conv: 18.2, highlight: false },
      { name: 'B (바로 보내기)', users: 12350, conv: 21.7, highlight: true  },
    ],
    confidence: 94,
    winner: 'B',
  },
  {
    id: 2,
    name: '메인 배너 위치',
    status: 'completed',
    variants: [
      { name: 'A (상단)',  users: 9800, conv: 6.8,  highlight: false },
      { name: 'B (중단)',  users: 9750, conv: 9.4,  highlight: true  },
    ],
    confidence: 99,
    winner: 'B',
  },
  {
    id: 3,
    name: '적금 상품 카드 디자인',
    status: 'running',
    variants: [
      { name: 'A (기존)',    users: 7200, conv: 4.1, highlight: false },
      { name: 'B (리뉴얼)', users: 7180, conv: 4.3, highlight: false },
    ],
    confidence: 61,
    winner: null,
  },
];

/* ══════════════════════════════════════════
   SVG Chart Components
══════════════════════════════════════════ */

function LineChart({ series, labels, colors = ['#287eff', '#00b074'], height = 180 }: {
  series: number[][];
  labels: string[];
  colors?: string[];
  height?: number;
}) {
  const W = 560;
  const H = height;
  const PAD = { top: 16, right: 24, bottom: 28, left: 48 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const allVals = series.flat();
  const minV = Math.min(...allVals) * 0.9;
  const maxV = Math.max(...allVals) * 1.05;

  const toX = (i: number) => PAD.left + (i / (labels.length - 1)) * chartW;
  const toY = (v: number) => PAD.top + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const GRID_LINES = 4;
  const gridVals = Array.from({ length: GRID_LINES + 1 }, (_, i) =>
    minV + ((maxV - minV) / GRID_LINES) * i
  );

  const labelStep = Math.ceil(labels.length / 7);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }}>
      {/* Grid */}
      {gridVals.map((v, i) => (
        <g key={i}>
          <line
            x1={PAD.left} x2={W - PAD.right}
            y1={toY(v)} y2={toY(v)}
            stroke="#ebebeb" strokeWidth="1"
          />
          <text x={PAD.left - 6} y={toY(v) + 4} textAnchor="end"
            fontSize="10" fill="#999">
            {v >= 1000 ? `${(v / 1000).toFixed(0)}k` : Math.round(v)}
          </text>
        </g>
      ))}

      {/* X labels */}
      {labels.map((l, i) => i % labelStep === 0 && (
        <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#999">{l}</text>
      ))}

      {/* Lines + Areas */}
      {series.map((data, si) => {
        const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
        const areaPath = `M${toX(0)},${PAD.top + chartH} ` +
          data.map((v, i) => `L${toX(i)},${toY(v)}`).join(' ') +
          ` L${toX(data.length - 1)},${PAD.top + chartH} Z`;

        return (
          <g key={si}>
            <path d={areaPath} fill={colors[si]} opacity={0.08} />
            <polyline points={pts} fill="none" stroke={colors[si]} strokeWidth="2" strokeLinejoin="round" />
            {data.map((v, i) => (
              <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill={colors[si]} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ data, maxVal, color = '#287eff' }: {
  data: { label: string; value: number; color?: string }[];
  maxVal?: number;
  color?: string;
}) {
  const max = maxVal ?? Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {data.map(({ label, value, color: c }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#444', width: 80, textAlign: 'right', flexShrink: 0 }}>{label}</span>
          <div style={{ flex: 1, height: 20, background: '#f2f2f2', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: `${(value / max) * 100}%`, height: '100%',
              background: c ?? color, borderRadius: 4,
              transition: 'width 0.4s',
            }} />
          </div>
          <span style={{ fontSize: 12, color: '#444', width: 48, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
            {value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments, size = 120 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const R = 40; const r = 24; const cx = 50; const cy = 50;
  let cumulative = 0;

  const arc = (startPct: number, endPct: number, outer: number, inner: number) => {
    const startAngle = startPct * 2 * Math.PI - Math.PI / 2;
    const endAngle   = endPct   * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + outer * Math.cos(startAngle);
    const y1 = cy + outer * Math.sin(startAngle);
    const x2 = cx + outer * Math.cos(endAngle);
    const y2 = cy + outer * Math.sin(endAngle);
    const x3 = cx + inner * Math.cos(endAngle);
    const y3 = cy + inner * Math.sin(endAngle);
    const x4 = cx + inner * Math.cos(startAngle);
    const y4 = cy + inner * Math.sin(startAngle);
    const large = endPct - startPct > 0.5 ? 1 : 0;
    return `M${x1},${y1} A${outer},${outer},0,${large},1,${x2},${y2} L${x3},${y3} A${inner},${inner},0,${large},0,${x4},${y4} Z`;
  };

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      {segments.map((seg) => {
        const start = cumulative / total;
        cumulative += seg.value;
        const end = cumulative / total;
        return <path key={seg.label} d={arc(start, end, R, r)} fill={seg.color} />;
      })}
    </svg>
  );
}

function FunnelChart({ data }: { data: { step: string; count: number; color: string }[] }) {
  const max = data[0].count;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
      {data.map((item, i) => {
        const pct = (item.count / max) * 100;
        const dropPct = i > 0
          ? (((data[i - 1].count - item.count) / data[i - 1].count) * 100).toFixed(1)
          : null;
        return (
          <div key={item.step}>
            {dropPct && (
              <div style={{
                textAlign: 'center', fontSize: 11, color: '#ff3232',
                padding: '4px 0', lineHeight: 1,
              }}>
                ↓ {dropPct}% 이탈
              </div>
            )}
            <div style={{
              width: `${pct}%`,
              minWidth: 120,
              margin: '0 auto',
              background: item.color,
              borderRadius: 4,
              padding: '9px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {item.step}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, whiteSpace: 'nowrap' }}>
                {item.count.toLocaleString()} · {pct.toFixed(1)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   Shared UI
══════════════════════════════════════════ */

function KpiCard({ label, value, sub, delta, icon, color = '#287eff' }: {
  label: string; value: string; sub?: string;
  delta?: { value: number; label: string };
  icon: string; color?: string;
}) {
  const up = (delta?.value ?? 0) >= 0;
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '20px 22px',
      border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="caption" color="muted">{label}</Typography>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon as any} size="lg" color={color} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#222', lineHeight: 1.1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: '#767676', marginTop: 4 }}>{sub}</div>}
      </div>
      {delta && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name={up ? 'arrowUp' : 'arrowDown'} size="sm" color={up ? '#00b074' : '#ff3232'} />
          <span style={{ fontSize: 12, color: up ? '#00b074' : '#ff3232', fontWeight: 600 }}>
            {up ? '+' : ''}{delta.value}%
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>{delta.label}</span>
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, children, action }: {
  title: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '22px 24px',
      border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Typography variant="label" style={{ fontWeight: 700, color: '#253349' }}>{title}</Typography>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Page
══════════════════════════════════════════ */

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('15d');
  const [abFilter, setAbFilter] = useState<'all' | 'running' | 'completed'>('all');

  const filteredTests = AB_TESTS.filter(t => abFilter === 'all' || t.status === abFilter);

  return (
    <div className={styles.page}>
      {/* ── Page Header ── */}
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">데이터 분석</Typography>
          <Typography variant="body2" color="muted">실시간 사용자 행동 · 배너 성과 · 피드백 · A/B 테스트</Typography>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['7d', '15d', '30d', '90d'].map(d => (
            <button key={d} onClick={() => setDateRange(d)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              border: '1px solid', fontWeight: dateRange === d ? 700 : 400,
              background: dateRange === d ? '#253349' : '#fff',
              color: dateRange === d ? '#fff' : '#444',
              borderColor: dateRange === d ? '#253349' : '#d2d2d2',
              transition: 'all 0.15s',
            }}>
              {d === '7d' ? '7일' : d === '15d' ? '15일' : d === '30d' ? '30일' : '90일'}
            </button>
          ))}
        </div>
      </header>

      {/* ── KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <KpiCard label="DAU (일 활성 사용자)" value="85,241" sub="전일 대비" delta={{ value: 5.2, label: 'vs 전일' }} icon="users" color="#287eff" />
        <KpiCard label="리텐션 (D7)" value="68.4%" sub="7일 재방문율" delta={{ value: 2.1, label: 'vs 전주' }} icon="refresh" color="#00b074" />
        <KpiCard label="이체 전환율" value="17.1%" sub="이체 완료 / 이체 시작" delta={{ value: -0.8, label: 'vs 전일' }} icon="transfer" color="#f59e0b" />
        <KpiCard label="NPS 점수" value={`${NPS_SCORE}`} sub="순 추천 지수 (−100 ~ 100)" delta={{ value: 3, label: 'vs 전월' }} icon="success" color="#8b5cf6" />
      </div>

      {/* ── 트렌드 분석 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <SectionCard title="DAU / MAU 추이" action={
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#444' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#287eff', display: 'inline-block' }} /> DAU(만)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#444' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#00b074', display: 'inline-block' }} /> MAU(만)
            </span>
          </div>
        }>
          <LineChart series={[TREND_DAU, TREND_MAU]} labels={TREND_LABELS} colors={['#287eff', '#00b074']} />
        </SectionCard>

        <SectionCard title="화면별 평균 체류 시간 (초)">
          <div style={{ paddingTop: 8 }}>
            <BarChart
              data={SCREEN_TIME.map(d => ({ label: d.screen, value: d.sec, color: '#287eff' }))}
              color="#287eff"
            />
          </div>
        </SectionCard>
      </div>

      {/* ── 행위 트래킹 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <SectionCard title="이체 전환 퍼널">
          <FunnelChart data={FUNNEL} />
        </SectionCard>

        <SectionCard title="TOP 이벤트 (최근 15일)">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                <th style={{ textAlign: 'left', padding: '6px 0', color: '#767676', fontWeight: 600 }}>#</th>
                <th style={{ textAlign: 'left', padding: '6px 0', color: '#767676', fontWeight: 600 }}>이벤트명</th>
                <th style={{ textAlign: 'right', padding: '6px 0', color: '#767676', fontWeight: 600 }}>호출 수</th>
                <th style={{ textAlign: 'right', padding: '6px 0', color: '#767676', fontWeight: 600 }}>증감</th>
              </tr>
            </thead>
            <tbody>
              {TOP_EVENTS.map((ev, i) => (
                <tr key={ev.name} style={{ borderBottom: '1px solid #f7f7f7' }}>
                  <td style={{ padding: '10px 0', color: '#999', width: 24 }}>{i + 1}</td>
                  <td style={{ padding: '10px 0', color: '#222', fontWeight: 500 }}>{ev.name}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', color: '#444', fontVariantNumeric: 'tabular-nums' }}>
                    {ev.count.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 2,
                      color: ev.delta >= 0 ? '#00b074' : '#ff3232',
                      fontWeight: 600, fontSize: 12,
                    }}>
                      <Icon name={ev.delta >= 0 ? 'arrowUp' : 'arrowDown'} size="xs" />
                      {Math.abs(ev.delta)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      {/* ── 배너 성과 ── */}
      <div style={{ marginBottom: 28 }}>
        <SectionCard title="배너 성과">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ebebeb' }}>
                {['배너명', '상태', '노출 수', '클릭 수', 'CTR', '노출 비중'].map(h => (
                  <th key={h} style={{
                    textAlign: h === '배너명' || h === '상태' ? 'left' : 'right',
                    padding: '8px 12px', color: '#767676', fontWeight: 600, fontSize: 12,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BANNERS.map(b => {
                const maxImp = Math.max(...BANNERS.map(x => x.impressions));
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f7f7f7' }}>
                    <td style={{ padding: '12px 12px', color: '#222', fontWeight: 500 }}>{b.name}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <Badge variant={b.status === 'active' ? 'success' : b.status === 'paused' ? 'warning' : 'neutral'} dot size="sm">
                        {b.status === 'active' ? '운영중' : b.status === 'paused' ? '일시중지' : '종료'}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: '#444' }}>
                      {b.impressions.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: '#444' }}>
                      {b.clicks.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', fontWeight: 700, color: b.ctr >= 7 ? '#00b074' : '#444' }}>
                      {b.ctr}%
                    </td>
                    <td style={{ padding: '12px 12px', minWidth: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 8, background: '#f2f2f2', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{
                            width: `${(b.impressions / maxImp) * 100}%`, height: '100%',
                            background: '#287eff', borderRadius: 4,
                          }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#767676', width: 36, textAlign: 'right' }}>
                          {((b.impressions / BANNERS.reduce((s, x) => s + x.impressions, 0)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>
      </div>

      {/* ── 피드백 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <SectionCard title="앱 평점 분포">
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {/* 별점 평균 */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#253349', lineHeight: 1 }}>
                {AVG_RATING.toFixed(1)}
              </div>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '8px 0 4px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 16 16">
                    <path
                      d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z"
                      fill={s <= Math.round(AVG_RATING) ? '#fed700' : '#d2d2d2'}
                    />
                  </svg>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#767676' }}>{TOTAL_RATINGS.toLocaleString()}건</div>
            </div>
            {/* 바 차트 */}
            <div style={{ flex: 1 }}>
              {RATINGS.map(({ star, count }) => (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#444', width: 16, textAlign: 'right' }}>{star}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16">
                    <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" fill="#fed700" />
                  </svg>
                  <div style={{ flex: 1, height: 12, background: '#f2f2f2', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      width: `${(count / RATINGS[0].count) * 100}%`, height: '100%',
                      background: '#fed700', borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#767676', width: 36, textAlign: 'right' }}>
                    {((count / TOTAL_RATINGS) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="NPS (순 추천 지수)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* NPS Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontWeight: 800, color: NPS_SCORE >= 50 ? '#00b074' : NPS_SCORE >= 0 ? '#287eff' : '#ff3232', lineHeight: 1 }}>
                  {NPS_SCORE}
                </div>
                <div style={{ fontSize: 12, color: '#767676', marginTop: 4 }}>NPS Score</div>
              </div>
              <DonutChart
                segments={[
                  { label: '추천자', value: NPS.promoters,  color: '#00b074' },
                  { label: '중립자', value: NPS.passives,   color: '#d2d2d2' },
                  { label: '비추천', value: NPS.detractors, color: '#ff3232' },
                ]}
                size={100}
              />
            </div>
            {/* 범례 */}
            <div style={{ display: 'flex', gap: 24, width: '100%', justifyContent: 'center' }}>
              {[
                { label: '추천자 (9~10점)', value: NPS.promoters, color: '#00b074' },
                { label: '중립자 (7~8점)',  value: NPS.passives,  color: '#d2d2d2' },
                { label: '비추천 (0~6점)', value: NPS.detractors, color: '#ff3232' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color }}>{value}%</div>
                  <div style={{ fontSize: 11, color: '#767676', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── A/B 테스트 ── */}
      <div style={{ marginBottom: 28 }}>
        <SectionCard title="A/B 테스트" action={
          <div style={{ display: 'flex', gap: 8 }}>
            {(['all', 'running', 'completed'] as const).map(f => (
              <button key={f} onClick={() => setAbFilter(f)} style={{
                padding: '4px 12px', borderRadius: 16, fontSize: 12, cursor: 'pointer',
                border: '1px solid',
                background: abFilter === f ? '#253349' : '#fff',
                color: abFilter === f ? '#fff' : '#444',
                borderColor: abFilter === f ? '#253349' : '#d2d2d2',
              }}>
                {f === 'all' ? '전체' : f === 'running' ? '진행중' : '완료'}
              </button>
            ))}
          </div>
        }>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredTests.map(test => {
              const maxConv = Math.max(...test.variants.map(v => v.conv));
              return (
                <div key={test.id} style={{
                  border: '1px solid #ebebeb', borderRadius: 8, padding: '18px 20px',
                  background: test.status === 'completed' ? '#f7f7f7' : '#fff',
                }}>
                  {/* Test header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Typography variant="label" style={{ fontWeight: 700 }}>{test.name}</Typography>
                      <Badge variant={test.status === 'running' ? 'success' : 'neutral'} dot size="sm">
                        {test.status === 'running' ? '진행중' : '완료'}
                      </Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#767676' }}>
                      <Icon name="info" size="sm" color="#767676" />
                      신뢰도
                      <span style={{
                        fontWeight: 700,
                        color: test.confidence >= 95 ? '#00b074' : test.confidence >= 80 ? '#f59e0b' : '#767676',
                      }}>
                        {test.confidence}%
                      </span>
                      {test.winner && (
                        <Badge variant="success" size="sm">
                          Variant {test.winner} 승리
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Variants */}
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${test.variants.length}, 1fr)`, gap: 16 }}>
                    {test.variants.map(v => (
                      <div key={v.name} style={{
                        border: `2px solid ${v.highlight ? '#00b074' : '#ebebeb'}`,
                        borderRadius: 8, padding: '14px 16px',
                        background: v.highlight ? '#f0fdf8' : '#fff',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                          <Typography variant="caption" style={{ fontWeight: 600 }}>{v.name}</Typography>
                          {v.highlight && <Icon name="check" size="sm" color="#00b074" />}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: v.highlight ? '#00b074' : '#253349', marginBottom: 2 }}>
                          {v.conv}%
                        </div>
                        <div style={{ fontSize: 11, color: '#767676', marginBottom: 10 }}>전환율</div>
                        <div style={{ height: 8, background: '#f2f2f2', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{
                            width: `${(v.conv / maxConv) * 100}%`, height: '100%',
                            background: v.highlight ? '#00b074' : '#d2d2d2', borderRadius: 4,
                          }} />
                        </div>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 8 }}>
                          {v.users.toLocaleString()}명 참여
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
