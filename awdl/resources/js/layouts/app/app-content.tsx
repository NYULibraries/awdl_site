import { type PropsWithChildren, type ReactNode } from 'react';

export function AppContent({ children, ...props }: PropsWithChildren<{ children: ReactNode }>) {
  return (
    <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
      {children}
    </main>
  );
}
