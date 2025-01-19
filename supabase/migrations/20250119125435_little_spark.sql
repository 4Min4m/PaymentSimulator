/*
  # Payment Processing Simulation Database

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `type` (enum: PURCHASE, REFUND, REVERSAL)
      - `amount` (decimal)
      - `card_number` (text, masked)
      - `merchant_id` (text)
      - `status` (enum: PENDING, APPROVED, DECLINED, ERROR)
      - `timestamp` (timestamptz)
      - `iso8583_message` (jsonb)
      - `simulation_batch_id` (uuid, nullable) - for load testing batches
    
    - `simulation_batches`
      - `id` (uuid, primary key)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `target_tps` (integer)
      - `actual_tps` (decimal)
      - `total_amount` (decimal)
      - `success_rate` (decimal)
      - `status` (enum: RUNNING, COMPLETED, FAILED)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE transaction_type AS ENUM ('PURCHASE', 'REFUND', 'REVERSAL');
CREATE TYPE transaction_status AS ENUM ('PENDING', 'APPROVED', 'DECLINED', 'ERROR');
CREATE TYPE simulation_status AS ENUM ('RUNNING', 'COMPLETED', 'FAILED');

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type transaction_type NOT NULL,
    amount decimal(12,2) NOT NULL,
    card_number text NOT NULL,
    merchant_id text NOT NULL,
    status transaction_status NOT NULL DEFAULT 'PENDING',
    timestamp timestamptz NOT NULL DEFAULT now(),
    iso8583_message jsonb,
    simulation_batch_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create simulation_batches table
CREATE TABLE IF NOT EXISTS simulation_batches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time timestamptz NOT NULL,
    end_time timestamptz,
    target_tps integer NOT NULL,
    actual_tps decimal(10,2),
    total_amount decimal(15,2),
    success_rate decimal(5,2),
    status simulation_status NOT NULL DEFAULT 'RUNNING',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_batches ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all users to create transactions"
    ON transactions FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow all users to read transactions"
    ON transactions FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow all users to create simulation batches"
    ON simulation_batches FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow all users to read simulation batches"
    ON simulation_batches FOR SELECT TO authenticated
    USING (true);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_simulation_batches_updated_at
    BEFORE UPDATE ON simulation_batches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();