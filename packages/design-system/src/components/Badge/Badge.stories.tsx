import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: '배지 스타일 변형',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    dot: { control: 'boolean', description: '상태 점 표시' },
    contorl: {
      control: 'radio',
      options: ['a', 'b', 'c'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
    dot: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" >Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>완료</Badge>
      <Badge variant="warning" dot>처리중</Badge>
      <Badge variant="error" dot>실패</Badge>
      <Badge variant="neutral" dot>대기</Badge>
      <Badge variant="info" dot>정보</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
};

export const ContorlTypes: Story = {
  name: 'data-type (contorl)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['a', 'b', 'c'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge contorl={type}>Badge</Badge>
          <span style={{ fontSize: '0.75rem', color: '#667085' }}>data-type="{type}"</span>
        </div>
      ))}
    </div>
  ),
};

export const InLogoContext: Story = {
  name: '로고 컨텍스트 예시',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#1d2939', borderRadius: 8 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>S</div>
      <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>StarBanking</span>
      <Badge>Badge</Badge>
    </div>
  ),
};

export const BankingStatuses: Story = {
  name: '뱅킹 상태 예시',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { label: '거래 완료',   variant: 'success' as const, dot: true },
        { label: '처리 중',     variant: 'warning' as const, dot: true },
        { label: '이체 실패',   variant: 'error'   as const, dot: true },
        { label: '승인 대기',   variant: 'neutral' as const, dot: true },
        { label: 'VIP 회원',    variant: 'primary' as const },
        { label: '신규 계좌',   variant: 'info'    as const },
      ].map(({ label, variant, dot }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge variant={variant} dot={dot}>{label}</Badge>
        </div>
      ))}
    </div>
  ),
};
