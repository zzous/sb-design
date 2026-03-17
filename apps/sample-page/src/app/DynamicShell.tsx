'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const ClientShell = dynamic(() => import('./ClientShell'), { ssr: false });

export default function DynamicShell({ children }: { children: ReactNode }) {
  return <ClientShell>{children}</ClientShell>;
}
