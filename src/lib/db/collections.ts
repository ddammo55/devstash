import { prisma } from '../prisma';

export interface CollectionWithStats {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  itemCount: number;
  defaultTypeId: string | null;
  defaultType?: {
    id: string;
    name: string;
    icon: string;
    color: string;
  } | null;
  mostUsedType?: {
    name: string;
    icon: string;
    color: string;
    count: number;
  } | null;
}

export async function getCollections(
  userId: string
): Promise<CollectionWithStats[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      defaultType: true,
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
  });

  return collections.map((col) => {
    // Calculate item count
    const itemCount = col.items.length;

    // Find most used item type in this collection
    const typeFrequency: Record<string, { name: string; icon: string; color: string; count: number }> = {};

    col.items.forEach((itemCollection) => {
      const typeName = itemCollection.item.itemType.name;
      if (!typeFrequency[typeName]) {
        typeFrequency[typeName] = {
          name: typeName,
          icon: itemCollection.item.itemType.icon,
          color: itemCollection.item.itemType.color,
          count: 0,
        };
      }
      typeFrequency[typeName].count++;
    });

    const mostUsedType =
      Object.values(typeFrequency).sort((a, b) => b.count - a.count)[0] || null;

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      createdAt: col.createdAt,
      updatedAt: col.updatedAt,
      itemCount,
      defaultTypeId: col.defaultTypeId,
      defaultType: col.defaultType
        ? {
            id: col.defaultType.id,
            name: col.defaultType.name,
            icon: col.defaultType.icon,
            color: col.defaultType.color,
          }
        : null,
      mostUsedType,
    };
  });
}

export async function getCollectionStats(userId: string) {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({
      where: { userId, isFavorite: true },
    }),
  ]);

  return {
    totalCollections,
    favoriteCollections,
  };
}
