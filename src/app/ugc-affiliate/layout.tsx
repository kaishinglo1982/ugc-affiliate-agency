import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/ugc-affiliate/site-header';
import { SiteFooter } from '@/components/ugc-affiliate/site-footer';

export default function UGCAffiliateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
