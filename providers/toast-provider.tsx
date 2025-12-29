'use client';

import { Toaster } from '@/components/ui/sonner';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <>
      {children}
      <Toaster
        theme={theme as 'light' | 'system' | 'dark'}
        position='top-center'
        closeButton
        richColors
      />
    </>
  );
}
