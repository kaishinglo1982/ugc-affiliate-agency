'use client'

import { useState } from 'react'
import {
  hooks,
  scripts,
  captions,
  adCopies,
  ctaSuggestions,
  complianceResults,
  affiliateProducts,
} from '@/data/enterprise'
import type {
  Hook,
  Script,
  Caption,
  AdCopy,
  CTASuggestion,
  ComplianceResult,
} from '@/data/enterprise'

type Tab = 'hooks' | 'scripts' | 'captions' | 'adcopies' | 'ctas' | 'variants' | 'compliance'

const tabs: { key: Tab; label: string }[] = [
  { key: 'hooks', label: 'Hooks' },
  { key: 'scripts', label: 'Scripts' },
  { key: 'captions', label: 'Captions' },
  { key: 'adcopies', label: 'Ad Copies' },
  { key: 'ctas', label: 'CTAs' },
  { key: 'variants', label: 'Variantenvergleich' },
  { key: 'compliance', label: 'Compliance' },
]

const hookStyleColors: Record<Hook['style'], string> = {
  question: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  stat: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  story: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  shock: 'border-red-500/40 text-red-300 bg-red-500/10',
  benefit: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  howto: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
  myth: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  comparison: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
}

const toneColors: Record<Script['tone'], string> = {
  casual: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  professional: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  funny: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  educational: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  inspirational: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
  urgent: 'border-red-500/40 text-red-300 bg-red-500/10',
}

const ctaStyleColors: Record<CTASuggestion['style'], string> = {
  direct: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  urgent: 'border-red-500/40 text-red-300 bg-red-500/10',
  soft: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  value: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  social: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  curiosity: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
}

const statusColors: Record<string, string> = {
  draft: 'border-white/20 text-bone/60 bg-white/5',
  review: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  approved: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  rejected: 'border-red-500/40 text-red-300 bg-red-500/10',
  used: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
}

const niches = ['fitness', 'finance', 'beauty', 'gaming', 'health', 'fashion']
const platforms = ['tiktok', 'instagram', 'youtube', 'facebook', 'pinterest', 'linkedin', 'x', 'reddit']

const tones: Script['tone'][] = ['casual', 'professional', 'funny', 'educational', 'inspirational', 'urgent']

interface GeneratedResult {
  hook: { text: string; score: number }
  script: { body: string; duration: number; tone: Script['tone'] }
  caption: { text: string; hashtags: string[] }
}

function statusBadge(status: string) {
  const c = statusColors[status] ?? statusColors.draft
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest ${c}`}>
      {status}
    </span>
  )
}

function scoreBar(score: number) {
  const pct = Math.min(score, 100)
  const color =
    pct >= 85 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-bone/70">{score}</span>
    </div>
  )
}

function scoreBadge(score: number) {
  const pct = Math.min(score, 100)
  const color =
    pct >= 85
      ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
      : pct >= 70
        ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
        : 'border-red-500/40 text-red-300 bg-red-500/10'
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${color}`}>
      {score}
    </span>
  )
}

