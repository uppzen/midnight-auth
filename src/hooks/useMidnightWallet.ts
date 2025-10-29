import { useCallback } from 'react'
import { useMidnightAuth } from './useMidnightAuth'
import type { WalletState, BalanceBreakdown } from '../types'

interface UseMidnightWalletReturn {
  walletState: WalletState | null
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  legacyAddress: string | null
  balance: string | null
  balances: BalanceBreakdown | null
  provider: string | null
  refreshBalance: () => Promise<string | null>
  signData: (address: string, payload: string) => Promise<any>
  submitTransaction: (tx: any) => Promise<any>
}

export const useMidnightWallet = (): UseMidnightWalletReturn => {
  const { 
    walletState, 
    isConnected, 
    isConnecting, 
    refreshSession,
    signData: contextSignData,
    submitTransaction: contextSubmitTransaction
  } = useMidnightAuth()
  
  // Helper to get the primary address (shield address preferred)
  const getAddress = useCallback((): string | null => {
    if (!walletState) return null
    return walletState.shieldAddress || walletState.address || walletState.legacyAddress || null
  }, [walletState])

  // Helper to get the legacy address if available
  const getLegacyAddress = useCallback((): string | null => {
    if (!walletState) return null
    return walletState.legacyAddress || walletState.addressLegacy || null
  }, [walletState])

  // Refresh the wallet balance
  const refreshBalance = useCallback(async (): Promise<string | null> => {
    try {
      await refreshSession()
      return walletState?.balance || null
    } catch (error) {
      return null
    }
  }, [refreshSession, walletState])

  return {
    walletState,
    isConnected,
    isConnecting,
    address: getAddress(),
    legacyAddress: getLegacyAddress(),
    balance: walletState?.balance || null,
    balances: walletState?.balances || null,
    provider: walletState?.provider || null,
    refreshBalance,
    signData: contextSignData || (async () => { throw new Error('Sign data not available') }),
    submitTransaction: contextSubmitTransaction || (async () => { throw new Error('Submit transaction not available') }),
  }
}
