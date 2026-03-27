interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({
  bodyId,
  bodyClass,
  children,
}: {
  bodyId?: string;
  bodyClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={bodyId} className={bodyClass}>
      {children}
    </div>
  );
}
