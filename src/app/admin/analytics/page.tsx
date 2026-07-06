'use client'
import { useMemo, useState } from 'react'
import { conversionFunnel, abTests } from '@/data/mock'
import { managedAccounts, portalAgents } from '@/data/portal'
import type { ManagedAccount } from '@/data/portal'

type DateRange = '7D' | '30D' | '90D' | '1Y'

const dateRanges: DateRange[] = ['7D', '30D', '90D', '1Y']

const platforms: { id: string; label: string; icon: string; color: string }[] = [
  { id: 'tiktok', label: 'TikTok', icon: '🎵', color: '#000000' },
  { id: 'instagram', label: 'Instagram', icon: '📸', color: '#E4405F' },
  { id: 'youtube', label: 'YouTube', icon: '▶️', color: '#FF0000' },
  { id: 'facebook', label: 'Facebook', icon: '📘', color: '#1877F2' },
  { id: 'pinterest', label: 'Pinterest', icon: '📌', color: '#BD081C' },
  { id: 'reddit', label: 'Reddit', icon: '🤖', color: '#FF4500' },
  { id: 'x', label: 'X', icon: '🐦', color: '#000000' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: '#0A66C2' },
]

const kpis = [
  { label: 'Total Views', value: '2.4M', accent: 'text-sky-400' },
  { label: 'Total Engagement', value: '184K', accent: 'text-emerald-400' },
  { label: 'Conversion Rate', value: '2.8%', accent: 'text-gold' },
  { label: 'Avg Revenue', value: '$49.6K', accent: 'text-rose-400' },
  { label: 'Top Platform', value: 'Instagram', accent: 'text-gold' },
  { label: 'Growth Rate', value: '+15.3%', accent: 'text-emerald-400' },
]

function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

function formatCompactCurrency(n: number): string {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'K'
  return '$' + String(n)
}

function formatGrowth(n: number): string {
  const sign = n >= 0 ? '+' : ''
  return sign + n.toFixed(1) + '%'
}

export default function AnalyticsPage() {
  const [activeRange, setActiveRange] = useState<DateRange>('30D')

  const platformStats = useMemo(() => {
    const groups = managedAccounts.reduce((acc, acct) => {
      if (!acc[acct.platform]) acc[acct.platform] = []
      acc[acct.platform].push(acct)
      return acc
    }, {} as Record<string, ManagedAccount[]>)

    return platforms.map((p) => {
      const accounts = groups[p.id] || []
      const totalFollowers = accounts.reduce((s, a) => s + a.followerCount, 0)
      const totalRevenue = accounts.reduce((s, a) => s + a.revenue, 0)
      const avgScore = accounts.length
        ? accounts.reduce((s, a) => s + a.performanceScore, 0) / accounts.length
        : 0

      const estViews = totalFollowers * 40
      const estEngagement = Math.round(estViews * (avgScore / 100) * 0.06)
      const monthlyRevenue = totalRevenue * 30
      const growth = accounts.length ? (avgScore - 50) * 0.4 : 0

      return {
        platform: p.id,
        label: p.label,
        icon: p.icon,
        color: p.color,
        views: estViews,
        engagement: estEngagement,
        revenue: monthlyRevenue,
        growth,
        activeAccounts: accounts.length,
      }
    })
  }, [])

  const maxFunnel = conversionFunnel[0].value

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">ANALYTICS</h1>
          <p className="text-bone/40 mt-1 text-sm">
            Cross-platform performance metrics and insights
          </p>
        </div>

        {/* ── Date Filter Bar ── */}
        <div className="flex items-center gap-2">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeRange === range
                  ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                  : 'bg-smoke text-bone/40 hover:text-bone/70 hover:bg-ash'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* ── Overview KPI Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1"
            >
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                {kpi.label}
              </span>
              <span className={`text-2xl font-bold ${kpi.accent}`}>
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Platform Comparison ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">PLATFORM COMPARISON</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((p) => {
              const barWidth = p.activeAccounts
                ? Math.min(100, (p.views / platformStats.reduce((m, x) => Math.max(m, x.views), 0)) * 100)
                : 0

              return (
                <div
                  key={p.platform}
                  className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm font-medium text-bone">{p.label}</span>
                    </div>
                    {p.activeAccounts > 0 && (
                      <span className="text-[10px] text-bone/30">
                        {p.activeAccounts} acct{p.activeAccounts !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {p.activeAccounts > 0 ? (
                    <>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                        <span className="text-bone/40">Views</span>
                        <span className="text-bone text-right">{formatCompact(p.views)}</span>
                        <span className="text-bone/40">Engagement</span>
                        <span className="text-bone text-right">{formatCompact(p.engagement)}</span>
                        <span className="text-bone/40">Revenue</span>
                        <span className="text-bone text-right">{formatCompactCurrency(p.revenue)}</span>
                        <span className="text-bone/40">Growth</span>
                        <span className={`text-right ${p.growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {formatGrowth(p.growth)}
                        </span>
                      </div>

                      <div className="h-1 bg-ash rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${barWidth}%`, backgroundColor: p.color }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-bone/20 py-3 text-center">No data</div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Conversion Funnel ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">CONVERSION FUNNEL</h2>
          <div className="bg-coal border border-ash rounded-xl p-6 space-y-4">
            {conversionFunnel.map((stage, i) => {
              const pct = (stage.value / maxFunnel) * 100
              const colors = ['bg-sky-400', 'bg-emerald-400', 'bg-gold', 'bg-amber-400', 'bg-rose-400', 'bg-violet-400']

              return (
                <div key={stage.stage} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-bone/80">{stage.stage}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-bone font-medium">{stage.value.toLocaleString()}</span>
                      <span className="text-bone/40 w-12 text-right">{pct.toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="h-3 bg-ash rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${colors[i % colors.length]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {i < conversionFunnel.length - 1 && (
                    <div className="flex justify-center">
                      <span className="text-bone/15 text-xs">▼</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── A/B Tests ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">A / B TESTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abTests.map((test) => {
              const isA = test.winner === 'A'
              return (
                <div
                  key={test.id}
                  className="bg-coal border border-ash rounded-xl p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-bone">{test.name}</h3>
                    <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                      {test.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`rounded-lg p-3 border transition-all ${
                        isA
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-ash bg-smoke'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-bone/40 uppercase">Variant A</span>
                        {isA && <span className="text-[10px] text-emerald-400 font-bold">WINNER</span>}
                      </div>
                      <p className={`text-xs leading-relaxed ${isA ? 'text-bone' : 'text-bone/60'}`}>
                        {test.variantA}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg p-3 border transition-all ${
                        !isA
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-ash bg-smoke'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-bone/40 uppercase">Variant B</span>
                        {!isA && <span className="text-[10px] text-emerald-400 font-bold">WINNER</span>}
                      </div>
                      <p className={`text-xs leading-relaxed ${!isA ? 'text-bone' : 'text-bone/60'}`}>
                        {test.variantB}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-ash/50">
                    <span className="text-[10px] text-bone/30">Winner: {test.winner}</span>
                    <span className="text-[10px] text-gold font-bold">{test.lift}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
