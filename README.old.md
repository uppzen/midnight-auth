# @uppzen/midnight-auth

<div align="center">

[![npm version](https://img.shields.io/npm/v/@uppzen/midnight-auth.svg)](https://www.npmjs.com/package/@uppzen/midnight-auth)
[![npm downloads](https://img.shields.io/npm/dm/@uppzen/midnight-auth.svg)](https://www.npmjs.com/package/@uppzen/midnight-auth)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)

Modern authentication and wallet connection library for Midnight Network.

**[📚 Documentation](https://docs.uppzen.com)** • **[📦 npm](https://www.npmjs.com/package/@uppzen/midnight-auth)** • **[🐛 Issues](https://github.com/uppzen/midnight-auth/issues)**

</div>

---

## Features

- ✨ Beautiful pre-styled UI components
- 🔐 Secure authentication with session management
- ⚡ Transaction signing and submission
- 🔧 Full TypeScript support
- 📱 Responsive design
- 🚀 Next.js 13+ optimized

## Installation

```bash
npm install @uppzen/midnight-auth
```

## Quick Start

```tsx
import '@uppzen/midnight-auth/styles.css'
import { MidnightAuthProvider, MidnightConnectButton } from '@uppzen/midnight-auth'

export default function App() {
  return (
    <MidnightAuthProvider>
      <MidnightConnectButton />
    </MidnightAuthProvider>
  )
}
```

## Documentation

For complete documentation, API reference, and examples, visit **[docs.uppzen.com](https://docs.uppzen.com)**

## Components

- `<MidnightAuthProvider />` - Wrap your app
- `<MidnightConnectButton />` - Wallet connection button
- `<MidnightWalletInfo />` - Display wallet information
- `<MidnightSessionTimer />` - Session countdown
- `<ProtectedRoute />` - Route protection

## Hooks

- `useMidnightAuth()` - Core authentication
- `useMidnightWallet()` - Wallet data and operations
- `useMidnightSession()` - Session management

## License

Apache 2.0 © [Uppzen](https://uppzen.com)

---

<div align="center">
  Made with ❤️ for the Midnight Network community
</div>

```tsx
<MidnightConnectButton
  variant="default"           // 'default' | 'outline' | 'ghost'
  size="md"                   // 'sm' | 'md' | 'lg'
  connectText="Connect"       // Custom connect text
  disconnectText="Disconnect" // Custom disconnect text
  onConnectSuccess={() => {}} // Callback on successful connection
  onDisconnectSuccess={() => {}} // Callback on disconnect
  className=""
/>
```

#### `<MidnightWalletInfo />`

Display wallet information with multiple layout options.

```tsx
<MidnightWalletInfo 
  variant="card"           // 'card' | 'compact' | 'inline'
  showBalance={true}       // Show balance (if available)
  showProvider={true}      // Show wallet provider
  addressFormat="short"    // 'short' | 'full'
  className=""
/>
```

#### `<MidnightSessionTimer />`

Show session expiration countdown with auto-refresh.

```tsx
<MidnightSessionTimer 
  variant="default"                  // 'default' | 'compact' | 'minimal'
  showRefreshButton={true}           // Show manual refresh button
  autoRefreshThreshold={5 * 60 * 1000} // Auto-refresh when 5 min remaining
  className=""
/>
```

#### `<ProtectedRoute />`

Protect routes that require wallet connection.

```tsx
<ProtectedRoute
  fallback={<div>Please connect your wallet</div>} // Optional custom fallback
>
  <YourProtectedContent />
</ProtectedRoute>
```

### Hooks

#### `useMidnightAuth()`

Core authentication hook.

```tsx
const {
  isConnected,      // boolean: Connection status
  isConnecting,     // boolean: Loading state
  walletState,      // WalletState | null
  error,            // string | null
  connect,          // () => Promise<void>
  disconnect,       // () => void
  clearError,       // () => void
  getWalletAPI,     // () => any
  signData,         // (address, payload) => Promise<SignDataResult>
  submitTransaction // (tx) => Promise<TransactionResult>
} = useMidnightAuth()
```

#### `useMidnightWallet()`

Wallet data and helpers.

```tsx
const {
  address,          // string | null: Shield address
  legacyAddress,    // string | null: Legacy address
  balance,          // string | null: Balance (not available via API)
  balances,         // BalanceBreakdown | null
  provider,         // string | null
  walletState,      // WalletState | null
  isConnected,      // boolean
  isConnecting,     // boolean
  refreshBalance,   // () => Promise<string | null>
  signData,         // (address, payload) => Promise<any>
  submitTransaction // (tx) => Promise<any>
} = useMidnightWallet()
```

#### `useMidnightSession()`

Session management.

```tsx
const {
  session,          // Session | null
  isExpired,        // boolean
  timeRemaining,    // number (milliseconds)
  refreshSession    // () => Promise<void>
} = useMidnightSession()
```

## Examples

### Sign a Message

```tsx
import { useMidnightWallet } from '@eclipse/midnight-auth'

export default function SignMessage() {
  const { address, signData } = useMidnightWallet()

  const handleSign = async () => {
    try {
      const result = await signData(address!, 'Hello Midnight Network!')
      console.log('Signature:', result.signature)
      console.log('Key:', result.key)
    } catch (error) {
      console.error('Failed to sign:', error)
    }
  }

  return <button onClick={handleSign}>Sign Message</button>
}
```

### Submit a Transaction

```tsx
import { useMidnightWallet } from '@eclipse/midnight-auth'

export default function SendTransaction() {
  const { submitTransaction } = useMidnightWallet()

  const handleSend = async () => {
    try {
      const tx = {
        // Your transaction object
      }
      const result = await submitTransaction(tx)
      console.log('Transaction hash:', result.txHash)
    } catch (error) {
      console.error('Failed to submit:', error)
    }
  }

  return <button onClick={handleSend}>Send Transaction</button>
}
```

### Protected Dashboard

```tsx
import { ProtectedRoute, useMidnightWallet } from '@eclipse/midnight-auth'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { address } = useMidnightWallet()
  return <h1>Welcome {address}!</h1>
}
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import type {
  WalletState,
  BalanceBreakdown,
  MidnightWalletAPI,
  SignDataResult,
  TransactionResult,
  Session,
  MidnightAuthProviderProps
} from '@eclipse/midnight-auth'
```

## Known Limitations

- **Balance Display**: The Lace wallet API does not expose balance programmatically. Users must check their balance directly in the Lace wallet extension.
- **Network Detection**: Currently supports Midnight Testnet. Mainnet support will be added when available.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Documentation

Full documentation is available at [https://docs.eclipse-labs.org/midnight-auth](https://docs.eclipse-labs.org/midnight-auth)

## Support

- 📚 [Documentation](https://docs.eclipse-labs.org/midnight-auth)
- 🐛 [Issue Tracker](https://github.com/eclipse-labs-org/midnight-auth/issues)
- 💬 [Discussions](https://github.com/eclipse-labs-org/midnight-auth/discussions)

## Related Projects

- [Midnight Network](https://midnight.network)
- [Lace Wallet](https://www.lace.io/)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

Apache 2.0 © [Eclipse Labs](https://eclipse-labs.org)

---

<div align="center">
  Made with ❤️ for the Midnight Network community
</div>
# midnight-auth
# midnight-auth
# midnight-auth
# midnight-auth
# midnight-auth
# midnight-auth
