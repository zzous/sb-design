import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    footerAlign: { control: 'radio', options: ['left', 'center', 'right', 'spaceBetween'] },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* ── Wrapper to control open state ── */
function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>> & { triggerLabel?: string }) {
  const [open, setOpen] = useState(false);
  const { triggerLabel = '모달 열기', ...rest } = props;
  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Modal open={open} onClose={() => setOpen(false)} {...rest} />
    </>
  );
}

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    title: '모달 제목',
    description: '모달에 대한 간단한 설명입니다.',
    children: <p style={{ margin: 0 }}>모달 본문 내용이 여기에 들어갑니다.</p>,
    size: 'md',
    footerAlign: 'right',
    closeOnBackdrop: true,
    closeOnEsc: true,
  },
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      triggerLabel="확인 모달"
      title="이체 확인"
      description="아래 내용을 다시 한번 확인해주세요."
      footer={
        <>
          <Button variant="outline" onClick={() => {}}>취소</Button>
          <Button onClick={() => {}}>이체하기</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem', color: 'var(--color-neutral-700)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-neutral-500)' }}>받는 분</span>
          <strong>홍길동</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-neutral-500)' }}>은행</span>
          <strong>스타뱅크</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-neutral-500)' }}>계좌번호</span>
          <strong>110-123-456789</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-neutral-100)', paddingTop: 12, marginTop: 4 }}>
          <span style={{ color: 'var(--color-neutral-500)' }}>이체 금액</span>
          <strong style={{ fontSize: '1.125rem', color: 'var(--color-primary-600)' }}>100,000원</strong>
        </div>
      </div>
    </ModalDemo>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>계좌 추가</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="새 계좌 추가"
          description="연결할 계좌 정보를 입력해주세요."
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>추가하기</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="은행명" placeholder="예) 스타뱅크" required />
            <Input label="계좌번호" placeholder="숫자만 입력" required />
            <Input label="예금주명" placeholder="본인 이름" required />
          </div>
        </Modal>
      </>
    );
  },
};

export const Danger: Story = {
  render: () => (
    <ModalDemo
      triggerLabel="계좌 해지"
      title="계좌를 해지하시겠습니까?"
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={() => {}}>취소</Button>
          <Button variant="danger" onClick={() => {}}>해지하기</Button>
        </>
      }
    >
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-neutral-600)', lineHeight: 1.6 }}>
        계좌를 해지하면 모든 거래내역과 설정이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
      </p>
    </ModalDemo>
  ),
};

export const Sizes: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    const [current, setCurrent] = useState<typeof sizes[number] | null>(null);
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {sizes.map((s) => (
          <Button key={s} variant="outline" size="sm" onClick={() => setCurrent(s)}>
            {s.toUpperCase()}
          </Button>
        ))}
        {current && (
          <Modal
            open
            onClose={() => setCurrent(null)}
            title={`Size: ${current}`}
            description="모달 크기 예시입니다."
            size={current}
            footer={<Button onClick={() => setCurrent(null)}>닫기</Button>}
          >
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
              이 모달의 max-width는 <strong>{current}</strong> 사이즈입니다.
            </p>
          </Modal>
        )}
      </div>
    );
  },
};
