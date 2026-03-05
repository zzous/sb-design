import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 2.5L7 9M13.5 2.5L9 13.5L7 9M13.5 2.5L2.5 6.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    loading: { control: 'boolean', description: '로딩 상태' },
    disabled: { control: 'boolean', description: '비활성화' },
    fullWidth: { control: 'boolean', description: '전체 너비' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ── Playground ── */
export const Playground: Story = {};

/* ── Variants ── */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/* ── Sizes ── */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/* ── With Icons ── */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button leftIcon={<SendIcon />}>이체하기</Button>
      <Button variant="outline" rightIcon={<PlusIcon />}>추가하기</Button>
      <Button variant="secondary" leftIcon={<PlusIcon />} rightIcon={<SendIcon />}>양쪽 아이콘</Button>
    </div>
  ),
};

/* ── States ── */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

/* ── Full Width ── */
export const FullWidth: Story = {
  args: { fullWidth: true, children: '전체 너비 버튼' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

/* ── Individual variants as stories ── */
export const Primary: Story   = { args: { variant: 'primary',   children: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Outline: Story   = { args: { variant: 'outline',   children: 'Outline' } };
export const Ghost: Story     = { args: { variant: 'ghost',     children: 'Ghost' } };
export const Danger: Story    = { args: { variant: 'danger',    children: 'Danger' } };
export const Loading: Story   = { args: { loading: true,        children: '처리 중...' } };
