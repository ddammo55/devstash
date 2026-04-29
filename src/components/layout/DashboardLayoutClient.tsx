'use client';

import { useState } from 'react';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
