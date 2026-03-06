import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalFooterAlign = 'left' | 'center' | 'right' | 'spaceBetween';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  footerAlign?: ModalFooterAlign;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const footerAlignClass: Record<ModalFooterAlign, string> = {
  left:         styles.footerLeft,
  center:       styles.footerCenter,
  right:        '',
  spaceBetween: styles.footerSpaceBetween,
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  footerAlign = 'right',
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  hideCloseButton = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap & ESC
  useEffect(() => {
    if (!open) return;

    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) onClose();
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const panelClass = [styles.panel, styles[size]].join(' ');
  const footerClass = [styles.footer, footerAlignClass[footerAlign]].filter(Boolean).join(' ');

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div ref={panelRef} className={panelClass} tabIndex={-1}>
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className={styles.header}>
            <div className={styles.headerText}>
              {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
              {description && <p className={styles.description}>{description}</p>}
            </div>
            {!hideCloseButton && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="모달 닫기">
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={footerClass}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
