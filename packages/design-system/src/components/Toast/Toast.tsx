import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

/* ────────────────────────────────────────────────────────── */
/* Types                                                       */
/* ────────────────────────────────────────────────────────── */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type ToastPosition =
  | 'topRight' | 'topLeft' | 'topCenter'
  | 'bottomRight' | 'bottomLeft' | 'bottomCenter';

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  message?: string;
  duration?: number; // ms, 0 = persistent
  exiting?: boolean;
}

export interface ToastOptions {
  variant?: ToastVariant;
  message?: string;
  duration?: number;
}

/* ────────────────────────────────────────────────────────── */
/* Icons                                                       */
/* ────────────────────────────────────────────────────────── */
const icons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L1.5 13.5h13L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
};

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

/* ────────────────────────────────────────────────────────── */
/* Context                                                     */
/* ────────────────────────────────────────────────────────── */
interface ToastContextValue {
  toast: (title: string, options?: ToastOptions) => void;
  success: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  error: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  warning: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  info: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/* ────────────────────────────────────────────────────────── */
/* Provider                                                    */
/* ────────────────────────────────────────────────────────── */
export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'topRight',
  defaultDuration = 4000,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const add = useCallback(
    (title: string, options: ToastOptions = {}) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = options.duration ?? defaultDuration;
      setToasts((prev) => [...prev, { id, title, ...options, duration }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
    },
    [defaultDuration, dismiss],
  );

  const ctx: ToastContextValue = {
    toast: add,
    success: (t, o) => add(t, { ...o, variant: 'success' }),
    error:   (t, o) => add(t, { ...o, variant: 'error' }),
    warning: (t, o) => add(t, { ...o, variant: 'warning' }),
    info:    (t, o) => add(t, { ...o, variant: 'info' }),
  };

  const containerClass = [styles.container, styles[position]].join(' ');

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className={containerClass} role="region" aria-live="polite" aria-label="알림">
            {toasts.map((t) => (
              <ToastCard key={t.id} item={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

/* ────────────────────────────────────────────────────────── */
/* Toast Card                                                  */
/* ────────────────────────────────────────────────────────── */
interface ToastCardProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ item, onDismiss }) => {
  const { id, variant = 'neutral', title, message, duration, exiting } = item;
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current && duration && duration > 0) {
      progressRef.current.style.animationDuration = `${duration}ms`;
    }
  }, [duration]);

  const cls = [styles.toast, styles[variant], exiting ? styles.exiting : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} role="alert">
      <span className={styles.icon}>{icons[variant]}</span>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
      <button className={styles.closeBtn} onClick={() => onDismiss(id)} aria-label="알림 닫기">
        <CloseIcon />
      </button>
      {duration && duration > 0 && <div ref={progressRef} className={styles.progress} />}
    </div>
  );
};

/* ────────────────────────────────────────────────────────── */
/* Hook                                                        */
/* ────────────────────────────────────────────────────────── */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
