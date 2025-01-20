import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

export const transactionRouter = Router();

transactionRouter.post('/process', TransactionController.processTransaction);