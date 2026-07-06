'use client'
import { useState } from 'react'
import { managedAccounts, portalAgents } from '@/data/portal'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'reddit' | 'pinterest'
type AccountStatus = 'active' | 'paused' | 'suspended' | 'setup'
type RiskLevel = 'low' | 'medium' | 'high'

const platforms: Platform[] = ['facebook', 'instagram', 'tiktok', 'youtube', 'reddit', 'pinterest']
const statuses: AccountStatus[] = ['active', 'paused', 'suspended', 'setup']
const riskLevels: RiskLevel[] = ['low', 'medium', 'high']

const platformIcons: Record<Platform, string> = {
  facebook: '📘',
  instagram: '📸',
  tiktok: '🎵',
  youtube: '▶️',
  reddit: '🤖',
  pinterest: '📌',
}

const statusColors: Record<AccountStatus, string> = {
  active: 'text-gold',
  paused: 'text-amber-400',
  suspended: 'text-red-400',
  setup: 'text-blue-400',
}

const riskColors: Record<RiskLevel, string> = {
  low: 'text-green-400',
  medium: 'text-amber-400',
  high: 'text-red-400',
}

const formatNumber = (n: number) => n.toLocaleString()

export default function AccountsPage() {
  const [platformFilter, setPlatformFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [riskFilter, setRiskFilter] = useState<string>('All')

  const agentMap = new Map(portalAgents.map(a => [a.id, a.name]))

  const filtered = managedAccounts
    .filter(a => platformFilter === 'All' || a.platform === platformFilter)
    .filter(a => statusFilter === 'All' || a.status === statusFilter)
    .filter(a => riskFilter === 'All' || a.riskLevel === riskFilter)

  const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Manager</h1>
          <p className="text-white/40 mt-1">Monitor and manage all platform accounts</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-white/30 uppercase tracking-wider mr-2">Platform</span>
            <FilterButton label="All" active={platformFilter === 'All'} onClick={() => setPlatformFilter('All')} />
            {platforms.map(p => (
              <FilterButton
                key={p}
                label={p.charAt(0).toUpperCase() + p.slice(1)}
                active={platformFilter === p}
                onClick={() => setPlatformFilter(p)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-white/30 uppercase tracking-wider mr-2">Status</span>
            <FilterButton label="All" active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
            {statuses.map(s => (
              <FilterButton
                key={s}
                label={s.charAt(0).toUpperCase() + s.slice(1)}
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-white/30 uppercase tracking-wider mr-2">Risk</span>
            <FilterButton label="All" active={riskFilter === 'All'} onClick={() => setRiskFilter('All')} />
            {riskLevels.map(r => (
              <FilterButton
                key={r}
                label={r.charAt(0).toUpperCase() + r.slice(1)}
                active={riskFilter === r}
                onClick={() => setRiskFilter(r)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr_1.2fr] gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/[0.06] text-xs font-medium text-white/30 uppercase tracking-wider">
            <div>Name</div>
            <div>Platform</div>
            <div>Niche</div>
            <div>Followers</div>
            <div>Status</div>
            <div>Risk</div>
            <div>Revenue</div>
            <div>Profit</div>
            <div>Performance</div>
            <div>Agent</div>
          </div>

          <div>
            {filtered.map((account, i) => (
              <a
                key={account.id}
                href="#"
                className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr_1.2fr] gap-4 px-6 py-4 items-center text-sm transition-colors hover:bg-white/[0.06] ${
                  i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'
                }`}
              >
                <div className="text-white font-medium truncate">{account.name}</div>

                <div className="flex items-center gap-2 text-white/60">
                  <span>{platformIcons[account.platform as Platform]}</span>
                  <span className="capitalize">{account.platform}</span>
                </div>

                <div className="text-white/60 capitalize">{account.niche}</div>

                <div className="text-white/60">{formatNumber(account.followerCount)}</div>

                <div className={`font-medium capitalize ${statusColors[account.status as AccountStatus] || 'text-white/60'}`}>
                  {account.status}
                </div>

                <div className={`font-medium capitalize ${riskColors[account.riskLevel as RiskLevel] || 'text-white/60'}`}>
                  {account.riskLevel}
                </div>

                <div className="text-white/60">${formatNumber(account.revenue)}</div>

                <div className={`font-medium ${account.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${formatNumber(account.profit)}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        account.performanceScore >= 80
                          ? 'bg-green-400'
                          : account.performanceScore >= 50
                          ? 'bg-amber-400'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${account.performanceScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40 w-8 text-right">{account.performanceScore}%</span>
                </div>

                <div className="text-white/60 truncate">{agentMap.get(account.agentId) || account.agentId}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-white/30">
          Showing {filtered.length} of {managedAccounts.length} accounts
        </div>
      </div>
    </div>
  )
}
