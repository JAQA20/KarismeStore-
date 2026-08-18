import { Request, Response } from 'express';
import { PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';

// Helper: Resolver o registrar categoría en MySQL
export const resolveCategoryId = async (
  connection: PoolConnection,
  category: string
): Promise<number | null> => {
  if (!category) return null;
  const parts = category.split('/');
  const g = parts[0]?.trim() || 'Mujer';
  const c = parts[1]?.trim() || category.trim();

  const [existingCat] = await connection.query<RowDataPacket[]>(
    'SELECT id FROM categories WHERE name = ? AND gender = ?',
    [c, g]
  );

  if (existingCat.length > 0) {
    return (existingCat[0] as { id: number }).id;
  } else {
    const [newCat] = await connection.query<ResultSetHeader>(
      'INSERT INTO categories (gender, name) VALUES (?, ?)',
      [g, c]
    );
    return newCat.insertId;
  }
};

// Obtener todas las categorías ordenadas
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await getPool().query('SELECT * FROM categories ORDER BY gender, name');
    res.json(rows);
  } catch (err: any) {
    console.error('[GET /api/categories ERROR]:', err);
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva categoría explícita
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gender, name } = req.body;
    if (!name || !gender) {
      res.status(400).json({ error: 'Debes proporcionar género y nombre de la categoría' });
      return;
    }
    const [result] = await getPool().query<ResultSetHeader>(
      'INSERT INTO categories (gender, name) VALUES (?, ?)',
      [gender, name]
    );
    res.status(201).json({ id: result.insertId, gender, name, message: 'Categoría creada con éxito' });
  } catch (err: any) {
    console.error('[POST /api/categories ERROR]:', err);
    res.status(500).json({ error: err.message });
  }
};
