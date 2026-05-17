import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getCollections } from '@/lib/db/collections';
import { getSystemItemTypes } from '@/lib/db/items';
import TopBar from '@/components/layout/TopBar';
import DashboardLayoutClient from '@/components/layout/DashboardLayoutClient';
import Sidebar from '@/components/layout/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current user session
  const session = await auth();

  // Get user data
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
      })
    : null;

  if (!user) {
    return <div>User not found</div>;
  }

  // Fetch sidebar data
  const [itemTypes, collections] = await Promise.all([
    getSystemItemTypes(),
    getCollections(user.id),
  ]);

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const otherCollections = collections.filter((c) => !c.isFavorite);

  return (
    <DashboardLayoutClient>
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          itemTypes={itemTypes}
          favoriteCollections={favoriteCollections}
          otherCollections={otherCollections}
          session={session}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </DashboardLayoutClient>
  );
}
