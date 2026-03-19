import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {};

export const WithCallback: Story = {
  name: '날짜 변경 콜백',
  render: () => (
    <DatePicker onDateChange={(date) => console.log('선택된 날짜:', date)} />
  ),
};
