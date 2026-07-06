import Image from 'next/image';
import Link from 'next/link';
import { Monogram } from '@/components/ugc-affiliate/logo';
import type { Campaign } from '@/data/mock';

export function Hero({ campaign }: { campaign: Campaign }) {
  const stats = [
    { label: 'Campaigns Run', value: '200+' },
    { label: 'Active Creators', value: '50+' },
    { label: 'Avg. ROAS', value: '4.8x' },
    { label: 'Avg. CPA Drop', value: '-35%' },
  ];
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="flex animate-fade-up flex-col justify-center">
          <p className="label">
            Featured Campaign &middot; {campaign.status}
          </p>
          <Monogram size={56} className="mt-6 h-14 w-14 object-contain" />
          <h1 className="mt-5 text-6xl font-black uppercase leading-[0.9] tracking-tight text-balance md:text-8xl">
            UGC Affiliate<br />Agency
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.4em] text-bone/50">
            Performance-first &middot; Est. 2025
          </p>
          <p className="mt-6 text-2xl text-bone/90 md:text-3xl">Content that converts.</p>
          <p className="mt-5 max-w-xl leading-relaxed text-bone/60">
            We pair brands with top UGC creators to produce authentic, high-converting content for
            paid social, organic channels, and affiliate programs &mdash; measured by performance, not vanity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/ugc-affiliate/contact" className="btn">
              Start a Campaign
            </Link>
            <Link href="/ugc-affiliate/services" className="btn-dark">
              View Services
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-gold">{s.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/hero.png"
            alt="UGC content production showcase"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="label">Active Campaign</p>
            <h2 className="text-4xl font-black uppercase">{campaign.client}</h2>
            <div className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-bone/70">
              <span>{campaign.niche}</span>
              <span>{campaign.videosDelivered} videos delivered</span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="rounded-full bg-gold/20 px-3 py-1 text-sm text-gold">
                {campaign.ROAS}x ROAS
              </span>
              <span className="rounded-full bg-bone/10 px-3 py-1 text-sm text-bone/80">
                ${campaign.actualCPA} CPA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
