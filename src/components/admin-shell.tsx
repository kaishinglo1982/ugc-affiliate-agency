'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/admin/ugc-affiliate', label: 'Dashboard' },
  { href: '/admin/portals', label: 'Portal Control Center' },
  { href: '/admin/niches', label: 'Nischen Center' },
  { href: '/admin/accounts', label: 'Account Manager' },
  { href: '/admin/content', label: 'Content Pipeline' },
  { href: '/admin/affiliates', label: 'Affiliate Center' },
  { href: '/admin/finance', label: 'Finance Center' },
  { href: '/admin/analytics', label: 'Analytics' },
]

export function AdminShell({ children, tenantLabel }: { children: ReactNode; tenantLabel: string }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-ink text-bone">
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-ash bg-coal">
        <div className="border-b border-ash px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold tracking-widest text-gold">UGC</span>
            <span className="font-mono text-sm tracking-widest text-bone">AFFILIATE</span>
          </div>
          <p className="mt-2 truncate font-mono text-[10px] tracking-widest text-bone/40">TENANT {tenantLabel}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 font-mono text-sm tracking-widest transition-colors duration-150 ${
                  isActive
                    ? 'border-l-2 border-gold bg-ash/50 text-gold'
                    : 'text-bone/60 hover:bg-smoke hover:text-bone'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-ash px-6 py-4">
          <p className="font-mono text-[10px] tracking-widest text-bone/30">UGC AFFILIATE v1.0</p>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
