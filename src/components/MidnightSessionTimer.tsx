"use client"

import React from 'react'

import { useState, useEffect } from "react"
import { useMidnightSession } from "../hooks/useMidnightSession"

export interface MidnightSessionTimerProps {
  className?: string
  showRefreshButton?: boolean
  autoRefreshThreshold?: number
  variant?: "default" | "compact" | "minimal"
}

export const MidnightSessionTimer: React.FC<MidnightSessionTimerProps> = ({
  className = "",
  showRefreshButton = true,
  autoRefreshThreshold = 5 * 60 * 1000,
  variant = "default",
}) => {
  const { session, isExpired, timeRemaining, refreshSession } = useMidnightSession()
  const [, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (timeRemaining > 0 && timeRemaining < autoRefreshThreshold && !isExpired) {
      refreshSession()
    }
  }, [timeRemaining, autoRefreshThreshold, isExpired, refreshSession])

  if (!session) {
    return null
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    } else {
      return `${seconds}s`
    }
  }

  const isWarning = timeRemaining < 10 * 60 * 1000 && !isExpired

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className={`w-2 h-2 rounded-full ${isExpired ? "bg-red-400" : isWarning ? "bg-yellow-400" : "bg-green-400"}`}
        />
        <span className="text-sm text-zinc-400">{isExpired ? "Expired" : formatTime(timeRemaining)}</span>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
          isExpired
            ? "bg-red-500/10 border-red-500/30"
            : isWarning
              ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-zinc-900 border-zinc-800"
        } ${className}`}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isExpired ? "text-red-400" : isWarning ? "text-yellow-400" : "text-zinc-400"}
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span
            className={`text-sm font-medium ${
              isExpired ? "text-red-400" : isWarning ? "text-yellow-400" : "text-white"
            }`}
          >
            {isExpired ? "Expired" : formatTime(timeRemaining)}
          </span>
        </div>
        {showRefreshButton && !isExpired && (
          <button
            onClick={refreshSession}
            className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Extend
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={`p-4 rounded-xl border ${
        isExpired
          ? "bg-red-500/10 border-red-500/30"
          : isWarning
            ? "bg-yellow-500/10 border-yellow-500/30"
            : "bg-zinc-900 border-zinc-800"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isExpired ? "text-red-400" : isWarning ? "text-yellow-400" : "text-zinc-400"}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Session {isExpired ? "Expired" : "Expires In"}
            </p>
          </div>
          <p
            className={`text-xl font-semibold ${
              isExpired ? "text-red-400" : isWarning ? "text-yellow-400" : "text-white"
            }`}
          >
            {isExpired ? "Session Expired" : formatTime(timeRemaining)}
          </p>
        </div>

        {showRefreshButton && !isExpired && (
          <button
            onClick={refreshSession}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Extend Session
          </button>
        )}
      </div>

      {isWarning && !isExpired && (
        <div className="mt-3 pt-3 border-t border-yellow-500/20">
          <p className="text-xs text-yellow-400/80">
            Your session is about to expire. Click "Extend Session" to continue.
          </p>
        </div>
      )}
    </div>
  )
}
