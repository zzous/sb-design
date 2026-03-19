import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    itemCount: { control: 'number', description: '전체 아이템 수' },
    cntPerPage: { control: 'number', description: '페이지당 아이템 수' },
    currentPage: { control: 'number', description: '현재 페이지' },
    onChangedPage: { action: 'onChangedPage', description: '페이지 변경 콜백' },
  },
  args: {
    itemCount: 100,
    cntPerPage: 10,
    currentPage: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/* ── Playground ── */
export const Playground: Story = {};

/* ── 인터랙티브 (페이지 상태 유지) ── */
export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onChangedPage={(pageNo) => setPage(pageNo)}
      />
    );
  },
};

/* ── 아이템 적을 때 (1페이지) ── */
export const SinglePage: Story = {
  args: {
    itemCount: 5,
    cntPerPage: 10,
    currentPage: 1,
  },
};

/* ── 많은 페이지 ── */
export const ManyPages: Story = {
  args: {
    itemCount: 500,
    cntPerPage: 10,
    currentPage: 25,
  },
};

/* ── 마지막 페이지 ── */
export const LastPage: Story = {
  args: {
    itemCount: 100,
    cntPerPage: 10,
    currentPage: 10,
  },
};
