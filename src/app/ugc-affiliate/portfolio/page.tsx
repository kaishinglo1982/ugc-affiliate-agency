'use client';

import Image from 'next/image';
import Link from 'next/link';
import { portfolio } from '@/data/mock';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-mono font-black uppercase tracking-widest text-5xl text-bone">
            Portfolio
          </h1>
          <p className="mt-4 text-lg text-bone/60">
            Case studies from brands we&apos;ve scaled
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {portfolio.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-12">
            <h2 className="font-mono font-black uppercase tracking-widest text-2xl text-bone">
              Ready to be our next case study?
            </h2>
            <Link
              href="/ugc-affiliate/waitlist"
              className="btn-gold btn mt-6 inline-flex font-mono text-xs uppercase tracking-widest"
            >
              Start a Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({
  item,
}: {
  item: { id: string; title: string; caption: string; image: string };
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-gold/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== '/images/hero.png') {
              target.src = '/images/hero.png';
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-mono font-black uppercase tracking-widest text-bone text-lg">
          {item.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gold">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
