import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Healthcheck
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await testConnection();
    res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (err: any) {
    console.error('[HEALTHCHECK ERROR]:', err.message);
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

// Modular Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[UNHANDLED SERVER ERROR]:', err);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Karisme Backend Express (TypeScript) ejecutándose en puerto ${PORT}`);
});
