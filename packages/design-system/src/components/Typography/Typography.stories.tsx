import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1','h2','h3','h4','h5','h6','body1','body2','caption','overline','label'],
      description: '텍스트 스타일 변형',
    },
    color: {
      control: 'select',
      options: ['default','primary','secondary','success','warning','error','muted'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'StarBanking 디자인 시스템',
    variant: 'body1',
    color: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Playground: Story = {};

export const Scale: Story = {
  name: '타이포그래피 스케일',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['h1','h2','h3','h4','h5','h6'] as const).map((v) => (
        <Typography key={v} variant={v}>
          {v.toUpperCase()} — StarBanking 뱅킹 서비스
        </Typography>
      ))}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-neutral-200)', margin: '8px 0' }} />
      <Typography variant="body1">Body1 — 본문 텍스트. 가독성 높은 기본 본문 스타일입니다.</Typography>
      <Typography variant="body2">Body2 — 보조 본문. 조금 더 작은 크기의 설명 텍스트입니다.</Typography>
      <Typography variant="label">Label — 폼 레이블, UI 레이블에 사용합니다.</Typography>
      <Typography variant="caption">Caption — 보조 설명, 날짜, 메타 정보 등에 사용합니다.</Typography>
      <Typography variant="overline">Overline — 섹션 헤더, 카테고리 레이블</Typography>
    </div>
  ),
};

export const Colors: Story = {
  name: '색상 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['default','primary','secondary','success','warning','error','muted'] as const).map((c) => (
        <Typography key={c} variant="body1" color={c}>
          {c} — StarBanking 디자인 시스템
        </Typography>
      ))}
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Typography variant="h1">H1 제목</Typography>
      <Typography variant="h2">H2 제목</Typography>
      <Typography variant="h3">H3 제목</Typography>
      <Typography variant="h4">H4 제목</Typography>
      <Typography variant="h5">H5 제목</Typography>
      <Typography variant="h6">H6 제목</Typography>
    </div>
  ),
};

export const InContext: Story = {
  name: '실제 사용 예시',
  render: () => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="overline" color="muted">이번달 잔액</Typography>
      <Typography variant="h3">12,450,830원</Typography>
      <Typography variant="caption" color="muted">2026년 3월 기준 · 전월 대비 <Typography variant="caption" color="success" as="span">+3.2%</Typography></Typography>
    </div>
  ),
};
