/* eslint-disable react-hooks/purity */
import { useMidnightAuth } from './useMidnightAuth'
import type { Session } from '../types'

export interface UseMidnightSessionReturn {
  session: Session | null
  isExpired: boolean
  timeRemaining: number
  refreshSession: () => Promise<void>
  updateSessionMetadata: (metadata: Record<string, any>) => void
}

export const useMidnightSession = (): UseMidnightSessionReturn => {
  const { session, refreshSession, updateSessionMetadata } = useMidnightAuth()

  const isExpired = session?.expiresAt ? Date.now() > session.expiresAt : false
  
  const timeRemaining = session?.expiresAt 
    ? Math.max(0, session.expiresAt - Date.now())
    : 0

  return {
    session,
    isExpired,
    timeRemaining,
    refreshSession,
    updateSessionMetadata,
  }
}
