import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection
supabase
  .from('transactions')
  .select('*')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Database connection error:', error);
    } else {
      console.log('Database connected successfully!');
      console.log('Sample data:', data);
    }
  });