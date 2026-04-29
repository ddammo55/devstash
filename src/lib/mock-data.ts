// Mock data for development - Single source of truth before database implementation

export type ContentType = 'TEXT' | 'FILE' | 'URL';

// Types matching Prisma schema
export interface MockUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  isPro: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  userId: string | null;
}

export interface MockItem {
  id: string;
  title: string;
  contentType: ContentType;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  url?: string;
  description?: string;
  isFavorite: boolean;
  isPinned: boolean;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  itemTypeId: string;
  tags?: string[];
}

export interface MockCollection {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  defaultTypeId?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  itemCount?: number;
}

export interface MockItemCollection {
  itemId: string;
  collectionId: string;
  addedAt: Date;
}

// Current logged-in user
export const mockCurrentUser: MockUser = {
  id: 'user_1',
  email: 'laravel3899@gmail.com',
  name: 'John Doe',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  isPro: false,
  createdAt: new Date('2025-01-15'),
  updatedAt: new Date('2025-01-15'),
};

// System Item Types
export const mockItemTypes: MockItemType[] = [
  {
    id: 'type_snippet',
    name: 'snippet',
    icon: 'Code',
    color: '#3b82f6',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_prompt',
    name: 'prompt',
    icon: 'Sparkles',
    color: '#8b5cf6',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_command',
    name: 'command',
    icon: 'Terminal',
    color: '#f97316',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_note',
    name: 'note',
    icon: 'StickyNote',
    color: '#fde047',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_file',
    name: 'file',
    icon: 'File',
    color: '#6b7280',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_image',
    name: 'image',
    icon: 'Image',
    color: '#ec4899',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type_link',
    name: 'link',
    icon: 'Link',
    color: '#10b981',
    isSystem: true,
    userId: null,
  },
];

// Collections
export const mockCollections: MockCollection[] = [
  {
    id: 'col_1',
    name: 'React Patterns',
    description: 'Common React patterns and hooks',
    isFavorite: true,
    defaultTypeId: 'type_snippet',
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
    userId: 'user_1',
    itemCount: 12,
  },
  {
    id: 'col_2',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    isFavorite: false,
    defaultTypeId: 'type_snippet',
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-18'),
    userId: 'user_1',
    itemCount: 8,
  },
  {
    id: 'col_3',
    name: 'Contact Files',
    description: 'All contact files for projects',
    isFavorite: true,
    defaultTypeId: 'type_file',
    createdAt: new Date('2025-01-19'),
    updatedAt: new Date('2025-01-19'),
    userId: 'user_1',
    itemCount: 6,
  },
  {
    id: 'col_4',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    isFavorite: false,
    defaultTypeId: 'type_note',
    createdAt: new Date('2025-01-17'),
    updatedAt: new Date('2025-01-17'),
    userId: 'user_1',
    itemCount: 24,
  },
  {
    id: 'col_5',
    name: 'Git Commands',
    description: 'Frequently used git commands',
    isFavorite: true,
    defaultTypeId: 'type_command',
    createdAt: new Date('2025-01-21'),
    updatedAt: new Date('2025-01-21'),
    userId: 'user_1',
    itemCount: 10,
  },
  {
    id: 'col_6',
    name: 'AI Prompts',
    description: 'Curated prompts for coding',
    isFavorite: false,
    defaultTypeId: 'type_prompt',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16'),
    userId: 'user_1',
    itemCount: 18,
  },
];

