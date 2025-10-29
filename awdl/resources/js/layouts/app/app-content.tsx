import { type PropsWithChildren, type ReactNode } from 'react';
import { Fragment } from 'react';

export function AppContent({ children, ...props }: PropsWithChildren<{ children: ReactNode }>) {
  return (
    <Fragment {...props}>
      {children}
    </Fragment>
  );
}
