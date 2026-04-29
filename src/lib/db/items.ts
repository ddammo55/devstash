import { prisma } from '@/lib/prisma';

export interface ItemTypeWithCount {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface ItemStats {
  totalItems: number;
  itemsByType: ItemTypeWithCount[];
}

export async function getSystemItemTypes(): Promise<ItemTypeWithCount[]> {
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
  });

  // Get count of items for each type (for demo user initially)
  const typesWithCount = await Promise.all(
    itemTypes.map(async (type) => {
      const count = await prisma.item.count({
        where: { itemTypeId: type.id },
      });

      return {
        id: type.id,
        name: type.name,
        icon: type.icon,
        color: type.color,
        count,
      };
    })
  );

  return typesWithCount.sort((a, b) => b.count - a.count);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const totalItems = await prisma.item.count({
    where: { userId },
  });

  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
  });

  const itemsByType = await Promise.all(
    itemTypes.map(async (type) => {
      const count = await prisma.item.count({
        where: { userId, itemTypeId: type.id },
      });

      return {
        id: type.id,
        name: type.name,
        icon: type.icon,
        color: type.color,
        count,
      };
    })
  );

  return {
    totalItems,
    itemsByType: itemsByType.sort((a, b) => b.count - a.count),
  };
}

export async function getItemTypeStats(userId: string): Promise<ItemTypeWithCount[]> {
  const itemStats = await getItemStats(userId);
  return itemStats.itemsByType;
}

export async function getTotalItemsCount(userId: string): Promise<number> {
  return prisma.item.count({
    where: { userId },
  });
}

export async function getItemTypeCount(
  userId: string,
  typeName: string
): Promise<number> {
  const itemType = await prisma.itemType.findFirst({
    where: { name: typeName, isSystem: true },
  });

  if (!itemType) return 0;

  return prisma.item.count({
    where: { userId, itemTypeId: itemType.id },
  });
}
