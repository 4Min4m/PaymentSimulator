import React, { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { LoadTestService, LoadTestResult } from '../services/LoadTestService';

interface LoadTestFormProps {
  onTestComplete: (result: LoadTestResult) => void;
}

export function LoadTestForm({ onTestComplete }: LoadTestFormProps) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    targetTPS: 10,
    durationSeconds: 30,
    averageAmount: 100,
    amountVariance: 50
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await LoadTestService.runLoadTest(config);
      onTestComplete(result);
    } catch (error) {
      console.error('Load test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Transactions per Second
        </label>
        <input
          type="number"
          min="1"
          max="100"
          required
          value={config.targetTPS}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            targetTPS: parseInt(e.target.value)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Test Duration (seconds)
        </label>
        <input
          type="number"
          min="5"
          max="300"
          required
          value={config.durationSeconds}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            durationSeconds: parseInt(e.target.value)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Average Transaction Amount
        </label>
        <input
          type="number"
          min="1"
          required
          value={config.averageAmount}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            averageAmount: parseInt(e.target.value)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount Variance (+/-)
        </label>
        <input
          type="number"
          min="0"
          required
          value={config.amountVariance}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            amountVariance: parseInt(e.target.value)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Running Test...
          </>
        ) : (
          <>
            <Play size={20} />
            Start Load Test
          </>
        )}
      </button>
    </form>
  );
}