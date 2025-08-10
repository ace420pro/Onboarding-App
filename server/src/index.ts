import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import p2ClientRoutes from './routes/p2Client';
import websiteRoutes from './routes/website';
import accountRoutes from './routes/account';
import verificationRoutes from './routes/verification';
import dashboardRoutes from './routes/dashboard';
import automationRoutes from './routes/automation';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true,
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/p2-clients', p2ClientRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/automation', automationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Export the app for Vercel serverless deployment
export default app;

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  async function startServer() {
    try {
      await prisma.$connect();
      logger.info('Database connected successfully');
      
      app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
        console.log(`🚀 EdgeVantage P2 Onboarding System started on http://localhost:${port}`);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  // Graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
  });

  startServer();
}