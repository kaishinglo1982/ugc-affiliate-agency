'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        await authClient.signUp.email({
          email,
          password,
          name: name || email,
        })
      } else {
        await authClient.signIn.email({
          email,
          password,
        })
      }
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <h2 className="text-2xl font-bold text-bone">
        {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
      </h2>

      {mode === 'sign-up' && (
        <div>
          <label className="block text-sm font-medium text-bone/80">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone placeholder-bone/40 focus:border-accent focus:outline-none"
            placeholder="Your name"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-bone/80">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone placeholder-bone/40 focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-bone/80">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone placeholder-bone/40 focus:border-accent focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn w-full disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'sign-in' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  )
}
