import { AppContent } from '@/layouts/app/app-content';
import AppHeader from '@/layouts/app/app-header';
import { AppShell } from '@/layouts/app/app-shell';
import Footer from '@/components/Footer/Footer';
import { type PropsWithChildren } from 'react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: PropsWithChildren<{ children: ReactNode }>) {
  return (
    <AppShell>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}

export default ({ children, ...props }: AppLayoutProps) => <AppLayout {...props}>{children}</AppLayout>;
