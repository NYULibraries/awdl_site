import { type PropsWithChildren, type ReactNode } from 'react';
import { Fragment } from 'react';

export function AppContent({ children }: PropsWithChildren<{ children: ReactNode }>) {
  return <Fragment>{children}</Fragment>;
}
