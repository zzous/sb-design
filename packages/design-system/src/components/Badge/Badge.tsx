import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'a' | 'b' | 'c'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children?: React.ReactNode;
  contorl?: BadgeType;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  contorl='b',
  className = '',
  ...rest
}) => {
  const classes = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest} data-type={contorl}>
      <div>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
     </div>
    </span>
  );
};
