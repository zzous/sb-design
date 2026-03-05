import type { Preview } from '@storybook/react';
import '../src/tokens/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light',   value: '#f7f8fa' },
        { name: 'white',   value: '#ffffff' },
        { name: 'dark',    value: '#1d2939' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
