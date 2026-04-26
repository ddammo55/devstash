import { Star } from 'lucide-react';
import { ITEM_TYPE_ICON_MAP } from '@/lib/item-type-icons';

interface CollectionCardProps {
  name: string;
  description?: string;
  itemCount?: number;
  isFavorite: boolean;
  defaultTypeIcon?: string;
  defaultTypeColor?: string;
}

export default function CollectionCard({
  name,
  description,
  itemCount,
  isFavorite,
  defaultTypeIcon,
  defaultTypeColor,
}: CollectionCardProps) {
  const Icon = defaultTypeIcon
    ? ITEM_TYPE_ICON_MAP[defaultTypeIcon] || ITEM_TYPE_ICON_MAP.Code
    : null;

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 w-52 flex-shrink-0">
      {/* Top row: Type icon + Star */}
      <div className="flex items-center justify-between">
        {Icon ? (
          <div className="bg-muted rounded-md p-1.5 w-fit">
            <Icon className="w-4 h-4" style={{ color: defaultTypeColor }} />
          </div>
        ) : (
          <div className="w-6" />
        )}
        {isFavorite && (
          <Star className="w-3.5 h-3.5 text-muted-foreground fill-muted-foreground" />
        )}
      </div>

      {/* Collection name */}
      <p className="text-sm font-semibold text-foreground truncate">{name}</p>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
      )}

      {/* Item count footer */}
      {itemCount !== undefined && (
        <p className="text-xs text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      )}
    </div>
  );
}
