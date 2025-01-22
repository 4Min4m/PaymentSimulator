import React, { useState } from 'react';
import { CreditCard, RefreshCcw, RotateCcw } from 'lucide-react';
import { TransactionService } from '../services/TransactionService';
import { Transaction, TransactionType } from '../types/transaction';

interface TransactionFormProps {
  onTransactionComplete: (transaction: Transaction) => void;
}

export function TransactionForm({ onTransactionComplete }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TransactionType>('PURCHASE');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [merchantId, setMerchantId] = useState('MERCHANT123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const transaction = await TransactionService.processTransaction(
        type,
        parseFloat(amount),
        cardNumber,
        merchantId
      );
      onTransactionComplete(transaction);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert(`Transaction failed: ${error.message}`); // Optionally show an alert to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="flex gap-2">
      <button
  type="button"
  onClick={() => setType('PURCHASE')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
    type === 'PURCHASE'
      ? 'bg-blue-600 text-white'
      : 'bg-gray-100 text-gray-700'
  }`}
>
  <CreditCard size={20} />
  Purchase
</button>
<button
  type="button"
  onClick={() => setType('REFUND')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
    type === 'REFUND'
      ? 'bg-blue-600 text-white'
      : 'bg-gray-100 text-gray-700'
  }`}
>
  <RefreshCcw size={20} />
  Refund
</button>
<button
  type="button"
  onClick={() => setType('REVERSAL')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
    type === 'REVERSAL'
      ? 'bg-blue-600 text-white'
      : 'bg-gray-100 text-gray-700'
  }`}
>
  <RotateCcw size={20} />
  Reversal
</button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          required
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter 16-digit card number"
          maxLength={16}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Merchant ID
        </label>
        <input
          type="text"
          required
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter merchant ID"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : 'Process Transaction'}
      </button>
    </form>
  );
}