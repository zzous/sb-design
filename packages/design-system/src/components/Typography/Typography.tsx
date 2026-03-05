import React from 'react';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2'
  | 'caption' | 'overline' | 'label';

export type TypographyColor =
  | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';

const variantTagMap: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body1: 'p', body2: 'p',
  caption: 'span', overline: 'span', label: 'span',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: keyof React.JSX.IntrinsicElements;
}

const colorClassMap: Record<TypographyColor, string> = {
  default:   styles.colorDefault,
  primary:   styles.colorPrimary,
  secondary: styles.colorSecondary,
  success:   styles.colorSuccess,
  warning:   styles.colorWarning,
  error:     styles.colorError,
  muted:     styles.colorMuted,
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'default',
  as,
  children,
  className = '',
  ...rest
}) => {
  const Tag = (as ?? variantTagMap[variant]) as React.ElementType;
  const classes = [styles.base, styles[variant], colorClassMap[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};
