import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MockUser } from '@/lib/mock-data';

interface UserAvatarProps {
  user: MockUser;
  collapsed?: boolean;
}

export default function UserAvatar({ user, collapsed }: UserAvatarProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="border-t border-border p-3 flex items-center gap-3 mt-auto">
      {/* Avatar Circle */}
      <div className="relative w-8 h-8 rounded-full flex-shrink-0 bg-muted flex items-center justify-center overflow-hidden">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-muted-foreground">
            {initials}
          </span>
        )}
      </div>

      {/* User Info - Hidden when collapsed */}
      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 flex-shrink-0"
            disabled
          >
            <Settings className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}
