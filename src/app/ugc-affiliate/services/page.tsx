import Link from 'next/link';
import { services } from '@/data/mock';

export const metadata = {
  title: 'Services — UGC Affiliate Agency',
  description:
    'Full suite of UGC and affiliate marketing services. From content production to campaign management and performance tracking.',
};

const categories = [
  'Video Production',
  'Creator Management',
  'Campaign Strategy',
  'Analytics & Reporting',
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="label">What We Offer</p>
        <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">Services</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-bone/60">
          From UGC production to full-funnel affiliate management — every service is designed to
          scale your brand with authentic creator content.
        </p>
      </section>

      {categories.map((category) => {
        const filtered = services.filter((s) => s.category === category);
        if (!filtered.length) return null;

        return (
          <section key={category} className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-widest">{category}</h2>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <article
                  key={service.id}
                  className="card flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    {service.badge ? (
                      <span className="rounded-full border border-gold px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
                        {service.badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="font-mono text-xs uppercase tracking-widest text-bone/40">
                      {service.tier}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase leading-tight">
                    {service.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-3xl font-black">&euro;{service.price}</p>
                    {service.compareAt && (
                      <p className="font-mono text-sm text-bone/40 line-through">
                        &euro;{service.compareAt}
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-bone/60">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {service.deliverables.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-mono text-xs uppercase tracking-widest text-bone/50"
                      >
                        <span className="mt-0.5 text-gold">&#9656;</span>
                        {item}
                      </li>
                    ))}
                    {service.deliverables.length > 4 && (
                      <li className="font-mono text-xs uppercase tracking-widest text-gold/60">
                        +{service.deliverables.length - 4} more
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto flex gap-3 pt-6">
                    <Link
                      href={`/ugc-affiliate/product/${service.slug}`}
                      className="btn-dark flex-1 text-center text-xs"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/ugc-affiliate/checkout?service=${service.slug}`}
                      className="btn-gold flex-1 text-center text-xs"
                    >
                      Get Started
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
