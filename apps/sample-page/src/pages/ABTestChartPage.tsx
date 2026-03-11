import { useState } from 'react';
import { Badge, Button, Select, Icon } from '@starbanking/design-system';

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */

const AB_TESTS = [
  { id: 'ab1', name: 'AB-001 · 이체 CTA 버튼 문구', status: 'running' },
  { id: 'ab2', name: 'AB-002 · 메인 배너 위치',     status: 'completed' },
  { id: 'ab3', name: 'AB-003 · 적금 가입 플로우',   status: 'running' },
];

const KPI_DATA: Record<string, {
  metrics: { name: string; unit: string; a: number; b: number; better: 'higher' | 'lower' }[];
  trend: { labels: string[]; a: number[]; b: number[]; events: { idx: number; label: string; type: 'holiday' | 'promo' }[] };
  significance: { metric: string; pValue: number; ciA: [number, number]; ciB: [number, number]; significant: boolean }[];
  heatmap: number[][];
  scrollDepth: { depth: string; a: number; b: number }[];
  funnel: { step: string; a: number; b: number }[];
  segments: { name: string; group: string; aConv: number; bConv: number }[];
}> = {
  ab1: {
    metrics: [
      { name: '노출 수',      unit: '회',  a: 124800, b: 125200, better: 'higher' },
      { name: '클릭 수',      unit: '회',  a:  22640, b:  27144, better: 'higher' },
      { name: '클릭률(CTR)',  unit: '%',   a:   18.1, b:   21.7, better: 'higher' },
      { name: '전환율(CVR)',  unit: '%',   a:    8.4, b:   11.2, better: 'higher' },
      { name: '이탈률',       unit: '%',   a:   42.3, b:   37.8, better: 'lower'  },
      { name: '평균 체류시간', unit: '초', a:   94.2, b:  108.6, better: 'higher' },
    ],
    trend: {
      labels: ['3/1','3/2','3/3','3/4','3/5','3/6','3/7','3/8','3/9','3/10','3/11','3/12','3/13','3/14','3/15'],
      a: [18.0,18.2,17.9,18.3,17.8,18.5,18.1,18.4,18.0,18.6,18.2,18.8,18.3,18.1,18.5],
      b: [20.5,20.8,21.0,21.2,21.5,21.3,21.7,21.9,22.1,22.0,21.8,22.3,22.1,21.9,22.4],
      events: [
        { idx: 3,  label: '삼일절', type: 'holiday' },
        { idx: 8,  label: '봄 프로모션 시작', type: 'promo' },
        { idx: 12, label: '앱 업데이트', type: 'promo' },
      ],
    },
    significance: [
      { metric: '클릭률(CTR)', pValue: 0.012, ciA: [17.4, 18.8], ciB: [20.9, 22.5], significant: true },
      { metric: '전환율(CVR)', pValue: 0.031, ciA: [7.9,  8.9],  ciB: [10.6, 11.8], significant: true },
      { metric: '이탈률',      pValue: 0.089, ciA: [40.8, 43.8], ciB: [36.2, 39.4], significant: false },
    ],
    heatmap: [
      [1,2,2,3,4,4,3,2,2,1],
      [2,3,4,5,7,7,5,4,3,2],
      [2,4,6,8,9,9,8,6,4,2],
      [1,3,5,7,9,9,7,5,3,1],
      [1,2,4,6,8,8,6,4,2,1],
      [1,2,3,5,6,6,5,3,2,1],
      [2,3,5,7,8,8,7,5,3,2],
      [3,5,7,9,9,9,9,7,5,3],
      [2,4,6,8,8,8,8,6,4,2],
      [1,2,3,4,5,5,4,3,2,1],
    ],
    scrollDepth: [
      { depth: '0~25%',  a: 100, b: 100 },
      { depth: '25~50%', a:  82, b:  87 },
      { depth: '50~75%', a:  61, b:  71 },
      { depth: '75~100%',a:  44, b:  58 },
    ],
    funnel: [
      { step: '배너 노출',  a: 124800, b: 125200 },
      { step: '배너 클릭',  a:  22640, b:  27144 },
      { step: '상품 진입',  a:  18112, b:  23172 },
      { step: '신청 시작',  a:  12234, b:  16958 },
      { step: '신청 완료',  a:  10477, b:  14022 },
    ],
    segments: [
      { name: '20대',    group: '연령', aConv:  9.2, bConv: 13.1 },
      { name: '30대',    group: '연령', aConv:  8.8, bConv: 11.9 },
      { name: '40대',    group: '연령', aConv:  8.1, bConv: 10.7 },
      { name: '50대+',   group: '연령', aConv:  6.9, bConv:  9.1 },
      { name: '남성',    group: '성별', aConv:  8.2, bConv: 11.0 },
      { name: '여성',    group: '성별', aConv:  8.6, bConv: 11.4 },
      { name: 'VIP',     group: '등급', aConv: 12.4, bConv: 15.8 },
      { name: '일반',    group: '등급', aConv:  7.9, bConv: 10.6 },
      { name: '신규',    group: '등급', aConv:  5.1, bConv:  8.2 },
    ],
  },
  ab2: {
    metrics: [
      { name: '노출 수',      unit: '회',  a:  98200, b:  97800, better: 'higher' },
      { name: '클릭 수',      unit: '회',  a:   6678, b:   9192, better: 'higher' },
      { name: '클릭률(CTR)',  unit: '%',   a:    6.8, b:    9.4, better: 'higher' },
      { name: '전환율(CVR)',  unit: '%',   a:    3.2, b:    4.7, better: 'higher' },
      { name: '이탈률',       unit: '%',   a:   55.1, b:   48.3, better: 'lower'  },
      { name: '평균 체류시간', unit: '초', a:   72.0, b:   89.0, better: 'higher' },
    ],
    trend: {
      labels: ['3/1','3/2','3/3','3/4','3/5','3/6','3/7','3/8','3/9','3/10','3/11','3/12','3/13','3/14','3/15'],
      a: [6.8,6.7,6.9,6.8,7.0,6.9,6.8,6.7,6.9,6.8,6.8,6.9,6.7,6.8,6.9],
      b: [9.0,9.2,9.1,9.4,9.5,9.3,9.6,9.4,9.5,9.3,9.4,9.6,9.5,9.4,9.5],
      events: [
        { idx: 3,  label: '삼일절',  type: 'holiday' },
        { idx: 10, label: '이벤트 종료', type: 'promo' },
      ],
    },
    significance: [
      { metric: '클릭률(CTR)', pValue: 0.001, ciA: [6.4, 7.2], ciB: [9.0, 9.8], significant: true },
      { metric: '전환율(CVR)', pValue: 0.003, ciA: [2.9, 3.5], ciB: [4.4, 5.0], significant: true },
      { metric: '이탈률',      pValue: 0.021, ciA: [53.2, 57.0], ciB: [46.4, 50.2], significant: true },
    ],
    heatmap: [
      [1,2,3,4,5,5,4,3,2,1],
      [2,3,5,6,7,7,6,5,3,2],
      [2,4,6,7,8,8,7,6,4,2],
      [1,3,4,6,8,8,6,4,3,1],
      [1,2,3,5,7,7,5,3,2,1],
      [1,2,3,4,5,5,4,3,2,1],
      [2,3,4,6,7,7,6,4,3,2],
      [2,4,6,8,9,9,8,6,4,2],
      [1,3,5,7,7,7,7,5,3,1],
      [1,1,2,3,4,4,3,2,1,1],
    ],
    scrollDepth: [
      { depth: '0~25%',  a: 100, b: 100 },
      { depth: '25~50%', a:  74, b:  81 },
      { depth: '50~75%', a:  51, b:  63 },
      { depth: '75~100%',a:  35, b:  49 },
    ],
    funnel: [
      { step: '배너 노출',  a: 98200, b: 97800 },
      { step: '배너 클릭',  a:  6678, b:  9192 },
      { step: '상품 진입',  a:  5342, b:  7822 },
      { step: '신청 시작',  a:  3810, b:  5876 },
      { step: '신청 완료',  a:  3142, b:  4594 },
    ],
    segments: [
      { name: '20대',  group: '연령', aConv: 3.8, bConv: 5.6 },
      { name: '30대',  group: '연령', aConv: 3.4, bConv: 5.0 },
      { name: '40대',  group: '연령', aConv: 2.9, bConv: 4.3 },
      { name: '50대+', group: '연령', aConv: 2.4, bConv: 3.6 },
      { name: '남성',  group: '성별', aConv: 3.1, bConv: 4.6 },
      { name: '여성',  group: '성별', aConv: 3.3, bConv: 4.9 },
      { name: 'VIP',   group: '등급', aConv: 5.8, bConv: 8.2 },
      { name: '일반',  group: '등급', aConv: 3.0, bConv: 4.5 },
      { name: '신규',  group: '등급', aConv: 1.8, bConv: 3.1 },
    ],
  },
  ab3: {
    metrics: [
      { name: '노출 수',      unit: '회',  a:  88400, b:  89100, better: 'higher' },
      { name: '클릭 수',      unit: '회',  a:  15912, b:  18711, better: 'higher' },
      { name: '클릭률(CTR)',  unit: '%',   a:   18.0, b:   21.0, better: 'higher' },
      { name: '전환율(CVR)',  unit: '%',   a:    6.1, b:    8.3, better: 'higher' },
      { name: '이탈률',       unit: '%',   a:   48.7, b:   41.2, better: 'lower'  },
      { name: '평균 체류시간', unit: '초', a:  112.0, b:  138.0, better: 'higher' },
    ],
    trend: {
      labels: ['3/1','3/2','3/3','3/4','3/5','3/6','3/7','3/8','3/9','3/10','3/11','3/12','3/13','3/14','3/15'],
      a: [17.8,18.0,17.9,18.1,18.2,17.8,18.0,18.1,17.9,18.3,18.1,17.8,18.2,18.0,17.9],
      b: [20.2,20.5,20.8,21.0,21.3,21.0,21.2,21.5,21.3,21.6,21.4,21.1,21.5,21.3,21.0],
      events: [
        { idx: 3,  label: '삼일절',       type: 'holiday' },
        { idx: 6,  label: '적금 프로모션', type: 'promo'   },
        { idx: 11, label: '앱 업데이트',   type: 'promo'   },
      ],
    },
    significance: [
      { metric: '클릭률(CTR)', pValue: 0.022, ciA: [17.3, 18.7], ciB: [20.3, 21.7], significant: true },
      { metric: '전환율(CVR)', pValue: 0.065, ciA: [5.7, 6.5],   ciB: [7.9, 8.7],   significant: false },
      { metric: '이탈률',      pValue: 0.041, ciA: [47.1, 50.3], ciB: [39.6, 42.8], significant: true },
    ],
    heatmap: [
      [1,2,3,3,4,4,3,3,2,1],
      [2,3,4,5,6,6,5,4,3,2],
      [3,4,6,7,8,8,7,6,4,3],
      [2,4,5,7,8,8,7,5,4,2],
      [2,3,4,6,7,7,6,4,3,2],
      [1,2,3,5,6,6,5,3,2,1],
      [2,3,5,6,7,7,6,5,3,2],
      [3,5,7,8,9,9,8,7,5,3],
      [2,4,5,7,7,7,7,5,4,2],
      [1,2,3,4,5,5,4,3,2,1],
    ],
    scrollDepth: [
      { depth: '0~25%',  a: 100, b: 100 },
      { depth: '25~50%', a:  79, b:  85 },
      { depth: '50~75%', a:  57, b:  68 },
      { depth: '75~100%',a:  41, b:  55 },
    ],
    funnel: [
      { step: '배너 노출',  a: 88400, b: 89100 },
      { step: '배너 클릭',  a: 15912, b: 18711 },
      { step: '상품 진입',  a: 12730, b: 15904 },
      { step: '신청 시작',  a:  8740, b: 12180 },
      { step: '신청 완료',  a:  5392, b:  7392 },
    ],
    segments: [
      { name: '20대',  group: '연령', aConv: 7.2, bConv:  9.8 },
      { name: '30대',  group: '연령', aConv: 6.5, bConv:  8.9 },
      { name: '40대',  group: '연령', aConv: 5.8, bConv:  7.7 },
      { name: '50대+', group: '연령', aConv: 4.9, bConv:  6.4 },
      { name: '남성',  group: '성별', aConv: 5.9, bConv:  8.0 },
      { name: '여성',  group: '성별', aConv: 6.3, bConv:  8.6 },
      { name: 'VIP',   group: '등급', aConv: 9.4, bConv: 12.2 },
      { name: '일반',  group: '등급', aConv: 5.8, bConv:  8.0 },
      { name: '신규',  group: '등급', aConv: 3.2, bConv:  5.1 },
    ],
  },
};

