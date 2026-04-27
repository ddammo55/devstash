import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function testDatabase() {
  try {
    console.log("🔄 데이터베이스 연결 테스트 시작...\n");

    // 1. 시스템 ItemType 조회
    console.log("1️⃣ 시스템 ItemType 조회:");
    const systemTypes = await prisma.itemType.findMany({
      where: { isSystem: true },
    });
    console.log(`   ✅ 총 ${systemTypes.length}개 시스템 타입 조회됨`);
    systemTypes.forEach((type) => {
      console.log(`   - ${type.name} (${type.icon}, ${type.color})`);
    });

    // 2. 사용자 수
    console.log("\n2️⃣ 사용자 데이터:");
    const userCount = await prisma.user.count();
    console.log(`   ✅ 총 ${userCount}명의 사용자`);

    // 3. 아이템 수
    console.log("\n3️⃣ 아이템 데이터:");
    const itemCount = await prisma.item.count();
    console.log(`   ✅ 총 ${itemCount}개의 아이템`);

    // 4. 컬렉션 수
    console.log("\n4️⃣ 컬렉션 데이터:");
    const collectionCount = await prisma.collection.count();
    console.log(`   ✅ 총 ${collectionCount}개의 컬렉션`);

    // 5. 태그 수
    console.log("\n5️⃣ 태그 데이터:");
    const tagCount = await prisma.tag.count();
    console.log(`   ✅ 총 ${tagCount}개의 태그`);

    console.log("\n✨ 데이터베이스 연결 테스트 성공!");
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
