import { AppContent } from '@/layouts/app/app-content';
import AppHeader from '@/layouts/app/app-header';
import { AppShell } from '@/layouts/app/app-shell';
import Footer from '@/components/Footer/Footer';
import { type PropsWithChildren } from 'react';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

function AppLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>
        {children}
      </AppContent>
      <Footer />
    </AppShell>
  );
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayout breadcrumbs={breadcrumbs} {...props}>
    {children}
  </AppLayout>
);
