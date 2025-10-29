// Context
export { MidnightAuthProvider } from './context/MidnightAuthContext'
export type { MidnightAuthProviderProps, MidnightAuthContextValue } from './types'

// Hooks
export { useMidnightAuth } from './hooks/useMidnightAuth'
export { useMidnightWallet } from './hooks/useMidnightWallet'
export { useMidnightSession } from './hooks/useMidnightSession'

// Components
export { MidnightConnectButton } from './components/MidnightConnectButton'
export type { MidnightConnectButtonProps } from './components/MidnightConnectButton'

export { MidnightWalletInfo } from './components/MidnightWalletInfo'
export type { MidnightWalletInfoProps } from './components/MidnightWalletInfo'

export { MidnightSessionTimer } from './components/MidnightSessionTimer'
export type { MidnightSessionTimerProps } from './components/MidnightSessionTimer'

export { ProtectedRoute } from './components/ProtectedRoute'
export type { ProtectedRouteProps } from './components/ProtectedRoute'

// Types
export type {
  WalletState,
  BalanceBreakdown,
  MidnightWalletAPI,
  MidnightProvider,
  Session,
  SignDataResult,
  TransactionResult,
} from './types'