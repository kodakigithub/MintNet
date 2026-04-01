import { useState } from 'react'
import { fetchTokens } from './utils/fetchTokens'

// TypeScript type for each token row we get back from fetchTokens
type TokenInfo = {
  mint: string
  uiAmount: number
  decimals: number
  tokenAccount: string
}

function App() {
  const [address, setAddress] = useState('')
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFetch() {
    if (!address) return
    setLoading(true)
    setError('')
    try {
      const result = await fetchTokens(address)
      setTokens(result)
    } catch (e) {
      setError('Failed to fetch tokens. Check the address and try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Token Viewer</h1>

      {/* Input + Button */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Tokens'}
        </button>
      </div>

      {/* Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Token List */}
      {tokens.length === 0 && !loading && (
        <p style={{ color: '#888' }}>No tokens found.</p>
      )}
      {tokens.map((token) => (
        <div key={token.tokenAccount} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '10px'
        }}>
          <p><strong>Mint:</strong> {token.mint}</p>
          <p><strong>Balance:</strong> {token.uiAmount}</p>
          <p><strong>Decimals:</strong> {token.decimals}</p>
          <p><strong>Token Account:</strong> {token.tokenAccount}</p>
        </div>
      ))}
    </div>
  )
}

export default App
