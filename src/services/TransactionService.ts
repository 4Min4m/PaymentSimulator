import { Transaction, TransactionType } from '../types/transaction';

export class TransactionService {
  static async processTransaction(
    type: TransactionType,
    amount: number,
    cardNumber: string,
    merchantId: string,
    simulationBatchId?: string
  ): Promise<Transaction> {
    try {
      const response = await fetch('/api/transactions/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type,
          amount,
          cardNumber,
          merchantId,
          simulationBatchId,
        }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the response text for error handling
        console.error('Error response:', errorText);
        throw new Error(errorText || 'Transaction processing failed');
      }

      // Check if the response body is empty
      const text = await response.text();
      if (!text) {
        throw new Error('Received empty response from the server');
      }

      // Attempt to parse the response as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        throw new Error('Invalid JSON response from the server');
      }

      return data;
    } catch (error) {
      console.error('Transaction processing error:', error);
      throw error;
    }
  }
}