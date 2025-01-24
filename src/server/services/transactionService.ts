import { Transaction, TransactionType } from '../../types/transaction';
import { supabase } from '../utils/supabaseClient.ts';
import { ISO8583Helper } from '../utils/iso8583Helper';
import { logger } from '../utils/logger';
import { TransactionError } from '../errors/TransactionError';

export class TransactionService {
  static async processTransaction(
    type: TransactionType,
    amount: number,
    cardNumber: string,
    merchantId: string,
    simulationBatchId?: string
  ): Promise<Transaction> {
    try {
      const transaction: Transaction = {
        id: crypto.randomUUID(),
        type,
        amount,
        cardNumber,
        merchantId,
        status: 'PENDING',
        timestamp: new Date().toISOString()
      };

      transaction.message = ISO8583Helper.createMessage(transaction);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate and process
      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        transaction.status = 'ERROR';
        throw new TransactionError('Invalid card number');
      }

      transaction.status = Math.random() > 0.15 ? 'APPROVED' : 'DECLINED';

      // Save to database
      const { error } = await supabase.from('transactions').insert({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        card_number: transaction.cardNumber,
        merchant_id: transaction.merchantId,
        status: transaction.status,
        timestamp: transaction.timestamp,
        iso8583_message: transaction.message,
        simulation_batch_id: simulationBatchId
      });

      if (error) {
        logger.error('Database error', { error });
        throw new TransactionError('Failed to save transaction');
      }

      logger.info('Transaction processed', { 
        id: transaction.id, 
        status: transaction.status 
      });

      return transaction;
    } catch (error) {
      logger.error('Transaction processing error', { error });
      throw error;
    }
  }
}