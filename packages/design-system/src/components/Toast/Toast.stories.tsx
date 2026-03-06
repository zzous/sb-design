import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/* ── Trigger Buttons ── */
function ToastTriggers() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button
        variant="primary"
        onClick={() => toast.success('이체가 완료되었습니다.', { message: '홍길동님 계좌로 100,000원이 이체되었습니다.' })}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast.error('이체에 실패했습니다.', { message: '잔액이 부족합니다. 잔액을 확인해주세요.' })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning('주의가 필요합니다.', { message: '하루 이체 한도의 90%에 도달했습니다.' })}
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast.info('공지사항', { message: '3월 10일 새벽 2시~4시 시스템 점검이 예정되어 있습니다.' })}
      >
        Info
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast.toast('알림', { message: '새로운 메시지가 도착했습니다.', variant: 'neutral' })}
      >
        Neutral
      </Button>
    </div>
  );
}

export const Playground: Story = {
  render: () => <ToastTriggers />,
};

export const Variants: Story = {
  name: '모든 Variant',
  render: () => {
    function AllVariants() {
      const toast = useToast();
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <Button size="sm" onClick={() => toast.success('성공!', { message: '작업이 완료되었습니다.' })}>
            success 토스트
          </Button>
          <Button size="sm" variant="danger" onClick={() => toast.error('오류 발생', { message: '다시 시도해주세요.' })}>
            error 토스트
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.warning('경고', { message: '한도 초과 직전입니다.' })}>
            warning 토스트
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toast.info('안내', { message: '서비스 점검 예정입니다.' })}>
            info 토스트
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toast.toast('알림', { variant: 'neutral' })}>
            neutral 토스트
          </Button>
        </div>
      );
    }
    return <AllVariants />;
  },
};

export const Persistent: Story = {
  name: '지속 토스트 (닫기 전까지 유지)',
  render: () => {
    function PersistentDemo() {
      const toast = useToast();
      return (
        <Button
          onClick={() =>
            toast.info('중요 공지', {
              message: '닫기 버튼을 클릭할 때까지 사라지지 않습니다.',
              duration: 0,
            })
          }
        >
          지속 토스트 열기
        </Button>
      );
    }
    return <PersistentDemo />;
  },
};

export const BankingExamples: Story = {
  name: '뱅킹 시나리오 예시',
  render: () => {
    function BankingToasts() {
      const toast = useToast();
      const scenarios = [
        {
          label: '이체 성공',
          action: () => toast.success('이체 완료', { message: '홍길동 · 스타뱅크 · 100,000원' }),
        },
        {
          label: '잔액 부족',
          action: () => toast.error('이체 실패', { message: '잔액이 부족합니다. 현재 잔액: 5,000원' }),
        },
        {
          label: '한도 경고',
          action: () => toast.warning('한도 주의', { message: '일일 이체 한도의 90%를 사용했습니다.' }),
        },
        {
          label: '점검 안내',
          action: () => toast.info('시스템 점검', { message: '3/10 새벽 2시~4시 서비스가 중단됩니다.', duration: 6000 }),
        },
        {
          label: '로그인 알림',
          action: () => toast.warning('새 기기 로그인', { message: '서울 · iPhone · 방금 전', duration: 6000 }),
        },
      ];
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {scenarios.map(({ label, action }) => (
            <Button key={label} size="sm" variant="outline" onClick={action}>
              {label}
            </Button>
          ))}
        </div>
      );
    }
    return <BankingToasts />;
  },
};

export const PositionOptions: Story = {
  name: '위치별 예시 (별도 Provider)',
  render: () => {
    const positions = ['topRight', 'topLeft', 'bottomRight', 'bottomLeft'] as const;
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {positions.map((pos) => (
          <ToastProvider key={pos} position={pos}>
            <PositionButton position={pos} />
          </ToastProvider>
        ))}
      </div>
    );
  },
};

function PositionButton({ position }: { position: string }) {
  const toast = useToast();
  return (
    <Button size="sm" variant="outline" onClick={() => toast.info(position, { message: '이 위치에서 표시됩니다.' })}>
      {position}
    </Button>
  );
}
