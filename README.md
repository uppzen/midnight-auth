# midnight-auth

<div align="center">

[![npm version](https://img.shields.io/npm/v/midnight-auth.svg)](https://www.npmjs.com/package/midnight-auth)
[![npm downloads](https://img.shields.io/npm/dm/midnight-auth.svg)](https://www.npmjs.com/package/midnight-auth)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)
[![CI](https://github.com/skeezrxcco/midnight-auth/workflows/CI/badge.svg)](https://github.com/skeezrxcco/midnight-auth/actions)

Modern authentication and wallet connection library for Midnight Network. Beautiful UI components, TypeScript support, and effortless integration.

[Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Examples](#examples)

</div>

---

## Features

✨ **Beautiful UI Components** - Pre-styled, customizable components with modern design

🔐 **Secure Authentication** - Built-in session management and auto-reconnect

⚡ **Transaction Signing** - Sign data and submit transactions directly

🎨 **Multiple Themes** - Flexible styling with Tailwind CSS

📱 **Responsive Design** - Works seamlessly on all devices

🔧 **TypeScript First** - Full type safety and autocomplete

🎯 **Zero Config** - Works out of the box with sensible defaults

🚀 **Next.js Optimized** - Perfect for Next.js 13+ with App Router

## Installation

```bash
npm install midnight-auth
# or
yarn add midnight-auth
# or
pnpm add midnight-auth
```

### Prerequisites

- React 18+ or 19+
- Lace Midnight wallet browser extension
- Node.js 18+

## Quick Start

### 1. Set up the Provider

Wrap your app with `MidnightAuthProvider`:

```tsx
// app/layout.tsx (Next.js 13+)
import 'midnight-auth/styles.css'
import { MidnightAuthProvider } from 'midnight-auth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <MidnightAuthProvider
          sessionTimeout={24 * 60 * 60 * 1000} // 24 hours
          autoConnect={true}
          onConnect={(walletState) => console.log('Connected:', walletState)}
          onError={(error) => console.error('Error:', error)}
        >
          {children}
        </MidnightAuthProvider>
      </body>
    </html>
  )
}
```

### 2. Add the Connect Button

```tsx
'use client'

import { MidnightConnectButton, useMidnightAuth } from 'midnight-auth'

export default function Page() {
  const { isConnected } = useMidnightAuth()

  return (
    <div>
      <MidnightConnectButton />
      {isConnected && <p>✅ Wallet Connected!</p>}
    </div>
  )
}
```

### 3. Access Wallet Data

```tsx
import { useMidnightWallet } from '@eclipse/midnight-auth'

export default function WalletInfo() {
  const { address, signData, submitTransaction } = useMidnightWallet()

  const handleSign = async () => {
    if (address) {
      const signature = await signData(address, 'Hello Midnight!')
      console.log('Signature:', signature)
    }
  }

  return (
    <div>
      <p>Address: {address}</p>
      <button onClick={handleSign}>Sign Message</button>
    </div>
  )
}
```

## API Reference

### Components

#### `<MidnightConnectButton />`

Main wallet connection button. Displays as a gradient button when disconnected, and transforms into a dropdown menu when connected.

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
