import React, { useState } from 'react';
import {
  Button, Card, Badge, Typography, Input, Select, FileInput, Modal, useToast,
} from '@starbanking/design-system';
import styles from '../App.module.css';

const POSITION_OPTIONS = [
  { value: 'main-top',    label: '메인 상단' },
  { value: 'main-bottom', label: '메인 하단' },
  { value: 'sidebar',     label: '사이드바' },
  { value: 'popup',       label: '팝업' },
];

const STATUS_OPTIONS = [
  { value: 'active',   label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'reserved', label: '예약' },
];

const statusVariantMap: Record<string, 'success' | 'neutral' | 'warning'> = {
  active:   'success',
  inactive: 'neutral',
  reserved: 'warning',
};
const statusLabelMap: Record<string, string> = {
  active: '활성', inactive: '비활성', reserved: '예약',
};

interface BannerForm {
  title: string;
  linkUrl: string;
  position: string;
  status: string;
  startDate: string;
  endDate: string;
}

export function BannerRegisterPage() {
  const toast = useToast();
  const [form, setForm] = useState<BannerForm>({
    title: '', linkUrl: '', position: '', status: 'active', startDate: '', endDate: '',
  });
  const [errors, setErrors] = useState<Partial<BannerForm>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function set(key: keyof BannerForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleFiles(selected: File[]) {
    setFiles(selected);
    setPreviewUrl(selected[0] ? URL.createObjectURL(selected[0]) : null);
  }

  function validate() {
    const e: Partial<BannerForm> = {};
    if (!form.title)     e.title     = '배너명을 입력해주세요.';
    if (!form.linkUrl)   e.linkUrl   = '링크 URL을 입력해주세요.';
    if (!form.position)  e.position  = '노출 위치를 선택해주세요.';
    if (!form.startDate) e.startDate = '시작일을 선택해주세요.';
    if (!form.endDate)   e.endDate   = '종료일을 선택해주세요.';
    if (form.startDate && form.endDate && form.startDate > form.endDate)
      e.endDate = '종료일은 시작일 이후여야 합니다.';
    if (files.length === 0) e.title = e.title ?? '';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) { toast.error('배너 이미지를 업로드해주세요.'); return; }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('배너가 등록되었습니다.', { message: `"${form.title}" 배너가 성공적으로 등록되었습니다.` });
      setForm({ title: '', linkUrl: '', position: '', status: 'active', startDate: '', endDate: '' });
      setFiles([]);
      setPreviewUrl(null);
    }, 1200);
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">배너등록</Typography>
          <Typography variant="body2" color="muted">새 배너를 등록하고 노출 설정을 관리합니다.</Typography>
        </div>
        <Badge variant={statusVariantMap[form.status] ?? 'neutral'} dot>
          {statusLabelMap[form.status] ?? ''}
        </Badge>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.bannerLayout}>
          <div className={styles.bannerMain}>
            <Card variant="raised" size="lg">
              <Typography variant="overline" as="div" className={styles.sectionLabel}>기본 정보</Typography>
              <div className="stack gap-4">
                <Input label="배너명" placeholder="배너 이름을 입력하세요" value={form.title} onChange={(e) => set('title', e.target.value)} error={!!errors.title} errorText={errors.title} required />
                <Input label="링크 URL" placeholder="https://example.com" value={form.linkUrl} onChange={(e) => set('linkUrl', e.target.value)} error={!!errors.linkUrl} errorText={errors.linkUrl} required />
                <Select label="노출 위치" options={POSITION_OPTIONS} placeholder="위치를 선택하세요" value={form.position} onChange={(e) => set('position', e.target.value)} error={!!errors.position} errorText={errors.position} required />
                <Select label="배너 상태" options={STATUS_OPTIONS} value={form.status} onChange={(e) => set('status', e.target.value)} />
                <div className="grid-2">
                  <Input label="노출 시작일" type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} error={!!errors.startDate} errorText={errors.startDate} required />
                  <Input label="노출 종료일" type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)} error={!!errors.endDate} errorText={errors.endDate} required />
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.bannerSide}>
            <Card variant="raised" size="lg">
              <Typography variant="overline" as="div" className={styles.sectionLabel}>배너 이미지</Typography>
              <FileInput label="이미지 업로드" accept=".jpg,.jpeg,.png,.webp" maxSize={5 * 1024 * 1024} helperText="JPG, PNG, WEBP · 최대 5MB" onChange={handleFiles} required />
              {previewUrl && (
                <div className={styles.bannerThumb}>
                  <img src={previewUrl} alt="배너 미리보기" className={styles.bannerThumbImg} />
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className={styles.bannerActions}>
          <Button variant="outline" type="button" onClick={() => setPreviewOpen(true)} disabled={!form.title && !previewUrl}>
            미리보기
          </Button>
          <div className="row gap-2">
            <Button variant="ghost" type="button" onClick={() => {
              setForm({ title: '', linkUrl: '', position: '', status: 'active', startDate: '', endDate: '' });
              setFiles([]); setPreviewUrl(null); setErrors({});
            }}>
              초기화
            </Button>
            <Button type="submit" loading={loading}>배너 등록</Button>
          </div>
        </div>
      </form>

      <Modal
        open={previewOpen} onClose={() => setPreviewOpen(false)}
        title="배너 미리보기" size="md"
        footer={<Button variant="outline" onClick={() => setPreviewOpen(false)}>닫기</Button>}
      >
        <div className={styles.bannerPreview}>
          {previewUrl
            ? <img src={previewUrl} alt="배너" className={styles.bannerPreviewImg} />
            : <div className={styles.bannerPreviewEmpty}><Typography variant="body2" color="muted">이미지 없음</Typography></div>
          }
          <div className="stack gap-2" style={{ marginTop: 'var(--space-4)' }}>
            {[
              { label: '배너명', content: form.title || '—' },
              { label: '링크',   content: form.linkUrl || '—' },
              { label: '위치',   content: POSITION_OPTIONS.find((o) => o.value === form.position)?.label || '—' },
              { label: '기간',   content: form.startDate && form.endDate ? `${form.startDate} ~ ${form.endDate}` : '—' },
            ].map(({ label, content }) => (
              <div key={label} className="row gap-2">
                <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>{label}</Typography>
                <Typography variant="label">{content}</Typography>
              </div>
            ))}
            <div className="row gap-2">
              <Typography variant="caption" color="muted" style={{ width: 72, flexShrink: 0 }}>상태</Typography>
              <Badge variant={statusVariantMap[form.status] ?? 'neutral'} size="sm" dot>
                {statusLabelMap[form.status]}
              </Badge>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
