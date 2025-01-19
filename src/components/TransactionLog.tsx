import React from 'react';
import { Transaction } from '../types/transaction';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TransactionLogProps {
  transactions: Transaction[];
}

export function TransactionLog({ transactions }: TransactionLogProps) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'DECLINED':
        return <XCircle className="text-red-500" size={20} />;
      case 'ERROR':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Transaction Log</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(transaction.status)}
                <span className="font-medium">{transaction.type}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(transaction.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Amount:</span>{' '}
                ${transaction.amount.toFixed(2)}
              </div>
              <div>
                <span className="text-gray-500">Card:</span>{' '}
                {transaction.cardNumber.replace(/\d(?=\d{4})/g, '*')}
              </div>
              <div>
                <span className="text-gray-500">Merchant ID:</span>{' '}
                {transaction.merchantId}
              </div>
              <div>
                <span className="text-gray-500">Status:</span>{' '}
                <span
                  className={
                    transaction.status === 'APPROVED'
                      ? 'text-green-600'
                      : transaction.status === 'DECLINED'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }
                >
                  {transaction.status}
                </span>
              </div>
            </div>
            {transaction.message && (
              <details className="mt-2">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  View ISO8583 Message
                </summary>
                <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(transaction.message, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}