'use client'

import { nicheStrategies, managedAccounts } from '@/data/portal'

const nicheEmojis: Record<string, string> = {
  fitness: '💪',
  gaming: '🎮',
  beauty: '💄',
  finance: '💰',
  fashion: '👗',
  health: '🌿',
}

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-600/20 text-blue-400',
  instagram: 'bg-pink-600/20 text-pink-400',
  tiktok: 'bg-white/10 text-white',
  youtube: 'bg-red-600/20 text-red-400',
  reddit: 'bg-orange-600/20 text-orange-400',
  pinterest: 'bg-red-700/20 text-red-300',
  x: 'bg-white/10 text-white',
  linkedin: 'bg-blue-500/20 text-blue-300',
}

export default function NischenCenterPage() {
  const accountsByNiche = managedAccounts.reduce<Record<string, typeof managedAccounts>>((acc, acct) => {
    if (!acc[acct.niche]) acc[acct.niche] = []
    acc[acct.niche].push(acct)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase">Nischen Center</h1>
          <p className="mt-2 text-bone/60">Manage niche strategies and account distribution</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {nicheStrategies.map((niche) => {
            const accounts = accountsByNiche[niche.niche] ?? []
            const activeAccounts = accounts.filter((a) => a.status === 'active').length
            const totalRevenue = accounts.reduce((sum, a) => sum + a.revenue, 0)

            return (
              <div
                key={niche.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-white/20"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{nicheEmojis[niche.niche] ?? '📁'}</span>
                  <h2 className="text-xl font-black uppercase">{niche.name}</h2>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-bone/70">{niche.description}</p>

                <div className="mb-4 space-y-2">
                  <div>
                    <p className="text-xs font-bold uppercase text-bone/50">Target Audience</p>
                    <p className="text-sm text-bone/80">{niche.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-bone/50">Content Style</p>
                    <p className="text-sm text-bone/80">{niche.contentStyle}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-bone/50">Posting Frequency</p>
                    <p className="text-sm text-bone/80">{niche.postingFrequency}</p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase text-bone/50">Active Accounts</p>
                    <p className="mt-1 text-2xl font-bold text-gold">{activeAccounts}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-bone/50">Total Revenue</p>
                    <p className="mt-1 text-2xl font-bold text-gold">${totalRevenue.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase text-bone/50">Top Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {niche.topPlatforms.map((platform) => (
                      <span
                        key={platform}
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${platformColors[platform] ?? 'bg-white/10 text-white'}`}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12">
          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-gold/20 px-6 py-3 font-bold uppercase text-gold/50 transition-colors"
          >
            + Add Niche
          </button>
        </div>
      </div>
    </main>
  )
}
