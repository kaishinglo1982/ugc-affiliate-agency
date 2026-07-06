'use client'

import { useEffect, useState } from 'react'
import { socialAccounts } from '@/lib/social-accounts'

type SocialAccount = typeof socialAccounts[0]

export function SocialAccountsDashboard() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAccounts(socialAccounts)
    setLoading(false)
  }, [])

  if (loading) return <div className="p-8">Loading social accounts...</div>

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase">Social Media Accounts</h1>
          <p className="mt-2 text-bone/60">Manage Who Knows agent-controlled social media accounts</p>
        </div>

        <div className="grid gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold uppercase">{account.username}</h2>
                    <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
                      {account.platform}
                    </span>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        account.status === 'active'
                          ? 'bg-green-900/20 text-green-400'
                          : account.status === 'pending'
                            ? 'bg-yellow-900/20 text-yellow-400'
                            : 'bg-red-900/20 text-red-400'
                      }`}
                    >
                      {account.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-bone/70">{account.bioDescription}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs uppercase text-bone/50">Followers</p>
                  <p className="mt-1 text-2xl font-bold text-gold">
                    {(account.followers / 1000).toFixed(0)}K
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-bone/50">Managed By</p>
                  <p className="mt-1 text-sm font-semibold text-bone">{account.agentName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-bone/50">Created</p>
                  <p className="mt-1 text-sm font-semibold text-bone">
                    {new Date(account.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-bone/50">Last Post</p>
                  <p className="mt-1 text-sm font-semibold text-bone">
                    {account.lastPostAt
                      ? new Date(account.lastPostAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Never'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-lg bg-gold/20 px-4 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/30 transition-colors">
                  Edit Account
                </button>
                <button className="rounded-lg bg-blue-900/20 px-4 py-2 text-xs font-bold uppercase text-blue-400 hover:bg-blue-900/30 transition-colors">
                  View Analytics
                </button>
                <button className="rounded-lg bg-red-900/20 px-4 py-2 text-xs font-bold uppercase text-red-400 hover:bg-red-900/30 transition-colors">
                  Suspend
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="rounded-lg bg-gold px-6 py-3 font-bold uppercase text-background hover:bg-gold/90 transition-colors">
            + Create New Account
          </button>
        </div>
      </div>
    </main>
  )
}
