'use client'

import { useMemo, useState } from 'react'
import {
  impressions,
  views,
  clicks,
  attributionRecords,
  profitMetrics,
  analyticsInsights,
} from '@/data/enterprise'

type DateRange = '7D' | '30D' | '90D' | '1Y' | 'Custom'

const dateRanges: DateRange[] = ['7D', '30D', '90D', '1Y', 'Custom']

const entityTypeColors: Record<string, string> = {
  campaign: 'bg-sky-500/20 text-sky-400',
  account: 'bg-emerald-500/20 text-emerald-400',
  niche: 'bg-violet-500/20 text-violet-400',
  platform: 'bg-gold/20 text-gold',
  product: 'bg-rose-500/20 text-rose-400',
  agent: 'bg-cyan-500/20 text-cyan-400',
  provider: 'bg-amber-500/20 text-amber-400',
}

const insightIcons: Record<string, string> = {
  winner: '\u{1F3C6}',
  loser: '\u{1F44E}',
  cost_spike: '\u{1F4CA}',
  viral: '\u{1F525}',
  low_ctr: '\u26A0\uFE0F',
  high_api_cost: '\u{1F4B5}',
}

const severityColors: Record<string, string> = {
  info: 'text-blue-400',
  warning: 'text-amber-400',
  critical: 'text-red-400',
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function roasColor(roas: number): string {
  if (roas > 3) return 'text-emerald-400'
  if (roas > 1.5) return 'text-amber-400'
  return 'text-red-400'
}

function entityTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export default function AnalyticsCenterPage() {
  const [activeRange, setActiveRange] = useState<DateRange>('30D')
  const [entityFilter, setEntityFilter] = useState<string>('all')
  const [portalFilter, setPortalFilter] = useState<string>('All')
  const [accountFilter, setAccountFilter] = useState<string>('All')
  const [nicheFilter, setNicheFilter] = useState<string>('All')
  const [campaignFilter, setCampaignFilter] = useState<string>('All')
  const [networkFilter, setNetworkFilter] = useState<string>('All')
  const [productFilter, setProductFilter] = useState<string>('All')

  const totalViews = useMemo(
    () => views.reduce((sum, v) => sum + v.count, 0),
    [],
  )

  const totalClicks = useMemo(
    () => clicks.reduce((sum, c) => sum + c.count, 0),
    [],
  )

  const totalRevenue = useMemo(
    () => profitMetrics.reduce((sum, p) => sum + p.revenue, 0),
    [],
  )

  const avgRoas = useMemo(() => {
    if (profitMetrics.length === 0) return 0
    const total = profitMetrics.reduce((s, p) => s + p.roas, 0)
    return total / profitMetrics.length
  }, [])

  const topPlatform = useMemo(() => {
    const platformMap: Record<string, number> = {}
    profitMetrics.forEach((p) => {
      if (p.entityType === 'platform') {
        platformMap[p.entityId] = (platformMap[p.entityId] || 0) + p.revenue
      }
    })
    let best = ''
    let bestRev = 0
    for (const [plat, rev] of Object.entries(platformMap)) {
      if (rev > bestRev) {
        bestRev = rev
        best = plat
      }
    }
    return best || '—'
  }, [])

  const activeCampaigns = useMemo(
    () => profitMetrics.filter((p) => p.entityType === 'campaign').length,
    [],
  )

  const entityTypes = useMemo(() => {
    const types = new Set(profitMetrics.map((p) => p.entityType))
    return ['all', ...Array.from(types)]
  }, [])

  const filteredProfitMetrics = useMemo(
    () =>
      entityFilter === 'all'
        ? profitMetrics
        : profitMetrics.filter((p) => p.entityType === entityFilter),
    [entityFilter],
  )

  const totalImpressions = useMemo(
    () => impressions.reduce((sum, i) => sum + i.count, 0),
    [],
  )

  const ctr = useMemo(() => {
    if (totalImpressions === 0) return 0
    return (totalClicks / totalImpressions) * 100
  }, [totalImpressions, totalClicks])

  const epc = useMemo(() => {
    if (totalClicks === 0) return 0
    return totalRevenue / totalClicks
  }, [totalClicks, totalRevenue])

  const cpa = useMemo(() => {
    const totalCost = profitMetrics.reduce((sum, p) => sum + p.cost, 0)
    const conversions = clicks.length
    if (conversions === 0) return 0
    return totalCost / conversions
  }, [])

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">ANALYTICS CENTER</h1>
          <p className="mt-1 text-sm text-bone/40">
            Cross-platform performance metrics and attribution
          </p>
        </div>

        {/* ── Filter Row ── */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={activeRange}
            onChange={(e) => setActiveRange(e.target.value as DateRange)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {dateRanges.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            value={portalFilter}
            onChange={(e) => setPortalFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'TikTok', 'Instagram', 'YouTube', 'Facebook', 'Reddit', 'Pinterest', 'LinkedIn', 'X'].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'Individual accounts'].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'Fitness', 'Finance', 'Beauty', 'Gaming', 'Health', 'Fashion'].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'Campaign names'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'Digistore24', 'Awin', 'Tradedoubler', 'Other'].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="rounded-lg bg-smoke px-3 py-2 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
          >
            {['All', 'Product names'].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* ── Time Filter ── */}
        <div className="flex items-center gap-2">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all duration-150 ${
                activeRange === range
                  ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                  : 'bg-smoke text-bone/40 hover:bg-ash hover:text-bone/70'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Total Views" value={formatCompact(totalViews)} accent="text-sky-400" />
          <KpiCard label="Total Clicks" value={formatCompact(totalClicks)} accent="text-emerald-400" />
          <KpiCard label="Total Revenue" value={formatCurrency(totalRevenue)} accent="text-gold" />
          <KpiCard label="Avg ROAS" value={avgRoas.toFixed(2) + 'x'} accent="text-amber-400" />
          <KpiCard label="Top Platform" value={topPlatform} accent="text-gold" />
          <KpiCard label="Active Campaigns" value={String(activeCampaigns)} accent="text-rose-400" />
          <KpiCard label="CTR" value={ctr.toFixed(2) + '%'} accent="text-cyan-400" />
          <KpiCard label="EPC" value={formatCurrency(epc)} accent="text-violet-400" />
          <KpiCard label="CPA" value={formatCurrency(cpa)} accent="text-orange-400" />
        </div>

        {/* ── Attribution Table ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">ATTRIBUTION TABLE</h2>
          <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Click ID</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Touchpoints</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Model</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Attributed Revenue</th>
                </tr>
              </thead>
              <tbody>
                {attributionRecords.map((rec) => (
                  <tr key={rec.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-bone">{rec.clickId}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {rec.touchpoints.map((tp, i) => (
                          <span
                            key={i}
                            className="rounded bg-ash px-2 py-0.5 text-[10px] text-bone/70"
                          >
                            {tp.source}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-bone/80">{rec.model}</td>
                    <td className="px-4 py-3 font-medium text-gold">
                      {formatCurrency(rec.attributedRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Profit Metrics by Entity ── */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-bone">PROFIT METRICS BY ENTITY</h2>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="rounded-lg bg-smoke px-3 py-1.5 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
            >
              {entityTypes.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Entities' : entityTypeLabel(t)}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Entity Type</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Entity ID</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Revenue</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Cost</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Profit</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfitMetrics.map((pm) => (
                  <tr key={pm.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                          entityTypeColors[pm.entityType] || 'bg-ash text-bone/60'
                        }`}
                      >
                        {entityTypeLabel(pm.entityType)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-bone">{pm.entityId}</td>
                    <td className="px-4 py-3 text-bone/80">{formatCurrency(pm.revenue)}</td>
                    <td className="px-4 py-3 text-bone/80">{formatCurrency(pm.cost)}</td>
                    <td className="px-4 py-3 font-medium text-bone">{formatCurrency(pm.profit)}</td>
                    <td className={`px-4 py-3 font-bold ${roasColor(pm.roas)}`}>{pm.roas.toFixed(2)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Agent Insights Feed ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">AGENT INSIGHTS</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {analyticsInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-4 rounded-xl border border-ash bg-coal p-5"
              >
                <span className="text-xl">{insightIcons[insight.type] || '\u{1F4CA}'}</span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <p className="text-xs leading-relaxed text-bone/90">{insight.message}</p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-medium uppercase tracking-[0.15em] ${
                        severityColors[insight.severity] || 'text-bone/40'
                      }`}
                    >
                      {insight.severity}
                    </span>
                    <span className="text-[10px] text-bone/30">
                      {new Date(insight.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

function KpiCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-ash bg-coal p-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-bone/30">
        {label}
      </span>
      <span className={`text-2xl font-bold ${accent}`}>{value}</span>
    </div>
  )
}
