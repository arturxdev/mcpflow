import { db, boards } from "./db";
import { Board } from "./entities";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";

class BoardService {
  constructor() { }

  create = async (name: string, userId: string, description?: string): Promise<Board> => {
    const newBoard = {
      id: ulid(),
      name,
      description: description || '',
      createdAt: new Date(),
      userId,
    };

    const [inserted] = await db.insert(boards).values(newBoard).returning();

    return {
      ...inserted,
      createdAt: inserted.createdAt.toISOString(),
    };
  };

  getAll = async (userId: string): Promise<Board[]> => {
    const result = await db.select().from(boards).where(eq(boards.userId, userId));
    return result.map((board) => ({
      ...board,
      createdAt: board.createdAt.toISOString(),
    }));
  };

  getById = async (id: string): Promise<Board | undefined> => {
    const [board] = await db.select().from(boards).where(eq(boards.id, id));
    if (!board) {
      return undefined;
    }
    return {
      ...board,
      createdAt: board.createdAt.toISOString(),
    };
  };

  update = async (id: string, name: string, description?: string): Promise<Board> => {
    const [updated] = await db
      .update(boards)
      .set({ name, description: description || '' })
      .where(eq(boards.id, id))
      .returning();

    if (!updated) {
      throw new Error('Board not found');
    }

    return {
      ...updated,
      createdAt: updated.createdAt.toISOString(),
    };
  };

  delete = async (id: string): Promise<void> => {
    const result = await db.delete(boards).where(eq(boards.id, id)).returning();
    if (result.length === 0) {
      throw new Error('Board not found');
    }
  };
}

export const boardService = new BoardService();
export default boardService;
