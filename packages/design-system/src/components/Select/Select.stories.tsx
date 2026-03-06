import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const BANK_OPTIONS = [
  { value: 'star', label: '스타뱅크' },
  { value: 'kb', label: 'KB국민은행' },
  { value: 'shinhan', label: '신한은행' },
  { value: 'woori', label: '우리은행' },
  { value: 'hana', label: '하나은행' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: '은행 선택',
    placeholder: '선택하세요',
    options: BANK_OPTIONS,
    size: 'md',
    error: false,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Select label="Small" size="sm" options={BANK_OPTIONS} placeholder="선택하세요" />
      <Select label="Medium" size="md" options={BANK_OPTIONS} placeholder="선택하세요" />
      <Select label="Large" size="lg" options={BANK_OPTIONS} placeholder="선택하세요" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select
        label="은행"
        options={BANK_OPTIONS}
        placeholder="선택하세요"
        error
        errorText="은행을 선택해주세요."
        required
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select
        label="이체 은행"
        options={BANK_OPTIONS}
        placeholder="선택하세요"
        helperText="이체할 은행을 선택해주세요."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="은행 (비활성)" options={BANK_OPTIONS} placeholder="선택 불가" disabled />
    </div>
  ),
};

export const BannerPositionExample: Story = {
  name: '배너 노출 위치 예시',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select
        label="노출 위치"
        options={[
          { value: 'main-top', label: '메인 상단' },
          { value: 'main-bottom', label: '메인 하단' },
          { value: 'sidebar', label: '사이드바' },
          { value: 'popup', label: '팝업' },
        ]}
        placeholder="위치를 선택하세요"
        required
      />
    </div>
  ),
};
