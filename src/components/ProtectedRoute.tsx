"use client"

import React from "react"
import type { ReactNode } from "react"
import { useMidnightAuth } from "../hooks/useMidnightAuth"
import { Shield, Wallet } from "lucide-react"

export interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isConnected, isConnecting } = useMidnightAuth()

  if (isConnecting) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 animate-pulse">
            <Shield className="h-6 w-6 text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-500">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      fallback || (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <div className="max-w-md text-center space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-100">Wallet Connection Required</h3>
              <p className="text-sm text-zinc-400 text-balance">
                Please connect your Midnight wallet to access this protected content.
              </p>
            </div>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
