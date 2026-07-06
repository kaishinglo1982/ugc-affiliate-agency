'use client'

import Link from 'next/link'

const kpis = [
  { label: 'Total Revenue', value: '$247,890' },
  { label: 'Active Accounts', value: '8' },
  { label: 'Total Campaigns', value: '5' },
  { label: 'Avg Creator Score', value: '94%' },
]

const shortcuts = [
  { label: 'Portal Control Center', href: '/admin/portals', icon: '♜' },
  { label: 'Nischen Center', href: '/admin/niches', icon: '⊞' },
  { label: 'Account Manager', href: '/admin/accounts', icon: '⚇' },
  { label: 'Content Pipeline', href: '/admin/content', icon: '▤' },
  { label: 'Affiliate Center', href: '/admin/affiliates', icon: '⚉' },
  { label: 'Finance Center', href: '/admin/finance', icon: '⟡' },
  { label: 'Analytics', href: '/admin/analytics', icon: '≡' },
  { label: 'Security Vault', href: '/admin/security', icon: '⚷' },
]

const recentActivity = [
  { time: '14:32', description: 'New portal "Beauty Vault" created', status: 'Live', color: 'text-green-400' },
  { time: '13:15', description: 'Campaign #0042 approved by finance', status: 'Approved', color: 'text-gold' },
  { time: '11:48', description: 'Creator score updated for @ugc_elena', status: 'Updated', color: 'text-blue-400' },
  { time: '09:02', description: 'Payout of $3,420 processed', status: 'Completed', color: 'text-green-400' },
  { time: '08:20', description: 'Account "skincare_plus" flagged — manual review', status: 'Flagged', color: 'text-red-400' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-mono text-2xl tracking-widest uppercase text-bone">
          Admin Dashboard
        </h1>
        <p className="mt-1 font-mono text-xs tracking-widest uppercase text-bone/40">
          UGC Affiliate Agency — Performance Overview
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-white/10 bg-coal p-5"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase text-bone/40">
              {kpi.label}
            </p>
            <p className="mt-2 font-mono text-2xl tracking-widest text-gold">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 font-mono text-sm tracking-widest uppercase text-bone/60">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-coal p-5 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-smoke"
            >
              <span className="block text-2xl text-gold">{item.icon}</span>
              <span className="mt-3 block font-mono text-[11px] tracking-widest uppercase text-bone/60 group-hover:text-bone">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="mb-4 font-mono text-sm tracking-widest uppercase text-bone/60">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-coal px-5 py-3"
              >
                <span className="font-mono text-[10px] tracking-widest text-bone/30 w-12 shrink-0">
                  {entry.time}
                </span>
                <p className="flex-1 font-mono text-xs tracking-wider text-bone/70">
                  {entry.description}
                </p>
                <span
                  className={`rounded-full border border-white/10 px-3 py-0.5 font-mono text-[9px] tracking-widest uppercase ${entry.color}`}
                >
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-sm tracking-widest uppercase text-bone/60">
            Revenue Overview
          </h2>
          <div className="flex flex-col justify-end rounded-2xl border border-white/10 bg-coal p-5 h-[280px]">
            <div className="relative flex items-end justify-between gap-2 h-full">
              {[35, 55, 42, 78, 61, 90, 82].map((height, i) => (
                <div
                  key={i}
                  className="relative flex-1 rounded-t-md bg-gradient-to-t from-gold/60 to-gold/20"
                  style={{ height: `${height}%` }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-bone/30">
                    M{i + 1}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center font-mono text-[10px] tracking-widest uppercase text-bone/30">
              Monthly Revenue — Last 7 Months
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
