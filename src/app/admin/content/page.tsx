'use client'

import { useState } from 'react'
import { videoIdeas, creators } from '@/data/mock'

type ContentStatus = 'planned' | 'production' | 'published'

type ContentIdea = {
  id: string
  title: string
  description: string
  platform: string
  creatorId: string
  status: ContentStatus
  views: number
  engagement: number
  createdAt: string
}

const richIdeas: ContentIdea[] = videoIdeas.slice(0, 6).map((v, i) => ({
  id: v.id,
  title: v.hook,
  description: `${v.format} — ${v.cta}`,
  platform:
    v.format === 'Honest Review' || v.format === 'Behind the Scenes'
      ? 'TikTok'
      : v.format === 'Comparison' || v.format === 'Myth Busting'
        ? 'Instagram'
        : 'YouTube',
  creatorId: creators[i % creators.length].id,
  status: (i < 2 ? 'planned' : i < 4 ? 'production' : 'published') as ContentStatus,
  views: [12400, 8700, 45200, 23100, 98000, 15600][i],
  engagement: [4.2, 3.8, 5.1, 2.9, 6.3, 4.7][i],
  createdAt: `2026-0${6 - Math.floor(i / 2)}-${10 + i * 5}`,
}))

const creatorMap = new Map(creators.map((c) => [c.id, c.name]))

const statusLabel: Record<ContentStatus, string> = {
  planned: 'Planned',
  production: 'In Production',
  published: 'Published',
}

const statusBadge: Record<ContentStatus, string> = {
  planned: 'bg-blue-400/20 text-blue-400',
  production: 'bg-yellow-400/20 text-yellow-400',
  published: 'bg-green-400/20 text-green-400',
}

const platformEmoji: Record<string, string> = {
  TikTok: '📱',
  Instagram: '📸',
  YouTube: '🎬',
}

const fmt = (n: number) => n.toLocaleString('en-US')

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
    <p className="text-xs tracking-widest text-bone/40 font-mono uppercase">{label}</p>
    <p className="mt-1 text-2xl font-bold tracking-widest text-bone font-mono">{value}</p>
  </div>
)

