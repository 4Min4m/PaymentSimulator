import { Transaction } from '../../types/transaction';
import { ISO8583Like } from '../../types/transaction';

export class ISO8583Helper {
  private static generateTrace(): string {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }

  static createMessage(transaction: Omit<Transaction, 'message' | 'status'>): ISO8583Like {
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
}