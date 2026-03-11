import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './components/Button/Button';
import { Badge } from './components/Badge/Badge';
import { Card } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';
import { FileInput } from './components/FileInput/FileInput';
import { Modal } from './components/Modal/Modal';
import { ToastProvider, useToast } from './components/Toast/Toast';
import { Typography } from './components/Typography/Typography';
import { Icon } from './components/Icon/Icon';

/* ── Shared section wrapper ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#767676', borderBottom: '1px solid #ebebeb', paddingBottom: 8, marginBottom: 16,
    }}>
      {title}
    </div>
    {children}
  </section>
);

/* ════════════════════════════════════════
   Storybook meta
════════════════════════════════════════ */
const meta: Meta = {
  title: 'Showcase/전체 컴포넌트',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <ToastProvider position="topRight">
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/* ════════════════════════════════════════
   Full Showcase (모든 컴포넌트)
════════════════════════════════════════ */
function ShowcaseAll() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fileList, setFileList] = useState<File[]>([]);
  const toast = useToast();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <Typography variant="h3">디자인 시스템</Typography>
        <Typography variant="body2" color="muted">@starbanking/design-system 컴포넌트 쇼케이스</Typography>
      </div>

      {/* Button */}
      <Section title="Button">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>Variants</Typography>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>Sizes</Typography>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>With Icons</Typography>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button leftIcon={<Icon name="send" />}>이체하기</Button>
              <Button variant="outline" rightIcon={<Icon name="download" />}>다운로드</Button>
              <Button variant="secondary" leftIcon={<Icon name="plus" />}>추가</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Badge */}
      <Section title="Badge">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
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
      </Section>

      {/* Input */}
      <Section title="Input">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
          <Input label="검색" placeholder="검색어 입력" prefix={<Icon name="search" />} value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          <Input label="필수 항목" placeholder="필수 값" required />
          <Input label="오류 상태" placeholder="잘못된 값" error errorText="올바른 형식으로 입력해주세요." />
          <Input label="도움말" placeholder="입력" helperText="8자 이상 입력해주세요." />
          <Input label="비활성화" placeholder="입력 불가" disabled />
        </div>
      </Section>

      {/* Select */}
      <Section title="Select">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
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
      </Section>

      {/* FileInput */}
      <Section title="FileInput">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
          <FileInput label="기본 파일 업로드" helperText="모든 파일 형식 허용" onChange={setFileList} />
          <FileInput label="이미지 전용" accept=".jpg,.jpeg,.png,.webp" maxSize={5 * 1024 * 1024} helperText="JPG, PNG, WEBP · 최대 5MB" onChange={setFileList} />
          {fileList.length > 0 && (
            <Typography variant="caption" color="muted">선택된 파일: {fileList.map((f) => f.name).join(', ')}</Typography>
          )}
          <FileInput label="비활성화" disabled onChange={() => {}} />
        </div>
      </Section>

      {/* Modal */}
      <Section title="Modal">
        <div style={{ display: 'flex', gap: 8 }}>
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
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
              <Button onClick={() => setModalOpen(false)}>확인</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Typography variant="body2">모달 컴포넌트입니다. 사이즈는 sm / md / lg 를 지원합니다.</Typography>
            <Input label="모달 내부 입력" placeholder="텍스트 입력" />
            <Select label="모달 내부 선택" placeholder="선택하세요" options={[{ value: '1', label: '옵션 1' }, { value: '2', label: '옵션 2' }]} />
          </div>
        </Modal>
      </Section>

      {/* Toast */}
      <Section title="Toast">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => toast.success('성공!', { message: '작업이 성공적으로 완료되었습니다.' })}>Success Toast</Button>
          <Button variant="danger" onClick={() => toast.error('오류 발생', { message: '처리 중 문제가 발생했습니다.' })}>Error Toast</Button>
          <Button variant="outline" onClick={() => toast.warning('주의', { message: '이 작업은 되돌릴 수 없습니다.' })}>Warning Toast</Button>
          <Button variant="ghost" onClick={() => toast.info('안내', { message: '새로운 업데이트가 있습니다.' })}>Info Toast</Button>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          <Card variant="raised" title="Raised Card" description="기본 그림자 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card variant="flat" title="Flat Card" description="테두리만 있는 플랫 카드입니다.">
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
          <Card
            variant="raised" title="With Footer" description="푸터가 있는 카드입니다."
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="outline">취소</Button>
                <Button size="sm">확인</Button>
              </div>
            }
          >
            <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
          </Card>
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((v) => (
            <Typography key={v} variant={v}>{v.toUpperCase()} — StarBanking 디자인 시스템</Typography>
          ))}
          <div style={{ height: 8 }} />
          <Typography variant="body1">Body1 — 본문 텍스트. StarBanking 디자인 시스템은 뱅킹 서비스에 최적화된 React 컴포넌트 라이브러리입니다.</Typography>
          <Typography variant="body2">Body2 — 보조 본문 텍스트. 좀 더 작은 본문에 사용됩니다.</Typography>
          <Typography variant="caption">Caption — 보조 설명 텍스트</Typography>
          <Typography variant="overline">Overline — 섹션 레이블</Typography>
          <Typography variant="label">Label — 폼 레이블</Typography>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['primary', 'secondary', 'success', 'warning', 'error', 'muted'] as const).map((c) => (
              <Typography key={c} variant="label" color={c}>{c}</Typography>
            ))}
          </div>
        </div>
      </Section>

      {/* Color Tokens */}
      <Section title="Color Tokens">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            {
              label: 'Brand / UI', colors: [
                { name: 'Nav / Primary', value: '#253349' },
                { name: 'Secondary (Button)', value: '#ffcc00' },
                { name: 'Highlight', value: '#ffbc00' },
                { name: 'Badge Yellow', value: '#fed700' },
              ],
            },
            {
              label: 'Semantic', colors: [
                { name: 'Point / Link', value: '#287eff' },
                { name: 'Error / Danger', value: '#ff3232' },
                { name: 'Hover bg', value: '#f2f2f2' },
                { name: 'Base bg', value: '#f7f7f7' },
              ],
            },
            {
              label: 'Text', colors: [
                { name: 'Strong text', value: '#222' },
                { name: 'Base text', value: '#444' },
                { name: 'Muted text', value: '#767676' },
                { name: 'Placeholder', value: '#999' },
                { name: 'Disabled text', value: '#ababab' },
              ],
            },
            {
              label: 'Border / Line', colors: [
                { name: 'Base border', value: '#d2d2d2' },
                { name: 'Light border', value: '#ebebeb' },
              ],
            },
            {
              label: 'Brand Brown', colors: [
                { name: 'Brown Light', value: '#a8917b' },
                { name: 'Brown Base', value: '#766554' },
                { name: 'Brown Dark', value: '#4e4238' },
              ],
            },
          ].map(({ label, colors }) => (
            <div key={label}>
              <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>{label}</Typography>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {colors.map(({ name, value }) => (
                  <div key={name} style={{ minWidth: 100, flex: '0 0 auto' }}>
                    <div style={{ height: 36, borderRadius: 4, backgroundColor: value, border: '1px solid rgba(0,0,0,0.08)' }} />
                    <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.4 }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#767676', fontFamily: 'monospace' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export const All: Story = {
  name: '전체 쇼케이스',
  render: () => <ShowcaseAll />,
};

/* ════════════════════════════════════════
   개별 섹션 스토리
════════════════════════════════════════ */
export const Buttons: Story = {
  name: 'Button — 전체',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>Variants</Typography>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
        <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>Sizes</Typography>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>With Icons</Typography>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button leftIcon={<Icon name="send" />}>이체하기</Button>
          <Button variant="outline" rightIcon={<Icon name="download" />}>다운로드</Button>
          <Button variant="secondary" leftIcon={<Icon name="plus" />}>추가</Button>
        </div>
      </div>
    </div>
  ),
};

export const Badges: Story = {
  name: 'Badge — 전체',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
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
  ),
};

export const Inputs: Story = {
  name: 'Input — 전체',
  render: () => {
    function InputDemo() {
      const [val, setVal] = useState('');
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
          <Input label="검색" placeholder="검색어 입력" prefix={<Icon name="search" />} value={val} onChange={(e) => setVal(e.target.value)} />
          <Input label="필수 항목" placeholder="필수 값" required />
          <Input label="오류 상태" placeholder="잘못된 값" error errorText="올바른 형식으로 입력해주세요." />
          <Input label="도움말" placeholder="입력" helperText="8자 이상 입력해주세요." />
          <Input label="비활성화" placeholder="입력 불가" disabled />
        </div>
      );
    }
    return <InputDemo />;
  },
};

