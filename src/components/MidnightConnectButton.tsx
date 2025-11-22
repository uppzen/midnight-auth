"use client"

import React, { useState } from "react"
import { useMidnightAuth } from "../hooks/useMidnightAuth"
import { useMidnightWallet } from "../hooks/useMidnightWallet"
import { MidnightConnectModal } from "./MidnightConnectModal"
import { Copy, LogOut, User, ChevronDown, Check } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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
  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    await connect()
    setShowModal(false)
    if (onConnectSuccess) onConnectSuccess()
  }

  const handleDisconnect = () => {
    disconnect()
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

  // Map size prop to shadcn button size
  const buttonSize = size === "md" ? "default" : size === "lg" ? "lg" : "sm"

  // Connected state - show dropdown button
  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={buttonSize}
            className={`bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 hover:text-white gap-2.5 rounded-xl shadow-lg ${className}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono">{formatAddress(address)}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl shadow-2xl" align="end">
          <div className="p-2 border-b border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 to-transparent">
            <div className="flex items-center gap-3 px-2 py-1.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-400 mb-0.5">Connected</p>
                <p className="text-sm font-mono text-white truncate">
                  {formatAddress(address)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-1">
            <DropdownMenuItem
              onClick={handleCopyAddress}
              className="cursor-pointer rounded-xl focus:bg-zinc-900 focus:text-white text-zinc-300 gap-2 my-1"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-zinc-400 group-hover:text-white" />
              )}
              <span>{copied ? "Copied!" : "Copy Address"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800/50" />
            <DropdownMenuItem
              onClick={handleDisconnect}
              className="cursor-pointer rounded-xl focus:bg-red-500/10 focus:text-red-400 text-red-400 gap-2 my-1"
            >
              <LogOut className="h-4 w-4" />
              <span>{disconnectText}</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Not connected - show connect button
  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={isConnecting}
        size={buttonSize}
        className={`
          rounded-xl font-semibold transition-all duration-200
          bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
          text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25
          disabled:opacity-50 disabled:cursor-not-allowed
          gap-2
          ${className}
        `}
      >
        {isConnecting && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isConnecting ? connectingText : connectText}
      </Button>

      <MidnightConnectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />
    </>
  )
}
