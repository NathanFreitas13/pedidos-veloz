import express from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'secretpassword',
  database: process.env.DB_NAME || 'pedidos_veloz',
  port: 5432,
});

app.get('/api/orders/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'orders-service' });
});

app.get('/api/orders/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'READY', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'NOT_READY', db: 'disconnected' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Loja Veloz] Orders service running on port ${PORT}`);
});
