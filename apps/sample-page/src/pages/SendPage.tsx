import { useState } from 'react';
import { Button, Card, Typography, Input, Icon } from '@starbanking/design-system';
import styles from '../App.module.css';

export function SendPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ bank: '', account: '', name: '', amount: '', memo: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.bank)    e.bank    = '은행을 입력해주세요.';
    if (!form.account) e.account = '계좌번호를 입력해주세요.';
    if (!form.name)    e.name    = '예금주명을 입력해주세요.';
    if (!form.amount || isNaN(Number(form.amount.replace(/,/g, ''))))
      e.amount = '올바른 금액을 입력해주세요.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  }

  const resetForm = () => setForm({ bank: '', account: '', name: '', amount: '', memo: '' });

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.sendSuccess}>
          <div className={styles.successIcon}>✓</div>
          <Typography variant="h4">이체가 완료되었습니다!</Typography>
          <Typography variant="body2" color="muted">
            {form.name}님 계좌로{' '}
            <strong>{Number(form.amount.replace(/,/g, '')).toLocaleString('ko-KR')}원</strong>이
            이체되었습니다.
          </Typography>
          <Button variant="outline" onClick={() => { setDone(false); resetForm(); }}>
            다시 이체하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <Typography variant="h3">이체하기</Typography>
      </header>
      <div className={styles.sendWrapper}>
        <Card variant="raised" size="lg" style={{ maxWidth: 520 }}>
          <form onSubmit={handleSubmit} noValidate className="stack gap-4">
            <Input
              label="은행" placeholder="예) 스타뱅크"
              value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })}
              error={!!errors.bank} errorText={errors.bank} required
            />
            <Input
              label="계좌번호" placeholder="숫자만 입력"
              value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })}
              error={!!errors.account} errorText={errors.account} required
            />
            <Input
              label="예금주명" placeholder="받는 분 이름"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name} errorText={errors.name} required
            />
            <Input
              label="이체 금액" placeholder="0"
              suffix={<span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)', fontWeight: 500 }}>원</span>}
              value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
              error={!!errors.amount} errorText={errors.amount} required
            />
            <Input
              label="메모 (선택)" placeholder="받는 분에게 보낼 메모"
              value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
              helperText="최대 20자"
            />
            <div className="row gap-2" style={{ marginTop: 'var(--space-2)' }}>
              <Button variant="outline" fullWidth type="button" onClick={resetForm}>초기화</Button>
              <Button fullWidth type="submit" loading={loading} leftIcon={<Icon name="send" />}>이체하기</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
