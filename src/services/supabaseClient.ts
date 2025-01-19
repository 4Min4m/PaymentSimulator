const user = supabase.auth.user();

if (user) {
  const transaction = {
    id: crypto.randomUUID(),
    type: 'PURCHASE',
    amount: 100,
    cardNumber: '1234567812345678',
    merchantId: 'merchant_123',
    status: 'PENDING',
    timestamp: new Date().toISOString(),
  };

  const { error } = await supabase.from('transactions').insert(transaction);

  if (error) {
    console.error('Failed to save transaction:', error);
  } else {
    console.log('Transaction saved successfully!');
  }
} else {
  console.error('User  is not authenticated');
}