export class TransactionValidator {
  static validateTransaction(data: any) {
    if (!data.type || !data.amount || !data.cardNumber || !data.merchantId) {
      throw new Error('Invalid transaction data');
    }

    return {
      type: data.type,
      amount: Number(data.amount),
      cardNumber: data.cardNumber,
      merchantId: data.merchantId,
      simulationBatchId: data.simulationBatchId || null,
    };
  }
}