'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An error occurred'
}

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        const result = await authClient.signUp.email({
          email,
          password,
          name: name || email,
        })
        if (result.error) throw new Error(result.error.message)
        router.push('/onboarding/organization')
      } else {
        const result = await authClient.signIn.email({ email, password })
        if (result.error) throw new Error(result.error.message)
        router.push(searchParams.get('callbackUrl') || '/ugc-agency')
      }
      router.refresh()
    } catch (caughtError: unknown) {
      setError(getErrorMessage(caughtError))
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
            onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={10}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone placeholder-bone/40 focus:border-accent focus:outline-none"
          placeholder="••••••••••"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn w-full disabled:opacity-50">
        {loading ? 'Loading...' : mode === 'sign-in' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  )
}