/* ══════════════════════════════════════════
   Sub components
══════════════════════════════════════════ */

function fmtNum(v: number, unit: string) {
  if (unit === '회' && v >= 1000) return (v / 1000).toFixed(1) + 'K';
  if (unit === '%') return v.toFixed(1) + '%';
  if (unit === '초') return v.toFixed(0) + '초';
  return v.toLocaleString();
}

function KpiCard({ name, unit, a, b, better }: {
  name: string; unit: string; a: number; b: number; better: 'higher' | 'lower';
}) {
  const diff = ((b - a) / a * 100);
  const bWins = better === 'higher' ? b > a : b < a;
  const diffStr = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%';

  return (
    <div style={{
      background: 'var(--ds-surface)',
      border: '1px solid var(--ds-border)',
      borderRadius: 8,
      padding: '16px',
    }}>
      <div style={{ fontSize: 11, color: 'var(--ds-text-muted)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{name}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* A */}
        <div style={{ padding: '10px 12px', background: 'rgba(37,51,73,0.06)', borderRadius: 6, borderLeft: '3px solid #253349' }}>
          <div style={{ fontSize: 10, color: 'var(--ds-text-muted)', marginBottom: 4 }}>A안</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ds-text)' }}>{fmtNum(a, unit)}</div>
        </div>
        {/* B */}
        <div style={{ padding: '10px 12px', background: bWins ? 'rgba(0,176,116,0.08)' : 'rgba(248,113,113,0.08)', borderRadius: 6, borderLeft: `3px solid ${bWins ? '#00b074' : '#f87171'}` }}>
          <div style={{ fontSize: 10, color: 'var(--ds-text-muted)', marginBottom: 4 }}>B안</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ds-text)' }}>{fmtNum(b, unit)}</div>
        </div>
      </div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: bWins ? '#00b074' : '#f87171' }}>{diffStr}</span>
        <span style={{ fontSize: 11, color: 'var(--ds-text-muted)' }}>B vs A</span>
        {bWins && <Badge variant="success" size="sm">B 우세</Badge>}
      </div>
    </div>
  );
}

