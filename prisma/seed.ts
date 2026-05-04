import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function seed() {
  try {
    console.log("🌱 Seeding database...\n");

    // 1. Create or update demo user
    console.log("1️⃣ Creating demo user...");
    const hashedPassword = await hashPassword(DEMO_PASSWORD);
    const demoUser = await prisma.user.upsert({
      where: { email: DEMO_EMAIL },
      update: {},
      create: {
        email: DEMO_EMAIL,
        name: "Demo User",
        password: hashedPassword,
        emailVerified: new Date(),
        isPro: false,
      },
    });
    console.log(`   ✅ Demo user: ${demoUser.email}\n`);

    // 2. Ensure system item types exist
    console.log("2️⃣ Creating system item types...");
    const systemItemTypes = [
      { name: "snippet", icon: "Code", color: "#3b82f6" },
      { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
      { name: "command", icon: "Terminal", color: "#f97316" },
      { name: "note", icon: "StickyNote", color: "#fde047" },
      { name: "file", icon: "File", color: "#6b7280" },
      { name: "image", icon: "Image", color: "#ec4899" },
      { name: "link", icon: "Link", color: "#10b981" },
    ];

    for (const type of systemItemTypes) {
      await prisma.itemType.upsert({
        where: { name_userId: { name: type.name, userId: null as any } },
        update: {},
        create: {
          ...type,
          isSystem: true,
          userId: null,
        },
      });
    }
    console.log(`   ✅ ${systemItemTypes.length} system item types created\n`);

    // 3. Get item types for later use
    const snippetType = await prisma.itemType.findFirst({
      where: { name: "snippet", userId: null },
    });
    const promptType = await prisma.itemType.findFirst({
      where: { name: "prompt", userId: null },
    });
    const commandType = await prisma.itemType.findFirst({
      where: { name: "command", userId: null },
    });
    const linkType = await prisma.itemType.findFirst({
      where: { name: "link", userId: null },
    });

    // 4. Create collections
    console.log("3️⃣ Creating collections...");

    const reactPatterns = await prisma.collection.upsert({
      where: { id: "react-patterns" },
      update: {},
      create: {
        id: "react-patterns",
        name: "React Patterns",
        description: "Reusable React patterns and hooks",
        userId: demoUser.id,
      },
    });

    const aiWorkflows = await prisma.collection.upsert({
      where: { id: "ai-workflows" },
      update: {},
      create: {
        id: "ai-workflows",
        name: "AI Workflows",
        description: "AI prompts and workflow automations",
        userId: demoUser.id,
      },
    });

    const devOps = await prisma.collection.upsert({
      where: { id: "devops" },
      update: {},
      create: {
        id: "devops",
        name: "DevOps",
        description: "Infrastructure and deployment resources",
        userId: demoUser.id,
      },
    });

    const terminalCommands = await prisma.collection.upsert({
      where: { id: "terminal-commands" },
      update: {},
      create: {
        id: "terminal-commands",
        name: "Terminal Commands",
        description: "Useful shell commands for everyday development",
        userId: demoUser.id,
      },
    });

    const designResources = await prisma.collection.upsert({
      where: { id: "design-resources" },
      update: {},
      create: {
        id: "design-resources",
        name: "Design Resources",
        description: "UI/UX resources and references",
        userId: demoUser.id,
      },
    });

    console.log(`   ✅ 5 collections created\n`);

    // 5. Create items for React Patterns collection
    console.log("4️⃣ Creating React Patterns items (3 snippets)...");
    const reactPatternItems = [
      {
        id: "react-pattern-1",
        title: "useDebounce Hook",
        description:
          "Custom hook for debouncing values with configurable delay",
        content: `export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
        language: "typescript",
      },
      {
        id: "react-pattern-2",
        title: "useLocalStorage Hook",
        description: "Persist state to localStorage with automatic sync",
        content: `export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}`,
        language: "typescript",
      },
      {
        id: "react-pattern-3",
        title: "Context Provider Pattern",
        description: "Reusable pattern for creating context providers",
        content: `interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
        language: "typescript",
      },
    ];

    for (const item of reactPatternItems) {
      await prisma.item.upsert({
        where: { id: item.id },
        update: {},
        create: {
          ...item,
          contentType: "TEXT",
          userId: demoUser.id,
          itemTypeId: snippetType!.id,
          collections: {
            create: {
              collectionId: reactPatterns.id,
            },
          },
        },
      });
    }
    console.log(`   ✅ ${reactPatternItems.length} items created\n`);

    // 6. Create items for AI Workflows collection
    console.log("5️⃣ Creating AI Workflows items (3 prompts)...");
    const aiWorkflowItems = [
      {
        id: "ai-prompt-1",
        title: "Code Review Prompt",
        content:
          "Review this code focusing on: 1) Performance issues, 2) Security vulnerabilities, 3) Code style and best practices, 4) Potential bugs. Provide specific, actionable feedback.",
      },
      {
        id: "ai-prompt-2",
        title: "Documentation Generation",
        content:
          "Generate clear, concise documentation for this code. Include: 1) Function/class purpose, 2) Parameters and return types, 3) Usage examples, 4) Edge cases and error handling.",
      },
      {
        id: "ai-prompt-3",
        title: "Refactoring Assistance",
        content:
          "Suggest refactoring improvements for this code. Focus on: 1) Readability, 2) Maintainability, 3) DRY principle, 4) Modern language features. Provide before/after examples.",
      },
    ];

    for (const item of aiWorkflowItems) {
      await prisma.item.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          title: item.title,
          description: "AI prompt for development workflows",
          content: item.content,
          contentType: "TEXT",
          userId: demoUser.id,
          itemTypeId: promptType!.id,
          collections: {
            create: {
              collectionId: aiWorkflows.id,
            },
          },
        },
      });
    }
    console.log(`   ✅ ${aiWorkflowItems.length} items created\n`);

    // 7. Create items for DevOps collection
    console.log("6️⃣ Creating DevOps items (1 snippet + 1 command + 2 links)...");

    // DevOps snippet
    await prisma.item.upsert({
      where: { id: "devops-snippet-1" },
      update: {},
      create: {
        id: "devops-snippet-1",
        title: "Docker Compose Setup",
        description: "Docker Compose configuration for full stack development",
        content: `version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:7
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
volumes:
  postgres_data:`,
        language: "yaml",
        contentType: "TEXT",
        userId: demoUser.id,
        itemTypeId: snippetType!.id,
        collections: {
          create: {
            collectionId: devOps.id,
          },
        },
      },
    });

    // DevOps command
    await prisma.item.upsert({
      where: { id: "devops-command-1" },
      update: {},
      create: {
        id: "devops-command-1",
        title: "Deploy to Production",
        description: "Production deployment script",
        content: "docker build -t myapp:latest . && docker push registry/myapp:latest",
        contentType: "TEXT",
        userId: demoUser.id,
        itemTypeId: commandType!.id,
        collections: {
          create: {
            collectionId: devOps.id,
          },
        },
      },
    });

    // DevOps links
    const devopsLinks = [
      {
        id: "devops-link-1",
        title: "Docker Documentation",
        url: "https://docs.docker.com",
      },
      {
        id: "devops-link-2",
        title: "Kubernetes Official",
        url: "https://kubernetes.io/docs",
      },
    ];

    for (const linkItem of devopsLinks) {
      await prisma.item.upsert({
        where: { id: linkItem.id },
        update: {},
        create: {
          ...linkItem,
          description: "DevOps resource",
          contentType: "URL",
          userId: demoUser.id,
          itemTypeId: linkType!.id,
          collections: {
            create: {
              collectionId: devOps.id,
            },
          },
        },
      });
    }
    console.log(`   ✅ 4 items created\n`);

    // 8. Create items for Terminal Commands collection
    console.log("7️⃣ Creating Terminal Commands items (4 commands)...");
    const terminalCommandItems = [
      {
        id: "term-cmd-1",
        title: "Git Cherry-pick",
        content:
          "git cherry-pick <commit-hash> # Apply specific commit to current branch",
      },
      {
        id: "term-cmd-2",
        title: "Docker Container Cleanup",
        content:
          "docker system prune -a --volumes # Remove all unused containers, images, and volumes",
      },
      {
        id: "term-cmd-3",
        title: "Find Large Files",
        content:
          'find . -type f -size +100M -exec ls -lh {} ";" | awk \'{print $5, $9}\' | sort -rh',
      },
      {
        id: "term-cmd-4",
        title: "Kill Process by Port",
        content: "lsof -i :3000 | grep LISTEN | awk \'{print $2}\' | xargs kill -9",
      },
    ];

    for (const cmd of terminalCommandItems) {
      await prisma.item.upsert({
        where: { id: cmd.id },
        update: {},
        create: {
          id: cmd.id,
          title: cmd.title,
          description: "Shell command for development",
          content: cmd.content,
          contentType: "TEXT",
          userId: demoUser.id,
          itemTypeId: commandType!.id,
          collections: {
            create: {
              collectionId: terminalCommands.id,
            },
          },
        },
      });
    }
    console.log(`   ✅ ${terminalCommandItems.length} items created\n`);

    // 9. Create items for Design Resources collection
    console.log("8️⃣ Creating Design Resources items (4 links)...");
    const designResourceLinks = [
      {
        id: "design-link-1",
        title: "Tailwind CSS Docs",
        url: "https://tailwindcss.com/docs",
      },
      {
        id: "design-link-2",
        title: "shadcn/ui Components",
        url: "https://ui.shadcn.com",
      },
      {
        id: "design-link-3",
        title: "Lucide Icons",
        url: "https://lucide.dev",
      },
      {
        id: "design-link-4",
        title: "Figma Community",
        url: "https://www.figma.com/community",
      },
    ];

    for (const linkItem of designResourceLinks) {
      await prisma.item.upsert({
        where: { id: linkItem.id },
        update: {},
        create: {
          ...linkItem,
          description: "Design and UI resource",
          contentType: "URL",
          userId: demoUser.id,
          itemTypeId: linkType!.id,
          collections: {
            create: {
              collectionId: designResources.id,
            },
          },
        },
      });
    }
    console.log(`   ✅ ${designResourceLinks.length} items created\n`);

    console.log("✨ Seeding complete! 🌱");
    console.log("\n📊 Summary:");
    console.log(`   - Demo user created: ${DEMO_EMAIL}`);
    console.log(`   - 5 collections created`);
    console.log(`   - 15 sample items created across all collections`);
    console.log(`   - 7 system item types ensured`);
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