function HooksTab({
  data,
  approvals,
  onApprove,
  onReject,
}: {
  data: Hook[]
  approvals: Record<string, 'approved' | 'rejected'>
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const effectiveStatus = (original: string, id: string) =>
    original === 'review' && approvals[id] ? approvals[id] : original

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-[0.65rem] uppercase tracking-widest text-gold">
            <th className="py-3 pr-4">Text</th>
            <th className="px-4 py-3">Style</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Niche</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Status</th>
            <th className="pl-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h) => {
            const st = effectiveStatus(h.status, h.id)
            return (
              <tr key={h.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="py-3 pr-4 text-bone">{h.text}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${hookStyleColors[h.style]}`}>
                    {h.style}
                  </span>
                </td>
                <td className="px-4 py-3 text-bone/60">{h.platform}</td>
                <td className="px-4 py-3 text-bone/60">{h.niche}</td>
                <td className="px-4 py-3">{scoreBar(h.score)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {statusBadge(st)}
                    {h.status === 'review' && !approvals[h.id] && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => onApprove(h.id)}
                          className="rounded-full border border-emerald-500/40 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500/10"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(h.id)}
                          className="rounded-full border border-red-500/40 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="pl-4 py-3 font-mono text-xs text-bone/40">{h.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ScriptsTab({
  data,
  approvals,
  onApprove,
  onReject,
}: {
  data: Script[]
  approvals: Record<string, 'approved' | 'rejected'>
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const effectiveStatus = (original: string, id: string) =>
    original === 'review' && approvals[id] ? approvals[id] : original

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-[0.65rem] uppercase tracking-widest text-gold">
            <th className="py-3 pr-4">Title</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Niche</th>
            <th className="px-4 py-3">Tone</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Status</th>
            <th className="pl-4 py-3">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => {
            const st = effectiveStatus(s.status, s.id)
            return (
              <tr key={s.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="py-3 pr-4 text-bone">{s.title}</td>
                <td className="px-4 py-3 text-bone/60">{s.platform}</td>
                <td className="px-4 py-3 text-bone/60">{s.niche}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${toneColors[s.tone]}`}>
                    {s.tone}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-bone/60">{s.duration}s</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {statusBadge(st)}
                    {s.status === 'review' && !approvals[s.id] && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => onApprove(s.id)}
                          className="rounded-full border border-emerald-500/40 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500/10"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(s.id)}
                          className="rounded-full border border-red-500/40 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="pl-4 py-3">{scoreBar(s.score)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CaptionsTab({ data }: { data: Caption[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-[0.65rem] uppercase tracking-widest text-gold">
            <th className="py-3 pr-4">Text</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Hashtags</th>
            <th className="px-4 py-3">Status</th>
            <th className="pl-4 py-3">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
              <td className="max-w-xs truncate py-3 pr-4 text-bone" title={c.text}>
                {c.text}
              </td>
              <td className="px-4 py-3 text-bone/60">{c.platform}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {c.hashtags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[0.6rem] text-bone/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">{statusBadge(c.status)}</td>
              <td className="pl-4 py-3">{scoreBar(c.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AdCopiesTab({ data }: { data: AdCopy[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((ad) => (
        <div key={ad.id} className="card flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-bone">{ad.headline}</h3>
            {statusBadge(ad.status)}
          </div>
          <p className="text-sm text-bone/60">{ad.body}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-bone/50">
              CTA: {ad.cta}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-bone/50">
              {ad.platform}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-bone/50">
              {ad.format}
            </span>
          </div>
          <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-3 font-mono text-xs text-bone/50">
            <span>{ad.performance.impressions.toLocaleString()} impressions</span>
            <span>{ad.performance.clicks.toLocaleString()} clicks</span>
            <span>{ad.performance.ctr}% CTR</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CTAsTab({ data }: { data: CTASuggestion[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((cta) => (
        <div key={cta.id} className="card flex flex-col gap-3">
          <p className="text-sm text-bone">&ldquo;{cta.text}&rdquo;</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${ctaStyleColors[cta.style]}`}>
              {cta.style}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.6rem] text-bone/50">
              {cta.platform}
            </span>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3">
            <span className="font-mono text-xs text-bone/50">Effectiveness</span>
            {scoreBar(cta.effectiveness)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ComplianceTab({ data }: { data: ComplianceResult[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((cr, i) => (
        <div key={i} className="card flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {cr.passed ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            )}
            <span className="font-semibold text-bone">
              {cr.passed ? 'All checks passed' : 'Checks failed'}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {cr.checks.map((check, j) => (
              <li key={j} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
                {check.passed ? (
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : check.severity === 'warning' ? (
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </span>
                ) : (
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-bone">{check.name}</span>
                    <span className={`font-mono text-[0.55rem] uppercase tracking-widest ${
                      check.passed ? 'text-emerald-400' : check.severity === 'warning' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {check.passed ? 'PASS' : check.severity === 'warning' ? 'WARN' : 'FAIL'}
                    </span>
                  </div>
                  {check.message && (
                    <p className="mt-0.5 text-[0.7rem] text-bone/40">{check.message}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function VariantsTab({ data }: { data: { hooks: Hook[]; scripts: Script[] } }) {
  const [selected, setSelected] = useState<string[]>([])

  const items: { id: string; text: string; platform: string; niche: string; score: number; status: string; type: string }[] = [
    ...data.hooks.map((h) => ({ id: h.id, text: h.text, platform: h.platform, niche: h.niche, score: h.score, status: h.status, type: 'Hook' })),
    ...data.scripts.map((s) => ({ id: s.id, text: s.title, platform: s.platform, niche: s.niche, score: s.score, status: s.status, type: 'Script' })),
  ]

  const toggleItem = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  const selectedItems = items.filter((i) => selected.includes(i.id))

  return (
    <div>
      <h2 className="text-xl font-bold text-bone">Variantenvergleich</h2>
      <p className="mt-1 text-sm text-bone/50">Select items to compare</p>

      <div className="mt-6 grid gap-2">
        {items.map((item) => {
          const checked = selected.includes(item.id)
          return (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                checked ? 'border-gold/50 bg-white/[0.05]' : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleItem(item.id)}
                className="h-4 w-4 accent-gold"
              />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm text-bone">{item.text}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-bone/50">
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono">{item.type}</span>
                  <span>{item.platform}</span>
                  <span>{item.niche}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {scoreBar(item.score)}
                {statusBadge(item.status)}
              </div>
            </label>
          )
        })}
      </div>

      {selectedItems.length >= 2 && (
        <div className={`mt-8 grid gap-4 ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {selectedItems.map((item) => {
            const pct = Math.min(item.score, 100)
            const barColor =
              pct >= 85 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'
            return (
              <div key={item.id} className="card flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gold">{item.type}</span>
                  {statusBadge(item.status)}
                </div>
                <p className="text-sm text-bone">{item.text}</p>
                <div className="flex flex-wrap gap-2 text-xs text-bone/50">
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono">{item.platform}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono">{item.niche}</span>
                </div>
                <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3">
                  <span className="font-mono text-xs text-bone/50">Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-mono text-xs text-bone/70">{item.score}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ScriptStudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>('hooks')
  const [selectedNiche, setSelectedNiche] = useState('fitness')
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok')
  const [selectedProduct, setSelectedProduct] = useState(affiliateProducts[0]?.id ?? '')
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null)
  const [approvals, setApprovals] = useState<Record<string, 'approved' | 'rejected'>>({})

  const handleApprove = (id: string) => {
    setApprovals((prev) => ({ ...prev, [id]: 'approved' }))
  }

  const handleReject = (id: string) => {
    setApprovals((prev) => ({ ...prev, [id]: 'rejected' }))
  }

  const generateContent = () => {
    const product = affiliateProducts.find((p) => p.id === selectedProduct)
    const pName = product?.name ?? 'this product'

    const hooksByNiche: Record<string, string[]> = {
      fitness: [`I tried ${pName} for 30 days — here's what happened`, `${pName} transformed my body in just 2 weeks`],
      finance: [`How ${pName} helped me make my first $10k`, `Stop ignoring ${pName} until you see this`],
      beauty: [`I used ${pName} for a week — the results shocked me`, `${pName} is the secret to my glow-up`],
      gaming: [`${pName} changed how I game forever`, `You're gaming wrong without ${pName}`],
      health: [`${pName} fixed my health in 30 days`, `Doctors don't want you to know about ${pName}`],
      fashion: [`${pName} upgraded my entire wardrobe`, `Why everyone is switching to ${pName}`],
    }

    const key = selectedNiche.toLowerCase()
    const options = hooksByNiche[key] ?? hooksByNiche.fitness
    const hookText = options[Math.floor(Math.random() * options.length)]
    const tone = tones[Math.floor(Math.random() * tones.length)]
    const duration = Math.floor(Math.random() * 90) + 30

    setGeneratedResult({
      hook: {
        text: hookText,
        score: Math.floor(Math.random() * 30) + 70,
      },
      script: {
        body: `In this video, I'm going to show you why ${pName} is the best product in the ${selectedNiche} space right now. After testing it for several weeks, I can confidently say it delivers on its promises. Here are my top 3 reasons why you need this.`,
        duration,
        tone,
      },
      caption: {
        text: `Try ${pName} today and see the difference! Link in bio for more details.`,
        hashtags: [`#${selectedNiche}`, `#${selectedPlatform}`, '#ugc', '#affiliatemarketing', '#review'],
      },
    })
  }

  const assetStats = [
    { key: 'hooks' as Tab, label: 'Hooks', count: hooks.length },
    { key: 'scripts' as Tab, label: 'Scripts', count: scripts.length },
    { key: 'captions' as Tab, label: 'Captions', count: captions.length },
    { key: 'adcopies' as Tab, label: 'Ad Copies', count: adCopies.length },
    { key: 'ctas' as Tab, label: 'CTAs', count: ctaSuggestions.length },
  ]

  const renderTab = () => {
    switch (activeTab) {
      case 'hooks':
        return <HooksTab data={hooks} approvals={approvals} onApprove={handleApprove} onReject={handleReject} />
      case 'scripts':
        return <ScriptsTab data={scripts} approvals={approvals} onApprove={handleApprove} onReject={handleReject} />
      case 'captions':
        return <CaptionsTab data={captions} />
      case 'adcopies':
        return <AdCopiesTab data={adCopies} />
      case 'ctas':
        return <CTAsTab data={ctaSuggestions} />
      case 'variants':
        return <VariantsTab data={{ hooks, scripts }} />
      case 'compliance':
        return <ComplianceTab data={complianceResults} />
    }
  }

  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="label mb-2">Phase 10</p>
            <h1 className="text-3xl font-black tracking-tight text-bone md:text-4xl">
              Script Studio
            </h1>
            <p className="mt-2 max-w-xl text-sm text-bone/50">
              Create and manage hooks, scripts, captions, and ad copies
            </p>
          </div>
          <button className="btn-gold text-xs">
            Generate
          </button>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-3">
          {assetStats.map((stat) => (
            <button
              key={stat.key}
              onClick={() => setActiveTab(stat.key)}
              className="card flex cursor-pointer flex-col items-center gap-1 py-4 transition-colors hover:border-gold/50"
            >
              <span className="text-2xl font-bold text-bone">{stat.count}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bone/50">{stat.label}</span>
            </button>
          ))}
        </div>

        <div className="card mb-8 p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.55rem] uppercase tracking-widest text-bone/50">Niche</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-bone outline-none transition-colors focus:border-gold/50"
              >
                {niches.map((n) => (
                  <option key={n} value={n} className="bg-ink text-bone">
                    {n.charAt(0).toUpperCase() + n.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.55rem] uppercase tracking-widest text-bone/50">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-bone outline-none transition-colors focus:border-gold/50"
              >
                {platforms.map((p) => (
                  <option key={p} value={p} className="bg-ink text-bone">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.55rem] uppercase tracking-widest text-bone/50">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-bone outline-none transition-colors focus:border-gold/50"
              >
                {affiliateProducts.map((p) => (
                  <option key={p.id} value={p.id} className="bg-ink text-bone">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={generateContent} className="btn-gold px-5 py-2 text-[0.65rem]">
              Generate Content Suite
            </button>
          </div>

          {generatedResult && (
            <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gold">Generated Hook</span>
                  {scoreBadge(generatedResult.hook.score)}
                </div>
                <p className="text-sm leading-relaxed text-bone">&ldquo;{generatedResult.hook.text}&rdquo;</p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gold">Generated Script</span>
                <p className="text-sm leading-relaxed text-bone/60">
                  {generatedResult.script.body.length > 100
                    ? `${generatedResult.script.body.slice(0, 100)}&hellip;`
                    : generatedResult.script.body}
                </p>
                <div className="mt-auto flex items-center gap-2">
                  <span className="font-mono text-xs text-bone/50">{generatedResult.script.duration}s</span>
                  <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest ${toneColors[generatedResult.script.tone]}`}>
                    {generatedResult.script.tone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gold">Generated Caption</span>
                <p className="text-sm leading-relaxed text-bone">{generatedResult.caption.text}</p>
                <div className="flex flex-wrap gap-1">
                  {generatedResult.caption.hashtags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[0.55rem] text-bone/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-1 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-bone/40 hover:text-bone/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fade-up">{renderTab()}</div>
      </div>
    </main>
  )
}