// Items
export const mockItems: MockItem[] = [
  // React Patterns collection
  {
    id: 'item_1',
    title: 'useAuth Hook',
    contentType: 'TEXT',
    content: `const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status
  }, []);

  return { user, loading };
};`,
    description: 'Custom authentication hook for React applications',
    isFavorite: true,
    isPinned: true,
    language: 'typescript',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
    userId: 'user_1',
    itemTypeId: 'type_snippet',
    tags: ['react', 'hooks', 'auth'],
  },
  {
    id: 'item_2',
    title: 'useLocalStorage Hook',
    contentType: 'TEXT',
    content: `const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  return [storedValue, setStoredValue];
};`,
    description: 'Custom hook for managing localStorage in React',
    isFavorite: false,
    isPinned: false,
    language: 'typescript',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
    userId: 'user_1',
    itemTypeId: 'type_snippet',
    tags: ['react', 'hooks', 'storage'],
  },

  // Git Commands collection
  {
    id: 'item_3',
    title: 'Reset last commit',
    contentType: 'TEXT',
    content: 'git reset --hard HEAD~1',
    description: 'Remove and discard the last commit',
    isFavorite: false,
    isPinned: true,
    language: 'bash',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14'),
    userId: 'user_1',
    itemTypeId: 'type_command',
    tags: ['git', 'reset'],
  },
  {
    id: 'item_4',
    title: 'Force push current branch',
    contentType: 'TEXT',
    content: 'git push --force-with-lease origin <branch-name>',
    description: 'Safely force push changes to remote branch',
    isFavorite: false,
    isPinned: false,
    language: 'bash',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14'),
    userId: 'user_1',
    itemTypeId: 'type_command',
    tags: ['git', 'push'],
  },

  // AI Prompts collection
  {
    id: 'item_5',
    title: 'Code Review Prompt',
    contentType: 'TEXT',
    content: `Review the following code for:
- Security vulnerabilities
- Performance issues
- Best practices
- Readability

Provide specific, actionable feedback.`,
    description: 'Prompt for comprehensive code reviews',
    isFavorite: false,
    isPinned: false,
    createdAt: new Date('2025-01-11'),
    updatedAt: new Date('2025-01-11'),
    userId: 'user_1',
    itemTypeId: 'type_prompt',
    tags: ['ai', 'code-review'],
  },
  {
    id: 'item_6',
    title: 'Documentation Generator',
    contentType: 'TEXT',
    content: `Generate clear, concise documentation for:
1. Function purpose and usage
2. Parameters and return values
3. Example usage
4. Edge cases and limitations`,
    description: 'Template for auto-generating documentation',
    isFavorite: true,
    isPinned: false,
    createdAt: new Date('2025-01-13'),
    updatedAt: new Date('2025-01-13'),
    userId: 'user_1',
    itemTypeId: 'type_prompt',
    tags: ['ai', 'documentation'],
  },

  // Python Snippets collection
  {
    id: 'item_7',
    title: 'List comprehension with filter',
    contentType: 'TEXT',
    content: `# Filter even numbers and square them
numbers = [1, 2, 3, 4, 5, 6]
squared_evens = [x**2 for x in numbers if x % 2 == 0]
# Result: [4, 16, 36]`,
    description: 'Python list comprehension with condition',
    isFavorite: false,
    isPinned: false,
    language: 'python',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    userId: 'user_1',
    itemTypeId: 'type_snippet',
    tags: ['python', 'functional'],
  },

  // Interview Prep collection
  {
    id: 'item_8',
    title: 'System Design - Caching',
    contentType: 'TEXT',
    content: `Key concepts:
- Cache invalidation strategies (TTL, LRU, Write-through)
- Cache warming and preloading
- Distributed caching (Redis, Memcached)
- Cache vs Database tradeoffs`,
    description: 'System design interview notes on caching',
    isFavorite: false,
    isPinned: false,
    createdAt: new Date('2025-01-09'),
    updatedAt: new Date('2025-01-09'),
    userId: 'user_1',
    itemTypeId: 'type_note',
    tags: ['interview', 'system-design'],
  },

  // Contact Files collection
  {
    id: 'item_9',
    title: 'Project Structure',
    contentType: 'FILE',
    fileName: 'project-structure.md',
    fileSize: 2048,
    fileUrl: 'https://example.com/files/project-structure.md',
    description: 'Overall project folder organization',
    isFavorite: false,
    isPinned: false,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
    userId: 'user_1',
    itemTypeId: 'type_file',
    tags: ['documentation'],
  },

  // API Error Handling Pattern (multiple collections)
  {
    id: 'item_10',
    title: 'API Error Handling Pattern',
    contentType: 'TEXT',
    content: `class APIError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleAPIRequest(fn: () => Promise<any>) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof APIEfrror) {
      return { error: error.message, statusCode: error.statusCode };
    }
    return { error: 'Unknown error', statusCode: 500 };
  }
}`,
    description: 'Standardized error handling for API calls',
    isFavorite: false,
    isPinned: true,
    language: 'typescript',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-08'),
    userId: 'user_1',
    itemTypeId: 'type_snippet',
    tags: ['api', 'error-handling'],
  },
];

// Item-Collection relationships
export const mockItemCollections: MockItemCollection[] = [
  // React Patterns
  { itemId: 'item_1', collectionId: 'col_1', addedAt: new Date('2025-01-10') },
  { itemId: 'item_2', collectionId: 'col_1', addedAt: new Date('2025-01-12') },
  { itemId: 'item_10', collectionId: 'col_1', addedAt: new Date('2025-01-08') },

  // Git Commands
  { itemId: 'item_3', collectionId: 'col_5', addedAt: new Date('2025-01-14') },
  { itemId: 'item_4', collectionId: 'col_5', addedAt: new Date('2025-01-14') },

  // AI Prompts
  { itemId: 'item_5', collectionId: 'col_6', addedAt: new Date('2025-01-11') },
  { itemId: 'item_6', collectionId: 'col_6', addedAt: new Date('2025-01-13') },

  // Python Snippets
  { itemId: 'item_7', collectionId: 'col_2', addedAt: new Date('2025-01-15') },

  // Interview Prep
  { itemId: 'item_8', collectionId: 'col_4', addedAt: new Date('2025-01-09') },

  // Contact Files
  { itemId: 'item_9', collectionId: 'col_3', addedAt: new Date('2025-01-20') },

  // API Error Handling in multiple collections
  { itemId: 'item_10', collectionId: 'col_5', addedAt: new Date('2025-01-22') },
];

// Statistics for sidebar
export const mockStatistics = {
  totalItems: 28,
  snippets: 28,
  prompts: 18,
  commands: 10,
  notes: 15,
  files: 7,
  images: 3,
  links: 5,
};

// Helper functions
export const getMockUser = () => mockCurrentUser;

export const getMockCollections = () => mockCollections;

export const getMockItems = () => mockItems;

export const getMockItemsByCollection = (collectionId: string) => {
  const itemIds = mockItemCollections
    .filter((ic) => ic.collectionId === collectionId)
    .map((ic) => ic.itemId);
  return mockItems.filter((item) => itemIds.includes(item.id));
};

export const getMockItemsByType = (typeName: string) => {
  const typeId = mockItemTypes.find((t) => t.name === typeName)?.id;
  return typeId ? mockItems.filter((item) => item.itemTypeId === typeId) : [];
};

export const getMockPinnedItems = () => mockItems.filter((item) => item.isPinned);

export const getMockFavoriteCollections = () =>
  mockCollections.filter((col) => col.isFavorite);

export const getMockRecentItems = (limit: number = 5) => {
  return mockItems.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, limit);
};

export const getMockItemType = (typeName: string) => {
  return mockItemTypes.find((t) => t.name === typeName);
};
