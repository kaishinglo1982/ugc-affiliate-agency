'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const navItems = [
  { label: 'Dashboard', route: '/ugc-agency', emoji: '📊' },
  { label: 'Script Studio', route: '/ugc-agency/script-studio', emoji: '📝' },
  { label: 'UGC Studio', route: '/ugc-agency/ugc-studio', emoji: '🎬' },
  { label: 'Publishing Center', route: '/ugc-agency/publishing', emoji: '📤' },
  { label: 'Analytics Center', route: '/ugc-agency/analytics', emoji: '📈' },
  { label: 'Finance Center', route: '/ugc-agency/finance', emoji: '💰' },
  { label: 'Tax Center', route: '/ugc-agency/tax', emoji: '🏛️' },
  { label: 'CRM', route: '/ugc-agency/crm', emoji: '👥' },
  { label: 'Automation Center', route: '/ugc-agency/automation', emoji: '⚡' },
  { label: 'Notification Center', route: '/ugc-agency/notifications', emoji: '🔔' },
  { label: 'Agent OS', route: '/ugc-agency/agentos', emoji: '🧠' },
  { label: 'API Layer', route: '/ugc-agency/api', emoji: '🔌' },
  { label: 'White Label', route: '/ugc-agency/white-label', emoji: '🎨' },
  { label: 'Team', route: '/ugc-agency/team', emoji: '👤' },
  { label: 'Admin Console', route: '/ugc-agency/admin', emoji: '⚙️' },
]

const bottomLinks = [
  { label: '← Main Site', route: '/ugc-affiliate' },
  { label: 'Admin Portal', route: '/admin' },
]

export function UgcAgencyShell({ children, tenantLabel }: { children: ReactNode; tenantLabel: string }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-ink font-mono uppercase tracking-widest text-bone">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/5 bg-coal">
        <div className="border-b border-white/5 px-6 py-8">
          <h1 className="text-lg text-gold">UGC Agency</h1>
          <p className="mt-1 text-[10px] tracking-[0.25em] text-bone/50">Enterprise Band 2</p>
          <p className="mt-2 truncate text-[9px] tracking-[0.2em] text-bone/30">Tenant {tenantLabel}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = item.route === '/ugc-agency'
                ? pathname === '/ugc-agency'
                : pathname.startsWith(item.route)

              return (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-xs transition-colors ${
                      isActive
                        ? 'border-l-2 border-gold text-gold'
                        : 'text-bone/60 hover:bg-white/5 hover:text-bone'
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span className="tracking-[0.15em]">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-white/5 px-3 py-4">
          {bottomLinks.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-xs text-bone/40 transition-colors hover:bg-white/5 hover:text-bone"
            >
              <span className="tracking-[0.15em]">{link.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <main className="ml-64 flex-1">{children}</main>
    </div>
  )
}
