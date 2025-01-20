export const config = {
    port: process.env.PORT || 5173,
    environment: process.env.NODE_ENV || 'development',
    supabase: {
      url: process.env.VITE_SUPABASE_URL,
      anonKey: process.env.VITE_SUPABASE_ANON_KEY
    }
  };
