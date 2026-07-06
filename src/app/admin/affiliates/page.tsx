'use client'
import { sales, campaigns, creators } from '@/data/mock'
import { managedAccounts } from '@/data/portal'

type SaleStatus = 'completed' | 'pending' | 'cancelled' | 'refunded'

type AffiliateSale = {
  id: string
  campaignId: string
  creatorId: string
  amount: number
  commission: number
  status: SaleStatus
  date: string
  platform: string
  product: string
}

const statusColors: Record<SaleStatus, string> = {
  completed: 'text-green-400',
  pending: 'text-amber-400',
  cancelled: 'text-red-400',
  refunded: 'text-gray-400',
}

const statusCycle: SaleStatus[] = ['completed', 'completed', 'completed', 'pending', 'completed', 'refunded', 'pending', 'cancelled']

const affiliateSales: AffiliateSale[] = sales
  .map((s, i) => ({
    id: s.id,
    campaignId: campaigns[i % campaigns.length].id,
    creatorId: creators[i % creators.length].id,
    amount: s.amount,
    commission: Math.round(s.amount * 0.152 * 100) / 100,
    status: statusCycle[i % statusCycle.length],
    date: s.date,
    platform: s.channel.toLowerCase(),
    product: s.serviceName,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const platformSet = new Set(managedAccounts.map(a => a.platform))

const campaignMap = new Map(campaigns.map(c => [c.id, c.name]))
const creatorMap = new Map(creators.map(c => [c.id, c.name]))

const formatCurrency = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

const pendingPayouts = affiliateSales
  .filter(s => s.status === 'pending')
  .reduce((sum, s) => sum + s.commission, 0)

const avgCommission = affiliateSales.reduce((sum, s) => sum + s.commission, 0) / affiliateSales.length

const creatorCommissions = new Map<string, number>()
affiliateSales.forEach(s => {
  creatorCommissions.set(s.creatorId, (creatorCommissions.get(s.creatorId) || 0) + s.commission)
})
const topAffiliateId = [...creatorCommissions.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ''
const topAffiliateName = creatorMap.get(topAffiliateId) || ''
const topAffiliateEarnings = creatorCommissions.get(topAffiliateId) || 0

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-widest">Affiliate Center</h1>
          <p className="text-white/40 mt-1 tracking-wider">Manage affiliate links, commissions, and payouts</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Affiliates', value: '24' },
            { label: 'Active Links', value: '156' },
            { label: 'Commission Rate', value: 'avg 15.2%' },
            { label: 'Pending Payouts', value: formatCurrency(pendingPayouts) },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs text-white/30 tracking-widest uppercase mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-white tracking-wider">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] overflow-hidden mb-8">
          <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1.2fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/[0.06] text-xs font-medium text-white/30 uppercase tracking-widest">
            <div>Date</div>
            <div>Campaign</div>
            <div>Creator</div>
            <div>Platform</div>
            <div>Product</div>
            <div>Amount</div>
            <div>Commission</div>
            <div>Status</div>
          </div>
          <div>
            {affiliateSales.map((sale, i) => (
              <div
                key={sale.id}
                className={`grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1.2fr_1fr_1fr_1fr] gap-4 px-6 py-4 items-center text-sm transition-colors hover:bg-white/[0.06] ${
                  i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'
                }`}
              >
                <div className="text-white/60 tracking-wider">{formatDate(sale.date)}</div>
                <div className="text-white font-medium truncate tracking-wider">{campaignMap.get(sale.campaignId) || sale.campaignId}</div>
                <div className="text-white/60 truncate tracking-wider">{creatorMap.get(sale.creatorId) || sale.creatorId}</div>
                <div className="text-white/60 capitalize tracking-wider">{sale.platform}</div>
                <div className="text-white/60 truncate tracking-wider">{sale.product}</div>
                <div className="text-white/60 tracking-wider">{formatCurrency(sale.amount)}</div>
                <div className="text-white tracking-wider">{formatCurrency(sale.commission)}</div>
                <div className={`font-medium tracking-wider capitalize ${statusColors[sale.status]}`}>{sale.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="text-xs text-white/30 tracking-widest uppercase mb-2">Top Affiliate</div>
            <div className="text-lg font-bold text-white tracking-wider">{topAffiliateName}</div>
            <div className="text-sm text-white/60 tracking-wider mt-1">{formatCurrency(topAffiliateEarnings)} earned</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="text-xs text-white/30 tracking-widest uppercase mb-2">Avg Commission per Sale</div>
            <div className="text-lg font-bold text-white tracking-wider">{formatCurrency(avgCommission)}</div>
            <div className="text-sm text-white/60 tracking-wider mt-1">Across {affiliateSales.length} sales</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="text-xs text-white/30 tracking-widest uppercase mb-2">Conversion Rate</div>
            <div className="text-lg font-bold text-white tracking-wider">2.8%</div>
            <div className="text-sm text-white/60 tracking-wider mt-1">Click to sale</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-8 py-3 rounded-2xl bg-white text-background font-bold tracking-widest hover:bg-white/90 transition-colors">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  )
}
