import { z } from 'zod';
import { TransactionType } from '../../types/transaction';

const transactionSchema = z.object({
  type: z.enum(['PURCHASE', 'REFUND', 'REVERSAL'] as const),
  amount: z.number().positive(),
  cardNumber: z.string().length(16).regex(/^\d+$/),
  merchantId: z.string().min(1),
  simulationBatchId: z.string().uuid().optional()
});

export class TransactionValidator {
  static validateTransaction(data: unknown) {
    return transactionSchema.parse(data);
  }
}