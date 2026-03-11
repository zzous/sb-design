import { useState } from 'react';
import {
  Button, Card, Badge, Typography, Input, Select, FileInput, Modal, useToast,
} from '@starbanking/design-system';
import styles from '../App.module.css';
import { Icon } from '@starbanking/design-system';
import type { IconName } from '@starbanking/design-system';

export function ComponentsPage() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fileList, setFileList] = useState<File[]>([]);
  const toast = useToast();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <Typography variant="h3">디자인 시스템</Typography>
          <Typography variant="body2" color="muted">@starbanking/design-system 컴포넌트 쇼케이스</Typography>
        </div>
      </header>

      {/* Buttons */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Button</Typography>
        <div className="stack gap-6">
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>Variants</Typography>
            <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>Sizes</Typography>
            <div className="row gap-2" style={{ alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 'var(--space-2)' }}>With Icons</Typography>
            <div className="row gap-2">
              <Button leftIcon={<Icon name="send" />}>이체하기</Button>
              <Button variant="outline" rightIcon={<Icon name="download" />}>다운로드</Button>
              <Button variant="secondary" leftIcon={<Icon name="plus" />}>추가</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Badge</Typography>
        <div className="row gap-2" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success" dot>완료</Badge>
          <Badge variant="warning" dot>처리중</Badge>
          <Badge variant="error" dot>실패</Badge>
          <Badge variant="info">정보</Badge>
          <Badge variant="neutral">중립</Badge>
          <Badge variant="success" size="lg">Large</Badge>
          <Badge variant="neutral" size="sm">Small</Badge>
        </div>
      </section>

      {/* Inputs */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Input</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
          <Input label="검색" placeholder="검색어 입력" prefix={<Icon name="search" />} value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          <Input label="필수 항목" placeholder="필수 값" required />
          <Input label="오류 상태" placeholder="잘못된 값" error errorText="올바른 형식으로 입력해주세요." />
          <Input label="도움말" placeholder="입력" helperText="8자 이상 입력해주세요." />
          <Input label="비활성화" placeholder="입력 불가" disabled />
        </div>
      </section>

      {/* Select */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Select</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <Select
            label="기본 선택" placeholder="선택하세요"
            options={[{ value: 'option1', label: '옵션 1' }, { value: 'option2', label: '옵션 2' }, { value: 'option3', label: '옵션 3' }]}
            value={selectVal} onChange={(e) => setSelectVal(e.target.value)}
          />
          <Select label="Small" size="sm" placeholder="선택" options={[{ value: 'a', label: 'Small A' }, { value: 'b', label: 'Small B' }]} />
          <Select label="Large" size="lg" placeholder="선택" options={[{ value: 'a', label: 'Large A' }, { value: 'b', label: 'Large B' }]} />
          <Select label="오류 상태" placeholder="선택하세요" error errorText="항목을 선택해주세요." options={[{ value: 'a', label: '옵션 A' }]} />
          <Select label="도움말" placeholder="선택" helperText="하나를 선택해주세요." options={[{ value: 'a', label: '옵션 A' }, { value: 'b', label: '옵션 B' }]} />
          <Select label="비활성화" placeholder="선택 불가" disabled options={[{ value: 'a', label: '옵션 A' }]} />
        </div>
      </section>

      {/* FileInput */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>FileInput</Typography>
        <div className="stack gap-4" style={{ maxWidth: 520 }}>
          <FileInput label="기본 파일 업로드" helperText="모든 파일 형식 허용" onChange={setFileList} />
          <FileInput label="이미지 전용" accept=".jpg,.jpeg,.png,.webp" maxSize={5 * 1024 * 1024} helperText="JPG, PNG, WEBP · 최대 5MB" onChange={setFileList} />
          {fileList.length > 0 && (
            <Typography variant="caption" color="muted">선택된 파일: {fileList.map((f) => f.name).join(', ')}</Typography>
          )}
          <FileInput label="비활성화" disabled onChange={() => {}} />
        </div>
      </section>

      {/* Modal */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Modal</Typography>
        <div className="row gap-2">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} variant="outline" onClick={() => { setModalSize(size); setModalOpen(true); }}>
              {size.toUpperCase()} 모달 열기
            </Button>
          ))}
        </div>
        <Modal
          open={modalOpen} onClose={() => setModalOpen(false)}
          title={`${modalSize.toUpperCase()} 모달`} size={modalSize}
          footer={
            <div className="row gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
              <Button onClick={() => setModalOpen(false)}>확인</Button>
            </div>
          }
        >
          <div className="stack gap-3">
            <Typography variant="body2">모달 컴포넌트입니다. 사이즈는 sm / md / lg 를 지원합니다.</Typography>
            <Input label="모달 내부 입력" placeholder="텍스트 입력" />
            <Select label="모달 내부 선택" placeholder="선택하세요" options={[{ value: '1', label: '옵션 1' }, { value: '2', label: '옵션 2' }]} />
          </div>
        </Modal>
      </section>

      {/* Toast */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Toast</Typography>
        <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => toast.success('성공!', { message: '작업이 성공적으로 완료되었습니다.' })}>Success Toast</Button>
          <Button variant="danger" onClick={() => toast.error('오류 발생', { message: '처리 중 문제가 발생했습니다.' })}>Error Toast</Button>
          <Button variant="outline" onClick={() => toast.warning('주의', { message: '이 작업은 되돌릴 수 없습니다.' })}>Warning Toast</Button>
          <Button variant="ghost" onClick={() => toast.info('안내', { message: '새로운 업데이트가 있습니다.' })}>Info Toast</Button>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Card</Typography>
        <div className="grid-3">
          <Card variant="raised" title="Raised Card" description="기본 그림자 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card variant="flat" title="Flat Card" description="테두리만 있는 플랫 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card variant="raised" title="With Footer" description="푸터가 있는 카드입니다."
            footer={<div className="row gap-2"><Button size="sm" variant="outline">취소</Button><Button size="sm">확인</Button></div>}
          >
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Typography</Typography>
        <div className="stack gap-3">
          {(['h1','h2','h3','h4','h5','h6'] as const).map((v) => (
            <Typography key={v} variant={v}>{v.toUpperCase()} — StarBanking 디자인 시스템</Typography>
          ))}
          <div style={{ height: 'var(--space-2)' }} />
          <Typography variant="body1">Body1 — 본문 텍스트. StarBanking 디자인 시스템은 뱅킹 서비스에 최적화된 React 컴포넌트 라이브러리입니다.</Typography>
          <Typography variant="body2">Body2 — 보조 본문 텍스트. 좀 더 작은 본문에 사용됩니다.</Typography>
          <Typography variant="caption">Caption — 보조 설명 텍스트</Typography>
          <Typography variant="overline">Overline — 섹션 레이블</Typography>
          <Typography variant="label">Label — 폼 레이블</Typography>
          <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
            {(['primary','secondary','success','warning','error','muted'] as const).map((c) => (
              <Typography key={c} variant="label" color={c}>{c}</Typography>
            ))}
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Icon</Typography>
        <div className="stack gap-4">
          {([
            { label: 'Arrow / Chevron', icons: ['arrowUp','arrowDown','arrowLeft','arrowRight','chevronUp','chevronDown','chevronLeft','chevronRight'] },
            { label: 'Actions', icons: ['search','send','plus','minus','close','check','download','upload','edit','trash','copy'] },
            { label: 'People / System', icons: ['user','users','settings','home','menu','bell','eye','eyeOff','lock','unlock'] },
            { label: 'Status', icons: ['info','warning','error','success'] },
            { label: 'Utility', icons: ['calendar','clock','filter','sort','refresh','externalLink','link','attach','image'] },
            { label: 'Banking', icons: ['creditCard','transfer','wallet'] },
          ] as { label: string; icons: IconName[] }[]).map(({ label, icons }) => (
            <div key={label}>
              <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>{label}</Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {icons.map((name) => (
                  <div key={name} title={name} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 8px', borderRadius: 6, border: '1px solid var(--color-border)',
                    minWidth: 64, cursor: 'default',
                  }}>
                    <Icon name={name} size="lg" />
                    <span style={{ fontSize: 10, color: '#767676', textAlign: 'center' }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>Sizes</Typography>
            <div className="row gap-4" style={{ alignItems: 'flex-end' }}>
              {(['xs','sm','md','lg','xl'] as const).map((size) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <Icon name="bell" size={size} />
                  <span style={{ fontSize: 10, color: '#767676' }}>{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Color Tokens */}
      <section className={styles.section}>
        <Typography variant="overline" as="div" className={styles.sectionLabel}>Color Tokens</Typography>
        <div className="stack gap-4">
          {[
            { label: 'Brand / UI', colors: [
              { name: 'Nav / Primary', value: '#253349', token: '' },
              { name: 'Secondary (Button)', value: '#ffcc00', token: '' },
              { name: 'Highlight', value: '#ffbc00', token: '' },
              { name: 'Badge Yellow', value: '#fed700', token: '' },
            ]},
            { label: 'Semantic', colors: [
              { name: 'Point / Link', value: '#287eff', token: '' },
              { name: 'Error / Danger', value: '#ff3232', token: '' },
              { name: 'Hover bg', value: '#f2f2f2', token: '' },
              { name: 'Base bg', value: '#f7f7f7', token: '' },
            ]},
            { label: 'Text', colors: [
              { name: 'Strong text', value: '#222', token: '' },
              { name: 'Base text', value: '#444', token: '' },
              { name: 'Muted text', value: '#767676', token: '' },
              { name: 'Placeholder', value: '#999', token: '' },
              { name: 'Disabled text', value: '#ababab', token: '' },
            ]},
            { label: 'Border / Line', colors: [
              { name: 'Base border', value: '#d2d2d2', token: '' },
              { name: 'Light border', value: '#ebebeb', token: '' },
            ]},
            { label: 'Brand Brown (Custom)', colors: [
              { name: 'Brown Light', value: '#a8917b', token: '--color-brand-brown-light' },
              { name: 'Brown Base',  value: '#766554', token: '--color-brand-brown' },
              { name: 'Brown Dark',  value: '#4e4238', token: '--color-brand-brown-dark' },
            ]},
          ].map(({ label, colors }) => (
            <div key={label}>
              <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>{label}</Typography>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                {colors.map(({ name, value, token }) => (
                  <div key={name} style={{ minWidth: 110, flex: '0 0 auto' }}>
                    <div style={{ height: 40, borderRadius: 3, backgroundColor: value, border: '1px solid rgba(0,0,0,0.08)' }} />
                    <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.4 }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#767676', fontFamily: 'monospace' }}>{value}</div>
                    {token && <div style={{ fontSize: 10, color: '#999', fontFamily: 'monospace' }}>{token}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
