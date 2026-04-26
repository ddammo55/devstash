'use client';

import { Menu, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export default function TopBar({
  isSidebarOpen,
  onToggleSidebar,
  onToggleMobileSidebar,
}: TopBarProps) {
  return (
    <div className="h-14 border-b border-border bg-background px-4 flex items-center justify-between gap-4">
      {/* Sidebar Toggle Buttons */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobileSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:flex"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Logo */}
      <div className="text-lg font-semibold text-foreground min-w-fit">
        DevStash
      </div>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search items..."
        className="flex-1 max-w-md"
        disabled
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-2 min-w-fit">
        <Button variant="outline" disabled>
          New Collection
        </Button>
        <Button disabled>
          <Plus className="w-4 h-4 mr-2" />
          New Item
        </Button>
      </div>
    </div>
  );
}
