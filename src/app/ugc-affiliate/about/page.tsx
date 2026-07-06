import Image from 'next/image';
import Link from 'next/link';
import { Faq } from '@/components/ugc-affiliate/faq';

export const metadata = {
  title: 'About — UGC Affiliate Agency',
  description: 'UGC Affiliate Agency connects brands with top UGC creators. We produce authentic content and manage affiliate campaigns at scale.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[360px]">
          <Image src="/images/lookbook-1.png" alt="UGC Affiliate Agency" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-10">
              <p className="label">The Agency</p>
              <h1 className="mt-3 text-5xl font-black uppercase md:text-7xl">UGC Affiliate Agency</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-2xl leading-relaxed text-bone/80 text-pretty">
          UGC Affiliate Agency is a next-gen creative and affiliate partner built for the creator
          economy. We connect brands with authentic UGC creators and manage performance-driven
          campaigns that convert.
        </p>
        <div className="mt-8 space-y-6 leading-relaxed text-bone/60">
          <p>
            We recruit, brief, and manage a curated network of UGC creators who produce scroll-stopping
            content that looks native, not ad-like. From TikTok organic to Meta ads, every asset is
            optimised for performance and authenticity.
          </p>
          <p>
            Behind the scenes, UGC Affiliate Agency runs on Carry OS: an automated engine connecting
            creator recruitment, content production, affiliate tracking, and performance analytics into
            one seamless loop.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Creators', v: 'Curated' },
            { k: 'Content', v: 'Authentic' },
            { k: 'Campaigns', v: 'Performance' },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <p className="text-2xl font-black uppercase">{s.v}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-bone/40">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/ugc-affiliate/products" className="btn-gold">
            View Services
          </Link>
          <Link href="/ugc-affiliate/waitlist" className="btn-dark">
            Join the Network
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Faq />
      </section>
    </>
  );
}
