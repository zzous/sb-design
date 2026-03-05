import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const WonIcon = () => (
  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-neutral-500)' }}>원</span>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '입력 필드 크기',
    },
    label: { control: 'text', description: '레이블' },
    placeholder: { control: 'text' },
    helperText: { control: 'text', description: '도움말 텍스트' },
    errorText: { control: 'text', description: '오류 메시지' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: '레이블',
    placeholder: '입력하세요',
    size: 'md',
    error: false,
    disabled: false,
    required: false,
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호 입력',
    helperText: '8자 이상, 영문·숫자 포함',
    type: 'password',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@bank.com',
    error: true,
    errorText: '올바른 이메일 형식이 아닙니다.',
    defaultValue: 'not-an-email',
  },
};

export const WithPrefix: Story = {
  args: {
    label: '검색',
    placeholder: '거래내역 검색',
    prefix: <SearchIcon />,
  },
};

export const WithSuffix: Story = {
  args: {
    label: '이체 금액',
    placeholder: '0',
    suffix: <WonIcon />,
    type: 'number',
  },
};

export const Required: Story = {
  args: { label: '계좌번호', placeholder: '숫자만 입력', required: true },
};

export const Disabled: Story = {
  args: { label: '비활성화 입력', defaultValue: '수정 불가', disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="기본" placeholder="입력하세요" />
      <Input label="필수" placeholder="필수 항목" required />
      <Input label="오류" error errorText="오류가 발생했습니다." defaultValue="잘못된 값" />
      <Input label="도움말" placeholder="입력하세요" helperText="8자 이상 입력해주세요." />
      <Input label="접두 아이콘" placeholder="검색" prefix={<SearchIcon />} />
      <Input label="접미 텍스트" placeholder="0" suffix={<WonIcon />} />
      <Input label="비활성화" defaultValue="수정 불가" disabled />
    </div>
  ),
};
