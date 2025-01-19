import React, { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionLog } from './components/TransactionLog';
import { Transaction } from './types/transaction';
import { CreditCard } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransactionComplete = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Processing Simulator
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">New Transaction</h2>
              <TransactionForm onTransactionComplete={handleTransactionComplete} />
            </div>
          </div>
          <div className="lg:w-2/3">
            <TransactionLog transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;