export const Selects: Story = {
  name: 'Select — 전체',
  render: () => {
    function SelectDemo() {
      const [val, setVal] = useState('');
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          <Select
            label="기본 선택" placeholder="선택하세요"
            options={[{ value: 'option1', label: '옵션 1' }, { value: 'option2', label: '옵션 2' }, { value: 'option3', label: '옵션 3' }]}
            value={val} onChange={(e) => setVal(e.target.value)}
          />
          <Select label="Small" size="sm" placeholder="선택" options={[{ value: 'a', label: 'Small A' }, { value: 'b', label: 'Small B' }]} />
          <Select label="Large" size="lg" placeholder="선택" options={[{ value: 'a', label: 'Large A' }, { value: 'b', label: 'Large B' }]} />
          <Select label="오류 상태" placeholder="선택하세요" error errorText="항목을 선택해주세요." options={[{ value: 'a', label: '옵션 A' }]} />
          <Select label="도움말" placeholder="선택" helperText="하나를 선택해주세요." options={[{ value: 'a', label: '옵션 A' }, { value: 'b', label: '옵션 B' }]} />
          <Select label="비활성화" placeholder="선택 불가" disabled options={[{ value: 'a', label: '옵션 A' }]} />
        </div>
      );
    }
    return <SelectDemo />;
  },
};

