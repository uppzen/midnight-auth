import { useContext, useCallback } from 'react'
import { MidnightAuthContext } from '../context/MidnightAuthContext'
import type { 
  MidnightAuthContextValue, 
  WalletState,
  Session 
} from '../types'

interface UseMidnightAuthReturn extends Omit<MidnightAuthContextValue, 'walletState' | 'session'> {
  walletState: WalletState | null
  session: Session | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  refreshSession: () => Promise<void>
  updateSessionMetadata: (metadata: Record<string, any>) => void
  clearError: () => void
}

export const useMidnightAuth = (): UseMidnightAuthReturn => {
  const context = useContext(MidnightAuthContext)
  
  if (!context) {
    throw new Error('useMidnightAuth must be used within MidnightAuthProvider')
  }

  const {
    walletState,
    session,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshSession,
    updateSessionMetadata,
    clearError,
    getWalletAPI,
    signData,
    submitTransaction
  } = context

  // Memoize the context value to prevent unnecessary re-renders
  const memoizedContext = useCallback(() => ({
    walletState,
    session,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshSession,
    updateSessionMetadata,
    clearError,
    getWalletAPI,
    signData,
    submitTransaction
  }), [
    walletState,
    session,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshSession,
    updateSessionMetadata,
    clearError,
    getWalletAPI,
    signData,
    submitTransaction
  ])

  return memoizedContext()
}