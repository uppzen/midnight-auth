"use client"

import React, { useState } from 'react';
import { useMidnightWallet } from "../hooks/useMidnightWallet";

export interface MidnightWalletInfoProps {
  className?: string;
  showBalance?: boolean;
  showProvider?: boolean;
  addressFormat?: "short" | "full";
  variant?: "card" | "compact" | "inline";
}

export const MidnightWalletInfo: React.FC<MidnightWalletInfoProps> = ({
  className = "",
  showBalance = true,
  showProvider = true,
  addressFormat = "short",
  variant = "card",
}) => {
  const { walletState, address, balance, provider, isConnected } = useMidnightWallet();
  const [copied, setCopied] = useState(false);

  if (!isConnected || !walletState) {
    return null;
  }

  const formatAddress = (addr: string | null): string => {
    if (!addr) return "N/A";
    if (addressFormat === "short") {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    }
    return addr;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Safely extract values from walletState
  const walletData = {
    address: address || 'N/A',
    balance: balance || '0',
    provider: provider || 'N/A'
  };

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-mono text-zinc-300">{formatAddress(walletData.address)}</span>
        <button 
          onClick={copyAddress} 
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label={copied ? 'Copied!' : 'Copy address'}
        >
          {copied ? (
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
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
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
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 text-sm ${className}`}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-medium text-zinc-300">Connected</span>
        </div>
        <div className="w-px h-4 bg-zinc-700" />
        <span className="font-mono text-zinc-300">{formatAddress(walletData.address)}</span>
        {showBalance && (
          <>
            <div className="w-px h-4 bg-zinc-700" />
            <span className="text-sm font-medium text-white">{walletData.balance} tDUST</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300">Connected</span>
          </div>
          <button
            onClick={copyAddress}
            className="text-xs px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            disabled={!address}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Address</span>
            <span className="text-sm font-mono text-zinc-300">{formatAddress(walletData.address)}</span>
          </div>
          
          {showBalance && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Balance</span>
              <span className="text-sm font-mono text-zinc-300">{walletData.balance} tDUST</span>
            </div>
          )}
          
          {showProvider && walletData.provider !== 'N/A' && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Provider</span>
              <span className="text-sm font-mono text-zinc-300">
                {typeof walletData.provider === 'string' ? walletData.provider : 'Connected'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
