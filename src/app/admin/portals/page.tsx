'use client'
import { portalAgents, managedAccounts } from '@/data/portal'
import type { Platform } from '@/data/portal'

const platformConfig: Record<Platform, { label: string; bar: string }> = {
  facebook: { label: 'Facebook', bar: 'bg-blue-500' },
  instagram: { label: 'Instagram', bar: 'bg-pink-500' },
  tiktok: { label: 'TikTok', bar: 'bg-white' },
  youtube: { label: 'YouTube', bar: 'bg-red-500' },
  reddit: { label: 'Reddit', bar: 'bg-orange-500' },
  pinterest: { label: 'Pinterest', bar: 'bg-red-700' },
  x: { label: 'X', bar: 'bg-gray-400' },
  linkedin: { label: 'LinkedIn', bar: 'bg-blue-700' },
}

const formatCurrency = (n: number) => `$${n.toLocaleString()}`
const formatNumber = (n: number) => n.toLocaleString()

export default function PortalsPage() {
  const totalAccounts = managedAccounts.length
  const activeAccounts = managedAccounts.filter(a => a.status === 'active').length
  const totalRevenue = managedAccounts.reduce((s, a) => s + a.revenue, 0)
  const totalProfit = managedAccounts.reduce((s, a) => s + a.profit, 0)
  const avgProfit = totalAccounts > 0 ? Math.round(totalProfit / totalAccounts) : 0

  const stats = [
    { label: 'Total Accounts', value: formatNumber(totalAccounts) },
    { label: 'Active', value: formatNumber(activeAccounts) },
    { label: 'Revenue MTD', value: formatCurrency(totalRevenue) },
    { label: 'Avg Profit / Account', value: formatCurrency(avgProfit) },
  ]

  const accountsByAgent = new Map(
    portalAgents.map(a => [a.id, managedAccounts.filter(m => m.agentId === a.id)])
  )

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-mono font-black uppercase tracking-widest text-4xl text-bone">
          Portal Control Center
        </h1>
        <p className="mt-2 text-bone/60 font-mono text-sm tracking-widest">
          Manage platform agents and account performance
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-2xl bg-coal border border-white/10 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
              {stat.label}
            </p>
            <p className="font-mono text-2xl font-black text-gold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {portalAgents.map(agent => {
          const accounts = accountsByAgent.get(agent.id) || []
          const accountCount = accounts.length
          const totalRev = accounts.reduce((s, a) => s + a.revenue, 0)
          const avgEngagement = accountCount > 0
            ? Math.round(accounts.reduce((s, a) => s + a.performanceScore, 0) / accountCount)
            : 0
          const config = platformConfig[agent.platform]
          const statusColor = agent.status === 'active' ? 'text-gold'
            : agent.status === 'beta' ? 'text-blue-400'
            : 'text-bone/40'

          return (
            <a
              key={agent.id}
              href="#"
              className="card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{agent.icon}</span>
                <span className={`font-mono text-xs uppercase tracking-widest ${statusColor}`}>
                  {agent.status}
                </span>
              </div>

              <h3 className="font-mono font-black uppercase tracking-widest text-lg text-bone mb-1">
                {config.label}
              </h3>

              <p className="text-bone/40 text-xs font-mono mb-4 leading-relaxed line-clamp-2">
                {agent.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Accounts</p>
                  <p className="font-mono text-sm font-black text-bone">{accountCount}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Revenue</p>
                  <p className="font-mono text-sm font-black text-bone">{formatCurrency(totalRev)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Engagement</p>
                  <p className="font-mono text-sm font-black text-bone">{avgEngagement}%</p>
                </div>
              </div>

              <div className={`mt-4 h-1 rounded-full ${config.bar} opacity-60 group-hover:opacity-100 transition-opacity`} />
            </a>
          )
        })}
      </div>
    </div>
  )
}
