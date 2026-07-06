'use client'
import Link from 'next/link'

const MODULES = [
  { label: 'Dashboard', route: '/ugc-agency', emoji: '📊', desc: 'Enterprise overview & KPIs' },
  { label: 'Script Studio', route: '/ugc-agency/script-studio', emoji: '📝', desc: 'AI script generation & templates' },
  { label: 'UGC Studio', route: '/ugc-agency/ugc-studio', emoji: '🎬', desc: 'Video production & asset library' },
  { label: 'Publishing Center', route: '/ugc-agency/publishing', emoji: '📤', desc: 'Multi-platform content scheduling' },
  { label: 'Analytics Center', route: '/ugc-agency/analytics', emoji: '📈', desc: 'Performance dashboards & reports' },
  { label: 'Finance Center', route: '/ugc-agency/finance', emoji: '💰', desc: 'Revenue tracking & payouts' },
  { label: 'Tax Center', route: '/ugc-agency/tax', emoji: '🏛️', desc: 'Tax forms, compliance & filings' },
  { label: 'CRM', route: '/ugc-agency/crm', emoji: '👥', desc: 'Client & creator relationship mgmt' },
  { label: 'Automation Center', route: '/ugc-agency/automation', emoji: '⚡', desc: 'Workflow automation & triggers' },
  { label: 'Notification Center', route: '/ugc-agency/notifications', emoji: '🔔', desc: 'Alerts, digests & webhooks' },
  { label: 'Admin Console', route: '/ugc-agency/admin', emoji: '⚙️', desc: 'System settings & user management' },
]

const STATS = [
  { label: 'Active Modules', value: '11' },
  { label: 'Total Data Models', value: '45+' },
  { label: 'Mock Providers', value: '8' },
  { label: 'Agent Services', value: '10' },
]

export default function UgcAgencyDashboard() {
  return (
    <div className="p-8 font-mono tracking-widest uppercase text-bone">
      <header className="mb-10">
        <h1 className="text-3xl text-gold">UGC Agency Enterprise</h1>
        <p className="mt-2 text-xs tracking-[0.25em] text-bone/50">
          Band 2 — Content, Publishing, Analytics, Finance, Tax, CRM, Automation
        </p>
      </header>

      <div className="mb-12 grid grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-sm border border-white/5 bg-coal/60 px-5 py-4"
          >
            <p className="text-2xl text-gold">{stat.value}</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-bone/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {MODULES.map((mod) => (
          <Link
            key={mod.route}
            href={mod.route}
            className="group rounded-sm border border-white/5 bg-coal/30 px-5 py-5 transition-colors hover:border-gold/40 hover:bg-coal/80"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mod.emoji}</span>
              <div>
                <p className="text-xs tracking-[0.15em] text-bone transition-colors group-hover:text-gold">
                  {mod.label}
                </p>
                <p className="mt-0.5 text-[10px] tracking-[0.15em] text-bone/30 lowercase">
                  {mod.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
