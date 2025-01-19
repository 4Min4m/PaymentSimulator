export type TransactionType = 'PURCHASE' | 'REFUND' | 'REVERSAL';

export interface ISO8583Like {
  mti: string;
  pan: string;
  processingCode: string;
  amount: number;
  timestamp: string;
  trace: string;
  localTime: string;
  localDate: string;
  merchantId: string;
  posEntryMode: string;
  cardSequenceNo: string;
  posConditionCode: string;
  acquiringInstitutionId: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  cardNumber: string;
  merchantId: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR';
  timestamp: string;
  message?: ISO8583Like;
}