const KanbanCard = ({ idea }: { idea: ContentIdea }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.08]">
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-mono tracking-widest text-bone/60">
        {platformEmoji[idea.platform] ?? '🌐'} {idea.platform}
      </span>
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase ${statusBadge[idea.status]}`}>
        {statusLabel[idea.status]}
      </span>
    </div>
    <p className="mt-2 text-sm font-semibold tracking-wider text-bone font-mono leading-snug">
      {idea.title.length > 50 ? idea.title.slice(0, 50) + '…' : idea.title}
    </p>
    <p className="mt-1 text-[11px] tracking-widest text-bone/40 font-mono">
      {creatorMap.get(idea.creatorId) ?? 'Unknown'}
    </p>
    <div className="mt-3 flex items-center gap-4 text-[10px] tracking-wider text-bone/50 font-mono">
      <span>👁 {fmt(idea.views)}</span>
      <span>📊 {idea.engagement}%</span>
    </div>
  </div>
)

export default function ContentPipelinePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const totalIdeas = richIdeas.length
  const inProduction = richIdeas.filter((i) => i.status === 'production').length
  const published = richIdeas.filter((i) => i.status === 'published').length
  const avgViews = Math.round(
    richIdeas.reduce((s, i) => s + i.views, 0) / richIdeas.length
  )

  const plannedIdeas = richIdeas.filter((i) => i.status === 'planned')
  const productionIdeas = richIdeas.filter((i) => i.status === 'production')
  const publishedIdeas = richIdeas.filter((i) => i.status === 'published')

  const displayIdeas = showAll ? richIdeas : richIdeas.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-widest text-bone font-mono">
          Content Pipeline
        </h1>
        <p className="mt-1 text-sm tracking-widest text-bone/50 font-mono">
          Manage video ideas, production workflow, and content calendar
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-4 gap-4">
        <StatCard label="Total Ideas" value={fmt(totalIdeas)} />
        <StatCard label="In Production" value={fmt(inProduction)} />
        <StatCard label="Published" value={fmt(published)} />
        <StatCard label="Avg Views" value={`${fmt(avgViews)}`} />
      </div>

      {/* Kanban Board */}
      <div className="mb-10 grid grid-cols-3 gap-5">
        {/* Planned */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <h2 className="mb-4 text-xs font-bold tracking-[0.25em] text-blue-400 font-mono uppercase">
            Planned · {plannedIdeas.length}
          </h2>
          <div className="flex flex-col gap-3">
            {plannedIdeas.map((idea) => (
              <KanbanCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>

        {/* In Production */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <h2 className="mb-4 text-xs font-bold tracking-[0.25em] text-yellow-400 font-mono uppercase">
            In Production · {productionIdeas.length}
          </h2>
          <div className="flex flex-col gap-3">
            {productionIdeas.map((idea) => (
              <KanbanCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>

        {/* Published */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <h2 className="mb-4 text-xs font-bold tracking-[0.25em] text-green-400 font-mono uppercase">
            Published · {publishedIdeas.length}
          </h2>
          <div className="flex flex-col gap-3">
            {publishedIdeas.map((idea) => (
              <KanbanCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </div>

      {/* Video Ideas Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-[0.2em] text-bone font-mono uppercase">
            Video Ideas
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-[10px] font-mono tracking-widest text-bone/60 transition-colors hover:border-white/20 hover:text-bone"
          >
            {showAll ? 'Show Less' : `Show All (${richIdeas.length})`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono tracking-wider">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-bone/40">
                <th className="pb-3 pr-4 font-semibold">Title</th>
                <th className="pb-3 pr-4 font-semibold">Platform</th>
                <th className="pb-3 pr-4 font-semibold">Status</th>
                <th className="pb-3 pr-4 font-semibold">Views</th>
                <th className="pb-3 pr-4 font-semibold">Engagement</th>
                <th className="pb-3 pr-4 font-semibold">Creator</th>
                <th className="pb-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {displayIdeas.map((idea) => {
                const isExpanded = expandedId === idea.id
                return (
                  <tr
                    key={idea.id}
                    className="group cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                  >
                    <td className="py-3 pr-4 text-bone font-medium">
                      {idea.title.length > 40 ? idea.title.slice(0, 40) + '…' : idea.title}
                    </td>
                    <td className="py-3 pr-4 text-bone/70">
                      {platformEmoji[idea.platform] ?? '🌐'} {idea.platform}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusBadge[idea.status]}`}>
                        {statusLabel[idea.status]}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-bone/70">{fmt(idea.views)}</td>
                    <td className="py-3 pr-4 text-bone/70">{idea.engagement}%</td>
                    <td className="py-3 pr-4 text-bone/70">
                      {creatorMap.get(idea.creatorId) ?? 'Unknown'}
                    </td>
                    <td className="py-3 text-bone/30 transition-colors group-hover:text-bone/60">
                      {isExpanded ? '▲' : '▼'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Expanded detail row */}
        {expandedId && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
            {(() => {
              const idea = richIdeas.find((i) => i.id === expandedId)
              if (!idea) return null
              return (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Title</p>
                    <p className="text-sm font-medium text-bone font-mono tracking-wider">{idea.title}</p>
                    <p className="mt-3 text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Description</p>
                    <p className="text-sm text-bone/70 font-mono tracking-wider">{idea.description}</p>
                    <p className="mt-3 text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Created</p>
                    <p className="text-sm text-bone/70 font-mono tracking-wider">{idea.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Platform</p>
                    <p className="text-sm text-bone font-mono tracking-wider">
                      {platformEmoji[idea.platform] ?? '🌐'} {idea.platform}
                    </p>
                    <p className="mt-3 text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Creator</p>
                    <p className="text-sm text-bone font-mono tracking-wider">
                      {creatorMap.get(idea.creatorId) ?? 'Unknown'}
                    </p>
                    <p className="mt-3 text-[10px] tracking-[0.2em] text-bone/40 font-mono uppercase mb-1">Performance</p>
                    <p className="text-sm text-bone font-mono tracking-wider">
                      {fmt(idea.views)} views · {idea.engagement}% engagement
                    </p>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
