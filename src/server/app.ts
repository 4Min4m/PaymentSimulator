import express from 'express';
import { transactionRouter } from './routes/transactionRoutes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { config } from './config';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/transactions', transactionRouter);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, '0.0.0.0', () => {
  logger.info(`Server running on port ${config.port}`);
});
