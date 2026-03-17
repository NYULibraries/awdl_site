import { AppContent } from '@/layouts/app/app-content';
import AppHeader from '@/layouts/app/app-header';
import { AppShell } from '@/layouts/app/app-shell';
import Footer from '@/components/Footer/Footer';
import { type PropsWithChildren } from 'react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  bodyId?: string;
  bodyClass?: string;
  children: ReactNode;
}

function AppLayout({ bodyId, bodyClass, children }: { bodyId?:string, bodyClass?:string, children: ReactNode }) {
  return (
    <AppShell bodyId={bodyId} bodyClass={bodyClass}>
      <AppHeader />
      <AppContent>{children}</AppContent>
      <Footer />
    </AppShell>
  );
}

export default ({ children, ...props }: AppLayoutProps) => (
  <AppLayout {...props}>
    {children}
  </AppLayout>
);
