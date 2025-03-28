import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex grow flex-col">
      <div className="mx-auto flex w-full max-w-2xl grow flex-col py-10">
        {children}
      </div>
    </div>
  );
}
