'use client'

import { sales, creators, campaigns } from '@/data/mock'

const formatCurrency = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

const kpis = [
  { label: 'Total Revenue', value: 247890, change: '+12.5%', positive: true },
  { label: 'Total Payouts', value: 198312 },
  { label: 'Net Profit', value: 49578, change: '+8.3%', positive: true },
  { label: 'Pending Invoices', value: 12450 },
]

const monthlyData = [
  { month: 'Jan', revenue: 18500 },
  { month: 'Feb', revenue: 22300 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 25200 },
  { month: 'May', revenue: 28700 },
  { month: 'Jun', revenue: 34100 },
  { month: 'Jul', revenue: 38900 },
  { month: 'Aug', revenue: 36500 },
  { month: 'Sep', revenue: 31200 },
  { month: 'Oct', revenue: 27800 },
  { month: 'Nov', revenue: 33400 },
  { month: 'Dec', revenue: 42100 },
]

const maxMonthly = Math.max(...monthlyData.map((d) => d.revenue))

const creatorMap = new Map(creators.map((c) => [c.id, c.name]))
const campaignMap = new Map(campaigns.map((c) => [c.id, c.name]))

const campaignForSale = [
  'cmp-001', 'cmp-002', 'cmp-004', 'cmp-005',
  'cmp-003', 'cmp-001', 'cmp-004', 'cmp-002',
]
const creatorForSale = [
  'cr-001', 'cr-004', 'cr-003', 'cr-005',
  'cr-002', 'cr-001', 'cr-003', 'cr-004',
]
const statusForSale: ('paid' | 'pending' | 'processing')[] = [
  'paid', 'paid', 'pending', 'paid',
  'paid', 'pending', 'processing', 'paid',
]

const payoutSales = sales
  .map((s, i) => ({
    ...s,
    campaignId: campaignForSale[i % campaignForSale.length],
    creatorId: creatorForSale[i % creatorForSale.length],
    status: statusForSale[i % statusForSale.length],
    commission: Math.round(s.amount * 0.3),
  }))
  .filter((s) => s.status === 'paid' || s.status === 'pending')

const totalRevenueAllTime = sales.reduce((sum, s) => sum + s.amount, 0)
const thisMonthRevenue = sales
  .filter((s) => s.date.startsWith('2026-07'))
  .reduce((sum, s) => sum + s.amount, 0)
const bestMonth = monthlyData.reduce((best, m) =>
  m.revenue > best.revenue ? m : best, monthlyData[0]
)

const statusColor: Record<string, string> = {
  paid: 'text-green-400',
  pending: 'text-amber-400',
  processing: 'text-blue-400',
}

export default function FinancePage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-mono font-black uppercase tracking-widest text-4xl text-bone">
          Finance Center
        </h1>
        <p className="mt-2 text-bone/60 font-mono text-sm tracking-widest">
          Revenue tracking, payouts, and financial insights
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl bg-coal border border-white/10 p-5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
              {kpi.label}
            </p>
            <p className="font-mono text-2xl font-black text-gold">
              {formatCurrency(kpi.value)}
            </p>
            {kpi.change && (
              <p
                className={`font-mono text-xs tracking-widest mt-1 ${
                  kpi.positive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {kpi.change}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Revenue Overview
        </h2>
        <div className="flex items-end gap-3 h-52">
          {monthlyData.map((m) => (
            <div
              key={m.month}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
            >
              <span className="font-mono text-[10px] text-bone/40">
                {formatCurrency(m.revenue)}
              </span>
              <div
                className="w-full rounded-t-md bg-gold/70 hover:bg-gold transition-all"
                style={{
                  height: `${Math.max((m.revenue / maxMonthly) * 140, 6)}px`,
                }}
              />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bone/40">
                {m.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10 overflow-x-auto">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Recent Payouts
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
            <tr>
              <th className="pb-3 pr-4">Creator</th>
              <th className="pb-3 pr-4">Campaign</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {payoutSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-3 pr-4 text-bone font-semibold">
                  {creatorMap.get(sale.creatorId) || '—'}
                </td>
                <td className="py-3 pr-4 text-bone/80">
                  {campaignMap.get(sale.campaignId) || '—'}
                </td>
                <td className="py-3 pr-4 font-mono text-gold">
                  {formatCurrency(sale.amount)}
                </td>
                <td className="py-3 pr-4 text-bone/60 font-mono text-xs">
                  {formatDate(sale.date)}
                </td>
                <td className="py-3">
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${
                      statusColor[sale.status] || 'text-bone/50'
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-coal p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Total Revenue All Time
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(totalRevenueAllTime)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-coal p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            This Month
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(thisMonthRevenue)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-coal p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Best Month
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(bestMonth.revenue)}
          </p>
          <p className="font-mono text-xs tracking-widest text-bone/40 mt-1">
            {bestMonth.month}
          </p>
        </div>
      </div>
    </div>
  )
}
