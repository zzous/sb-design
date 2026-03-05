import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['flat', 'raised', 'sunken'],
      description: '카드 스타일',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    variant: 'raised',
    size: 'md',
    title: '카드 제목',
    description: '카드에 대한 간단한 설명입니다.',
    children: '카드 본문 내용이 여기에 표시됩니다.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card variant="raised" title="Raised" description="기본 그림자 카드">
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>카드 본문입니다.</p>
      </Card>
      <Card variant="flat" title="Flat" description="테두리만 있는 카드">
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>카드 본문입니다.</p>
      </Card>
      <Card variant="sunken" title="Sunken" description="배경이 들어간 카드">
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>카드 본문입니다.</p>
      </Card>
    </div>
  ),
};

export const WithHeaderAction: Story = {
  args: {
    title: '이번달 지출',
    description: '2026년 3월',
    headerAction: <Badge variant="success" dot>정상</Badge>,
    children: (
      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
        487,500원
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: '이체 확인',
    description: '아래 내용을 확인해주세요.',
    children: (
      <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>
        <div>받는 분: 홍길동</div>
        <div>금액: 100,000원</div>
        <div>메모: 생일 축하</div>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline" size="sm">취소</Button>
        <Button size="sm">이체하기</Button>
      </div>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card size="sm" title="Small" description="작은 패딩">콘텐츠</Card>
      <Card size="md" title="Medium" description="기본 패딩">콘텐츠</Card>
      <Card size="lg" title="Large" description="넓은 패딩">콘텐츠</Card>
    </div>
  ),
};
