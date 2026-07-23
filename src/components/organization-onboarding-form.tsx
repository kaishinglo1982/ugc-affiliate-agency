'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63)
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Organisation konnte nicht erstellt werden.'
}

export function OrganizationOnboardingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || '/ugc-agency'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const normalizedSlug = toSlug(slug || name)
      if (!normalizedSlug) throw new Error('Bitte einen gültigen Organisationsnamen eingeben.')

      const result = await authClient.organization.create({
        name: name.trim(),
        slug: normalizedSlug,
        keepCurrentActiveOrganization: false,
      })

      if (result.error) throw new Error(result.error.message)
      router.replace(callbackUrl)
      router.refresh()
    } catch (caughtError: unknown) {
      setError(errorMessage(caughtError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Mandant einrichten</p>
        <h1 className="mt-2 text-2xl font-bold text-bone">Deine Organisation</h1>
        <p className="mt-2 text-sm text-bone/60">Alle Kampagnen, Konten, Inhalte und Finanzdaten werden diesem Mandanten zugeordnet.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-bone/80">Organisationsname</label>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (!slug) setSlug(toSlug(event.target.value))
          }}
          required
          minLength={2}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone focus:border-accent focus:outline-none"
          placeholder="Meine UGC Agency"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-bone/80">Tenant-Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(event) => setSlug(toSlug(event.target.value))}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-bone focus:border-accent focus:outline-none"
          placeholder="meine-ugc-agency"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn w-full disabled:opacity-50">
        {loading ? 'Organisation wird erstellt…' : 'Organisation erstellen'}
      </button>
    </form>
  )
}
