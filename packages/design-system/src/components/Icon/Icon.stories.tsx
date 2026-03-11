import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import type { IconName, IconSize } from './Icon';

const ALL_ICONS: IconName[] = [
  'arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight',
  'chevronUp', 'chevronDown', 'chevronLeft', 'chevronRight',
  'search', 'send', 'plus', 'minus', 'close', 'check',
  'download', 'upload', 'edit', 'trash', 'copy',
  'user', 'users', 'settings', 'home', 'menu',
  'bell', 'eye', 'eyeOff', 'lock', 'unlock',
  'info', 'warning', 'error', 'success',
  'calendar', 'clock', 'filter', 'sort', 'refresh',
  'externalLink', 'link', 'attach', 'image',
  'creditCard', 'transfer', 'wallet',
];

const GROUPS: { label: string; icons: IconName[] }[] = [
  { label: 'Arrow', icons: ['arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight'] },
  { label: 'Chevron', icons: ['chevronUp', 'chevronDown', 'chevronLeft', 'chevronRight'] },
  { label: 'Actions', icons: ['search', 'send', 'plus', 'minus', 'close', 'check', 'download', 'upload', 'edit', 'trash', 'copy'] },
  { label: 'People', icons: ['user', 'users'] },
  { label: 'System', icons: ['settings', 'home', 'menu', 'bell', 'eye', 'eyeOff', 'lock', 'unlock'] },
  { label: 'Status', icons: ['info', 'warning', 'error', 'success'] },
  { label: 'Utility', icons: ['calendar', 'clock', 'filter', 'sort', 'refresh', 'externalLink', 'link', 'attach', 'image'] },
  { label: 'Banking', icons: ['creditCard', 'transfer', 'wallet'] },
];

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ALL_ICONS },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
  },
  args: {
    name: 'search',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/* ── Playground ── */
export const Playground: Story = {};

/* ── All Icons ── */
export const AllIcons: Story = {
  name: '전체 아이콘',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {GROUPS.map(({ label, icons }) => (
        <div key={label}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#767676', marginBottom: 12,
          }}>
            {label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {icons.map((name) => (
              <div
                key={name}
                title={name}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 10px', borderRadius: 6, border: '1px solid #ebebeb',
                  minWidth: 72, cursor: 'default',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f7f7f7'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = ''; }}
              >
                <Icon name={name} size="lg" />
                <span style={{ fontSize: 10, color: '#767676', textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Sizes ── */
export const Sizes: Story = {
  name: '크기',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as IconSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="send" size={size} />
          <span style={{ fontSize: 11, color: '#767676' }}>{size}</span>
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Icon name="send" size={32} />
        <span style={{ fontSize: 11, color: '#767676' }}>32px</span>
      </div>
    </div>
  ),
};

/* ── Colors ── */
export const Colors: Story = {
  name: '색상',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { label: 'default', color: undefined },
        { label: 'primary', color: '#287eff' },
        { label: 'success', color: '#00b074' },
        { label: 'warning', color: '#f59e0b' },
        { label: 'error', color: '#ff3232' },
        { label: 'muted', color: '#767676' },
        { label: 'brand', color: '#253349' },
      ].map(({ label, color }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name="bell" size="xl" color={color} />
          <span style={{ fontSize: 11, color: '#767676' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Status Icons ── */
export const StatusIcons: Story = {
  name: '상태 아이콘',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {[
        { name: 'success' as IconName, color: '#00b074', label: '성공' },
        { name: 'error' as IconName, color: '#ff3232', label: '오류' },
        { name: 'warning' as IconName, color: '#f59e0b', label: '경고' },
        { name: 'info' as IconName, color: '#287eff', label: '정보' },
      ].map(({ name, color, label }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #ebebeb' }}>
          <Icon name={name} size="md" color={color} />
          <span style={{ fontSize: 13, color: '#444' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Banking Icons ── */
export const BankingIcons: Story = {
  name: '뱅킹 아이콘',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {[
        { name: 'creditCard' as IconName, label: '카드' },
        { name: 'transfer' as IconName, label: '이체' },
        { name: 'wallet' as IconName, label: '지갑' },
        { name: 'send' as IconName, label: '송금' },
        { name: 'download' as IconName, label: '입금' },
        { name: 'lock' as IconName, label: '보안' },
        { name: 'bell' as IconName, label: '알림' },
        { name: 'calendar' as IconName, label: '일정' },
      ].map(({ name, label }) => (
        <div key={name} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          padding: '16px 12px', borderRadius: 8, border: '1px solid #ebebeb', minWidth: 72,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: '#f0f6ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={name} size="lg" color="#287eff" />
          </div>
          <span style={{ fontSize: 11, color: '#444' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Interactive search ── */
export const IconSearch: Story = {
  name: '아이콘 검색',
  render: () => {
    function SearchDemo() {
      const [query, setQuery] = useState('');
      const filtered = ALL_ICONS.filter((n) => n.toLowerCase().includes(query.toLowerCase()));
      return (
        <div>
          <div style={{ marginBottom: 16 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="아이콘 이름 검색..."
              style={{
                width: '100%', maxWidth: 320, padding: '8px 12px', fontSize: 14,
                border: '1px solid #d2d2d2', borderRadius: 6, outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filtered.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '10px 8px', borderRadius: 6, border: '1px solid #ebebeb', minWidth: 68,
                  cursor: 'pointer',
                }}
                onClick={() => navigator.clipboard?.writeText(name)}
                title={`클릭하여 "${name}" 복사`}
              >
                <Icon name={name} size="lg" />
                <span style={{ fontSize: 10, color: '#767676', textAlign: 'center' }}>{name}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <span style={{ fontSize: 13, color: '#999' }}>검색 결과 없음</span>
            )}
          </div>
        </div>
      );
    }
    return <SearchDemo />;
  },
};
