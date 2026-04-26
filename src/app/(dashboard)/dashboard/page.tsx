import {
  Package,
  LayoutGrid,
  Star,
  BookOpen,
  Pin,
  Clock,
} from 'lucide-react';
import {
  getMockCollections,
  getMockPinnedItems,
  getMockRecentItems,
  getMockFavoriteCollections,
  mockStatistics,
  mockItems,
  mockItemTypes,
} from '@/lib/mock-data';
import StatsCard from '@/components/dashboard/StatsCard';
import CollectionCard from '@/components/dashboard/CollectionCard';
import ItemCard from '@/components/dashboard/ItemCard';

export default function DashboardPage() {
  // Data derivations
  const totalItems = mockStatistics.totalItems;
  const totalCollections = getMockCollections().length;
  const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
  const favoriteColls = getMockFavoriteCollections().length;

  const collections = getMockCollections();
  const pinnedItems = getMockPinnedItems();
  const recentItems = getMockRecentItems(10);

  // Helper to look up item type
  const getItemType = (itemTypeId: string) =>
    mockItemTypes.find((t) => t.id === itemTypeId);

  return (
    <div className="p-6 space-y-8 max-w-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your developer knowledge hub
        </p>
      </div>

      {/* Stats Cards */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Package}
            label="Total Items"
            value={totalItems}
            iconColor="#3b82f6"
          />
          <StatsCard
            icon={LayoutGrid}
            label="Total Collections"
            value={totalCollections}
            iconColor="#8b5cf6"
          />
          <StatsCard
            icon={Star}
            label="Favorite Items"
            value={favoriteItems}
            iconColor="#f97316"
          />
          <StatsCard
            icon={BookOpen}
            label="Favorite Collections"
            value={favoriteColls}
            iconColor="#10b981"
          />
        </div>
      </section>

      {/* Collections */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-3">
          Collections
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {collections.map((col) => {
            const defaultType = mockItemTypes.find(
              (t) => t.id === col.defaultTypeId
            );
            return (
              <CollectionCard
                key={col.id}
                name={col.name}
                description={col.description}
                itemCount={col.itemCount}
                isFavorite={col.isFavorite}
                defaultTypeIcon={defaultType?.icon}
                defaultTypeColor={defaultType?.color}
              />
            );
          })}
        </div>
      </section>

      {/* Pinned Items */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Pin className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">Pinned</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {pinnedItems.map((item) => {
            const type = getItemType(item.itemTypeId);
            return (
              <ItemCard
                key={item.id}
                variant="card"
                title={item.title}
                description={item.description}
                tags={item.tags}
                updatedAt={item.updatedAt}
                typeName={type?.name ?? ''}
                typeIcon={type?.icon ?? 'Code'}
                typeColor={type?.color ?? '#6b7280'}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Items */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">
            Recent Items
          </h2>
        </div>
        <div className="bg-card border border-border rounded-lg px-4">
          {recentItems.map((item) => {
            const type = getItemType(item.itemTypeId);
            return (
              <ItemCard
                key={item.id}
                variant="row"
                title={item.title}
                description={item.description}
                tags={item.tags}
                updatedAt={item.updatedAt}
                typeName={type?.name ?? ''}
                typeIcon={type?.icon ?? 'Code'}
                typeColor={type?.color ?? '#6b7280'}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
