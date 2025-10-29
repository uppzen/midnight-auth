export interface BalanceBreakdown {
  unshielded: string
  shielded: string
  total: string
}

export interface WalletState {
  // Address fields
  address?: string
  shieldAddress?: string
  addressLegacy?: string
  legacyAddress?: string
  
  // Balance
  balance?: string
  balances?: BalanceBreakdown
  
  // Provider info
  provider?: string
  providerName?: string
  
  // Keys
  coinPublicKey?: string
  coinPublicKeyLegacy?: string
  encryptionPublicKey?: string
  encryptionPublicKeyLegacy?: string
  
  // Versioning
  apiVersion?: string
  
  // Additional metadata
  [key: string]: any
}

export interface SignDataResult {
  signature: string
  key: string
}

export interface TransactionResult {
  txHash: string
  success: boolean
}

export interface MidnightWalletAPI {
  state: () => Promise<WalletState>
  balances?: () => Promise<{ unshielded: bigint; shielded: bigint }>
  getBalance?: () => Promise<string>
  signData?: (address: string, payload: string) => Promise<SignDataResult>
  submitTx?: (tx: any) => Promise<TransactionResult>
  [key: string]: any
}

export interface MidnightProvider {
  enable: () => Promise<MidnightWalletAPI>
  isEnabled: () => Promise<boolean>
}

export interface Session {
  address: string
  connectedAt: number
  expiresAt?: number
  metadata?: Record<string, any>
}

export interface MidnightAuthContextValue {
  // Connection state
  isConnected: boolean
  isConnecting: boolean
  walletState: WalletState | null
  error: string | null
  
  // Session state
  session: Session | null
  
  // Methods
  connect: () => Promise<void>
  disconnect: () => void
  clearError: () => void
  
  // Session methods
  refreshSession: () => Promise<void>
  updateSessionMetadata: (metadata: Record<string, any>) => void
  
  // Wallet API access
  getWalletAPI: () => any | null
  
  // Transaction methods
  signData?: (address: string, payload: string) => Promise<SignDataResult>
  submitTransaction?: (tx: any) => Promise<TransactionResult>
}

export interface MidnightAuthProviderProps {
  children: React.ReactNode
  sessionTimeout?: number // in milliseconds, default 24 hours
  autoConnect?: boolean // attempt to reconnect on mount if previously connected
  onConnect?: (walletState: WalletState) => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}