import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TopBar() {
  return (
    <div className="h-14 border-b border-border bg-background px-4 flex items-center justify-between gap-4">
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
