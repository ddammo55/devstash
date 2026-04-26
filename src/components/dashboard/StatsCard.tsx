import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconColor?: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="bg-muted rounded-md p-2 w-fit">
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
