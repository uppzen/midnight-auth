# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-28

### Added

- 🎉 Initial release of midnight-auth
- ✨ Beautiful UI components for wallet connection
- 🔐 Secure authentication with session management
- ⚡ Transaction signing and submission methods
- 📱 Responsive design with multiple component variants
- 🔧 Full TypeScript support
- 🎨 Pre-styled components with Tailwind CSS
- 🚀 Next.js 13+ App Router optimization
- 🔄 Auto-reconnect functionality
- ⏱️ Session expiration tracking and auto-refresh
- 🎯 Protected route component
- 📦 Zero-dependency core (only lucide-react for icons)

### Components

- `MidnightConnectButton` - Main wallet connection button with dropdown menu
- `MidnightWalletInfo` - Display wallet information (card, compact, inline variants)
- `MidnightSessionTimer` - Session countdown with auto-refresh
- `ProtectedRoute` - Route protection wrapper
- `MidnightConnectModal` - Beautiful connection modal

### Hooks

- `useMidnightAuth` - Core authentication hook
- `useMidnightWallet` - Wallet data and operations
- `useMidnightSession` - Session management

### Features

- Shield and legacy address support
- Transaction signing with `signData()`
- Transaction submission with `submitTransaction()`
- Session persistence in localStorage
- Custom event dispatching
- Error handling and recovery
- Auto-connect on mount
- Configurable session timeout

### Documentation

- Comprehensive README with examples
- Full API reference
- TypeScript type definitions
- Quick start guide

### Known Limitations

- Balance display not available (Lace wallet API limitation)
- Testnet only (mainnet support pending Midnight Network launch)

---

## Release Notes

This is the first production-ready release of @eclipse/midnight-auth, providing a complete authentication solution for Midnight Network dApps. The library has been thoroughly tested and includes all essential features for wallet integration.

### Breaking Changes

None - this is the initial release.

### Migration Guide

Not applicable for initial release.

### Upgrading

Not applicable for initial release.

---

For older releases, see [GitHub Releases](https://github.com/eclipse-labs-org/midnight-auth/releases).
