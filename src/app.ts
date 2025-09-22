import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import logger from './config/logger';
import productRoutes from './routes/product.route';
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello in Full stack Task');
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Products API is Running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default app;
