import { Transaction, TransactionType, ISO8583Like } from '../types/transaction';
import { supabase } from './supabaseClient';

export class TransactionService {
  private static generateTrace(): string {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }

  private static createISO8583Message(
    transaction: Omit<Transaction, 'message' | 'status'>
  ): ISO8583Like {
    const now = new Date();
    return {
      mti: '0200',
      pan: transaction.cardNumber.replace(/\d(?=\d{4})/g, '*'),
      processingCode: transaction.type === 'PURCHASE' ? '000000' : '200000',
      amount: transaction.amount,
      timestamp: now.toISOString(),
      trace: this.generateTrace(),
      localTime: now.toLocaleTimeString('en-US', { hour12: false }),
      localDate: now.toLocaleDateString('en-US'),
      merchantId: transaction.merchantId,
      posEntryMode: '051',
      cardSequenceNo: '001',
      posConditionCode: '00',
      acquiringInstitutionId: '1234567890'
    };
  }

  static async processTransaction(
    type: TransactionType,
    amount: number,
    cardNumber: string,
    merchantId: string,
    simulationBatchId?: string
  ): Promise<Transaction> {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount,
      cardNumber,
      merchantId,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    // Create ISO8583-like message
    transaction.message = this.createISO8583Message(transaction);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate basic validation and set status
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      transaction.status = 'ERROR';
    } else {
      transaction.status = Math.random() > 0.15 ? 'APPROVED' : 'DECLINED';
    }

    // Insert into Supabase
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
      console.error('Failed to save transaction:', error);
      throw error;
    }

    return transaction;
  }
}