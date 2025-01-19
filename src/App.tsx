import React, { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionLog } from './components/TransactionLog';
import { LoadTestForm } from './components/LoadTestForm';
import { LoadTestResults } from './components/LoadTestResults';
import { Transaction } from './types/transaction';
import { LoadTestResult } from './services/LoadTestService';
import { CreditCard, Activity } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadTestResults, setLoadTestResults] = useState<LoadTestResult[]>([]);
  const [activeTab, setActiveTab] = useState<'transactions' | 'loadtest'>('transactions');

  const handleTransactionComplete = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleLoadTestComplete = (result: LoadTestResult) => {
    setLoadTestResults((prev) => [result, ...prev]);
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
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={20} />
                  Transactions
                </div>
              </button>
              <button
                onClick={() => setActiveTab('loadtest')}
                className={`py-4 px-1 ${
                  activeTab === 'loadtest'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity size={20} />
                  Load Testing
                </div>
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'transactions' ? (
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
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Load Test Configuration</h2>
                <LoadTestForm onTestComplete={handleLoadTestComplete} />
              </div>
            </div>
            <div className="lg:w-2/3">
              <LoadTestResults results={loadTestResults} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}