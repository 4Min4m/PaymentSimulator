import { Transaction, TransactionType } from '../types/transaction';
import { TransactionService } from './TransactionService';
import { supabase } from '../server/utils/supabaseClient';

export interface LoadTestConfig {
  targetTPS: number;
  durationSeconds: number;
  averageAmount: number;
  amountVariance: number;
}

export interface LoadTestResult {
  batchId: string;
  actualTPS: number;
  totalAmount: number;
  successRate: number;
}

export class LoadTestService {
  private static generateRandomAmount(average: number, variance: number): number {
    const min = average - variance;
    const max = average + variance;
    return +(Math.random() * (max - min) + min).toFixed(2);
  }

  private static generateRandomCard(): string {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
  }

  private static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async runLoadTest(config: LoadTestConfig): Promise<LoadTestResult> {
    // Create simulation batch record
    const { data: batch, error: batchError } = await supabase
      .from('simulation_batches')
      .insert({
        start_time: new Date().toISOString(),
        target_tps: config.targetTPS,
        status: 'RUNNING'
      })
      .select()
      .single();

    if (batchError || !batch) {
      throw new Error('Failed to create simulation batch');
    }

    const batchId = batch.id;
    const startTime = Date.now();
    const endTime = startTime + (config.durationSeconds * 1000);
    
    let successfulTransactions = 0;
    let totalTransactions = 0;
    let totalAmount = 0;

    // Calculate delay between transactions based on target TPS
    const delayMs = Math.floor(1000 / config.targetTPS);

    while (Date.now() < endTime) {
      const transactionPromises: Promise<Transaction>[] = [];

      // Create batch of transactions for current second
      for (let i = 0; i < config.targetTPS; i++) {
        const amount = this.generateRandomAmount(
          config.averageAmount,
          config.amountVariance
        );
        
        const transaction = TransactionService.processTransaction(
          'PURCHASE',
          amount,
          this.generateRandomCard(),
          'LOADTEST-' + Math.random().toString(36).substring(7),
          batchId
        );

        transactionPromises.push(transaction);
        totalAmount += amount;
      }

      // Wait for all transactions in this batch to complete
      const results = await Promise.all(transactionPromises);
      
      // Update counters
      totalTransactions += results.length;
      successfulTransactions += results.filter(t => t.status === 'APPROVED').length;

      // Wait for next batch
      await this.sleep(delayMs);
    }

    const testDuration = (Date.now() - startTime) / 1000;
    const actualTPS = +(totalTransactions / testDuration).toFixed(2);
    const successRate = +((successfulTransactions / totalTransactions) * 100).toFixed(2);

    // Update simulation batch with results
    await supabase
      .from('simulation_batches')
      .update({
        end_time: new Date().toISOString(),
        actual_tps: actualTPS,
        total_amount: totalAmount,
        success_rate: successRate,
        status: 'COMPLETED'
      })
      .eq('id', batchId);

    return {
      batchId,
      actualTPS,
      totalAmount,
      successRate
    };
  }
}