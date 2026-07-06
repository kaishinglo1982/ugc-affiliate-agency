'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

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

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-ink text-bone">
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-ash bg-coal">
        <div className="flex items-center gap-2 border-b border-ash px-6 py-5">
          <span className="text-xl font-bold tracking-widest text-gold font-mono">UGC</span>
          <span className="text-sm tracking-widest text-bone font-mono">AFFILIATE</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm tracking-widest font-mono transition-colors duration-150 ${
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
          <p className="text-[10px] tracking-widest text-bone/30 font-mono">
            UGC AFFILIATE v1.0
          </p>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
