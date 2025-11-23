import React, { createContext, useState, useEffect, useCallback, useRef } from 'react'
import type {
  MidnightAuthContextValue,
  MidnightAuthProviderProps,
  MidnightProvider,
  WalletState,
  Session,
} from '../types'

declare global {
  interface Window {
    midnight?: {
      mnLace?: MidnightProvider
    }
  }
}

export const MidnightAuthContext = createContext<MidnightAuthContextValue | null>(null)

const SESSION_STORAGE_KEY = 'midnight_session'
const DEFAULT_SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

export const MidnightAuthProvider: React.FC<MidnightAuthProviderProps> = ({
  children,
  sessionTimeout = DEFAULT_SESSION_TIMEOUT,
  autoConnect = true,
  onConnect,
  onDisconnect,
  onError,
}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletState, setWalletState] = useState<WalletState | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)

  const walletAPIRef = useRef<any>(null)

  // Get Midnight provider
  const getMidnightProvider = useCallback((): MidnightProvider | null => {
    if (typeof window === 'undefined') return null
    return window.midnight?.mnLace || null
  }, [])

  // Save session to localStorage
  const saveSession = useCallback((newSession: Session) => {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession))
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [])

  // Load session from localStorage
  const loadSession = useCallback((): Session | null => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY)
      if (!stored) return null

      const session: Session = JSON.parse(stored)

      // Check if session is expired
      if (session.expiresAt && Date.now() > session.expiresAt) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
        return null
      }

      return session
    } catch {
      return null
    }
  }, [])

  // Clear session
  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [])

  // Create new session
  const createSession = useCallback(
    (address: string): Session => {
      const now = Date.now()
      const newSession: Session = {
        address,
        connectedAt: now,
        expiresAt: now + sessionTimeout,
        metadata: {},
      }

      setSession(newSession)
      saveSession(newSession)

      return newSession
    },
    [sessionTimeout, saveSession]
  )

  // Update session metadata
  const updateSessionMetadata = useCallback(
    (metadata: Record<string, any>) => {
      setSession((prev) => {
        if (!prev) return null

        const updated = {
          ...prev,
          metadata: { ...prev.metadata, ...metadata },
        }

        saveSession(updated)
        return updated
      })
    },
    [saveSession]
  )

  // Refresh session (extend expiry)
  const refreshSession = useCallback(async () => {
    if (!session) return

    const now = Date.now()
    const refreshedSession: Session = {
      ...session,
      expiresAt: now + sessionTimeout,
    }

    setSession(refreshedSession)
    saveSession(refreshedSession)
  }, [session, sessionTimeout, saveSession])

  // Connect wallet
  const connect = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const provider = getMidnightProvider()

      if (!provider) {
        throw new Error('Midnight Lace wallet not found. Please install and enable it.')
      }

      // Enable the wallet
      const walletAPI = await provider.enable()
      walletAPIRef.current = walletAPI

      // Get wallet state
      const state = await walletAPI.state()

      const enrichedState: WalletState = {
        ...state,
        provider: 'Lace (Midnight)',
      }

      // Note: Balance is not exposed by Lace wallet API
      // Users should check their balance directly in the Lace wallet
      enrichedState.balance = undefined

      setWalletState(enrichedState)
      setIsConnected(true)

      // Create session
      const address = enrichedState.shieldAddress || enrichedState.legacyAddress || 'unknown'
      createSession(address)

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('midnight:connected', { detail: enrichedState }))

      // Call onConnect callback
      if (onConnect) {
        onConnect(enrichedState)
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to connect wallet'
      setError(errorMessage)

      if (onError) {
        onError(err)
      }
    } finally {
      setIsConnecting(false)
    }
  }, [getMidnightProvider, createSession, onConnect, onError])

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setIsConnected(false)
    setWalletState(null)
    setSession(null)
    setError(null)
    walletAPIRef.current = null

    clearSession()

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('midnight:disconnected'))

    // Call onDisconnect callback
    if (onDisconnect) {
      onDisconnect()
    }
  }, [clearSession, onDisconnect])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Get wallet API
  const getWalletAPI = useCallback(() => {
    return walletAPIRef.current
  }, [])

  // Sign data with wallet
  const signData = useCallback(async (address: string, payload: string) => {
    const walletAPI = walletAPIRef.current
    if (!walletAPI || !walletAPI.signData) {
      throw new Error('Wallet API not available or does not support signing')
    }

    const result = await walletAPI.signData(address, payload)
    return result
  }, [])

  // Submit transaction
  const submitTransaction = useCallback(async (tx: any) => {
    const walletAPI = walletAPIRef.current
    if (!walletAPI || !walletAPI.submitTx) {
      throw new Error('Wallet API not available or does not support transaction submission')
    }

    const result = await walletAPI.submitTx(tx)
    return result
  }, [])

  // Auto-connect on mount if previously connected
  useEffect(() => {
    if (!autoConnect) return

    const storedSession = loadSession()

    if (storedSession) {
      // Attempt to reconnect
      connect().catch(() => {
        clearSession()
      })
    }
  }, [autoConnect, loadSession, connect, clearSession])

  // Check for session expiry
  useEffect(() => {
    if (!session || !session.expiresAt) return

    const checkExpiry = () => {
      if (session.expiresAt && Date.now() > session.expiresAt) {
        disconnect()
      }
    }

    // Check every minute
    const interval = setInterval(checkExpiry, 60 * 1000)

    return () => clearInterval(interval)
  }, [session, disconnect])

  const value: MidnightAuthContextValue = {
    isConnected,
    isConnecting,
    walletState,
    error,
    session,
    connect,
    disconnect,
    clearError,
    refreshSession,
    updateSessionMetadata,
    getWalletAPI,
    signData,
    submitTransaction,
  }

  return <MidnightAuthContext.Provider value={value}>{children}</MidnightAuthContext.Provider>
}
