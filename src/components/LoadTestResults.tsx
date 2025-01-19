import React from 'react';
import { LoadTestResult } from '../services/LoadTestService';
import { BarChart, Timer, DollarSign, CheckCircle } from 'lucide-react';

interface LoadTestResultsProps {
  results: LoadTestResult[];
}

export function LoadTestResults({ results }: LoadTestResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Load Test Results</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((result) => (
          <div
            key={result.batchId}
            className="bg-white rounded-lg shadow p-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <BarChart className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Actual TPS</p>
                  <p className="font-semibold">{result.actualTPS}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold">
                    ${result.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="font-semibold">{result.successRate}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}