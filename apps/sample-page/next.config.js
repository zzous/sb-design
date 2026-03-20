const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/sb-design',
  trailingSlash: true,
  images: { unoptimized: true },
  generateBuildId: async () => 'build',
  transpilePackages: ['@starbanking/design-system'],
  webpack(config) {
    // 디자인 시스템 legacy CSS에서 참조하는 XML 폰트 파일 처리
    config.module.rules.push({
      test: /\.xml$/,
      type: 'asset/resource',
    });

    config.resolve.alias = {
      ...config.resolve.alias,

      '@starbanking/design-system/styles': path.resolve(
        __dirname,
        '../../packages/design-system/src/tokens/index.css',
      ),
      '@starbanking/design-system/legacy-styles': path.resolve(
        __dirname,
        '../../packages/design-system/src/legacy/admin.css',
      ),
      '@starbanking/design-system': path.resolve(
        __dirname,
        '../../packages/design-system/src/index.ts',
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
