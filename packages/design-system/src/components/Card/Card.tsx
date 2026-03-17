import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'flat' | 'raised' | 'sunken';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  size?: CardSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'raised',
  size = 'md',
  title,
  description,
  headerAction,
  footer,
  children,
  className = '',
  ...rest
}) => {
  const classes = [styles.card, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  const hasHeader = title || headerAction;

  return (
    <div className={classes} {...rest}>
      {hasHeader && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
