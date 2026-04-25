import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, age, email } = req.body;
    const newUser = await db
      .insert(usersTable)
      .values({ name, age, email })
      .returning();
    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { name, age, email } = req.body;
    const updateUser = await db
      .update(usersTable)
      .set({ name, age, email })
      .where(eq(usersTable.id, id))
      .returning();

    if (updateUser.length === 0) {
      res.status(404).json({ error: 'User not found' });
    }

    res.json(updateUser[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    if (deletedUser.length === 0) {
      res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfuly' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
