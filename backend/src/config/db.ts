import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root_password',
  database: process.env.DB_NAME || 'karisme_db',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool;

export const getPool = (): mysql.Pool => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

export const testConnection = async (): Promise<boolean> => {
  const connection = await getPool().getConnection();
  await connection.ping();
  connection.release();
  return true;
};
