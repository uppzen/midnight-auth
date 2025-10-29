"use client"

import React from 'react'

import { useState, useEffect, useRef } from "react"
import { useMidnightAuth } from "../hooks/useMidnightAuth"
import { useMidnightWallet } from "../hooks/useMidnightWallet"
import { MidnightConnectModal } from "./MidnightConnectModal"
import { Copy, LogOut, User, ChevronDown, Check } from "lucide-react"

export interface MidnightConnectButtonProps {
  className?: string
  connectText?: string
  connectingText?: string
  disconnectText?: string
  onConnectSuccess?: () => void
  onDisconnectSuccess?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const MidnightConnectButton: React.FC<MidnightConnectButtonProps> = ({
  className = "",
  connectText = "Connect Wallet",
  connectingText = "Connecting...",
  disconnectText = "Disconnect",
  onConnectSuccess,
  onDisconnectSuccess,
  variant = "default",
  size = "md",
}) => {
  const { isConnected, isConnecting, connect, disconnect } = useMidnightAuth()
  const { address } = useMidnightWallet()
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleConnect = async () => {
    await connect()
    setShowModal(false)
    if (onConnectSuccess) onConnectSuccess()
  }

  const handleDisconnect = () => {
    disconnect()
    setShowDropdown(false)
    if (onDisconnectSuccess) onDisconnectSuccess()
  }

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string | null): string => {
    if (!addr) return "N/A"
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }

  // Connected state - show dropdown button
  if (isConnected) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`
            ${sizeClasses[size]}
            rounded-xl font-medium transition-all duration-200
            bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700
            flex items-center gap-2.5 shadow-lg
            ${className}
          `}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono">{formatAddress(address)}</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div 
            className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 to-transparent">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-400 mb-0.5">Connected</p>
                  <p className="text-sm font-mono text-white truncate">{formatAddress(address)}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 group"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                )}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>

              <div className="my-1 h-px bg-zinc-800/50" />

              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Not connected - show connect button
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isConnecting}
        className={`
          ${sizeClasses[size]}
          rounded-xl font-semibold transition-all duration-200
          bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
          text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
          ${className}
        `}
      >
        {isConnecting && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isConnecting ? connectingText : connectText}
      </button>

      <MidnightConnectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />
    </>
  )
}
