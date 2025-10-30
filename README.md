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

### Next.js App Router (13+)

Create a client component wrapper:

```tsx
// app/providers.tsx
'use client'

import { MidnightAuthProvider } from '@uppzen/midnight-auth'
import '@uppzen/midnight-auth/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MidnightAuthProvider>
      {children}
    </MidnightAuthProvider>
  )
}
```

Then use it in your root layout:

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Next.js Pages Router or React

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
