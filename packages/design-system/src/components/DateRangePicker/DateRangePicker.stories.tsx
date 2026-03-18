import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';


const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: '기간검색',
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Playground: Story = {};

export const WithCallback: Story = {
  name: '날짜 변경 콜백',
  render: () => (
    <DateRangePicker
      label="기간검색"
      onDateChange={(start, end) => console.log('변경:', { start, end })}
    />
  ),
};
