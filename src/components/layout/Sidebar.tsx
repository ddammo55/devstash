'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getMockUser,
  getMockCollections,
  getMockFavoriteCollections,
  mockItemTypes,
  mockStatistics,
} from '@/lib/mock-data';
import { ITEM_TYPE_ICON_MAP, ITEM_TYPE_STAT_KEY } from '@/lib/item-type-icons';
import UserAvatar from './UserAvatar';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  isOpen,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const user = getMockUser();
  const allCollections = getMockCollections();
  const favoriteCollections = getMockFavoriteCollections();
  const otherCollections = allCollections.filter((c) => !c.isFavorite);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Mobile drawer
          'fixed inset-y-0 left-0 z-50 w-[220px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop layout
          'lg:relative lg:translate-x-0 lg:inset-auto lg:z-auto',
          isOpen ? 'lg:w-[220px]' : 'lg:w-[52px]',
          // Transitions - use transition-all to handle both width and transform
          'transition-all duration-200 ease-in-out',
          // Common
          'flex flex-col h-screen border-r border-border bg-background overflow-y-auto'
        )}
      >
        {/* Types Section */}
        <div className="px-2 py-4 space-y-2">
          {/* Types Header */}
          <button
            onClick={() => setTypesOpen(!typesOpen)}
            className={cn(
              'w-full flex items-center justify-between px-2 py-1.5',
              'text-xs font-semibold text-muted-foreground',
              'hover:text-foreground',
              'transition-colors'
            )}
          >
            <span className={cn(!isOpen && 'hidden')}>Types</span>
            {typesOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>

          {/* Types List */}
          {typesOpen && (
            <div className="space-y-1">
              {mockItemTypes.map((type) => {
                const Icon = ITEM_TYPE_ICON_MAP[type.icon] || ITEM_TYPE_ICON_MAP.Code;
                const statKey = ITEM_TYPE_STAT_KEY[type.name];
                const count = (mockStatistics as any)[statKey] || 0;

                return (
                  <Link
                    key={type.id}
                    href={`/items/${type.name}s`}
                    className={cn(
                      'flex items-center gap-2 px-2 py-1.5',
                      'rounded-md text-sm',
                      'text-foreground hover:bg-accent hover:text-accent-foreground',
                      'transition-colors',
                      'truncate'
                    )}
                  >
                    {/* Colored Dot */}
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: type.color }}
                      aria-hidden="true"
                    />
                    {/* Icon */}
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {/* Name & Count */}
                    <span className={cn('flex-1 truncate', !isOpen && 'hidden')}>
                      {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </span>
                    {isOpen && (
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Collections Section */}
        <div className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
          {/* Favorites Subsection */}
          {favoriteCollections.length > 0 && (
            <div className="space-y-1">
              <h3
                className={cn(
                  'text-xs font-semibold text-muted-foreground px-2',
                  !isOpen && 'hidden'
                )}
              >
                Favorites
              </h3>
              <div className="space-y-1">
                {favoriteCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className={cn(
                      'flex items-center gap-2 px-2 py-1.5',
                      'rounded-md text-sm',
                      'text-foreground hover:bg-accent hover:text-accent-foreground',
                      'transition-colors',
                      'truncate'
                    )}
                  >
                    <Folder className="w-4 h-4 flex-shrink-0" />
                    <span className={cn('flex-1 truncate', !isOpen && 'hidden')}>
                      {col.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Collections Subsection */}
          {otherCollections.length > 0 && (
            <div className="space-y-1">
              <h3
                className={cn(
                  'text-xs font-semibold text-muted-foreground px-2',
                  !isOpen && 'hidden'
                )}
              >
                All Collections
              </h3>
              <div className="space-y-1">
                {otherCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className={cn(
                      'flex items-center gap-2 px-2 py-1.5',
                      'rounded-md text-sm',
                      'text-foreground hover:bg-accent hover:text-accent-foreground',
                      'transition-colors',
                      'truncate'
                    )}
                  >
                    <Folder className="w-4 h-4 flex-shrink-0" />
                    <span className={cn('flex-1 truncate', !isOpen && 'hidden')}>
                      {col.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <UserAvatar user={user} collapsed={!isOpen} />
      </aside>
    </>
  );
}
