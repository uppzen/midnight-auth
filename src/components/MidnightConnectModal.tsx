"use client"

import React, { useEffect } from 'react'
import { X, Wallet, Shield, Zap } from "lucide-react"

interface MidnightConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
  isConnecting: boolean
}

export function MidnightConnectModal({ isOpen, onClose, onConnect, isConnecting }: MidnightConnectModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with animation */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-md bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-800/50 overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-zinc-800/50">
          <div>
            <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
            <p className="text-sm text-zinc-400 mt-1">Choose how you want to connect</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2.5 text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Wallet Option */}
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 p-5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/10"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            
            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <Wallet className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-white text-lg group-hover:text-blue-100 transition-colors">
                  Midnight Wallet
                </div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {isConnecting ? "Connecting..." : "Connect with browser extension"}
                </div>
              </div>
              {isConnecting ? (
                <div className="h-6 w-6 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                <svg 
                  className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs text-zinc-400 font-medium">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-xs text-zinc-400 font-medium">Fast</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
              <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Easy</span>
            </div>
          </div>

          {/* Info */}
          <div className="pt-2 text-xs text-zinc-500 text-center leading-relaxed">
            By connecting, you agree to our{' '}
            <span className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>

    </div>
  )
}
