import React, { useState } from 'react'
import { MidnightAuthProvider } from './context/MidnightAuthContext'
import { MidnightConnectButton } from './components/MidnightConnectButton'
import { MidnightWalletInfo } from './components/MidnightWalletInfo'
import { MidnightSessionTimer } from './components/MidnightSessionTimer'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useMidnightAuth } from './hooks/useMidnightAuth'
import { useMidnightWallet } from './hooks/useMidnightWallet'
import { useMidnightSession } from './hooks/useMidnightSession'

/**
 * Sandbox Component - Internal Testing Page
 * 
 * This component is NOT exported from the library.
 * Use it to test components, hooks, and logic during development.
 */

// Test component that uses all hooks
const HooksTester: React.FC = () => {
  const auth = useMidnightAuth()
  const wallet = useMidnightWallet()
  const session = useMidnightSession()
  const [signResult, setSignResult] = useState<string>('')
  const [txResult, setTxResult] = useState<string>('')

  const handleSignData = async () => {
    try {
      if (!auth.signData) {
        setSignResult('Error: signData method not available')
        return
      }
      if (!wallet.address) {
        setSignResult('Error: No wallet address available')
        return
      }
      const result = await auth.signData(wallet.address, 'Test message to sign')
      setSignResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setSignResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleSubmitTx = async () => {
    try {
      if (!auth.submitTransaction) {
        setTxResult('Error: submitTransaction method not available')
        return
      }
      const result = await auth.submitTransaction('test-tx-cbor-hex')
      setTxResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setTxResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleUpdateMetadata = () => {
    auth.updateSessionMetadata({
      testKey: 'testValue',
      timestamp: Date.now(),
    })
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900">Hooks Testing Panel</h2>
      
      {/* Auth Hook Info */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">useMidnightAuth()</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Connected:</strong> {auth.isConnected ? '✅' : '❌'}</p>
          <p><strong>Connecting:</strong> {auth.isConnecting ? '⏳' : '✅'}</p>
          <p><strong>Error:</strong> {auth.error || 'None'}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={auth.connect}
              disabled={auth.isConnecting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Connect
            </button>
            <button
              onClick={auth.disconnect}
              disabled={!auth.isConnected}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Disconnect
            </button>
            <button
              onClick={auth.refreshSession}
              disabled={!auth.isConnected}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Refresh Session
            </button>
            <button
              onClick={auth.clearError}
              disabled={!auth.error}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              Clear Error
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Hook Info */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">useMidnightWallet()</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Address:</strong> {wallet.address || 'Not connected'}</p>
          <p><strong>Legacy Address:</strong> {wallet.legacyAddress || 'N/A'}</p>
          <p><strong>Balance:</strong> {wallet.balance || 'N/A'}</p>
          <p><strong>Provider:</strong> {wallet.provider || 'N/A'}</p>
          {wallet.balances && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <p className="font-semibold">Balance Breakdown:</p>
              <pre className="text-xs mt-1">{JSON.stringify(wallet.balances, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Session Hook Info */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">useMidnightSession()</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Session Exists:</strong> {session.session ? '✅' : '❌'}</p>
          <p><strong>Expired:</strong> {session.isExpired ? '❌' : '✅'}</p>
          <p><strong>Time Remaining:</strong> {session.timeRemaining ? `${Math.floor(session.timeRemaining / 1000)}s` : 'N/A'}</p>
          <p><strong>Connected At:</strong> {session.session?.connectedAt ? new Date(session.session.connectedAt).toLocaleString() : 'N/A'}</p>
          <p><strong>Expires At:</strong> {session.session?.expiresAt ? new Date(session.session.expiresAt).toLocaleString() : 'N/A'}</p>
          {session.session?.metadata && Object.keys(session.session.metadata).length > 0 && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <p className="font-semibold">Metadata:</p>
              <pre className="text-xs mt-1">{JSON.stringify(session.session.metadata, null, 2)}</pre>
            </div>
          )}
          <button
            onClick={handleUpdateMetadata}
            disabled={!session.session}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Update Metadata
          </button>
        </div>
      </div>

      {/* Sign Data Testing */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Sign Data Testing</h3>
        <button
          onClick={handleSignData}
          disabled={!auth.isConnected}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Sign Test Message
        </button>
        {signResult && (
          <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-auto max-h-40">
            {signResult}
          </pre>
        )}
      </div>

      {/* Transaction Testing */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Transaction Testing</h3>
        <button
          onClick={handleSubmitTx}
          disabled={!auth.isConnected}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
        >
          Submit Test Transaction
        </button>
        {txResult && (
          <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-auto max-h-40">
            {txResult}
          </pre>
        )}
      </div>
    </div>
  )
}

// Protected content for testing ProtectedRoute
const ProtectedContent: React.FC = () => {
  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h2 className="text-2xl font-bold text-green-900 mb-4">🔒 Protected Content</h2>
      <p className="text-green-800">
        This content is only visible when authenticated. You successfully passed through the ProtectedRoute component!
      </p>
    </div>
  )
}

// Main Sandbox Component
const SandboxContent: React.FC = () => {
  const [showProtected, setShowProtected] = useState(false)
  const { isConnected } = useMidnightAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            🧪 Midnight Auth Sandbox
          </h1>
          <p className="text-lg text-gray-600">
            Internal testing environment for components and hooks
          </p>
        </div>

        {/* Components Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Testing</h2>
          
          {/* Connect Button Variants */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">MidnightConnectButton</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Default</p>
                <MidnightConnectButton />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Small</p>
                <MidnightConnectButton size="sm" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Large</p>
                <MidnightConnectButton size="lg" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Outline Variant</p>
                <MidnightConnectButton variant="outline" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Ghost Variant</p>
                <MidnightConnectButton variant="ghost" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Custom Text</p>
                <MidnightConnectButton connectText="Connect to Midnight" />
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          {isConnected && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">MidnightWalletInfo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Default</p>
                  <MidnightWalletInfo />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Compact</p>
                  <MidnightWalletInfo variant="compact" />
                </div>
              </div>
            </div>
          )}

          {/* Session Timer */}
          {isConnected && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">MidnightSessionTimer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Default</p>
                  <MidnightSessionTimer />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Compact</p>
                  <MidnightSessionTimer variant="compact" />
                </div>
              </div>
            </div>
          )}

          {/* Protected Route Testing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">ProtectedRoute</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <button
                onClick={() => setShowProtected(!showProtected)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showProtected ? 'Hide' : 'Show'} Protected Content
              </button>
              {showProtected && (
                <ProtectedRoute fallback={
                  <div className="p-6 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800">
                      ⚠️ Please connect your wallet to view protected content
                    </p>
                  </div>
                }>
                  <ProtectedContent />
                </ProtectedRoute>
              )}
            </div>
          </div>
        </div>

        {/* Hooks Testing Section */}
        <HooksTester />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8">
          <p>This sandbox is for development purposes only and is not exported from the library.</p>
        </div>
      </div>
    </div>
  )
}

// Wrapper with Provider
export const Sandbox: React.FC = () => {
  return (
    <MidnightAuthProvider
      sessionTimeout={3600000}
      autoConnect={false}
    >
      <SandboxContent />
    </MidnightAuthProvider>
  )
}

export default Sandbox
