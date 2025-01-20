import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transactionService';
import { TransactionValidator } from '../validators/transactionValidator';
import { logger } from '../utils/logger';

export class TransactionController {
  static async processTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = TransactionValidator.validateTransaction(req.body);
      
      const transaction = await TransactionService.processTransaction(
        validatedData.type,
        validatedData.amount,
        validatedData.cardNumber,
        validatedData.merchantId,
        validatedData.simulationBatchId
      );

      logger.info('Transaction processed successfully', { transactionId: transaction.id });
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}