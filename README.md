# Payment Processing Simulator

A robust payment transaction simulator designed to test and demonstrate payment processing workflows, built with React, TypeScript, and Supabase. This application simulates real-world payment processing scenarios, including transaction processing, load testing, and ISO8583-like message generation.

## Features

### Transaction Processing
- Support for multiple transaction types:
  - Purchases
  - Refunds
  - Reversals
- Real-time transaction status updates
- ISO8583-like message generation
- Secure card number handling with masking
- Merchant ID tracking

### Load Testing
- Configurable transactions per second (TPS)
- Adjustable test duration
- Customizable transaction amounts
- Real-time performance metrics
- Batch simulation tracking

### Analytics
- Transaction success rate monitoring
- Actual TPS calculations
- Total amount tracking
- Detailed transaction logs

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Connect to Supabase:
   - Click the "Connect to Supabase" button in the top right
   - Wait for the connection process to complete

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

### Tables
- `transactions`: Stores individual transaction records
- `simulation_batches`: Tracks load test simulation runs

### Security
- Row Level Security (RLS) enabled
- Policies for authenticated users
- Secure data access controls

## Known Issues and Resolutions

### Resolved Issues

1. **RLS Policy Violations**
   - Issue: Initial transactions failed due to RLS policy restrictions
   - Resolution: Implemented proper RLS policies for authenticated users

2. **Supabase Client Export**
   - Issue: Supabase client export was missing
   - Resolution: Fixed the supabaseClient.ts file to properly export the client

### Current Limitations

1. **Transaction Simulation**
   - Currently simulates basic approval/decline scenarios
   - Future enhancement: Add more complex validation rules

2. **Load Testing**
   - Limited to single-instance testing
   - Future enhancement: Distributed load testing support

## Future Plans

1. **Enhanced Transaction Processing**
   - Add support for more transaction types
   - Implement advanced fraud detection simulation
   - Add support for different card types

2. **Advanced Load Testing**
   - Distributed load testing capabilities
   - Custom scenario creation
   - Advanced metrics and reporting

3. **Analytics Dashboard**
   - Real-time transaction monitoring
   - Advanced analytics and reporting
   - Custom metric tracking

4. **Security Enhancements**
   - Additional authentication methods
   - Enhanced encryption simulation
   - PCI compliance demonstration

5. **API Integration**
   - External payment gateway simulation
   - Webhook support
   - Third-party integration examples

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Supabase](https://supabase.com) for real-time database capabilities
- UI components powered by [Tailwind CSS](https://tailwindcss.com)
- Icons provided by [Lucide](https://lucide.dev)