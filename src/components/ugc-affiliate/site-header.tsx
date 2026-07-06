'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/ugc-affiliate/logo';

const links = [
  { href: '/ugc-affiliate/services', label: 'Services' },
  { href: '/ugc-affiliate/portfolio', label: 'Portfolio' },
  { href: '/ugc-affiliate/creators', label: 'Creators' },
  { href: '/ugc-affiliate/about', label: 'About' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/ugc-affiliate" aria-label="UGC Affiliate Agency home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-bone/70 transition-colors hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/ugc-affiliate/contact" className="btn-gold hidden sm:inline-flex">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
