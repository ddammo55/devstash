import {
  Package,
  LayoutGrid,
  Star,
  BookOpen,
  Pin,
  Clock,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCollections, getCollectionStats } from '@/lib/db/collections';
import StatsCard from '@/components/dashboard/StatsCard';
import CollectionCard from '@/components/dashboard/CollectionCard';
import ItemCard from '@/components/dashboard/ItemCard';

export default async function DashboardPage() {
  // TODO: Get userId from NextAuth session
  // For now, use demo user
  const demoUser = await prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
  });

  if (!demoUser) {
    return <div>User not found</div>;
  }

  const userId = demoUser.id;

  // Fetch data from database
  const [collections, totalItems, favoriteItems, collectionStats] =
    await Promise.all([
      getCollections(userId),
      prisma.item.count({ where: { userId } }),
      prisma.item.count({
        where: { userId, isFavorite: true },
      }),
      getCollectionStats(userId),
    ]);

  const pinnedItems = await prisma.item.findMany({
    where: { userId, isPinned: true },
    include: { itemType: true },
    take: 10,
  });

  const recentItems = await prisma.item.findMany({
    where: { userId },
    include: { itemType: true },
    orderBy: { updatedAt: 'desc' },
    take: 10,
  });

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
            value={collectionStats.totalCollections}
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
            value={collectionStats.favoriteCollections}
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
            const typeToDisplay = col.mostUsedType || col.defaultType;
            return (
              <CollectionCard
                key={col.id}
                name={col.name}
                description={col.description ?? undefined}
                itemCount={col.itemCount}
                isFavorite={col.isFavorite}
                defaultTypeIcon={typeToDisplay?.icon}
                defaultTypeColor={typeToDisplay?.color}
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
          {pinnedItems.map((item) => (
            <ItemCard
              key={item.id}
              variant="card"
              title={item.title}
              description={item.description ?? undefined}
              tags={[]}
              updatedAt={item.updatedAt}
              typeName={item.itemType.name}
              typeIcon={item.itemType.icon}
              typeColor={item.itemType.color}
            />
          ))}
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
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              variant="row"
              title={item.title}
              description={item.description ?? undefined}
              tags={[]}
              updatedAt={item.updatedAt}
              typeName={item.itemType.name}
              typeIcon={item.itemType.icon}
              typeColor={item.itemType.color}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
