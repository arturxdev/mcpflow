import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { boards, tasks } from './schema';
import { ulid } from 'ulid';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(connectionString);
const db = drizzle(sql);

// Pre-generated ULIDs for seed data
const BOARD_1_ID = '01JCZXYZ3NDEKTSV4RRFFQ69G';
const BOARD_2_ID = '01JCZXYZ4ABCTSV4RRFFQ69G5';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await db.delete(tasks);
  await db.delete(boards);

  // Insert boards
  await db.insert(boards).values([
    {
      id: BOARD_1_ID,
      name: 'Project Alpha',
      description: 'Main development board',
    },
    {
      id: BOARD_2_ID,
      name: 'Marketing Campaign',
      description: 'Q1 marketing tasks',
    },
  ]);

  console.log('✅ Boards seeded');

  // Insert tasks
  await db.insert(tasks).values([
    {
      id: ulid(),
      title: 'Setup project structure',
      description: 'Initialize the project with Next.js and configure TypeScript',
      priority: 'high',
      status: 'done',
      boardId: BOARD_1_ID,
      pr: 1,
    },
    {
      id: ulid(),
      title: 'Design database schema',
      description: 'Create ERD and define all tables for the application',
      priority: 'high',
      status: 'doing',
      boardId: BOARD_1_ID,
      pr: 2,
    },
    {
      id: ulid(),
      title: 'Implement authentication',
      description: 'Add OAuth login with Google and GitHub providers',
      priority: 'medium',
      status: 'todo',
      boardId: BOARD_1_ID,
      pr: 3,
    },
    {
      id: ulid(),
      title: 'Write unit tests',
      description: 'Add Jest tests for all utility functions',
      priority: 'low',
      status: 'todo',
      boardId: BOARD_1_ID,
      pr: 4,
    },
    {
      id: ulid(),
      title: 'Create landing page',
      description: 'Design and implement the marketing landing page',
      priority: 'high',
      status: 'doing',
      boardId: BOARD_2_ID,
      pr: 1,
    },
  ]);

  console.log('✅ Tasks seeded');
  console.log('🎉 Seeding complete!');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
