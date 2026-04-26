import { cn } from '@/lib/utils';

interface ItemCardProps {
  title: string;
  description?: string;
  tags?: string[];
  updatedAt: Date;
  typeName: string;
  typeIcon: string;
  typeColor: string;
  variant: 'card' | 'row';
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function ItemCard({
  title,
  description,
  tags,
  updatedAt,
  typeColor,
  variant,
}: ItemCardProps) {
  if (variant === 'card') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 w-56 flex-shrink-0">
        {/* Type dot + Title */}
        <div className="flex items-center gap-2 gap-full">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: typeColor }}
          />
          <p className="text-sm font-semibold text-foreground truncate">
            {title}
          </p>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date footer */}
        <p className="text-xs text-muted-foreground pt-1">
          {formatDate(updatedAt)}
        </p>
      </div>
    );
  }

  // Row variant
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-b-0">
      {/* Colored type dot */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: typeColor }}
      />

      {/* Center: Title + Description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        )}
      </div>

      {/* Right: Tags (max 2) + Date */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {tags && tags.length > 0 && (
          <div className="flex gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground text-xs px-1 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDate(updatedAt)}
        </p>
      </div>
    </div>
  );
}
