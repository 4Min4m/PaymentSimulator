import { Transaction, TransactionType } from '../types/transaction';

export class TransactionService {
  private static API_URL = process.env.APP_API_URL;

  static async processTransaction(
    type: TransactionType,
    amount: number,
    cardNumber: string,
    merchantId: string,
    simulationBatchId?: string
  ): Promise<Transaction> {
    try {
      const response = await fetch(`${this.API_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          amount,
          cardNumber,
          merchantId,
          simulationBatchId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Transaction processing failed');
      }

      return response.json();
    } catch (error) {
      console.error('Transaction processing error:', error);
      throw error;
    }
  }
}