export const FileInputs: Story = {
  name: 'FileInput — 전체',
  render: () => {
    function FileInputDemo() {
      const [files, setFiles] = useState<File[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
          <FileInput label="기본 파일 업로드" helperText="모든 파일 형식 허용" onChange={setFiles} />
          <FileInput label="이미지 전용" accept=".jpg,.jpeg,.png,.webp" maxSize={5 * 1024 * 1024} helperText="JPG, PNG, WEBP · 최대 5MB" onChange={setFiles} />
          {files.length > 0 && (
            <Typography variant="caption" color="muted">선택된 파일: {files.map((f) => f.name).join(', ')}</Typography>
          )}
          <FileInput label="비활성화" disabled onChange={() => {}} />
        </div>
      );
    }
    return <FileInputDemo />;
  },
};

export const Modals: Story = {
  name: 'Modal — 전체',
  render: () => {
    function ModalDemo() {
      const [open, setOpen] = useState(false);
      const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
      return (
        <>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Button key={s} variant="outline" onClick={() => { setSize(s); setOpen(true); }}>
                {s.toUpperCase()} 모달 열기
              </Button>
            ))}
          </div>
          <Modal
            open={open} onClose={() => setOpen(false)}
            title={`${size.toUpperCase()} 모달`} size={size}
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
                <Button onClick={() => setOpen(false)}>확인</Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Typography variant="body2">모달 컴포넌트입니다. 사이즈는 sm / md / lg 를 지원합니다.</Typography>
              <Input label="모달 내부 입력" placeholder="텍스트 입력" />
              <Select label="모달 내부 선택" placeholder="선택하세요" options={[{ value: '1', label: '옵션 1' }, { value: '2', label: '옵션 2' }]} />
            </div>
          </Modal>
        </>
      );
    }
    return <ModalDemo />;
  },
};

