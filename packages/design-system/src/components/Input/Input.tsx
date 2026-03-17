import React from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  size?: InputSize;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'md',
      error = false,
      helperText,
      errorText,
      prefix,
      suffix,
      required,
      id,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      error ? styles.error : '',
      prefix ? styles.hasPrefix : '',
      suffix ? styles.hasSuffix : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input ref={ref} id={inputId} className={styles.input} required={required} {...rest} />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {error && errorText && <p className={styles.errorText}>{errorText}</p>}
        {!error && helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
