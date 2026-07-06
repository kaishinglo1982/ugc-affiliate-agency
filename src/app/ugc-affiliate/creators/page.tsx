'use client'

import { useState } from 'react'
import { creators } from '@/data/mock'

const platforms = ['All', 'tiktok', 'instagram', 'youtube'] as const
type Platform = (typeof platforms)[number]

const platformIcons: Record<string, string> = {
  tiktok: '♪',
  instagram: '◻',
  youtube: '▶',
}

const platformLabels: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
}

export default function CreatorsPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>('All')

  const filtered =
    activePlatform === 'All'
      ? creators
      : creators.filter((c) => c.channel === activePlatform)

  return (
    <div className="min-h-screen bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-black font-mono uppercase tracking-widest text-5xl text-bone">
            Our Creator Network
          </h1>
          <p className="mt-4 text-lg text-bone/60">
            Hand-picked UGC creators ready to transform your brand&apos;s content
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-16 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-mono uppercase tracking-widest text-bone/70">
          <span>50+ Active Creators</span>
          <span className="mx-2 text-bone/30">·</span>
          <span className="text-gold">4.2% Avg Engagement</span>
          <span className="mx-2 text-bone/30">·</span>
          <span>3 Platforms</span>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex justify-center gap-3">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`btn font-mono text-xs uppercase tracking-widest ${
                activePlatform === p ? 'btn-gold' : 'btn-dark'
              }`}
            >
              {p === 'All' ? p : `${platformIcons[p]} ${platformLabels[p]}`}
            </button>
          ))}
        </div>

        {/* Creator Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-12">
            <h2 className="font-black font-mono uppercase tracking-widest text-2xl text-bone">
              Want to join our network?
            </h2>
            <p className="mt-3 text-bone/60">
              Apply as a Creator and start collaborating with top brands.
            </p>
            <button className="btn-gold btn mt-6 font-mono text-xs uppercase tracking-widest">
              Apply as a Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreatorCard({
  creator,
}: {
  creator: {
    id: string; name: string; channel: string; niche: string
    rate: number; followerCount: number; status: string
    avgEngagement: number; topPerformingHook: string
  }
}) {
  const statusColors: Record<string, string> = {
    active: 'text-gold',
    onboarding: 'text-amber-400',
    available: 'text-bone',
  }

  return (
    <div className="card group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-mono font-black uppercase tracking-widest text-bone">
            {creator.name}
          </h3>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-mono text-bone/60">
            {creator.niche}
          </span>
        </div>
        <span
          className={`font-mono text-xs font-black uppercase tracking-widest ${statusColors[creator.status] || 'text-bone/40'}`}
        >
          {creator.status}
        </span>
      </div>

      {/* Channel Badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-bone/70">
          {platformIcons[creator.channel] || '⊞'} {platformLabels[creator.channel] || creator.channel}
        </span>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
            Rate
          </p>
          <p className="font-mono font-black text-bone">${creator.rate}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
            Followers
          </p>
          <p className="font-mono font-black text-bone">{creator.followerCount.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
            Engagement
          </p>
          <p className="font-mono font-black text-gold">{creator.avgEngagement}%</p>
        </div>
      </div>

      {/* Top Hook */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
        <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
          Top Hook
        </p>
        <p className="mt-0.5 text-sm italic text-bone/80">
          &ldquo;{creator.topPerformingHook}&rdquo;
        </p>
      </div>
    </div>
  )
}
