import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchItem } from './SearchItem';

const sampleData = [
  { value: 'roulette', label: '룰렛' },
  { value: 'normal', label: '일반' },
  { value: 'quiz', label: '퀴즈' },
];

const meta: Meta<typeof SearchItem> = {
  title: 'Components/SearchItem',
  component: SearchItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '라벨 텍스트' },
    type: {
      control: 'select',
      options: ['input', 'select', 'radio', 'checkbox'],
      description: '검색 항목 타입',
    },
    value: { control: 'text', description: '현재 값' },
    changeValue: { action: 'changeValue', description: '값 변경 콜백' },
  },
  args: {
    label: '검색어',
    type: 'input',
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof SearchItem>;

/* ── Playground ── */
export const Playground: Story = {};

/* ── Input ── */
export const InputType: Story = {
  args: {
    label: '이벤트 명',
    type: 'input',
    value: '',
  },
};

/* ── Select ── */
export const SelectType: Story = {
  args: {
    label: '이벤트 유형',
    type: 'select',
    value: 'normal',
    selectData: sampleData,
  },
};

/* ── Radio ── */
export const RadioType: Story = {
  args: {
    label: '이벤트 타입',
    type: 'radio',
    value: 'normal',
    selectData: sampleData,
  },
};

/* ── Checkbox ── */
export const CheckboxType: Story = {
  args: {
    label: '이벤트 유형',
    type: 'checkbox',
    value: 'roulette',
    selectData: sampleData,
  },
};

/* ── 인터랙티브 (상태 유지) ── */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('normal');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SearchItem label="이벤트 명" type="input" value={value} changeValue={setValue} />
        <SearchItem label="이벤트 유형" type="select" value={value} selectData={sampleData} changeValue={setValue} />
        <SearchItem label="이벤트 타입" type="radio" value={value} selectData={sampleData} changeValue={setValue} />
        <SearchItem label="이벤트 체크" type="checkbox" value={value} selectData={sampleData} changeValue={setValue} />
        <div>현재 값: <strong>{value}</strong></div>
      </div>
    );
  },
};