export const Toasts: Story = {
  name: 'Toast — 전체',
  render: () => {
    function ToastDemo() {
      const toast = useToast();
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => toast.success('성공!', { message: '작업이 성공적으로 완료되었습니다.' })}>Success Toast</Button>
          <Button variant="danger" onClick={() => toast.error('오류 발생', { message: '처리 중 문제가 발생했습니다.' })}>Error Toast</Button>
          <Button variant="outline" onClick={() => toast.warning('주의', { message: '이 작업은 되돌릴 수 없습니다.' })}>Warning Toast</Button>
          <Button variant="ghost" onClick={() => toast.info('안내', { message: '새로운 업데이트가 있습니다.' })}>Info Toast</Button>
        </div>
      );
    }
    return <ToastDemo />;
  },
};

export const Cards: Story = {
  name: 'Card — 전체',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      <Card variant="raised" title="Raised Card" description="기본 그림자 카드입니다.">
        <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
      </Card>
      <Card variant="flat" title="Flat Card" description="테두리만 있는 플랫 카드입니다.">
        <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
      </Card>
      <Card
        variant="raised" title="With Footer" description="푸터가 있는 카드입니다."
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm" variant="outline">취소</Button>
            <Button size="sm">확인</Button>
          </div>
        }
      >
        <Typography variant="body2">카드 본문 내용이 여기에 들어갑니다.</Typography>
      </Card>
    </div>
  ),
};

export const Typographies: Story = {
  name: 'Typography — 전체',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((v) => (
        <Typography key={v} variant={v}>{v.toUpperCase()} — StarBanking 디자인 시스템</Typography>
      ))}
      <div style={{ height: 8 }} />
      <Typography variant="body1">Body1 — 본문 텍스트. StarBanking 디자인 시스템은 뱅킹 서비스에 최적화된 React 컴포넌트 라이브러리입니다.</Typography>
      <Typography variant="body2">Body2 — 보조 본문 텍스트. 좀 더 작은 본문에 사용됩니다.</Typography>
      <Typography variant="caption">Caption — 보조 설명 텍스트</Typography>
      <Typography variant="overline">Overline — 섹션 레이블</Typography>
      <Typography variant="label">Label — 폼 레이블</Typography>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
        {(['primary', 'secondary', 'success', 'warning', 'error', 'muted'] as const).map((c) => (
          <Typography key={c} variant="label" color={c}>{c}</Typography>
        ))}
      </div>
    </div>
  ),
};

export const ColorTokens: Story = {
  name: 'Color Tokens',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        {
          label: 'Brand / UI', colors: [
            { name: 'Nav / Primary', value: '#253349' },
            { name: 'Secondary (Button)', value: '#ffcc00' },
            { name: 'Highlight', value: '#ffbc00' },
            { name: 'Badge Yellow', value: '#fed700' },
          ],
        },
        {
          label: 'Semantic', colors: [
            { name: 'Point / Link', value: '#287eff' },
            { name: 'Error / Danger', value: '#ff3232' },
            { name: 'Hover bg', value: '#f2f2f2' },
            { name: 'Base bg', value: '#f7f7f7' },
          ],
        },
        {
          label: 'Text', colors: [
            { name: 'Strong text', value: '#222' },
            { name: 'Base text', value: '#444' },
            { name: 'Muted text', value: '#767676' },
            { name: 'Placeholder', value: '#999' },
            { name: 'Disabled text', value: '#ababab' },
          ],
        },
        {
          label: 'Border / Line', colors: [
            { name: 'Base border', value: '#d2d2d2' },
            { name: 'Light border', value: '#ebebeb' },
          ],
        },
        {
          label: 'Brand Brown', colors: [
            { name: 'Brown Light', value: '#a8917b' },
            { name: 'Brown Base', value: '#766554' },
            { name: 'Brown Dark', value: '#4e4238' },
          ],
        },
      ].map(({ label, colors }) => (
        <div key={label}>
          <Typography variant="caption" color="muted" as="div" style={{ marginBottom: 8 }}>{label}</Typography>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {colors.map(({ name, value }) => (
              <div key={name} style={{ minWidth: 100, flex: '0 0 auto' }}>
                <div style={{ height: 36, borderRadius: 4, backgroundColor: value, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.4 }}>{name}</div>
                <div style={{ fontSize: 11, color: '#767676', fontFamily: 'monospace' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
