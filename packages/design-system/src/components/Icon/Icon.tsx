import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconName =
  | 'arrowUp' | 'arrowDown' | 'arrowLeft' | 'arrowRight'
  | 'chevronUp' | 'chevronDown' | 'chevronLeft' | 'chevronRight'
  | 'search' | 'send' | 'plus' | 'minus' | 'close' | 'check'
  | 'download' | 'upload' | 'edit' | 'trash' | 'copy'
  | 'user' | 'users' | 'settings' | 'home' | 'menu'
  | 'bell' | 'eye' | 'eyeOff' | 'lock' | 'unlock'
  | 'info' | 'warning' | 'error' | 'success'
  | 'calendar' | 'clock' | 'filter' | 'sort' | 'refresh'
  | 'externalLink' | 'link' | 'attach' | 'image'
  | 'creditCard' | 'transfer' | 'wallet';

export interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

/* ── SVG path registry ── */
const PATHS: Record<IconName, React.ReactNode> = {
  /* Arrow */
  arrowUp:    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  arrowDown:  <path d="M8 4v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  arrowLeft:  <path d="M12 8H4M8 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  arrowRight: <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  /* Chevron */
  chevronUp:    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  chevronDown:  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  chevronLeft:  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  chevronRight: <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  /* Actions */
  search:   <><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  send:     <path d="M13.5 2.5L7 9M13.5 2.5L9 13.5L7 9M13.5 2.5L2.5 6.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  plus:     <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  minus:    <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  close:    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  check:    <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  download: <path d="M8 3v7M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  upload:   <path d="M8 13V6M5 8l3-3 3 3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  edit:     <path d="M11 2.5l2.5 2.5-8 8H3v-2.5l8-8zM9.5 4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  trash:    <><path d="M3 5h10M6 5V3h4v2M5 5l.8 8h4.4l.8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  copy:     <><rect x="6" y="6" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6V4a1 1 0 00-1-1H4a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  /* People */
  user:  <><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  users: <><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 13c0-2.21 1.79-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="11" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M14 13c0-2.21-1.79-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  /* System */
  settings: <><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.75 3.75l1.06 1.06M11.19 11.19l1.06 1.06M3.75 12.25l1.06-1.06M11.19 4.81l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  home:   <path d="M2 8l6-5 6 5v6a1 1 0 01-1 1H9v-4H7v4H3a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  menu:   <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  bell:   <><path d="M8 2a4.5 4.5 0 014.5 4.5c0 4 1.5 5 1.5 5H2s1.5-1 1.5-5A4.5 4.5 0 018 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  eye:    <><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" /></>,
  eyeOff: <><path d="M3 3l10 10M6.3 6.3A3 3 0 0010.7 10.7M4 4.9C2.8 5.9 2 8 2 8s2.5 5 6 5c1 0 2-.3 2.8-.7M8 3c3.5 0 6 5 6 5a10 10 0 01-1 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  lock:   <><rect x="4" y="7" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  unlock: <><rect x="4" y="7" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5.5a2.5 2.5 0 015 0v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  /* Status */
  info:    <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  warning: <><path d="M8 3L14 13H2L8 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  error:   <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  success: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  /* Utility */
  calendar:    <><rect x="2" y="3" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7h12M6 2v2M10 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  clock:       <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  filter:      <path d="M2 4h12M5 8h6M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  sort:        <path d="M4 4v8M2 10l2 2 2-2M12 12V4M10 6l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  refresh:     <path d="M13 8A5 5 0 113 8M13 4v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  externalLink:<><path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 2h4v4M14 2L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  link:        <><path d="M7 9a3 3 0 004.24.12l2-2a3 3 0 00-4.24-4.24L7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9 7a3 3 0 00-4.24-.12l-2 2a3 3 0 004.24 4.24L8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  attach:      <path d="M13 7l-5 5a3 3 0 01-4.24-4.24l5-5A2 2 0 0111.59 5.6l-5 5a1 1 0 01-1.41-1.41l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  image:       <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="6.5" r="1" stroke="currentColor" strokeWidth="1.5" /><path d="M2 11l3-3 2 2 2.5-3L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  /* Banking */
  creditCard: <><rect x="1.5" y="4" width="13" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.5" /><path d="M4 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  transfer:   <><path d="M3 5h10M10 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 11H3M6 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  wallet:     <><rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M1.5 7.5h13" stroke="currentColor" strokeWidth="1.5" /><circle cx="11.5" cy="10" r="1" fill="currentColor" /></>,
};

/* ── Generic Icon component ── */
export function Icon({
  name,
  size = 'md',
  color,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  const px = typeof size === 'number' ? size : SIZE_MAP[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={className}
      style={{ color, display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
    >
      {PATHS[name]}
    </svg>
  );
}

