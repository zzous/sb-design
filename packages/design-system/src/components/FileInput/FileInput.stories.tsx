import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from './FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    accept: { control: 'text', description: 'MIME 타입 또는 확장자 (예: image/*, .pdf)' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number', description: '최대 파일 크기 (bytes)' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: '파일 업로드',
    multiple: false,
    disabled: false,
    required: false,
    error: false,
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Playground: Story = {};

export const ImageOnly: Story = {
  args: {
    label: '프로필 이미지',
    accept: 'image/*',
    helperText: 'JPG, PNG, GIF 형식만 허용합니다.',
  },
};

export const MultipleFiles: Story = {
  args: {
    label: '첨부파일',
    multiple: true,
    helperText: '여러 파일을 선택할 수 있습니다.',
  },
};

export const WithMaxSize: Story = {
  args: {
    label: '서류 업로드',
    accept: '.pdf,.doc,.docx',
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: 'PDF, DOC 형식 · 최대 5MB',
  },
};

export const WithError: Story = {
  args: {
    label: '신분증 업로드',
    error: true,
    errorText: '파일을 업로드해주세요.',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    disabled: true,
    helperText: '현재 파일 업로드가 불가합니다.',
  },
};

export const BankingExample: Story = {
  name: '뱅킹 서류 첨부 예시',
  args: {
    label: '계좌 개설 서류',
    accept: '.pdf,image/*',
    multiple: true,
    maxSize: 10 * 1024 * 1024,
    required: true,
    helperText: '신분증, 재직증명서 등 · PDF 또는 이미지 · 파일당 최대 10MB',
  },
};
