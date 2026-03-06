import React, { useRef, useState, useCallback } from 'react';
import styles from './FileInput.module.css';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 13V7M7 10l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14.5A3.5 3.5 0 0 0 6.5 18h7a3.5 3.5 0 0 0 0-7H13a5 5 0 1 0-9.9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export interface FileInputProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  onChange?: (files: File[]) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  required = false,
  error = false,
  errorText,
  helperText,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState('');

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const arr = Array.from(incoming);

      if (maxSize) {
        const oversized = arr.filter((f) => f.size > maxSize);
        if (oversized.length) {
          setSizeError(`파일 크기는 ${formatBytes(maxSize)} 이하여야 합니다.`);
          return;
        }
      }
      setSizeError('');

      const next = multiple ? [...files, ...arr] : arr.slice(0, 1);
      setFiles(next);
      onChange?.(next);
    },
    [files, maxSize, multiple, onChange],
  );

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
    // reset native input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) addFiles(e.dataTransfer.files);
  };

  const zoneClass = [
    styles.dropzone,
    dragging ? styles.dragging : '',
    error || sizeError ? styles.error : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const displayError = sizeError || (error ? errorText : '');

  return (
    <div className={styles.wrapper}>
      {label && (
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}

      <div
        className={zoneClass}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="파일 업로드 영역"
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => addFiles(e.target.files)}
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className={styles.icon}>
          <UploadIcon />
        </div>
        <p className={styles.primaryText}>
          <span>클릭</span>하거나 파일을 여기에 드래그하세요
        </p>
        <p className={styles.subText}>
          {accept ? `허용 형식: ${accept}` : '모든 파일 허용'}
          {maxSize ? ` · 최대 ${formatBytes(maxSize)}` : ''}
          {multiple ? ' · 여러 파일 선택 가능' : ''}
        </p>
      </div>

      {files.length > 0 && (
        <ul className={styles.fileList} role="list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.fileItem}>
              <div className={styles.fileIcon}>
                <FileIcon />
              </div>
              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileSize}>{formatBytes(file.size)}</div>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(i)}
                aria-label={`${file.name} 삭제`}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {displayError && <p className={styles.errorText}>{displayError}</p>}
      {!displayError && helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};