function TrendChart({ labels, a, b, events, metric }: {
  labels: string[]; a: number[]; b: number[]; events: { idx: number; label: string; type: string }[]; metric: string;
}) {
  const W = 700, H = 220, PAD = { t: 30, r: 20, b: 36, l: 44 };
  const allVals = [...a, ...b];
  const minV = Math.min(...allVals) * 0.95;
  const maxV = Math.max(...allVals) * 1.05;
  const xScale = (i: number) => PAD.l + i * (W - PAD.l - PAD.r) / (labels.length - 1);
  const yScale = (v: number) => PAD.t + (1 - (v - minV) / (maxV - minV)) * (H - PAD.t - PAD.b);

  const toPath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`).join(' ');

  const yTicks = 4;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => minV + (maxV - minV) * i / yTicks);

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={W} height={H} style={{ display: 'block', minWidth: W }}>
        {/* Grid */}
        {yTickVals.map((v, i) => (
          <g key={i}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yScale(v)} y2={yScale(v)} stroke="var(--ds-border)" strokeWidth={0.5} />
            <text x={PAD.l - 6} y={yScale(v) + 4} textAnchor="end" fontSize={9} fill="var(--ds-text-muted)">{v.toFixed(1)}</text>
          </g>
        ))}
        {/* X labels */}
        {labels.map((l, i) => i % 3 === 0 && (
          <text key={i} x={xScale(i)} y={H - 4} textAnchor="middle" fontSize={9} fill="var(--ds-text-muted)">{l}</text>
        ))}
        {/* Event annotations */}
        {events.map((ev, i) => (
          <g key={i}>
            <line
              x1={xScale(ev.idx)} x2={xScale(ev.idx)}
              y1={PAD.t} y2={H - PAD.b}
              stroke={ev.type === 'holiday' ? '#ff8b00' : '#287eff'}
              strokeWidth={1.5} strokeDasharray="4 3"
            />
            <rect x={xScale(ev.idx) - 3} y={PAD.t - 18} width={ev.label.length * 6 + 8} height={16} rx={3}
              fill={ev.type === 'holiday' ? '#fff3cd' : '#dbeafe'}
              stroke={ev.type === 'holiday' ? '#ff8b00' : '#287eff'} strokeWidth={0.5}
            />
            <text x={xScale(ev.idx) + 1} y={PAD.t - 6} fontSize={9} fill={ev.type === 'holiday' ? '#b85e00' : '#1e40af'}>{ev.label}</text>
          </g>
        ))}
        {/* Area A */}
        <path
          d={toPath(a) + ` L${xScale(a.length - 1)},${H - PAD.b} L${xScale(0)},${H - PAD.b} Z`}
          fill="rgba(37,51,73,0.06)"
        />
        {/* Area B */}
        <path
          d={toPath(b) + ` L${xScale(b.length - 1)},${H - PAD.b} L${xScale(0)},${H - PAD.b} Z`}
          fill="rgba(0,176,116,0.06)"
        />
        {/* Line A */}
        <path d={toPath(a)} fill="none" stroke="#253349" strokeWidth={2} />
        {/* Line B */}
        <path d={toPath(b)} fill="none" stroke="#00b074" strokeWidth={2} />
        {/* Dots A */}
        {a.map((v, i) => <circle key={i} cx={xScale(i)} cy={yScale(v)} r={3} fill="#253349" />)}
        {/* Dots B */}
        {b.map((v, i) => <circle key={i} cx={xScale(i)} cy={yScale(v)} r={3} fill="#00b074" />)}
      </svg>
      <div style={{ display: 'flex', gap: 20, marginTop: 8, paddingLeft: PAD.l }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ds-text-2)' }}>
          <span style={{ width: 24, height: 3, background: '#253349', borderRadius: 2, display: 'inline-block' }} />
          A안 · {metric}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ds-text-2)' }}>
          <span style={{ width: 24, height: 3, background: '#00b074', borderRadius: 2, display: 'inline-block' }} />
          B안 · {metric}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ds-text-muted)' }}>
          <span style={{ width: 16, height: 2, borderTop: '2px dashed #ff8b00', display: 'inline-block' }} />
          공휴일
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ds-text-muted)' }}>
          <span style={{ width: 16, height: 2, borderTop: '2px dashed #287eff', display: 'inline-block' }} />
          이벤트
        </div>
      </div>
    </div>
  );
}

function SignificanceRow({ metric, pValue, ciA, ciB, significant }: {
  metric: string; pValue: number; ciA: [number, number]; ciB: [number, number]; significant: boolean;
}) {
  const minAll = Math.min(ciA[0], ciB[0]);
  const maxAll = Math.max(ciA[1], ciB[1]);
  const range = maxAll - minAll || 1;
  const toX = (v: number) => ((v - minAll) / range * 100).toFixed(1) + '%';
  const toW = (lo: number, hi: number) => ((hi - lo) / range * 100).toFixed(1) + '%';

  return (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--ds-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ds-text)' }}>{metric}</span>
          {significant
            ? <Badge variant="success" size="sm">유의함 ✓</Badge>
            : <Badge variant="warning" size="sm">유의하지 않음</Badge>
          }
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--ds-text-muted)' }}>
          <span>P-Value: <strong style={{ color: pValue < 0.05 ? '#00b074' : '#ff8b00' }}>{pValue.toFixed(3)}</strong></span>
          <span style={{ color: 'var(--ds-text-muted)', fontSize: 11 }}>(α = 0.05)</span>
        </div>
      </div>
      {/* CI bar */}
      <div style={{ position: 'relative', height: 48 }}>
        <div style={{ position: 'absolute', top: 4, left: 0, right: 0, height: 40 }}>
          {/* A CI */}
          <div style={{ position: 'absolute', top: 4, height: 16, left: toX(ciA[0]), width: toW(ciA[0], ciA[1]), background: 'rgba(37,51,73,0.2)', borderRadius: 4, border: '1px solid #253349' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 8, height: 8, background: '#253349', borderRadius: '50%' }} />
          </div>
          <div style={{ position: 'absolute', top: 4, left: toX(ciA[0]), fontSize: 10, color: '#253349', marginTop: 20, whiteSpace: 'nowrap' }}>
            A: {ciA[0].toFixed(1)}~{ciA[1].toFixed(1)}
          </div>
          {/* B CI */}
          <div style={{ position: 'absolute', top: 24, height: 16, left: toX(ciB[0]), width: toW(ciB[0], ciB[1]), background: 'rgba(0,176,116,0.2)', borderRadius: 4, border: '1px solid #00b074' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 8, height: 8, background: '#00b074', borderRadius: '50%' }} />
          </div>
          <div style={{ position: 'absolute', top: 24, left: toX(ciB[0]), fontSize: 10, color: '#00b074', marginTop: 20, whiteSpace: 'nowrap' }}>
            B: {ciB[0].toFixed(1)}~{ciB[1].toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Heatmap({ data }: { data: number[][] }) {
  const max = Math.max(...data.flat());
  const colors = ['#eef2ff','#c7d2fe','#a5b4fc','#818cf8','#6366f1','#4f46e5','#4338ca','#3730a3','#312e81','#1e1b4b'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 2 }}>
          {row.map((v, ci) => (
            <div key={ci} title={`클릭 강도: ${v}`} style={{
              width: 28, height: 28, borderRadius: 3,
              background: colors[Math.min(Math.floor(v / max * colors.length), colors.length - 1)],
              opacity: 0.8 + (v / max) * 0.2,
            }} />
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--ds-text-muted)' }}>낮음</span>
        {colors.map((c, i) => <div key={i} style={{ width: 16, height: 10, background: c, borderRadius: 2 }} />)}
        <span style={{ fontSize: 10, color: 'var(--ds-text-muted)' }}>높음</span>
      </div>
    </div>
  );
}

function ScrollDepthChart({ data }: { data: { depth: string; a: number; b: number }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.map((row, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: 'var(--ds-text-2)', fontWeight: 600 }}>{row.depth}</span>
            <span style={{ color: 'var(--ds-text-muted)' }}>A: {row.a}% / B: {row.b}%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, width: 20, color: '#253349', fontWeight: 600 }}>A</span>
              <div style={{ flex: 1, height: 10, background: 'var(--ds-border-light)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ width: row.a + '%', height: '100%', background: '#253349', borderRadius: 5, transition: 'width 0.6s ease' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, width: 20, color: '#00b074', fontWeight: 600 }}>B</span>
              <div style={{ flex: 1, height: 10, background: 'var(--ds-border-light)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ width: row.b + '%', height: '100%', background: '#00b074', borderRadius: 5, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FunnelABChart({ data }: { data: { step: string; a: number; b: number }[] }) {
  const maxVal = data[0].a;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {data.map((row, i) => {
        const pctA = (row.a / maxVal * 100).toFixed(0);
        const pctB = (row.b / maxVal * 100).toFixed(0);
        const convA = i > 0 ? (row.a / data[i - 1].a * 100).toFixed(1) : null;
        const convB = i > 0 ? (row.b / data[i - 1].b * 100).toFixed(1) : null;
        return (
          <div key={i}>
            {i > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32, padding: '2px 0', fontSize: 10, color: 'var(--ds-text-muted)' }}>
                <span>↓ A {convA}%</span>
                <span>↓ B {convB}%</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 72, fontSize: 11, fontWeight: 600, color: 'var(--ds-text-2)', textAlign: 'right', flexShrink: 0 }}>{row.step}</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: pctA + '%', height: 14, background: '#253349', borderRadius: 3, minWidth: 4, transition: 'width 0.5s ease' }} />
                  <span style={{ fontSize: 10, color: 'var(--ds-text-muted)', whiteSpace: 'nowrap' }}>{row.a.toLocaleString()} ({pctA}%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: pctB + '%', height: 14, background: '#00b074', borderRadius: 3, minWidth: 4, transition: 'width 0.5s ease' }} />
                  <span style={{ fontSize: 10, color: 'var(--ds-text-muted)', whiteSpace: 'nowrap' }}>{row.b.toLocaleString()} ({pctB}%)</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ds-text-muted)' }}>
          <span style={{ width: 16, height: 6, background: '#253349', borderRadius: 2, display: 'inline-block' }} />A안
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ds-text-muted)' }}>
          <span style={{ width: 16, height: 6, background: '#00b074', borderRadius: 2, display: 'inline-block' }} />B안
        </div>
      </div>
    </div>
  );
}

function SegmentTable({ data }: { data: { name: string; group: string; aConv: number; bConv: number }[] }) {
  const groups = [...new Set(data.map(d => d.group))];
  return (
    <div>
      {groups.map(group => (
        <div key={group} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ds-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group}</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ds-border)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--ds-text-muted)', fontWeight: 600 }}>세그먼트</th>
                <th style={{ padding: '6px 10px', textAlign: 'right', color: '#253349', fontWeight: 600 }}>A 전환율</th>
                <th style={{ padding: '6px 10px', textAlign: 'right', color: '#00b074', fontWeight: 600 }}>B 전환율</th>
                <th style={{ padding: '6px 10px', textAlign: 'right', color: 'var(--ds-text-muted)', fontWeight: 600 }}>차이</th>
                <th style={{ padding: '6px 10px', textAlign: 'center', color: 'var(--ds-text-muted)', fontWeight: 600 }}>승자</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(d => d.group === group).map((row, i) => {
                const diff = row.bConv - row.aConv;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--ds-border-light)' }}>
                    <td style={{ padding: '8px 10px', color: 'var(--ds-text-2)', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', color: 'var(--ds-text)' }}>{row.aConv.toFixed(1)}%</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', color: 'var(--ds-text)', fontWeight: 600 }}>{row.bConv.toFixed(1)}%</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', color: diff > 0 ? '#00b074' : '#f87171', fontWeight: 600 }}>
                      +{diff.toFixed(1)}%p
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                      <Badge variant="success" size="sm">B안</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Page
══════════════════════════════════════════ */

const PERIODS = [
  { value: '7d',  label: '7일' },
  { value: '15d', label: '15일' },
  { value: '30d', label: '30일' },
];

const TREND_METRICS = [
  { value: 'ctr',  label: '클릭률(CTR)' },
  { value: 'cvr',  label: '전환율(CVR)' },
  { value: 'bounce', label: '이탈률' },
  { value: 'dwell', label: '평균 체류시간' },
];

type EmailFreq = 'daily' | 'weekly' | 'monthly';

export default function ABTestChartPage() {
  const [selectedTest, setSelectedTest] = useState('ab1');
  const [period, setPeriod] = useState('15d');
  const [trendMetric, setTrendMetric] = useState('ctr');
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [emailFreq, setEmailFreq] = useState<EmailFreq>('weekly');
  const [emailAddr, setEmailAddr] = useState('admin@starbanking.com');

  const test = AB_TESTS.find(t => t.id === selectedTest)!;
  const data = KPI_DATA[selectedTest];

  // pick trend series based on selected metric
  const trendSeries = (() => {
    const m = data.metrics;
    switch (trendMetric) {
      case 'ctr':    return { a: data.trend.a, b: data.trend.b, label: '클릭률(CTR)' };
      case 'cvr':    return { a: data.trend.a.map(v => v * 0.45), b: data.trend.b.map(v => v * 0.51), label: '전환율(CVR)' };
      case 'bounce': return { a: m[4].a > 0 ? data.trend.a.map(v => 100 - v * 1.3) : data.trend.a, b: data.trend.b.map(v => 100 - v * 1.2), label: '이탈률' };
      case 'dwell':  return { a: data.trend.a.map(v => v * 5.2), b: data.trend.b.map(v => v * 5.9), label: '평균 체류시간(초)' };
      default:       return { a: data.trend.a, b: data.trend.b, label: '클릭률(CTR)' };
    }
  })();

  const card = (title: string, children: React.ReactNode, extra?: React.ReactNode) => (
    <div style={{ background: 'var(--ds-surface)', border: '1px solid var(--ds-border)', borderRadius: 10, padding: 24, marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ds-text)' }}>{title}</h3>
        {extra}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: 960, paddingBottom: 60 }}>
      {/* ── 필터 헤더 ── */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24, padding: '16px 20px', background: 'var(--ds-surface)', border: '1px solid var(--ds-border)', borderRadius: 10 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 11, color: 'var(--ds-text-muted)', marginBottom: 4, fontWeight: 600 }}>테스트 선택</div>
          <Select
            value={selectedTest}
            onChange={e => setSelectedTest(e.target.value)}
            options={AB_TESTS.map(t => ({ value: t.id, label: t.name }))}
          />
        </div>
        <div style={{ minWidth: 120 }}>
          <div style={{ fontSize: 11, color: 'var(--ds-text-muted)', marginBottom: 4, fontWeight: 600 }}>분석 기간</div>
          <Select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            options={PERIODS.map(p => ({ value: p.value, label: p.label }))}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', paddingTop: 18 }}>
          <Button size="sm" variant="outline" leftIcon={<Icon name="download" size="sm" />}>Excel</Button>
          <Button size="sm" variant="outline" leftIcon={<Icon name="download" size="sm" />}>PDF</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 18 }}>
          <Badge variant={test.status === 'running' ? 'success' : 'info'} size="sm">
            {test.status === 'running' ? '진행 중' : '완료'}
          </Badge>
        </div>
      </div>

      {/* ── 1. KPI 대시보드 ── */}
      {card(
        '핵심 지표(KPI) — A · B 안 비교',
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {data.metrics.map((m, i) => <KpiCard key={i} {...m} />)}
        </div>,
      )}

      {/* ── 2. 시계열 추이 차트 ── */}
      {card(
        '시계열 추이 차트',
        <TrendChart labels={data.trend.labels} a={trendSeries.a} b={trendSeries.b} events={data.trend.events} metric={trendSeries.label} />,
        <Select
          value={trendMetric}
          onChange={e => setTrendMetric(e.target.value)}
          options={TREND_METRICS.map(m => ({ value: m.value, label: m.label }))}
          size="sm"
          style={{ width: 160 }}
        />,
      )}

      {/* ── 3. 통계적 유의성 ── */}
      {card(
        '통계적 유의성 검증 (95% 신뢰구간)',
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, padding: '10px 14px', background: 'var(--ds-surface-disabled)', borderRadius: 8, fontSize: 12 }}>
            <Icon name="info" size="sm" color="var(--ds-text-muted)" />
            <span style={{ color: 'var(--ds-text-muted)' }}>P-Value &lt; 0.05 이면 통계적으로 유의합니다. 신뢰구간이 겹치지 않을수록 차이가 명확합니다.</span>
            <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
              <input type="checkbox" checked={notifyEnabled} onChange={e => setNotifyEnabled(e.target.checked)} />
              <span style={{ fontSize: 12, color: 'var(--ds-text-2)' }}>유의성 도달 시 어드민 알림</span>
            </label>
          </div>
          {data.significance.map((s, i) => <SignificanceRow key={i} {...s} />)}
        </div>,
      )}

      {/* ── 4. 사용자 행태 분석 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* 클릭 히트맵 */}
        <div style={{ background: 'var(--ds-surface)', border: '1px solid var(--ds-border)', borderRadius: 10, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: 'var(--ds-text)' }}>클릭 히트맵 (B안)</h3>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 36, flexShrink: 0, background: 'var(--ds-surface-disabled)', borderRadius: 6, padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 20, height: 20, background: 'var(--ds-border)', borderRadius: 10, marginBottom: 4 }} />
              <div style={{ width: 28, height: 4, background: 'var(--ds-border)', borderRadius: 2, marginBottom: 2 }} />
              <div style={{ width: 28, height: 280, background: 'var(--ds-border-light)', borderRadius: 4, margin: '4px 0', position: 'relative', overflow: 'hidden' }}>
                <Heatmap data={data.heatmap} />
              </div>
              <div style={{ width: 28, height: 28, background: 'var(--ds-border)', borderRadius: 4 }} />
            </div>
            <Heatmap data={data.heatmap} />
          </div>
        </div>
        {/* 스크롤 깊이 */}
        <div style={{ background: 'var(--ds-surface)', border: '1px solid var(--ds-border)', borderRadius: 10, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: 'var(--ds-text)' }}>스크롤 깊이</h3>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--ds-text-muted)' }}>화면 깊이별 사용자 잔류 비율 (%)</p>
          <ScrollDepthChart data={data.scrollDepth} />
        </div>
      </div>

      {/* 이벤트 퍼널 */}
      {card(
        '이벤트 퍼널 분석',
        <FunnelABChart data={data.funnel} />,
      )}

      {/* ── 5. 세그먼트별 성과 ── */}
      {card(
        '세그먼트별 전환율 성과',
        <SegmentTable data={data.segments} />,
      )}

      {/* ── 6. 리포트 내보내기 ── */}
      {card(
        '리포트 내보내기 설정',
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* 즉시 내보내기 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ds-text-2)', marginBottom: 14 }}>즉시 내보내기</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button variant="outline" leftIcon={<Icon name="download" size="sm" />} fullWidth>
                PDF 리포트 다운로드
              </Button>
              <Button variant="outline" leftIcon={<Icon name="download" size="sm" />} fullWidth>
                Excel 데이터 다운로드
              </Button>
              <Button variant="outline" leftIcon={<Icon name="download" size="sm" />} fullWidth>
                원시 로그 CSV 내보내기
              </Button>
            </div>
          </div>
          {/* 정기 이메일 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ds-text-2)', marginBottom: 14 }}>정기 리포트 이메일</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ds-text-2)', display: 'block', marginBottom: 4 }}>수신 이메일</label>
                <input
                  type="email"
                  value={emailAddr}
                  onChange={e => setEmailAddr(e.target.value)}
                  style={{
                    width: '100%', height: 32, padding: '0 10px', border: '1px solid var(--ds-border)',
                    borderRadius: 3, fontSize: 12, background: 'var(--ds-surface)', color: 'var(--ds-text)',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ds-text-2)', display: 'block', marginBottom: 4 }}>발송 주기</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['daily', 'weekly', 'monthly'] as EmailFreq[]).map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setEmailFreq(f)}
                      style={{
                        flex: 1, height: 30, borderRadius: 3, fontSize: 12, cursor: 'pointer',
                        border: `1px solid ${emailFreq === f ? '#253349' : 'var(--ds-border)'}`,
                        background: emailFreq === f ? '#253349' : 'var(--ds-surface)',
                        color: emailFreq === f ? '#fff' : 'var(--ds-text-2)',
                        fontWeight: emailFreq === f ? 700 : 400,
                        transition: 'all 150ms',
                      }}
                    >
                      {f === 'daily' ? '매일' : f === 'weekly' ? '매주' : '매월'}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="primary" leftIcon={<Icon name="send" size="sm" />}>
                이메일 발송 설정 저장
              </Button>
            </div>
          </div>
        </div>,
      )}
    </div>
  );
}
