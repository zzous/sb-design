import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const dsRoot = path.resolve(__dirname, '../../packages/design-system/src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Must come before the broader alias so "/styles" is matched first
      {
        find: '@starbanking/design-system/styles',
        replacement: path.join(dsRoot, 'tokens/index.css'),
      },
      {
        find: '@starbanking/design-system',
        replacement: path.join(dsRoot, 'index.ts'),
      },
    ],
  },
});
