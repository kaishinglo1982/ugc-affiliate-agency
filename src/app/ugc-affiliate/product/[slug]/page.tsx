import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, products, services } from '@/data/mock';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getProduct(slug);
  if (!service) return { title: 'Not found — UGC Affiliate Agency' };
  return {
    title: `${service.name} — UGC Affiliate Agency`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getProduct(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-bone/40" aria-label="Breadcrumb">
        <Link href="/ugc-affiliate/products" className="hover:text-bone">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-bone/70">{service.name}</span>
      </nav>

      <div className="mx-auto max-w-4xl">
        <p className="label">{service.category}</p>
        <h1 className="mt-4 text-5xl font-black uppercase md:text-6xl">{service.name}</h1>
        {service.badge && (
          <span className="mt-4 inline-block rounded-full border border-gold/40 px-3 py-1 font-mono text-xs text-gold">
            {service.badge}
          </span>
        )}
        <p className="mt-6 text-xl leading-relaxed text-bone/70">{service.description}</p>

        <div className="mt-8">
          <span className="text-5xl font-black">${service.price}</span>
          {service.compareAt && (
            <span className="ml-3 text-xl text-bone/40 line-through">${service.compareAt}</span>
          )}
          <span className="ml-2 text-sm text-bone/50">{service.tier === 'scale' ? '/month' : ' one-time'}</span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Turnaround</p>
            <p className="mt-2 text-lg font-bold">{service.turnaround}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Revisions</p>
            <p className="mt-2 text-lg font-bold">{service.revisions}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Usage</p>
            <p className="mt-2 text-lg font-bold">{service.usage}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-black uppercase">What&apos;s Included</h2>
          <ul className="mt-4 space-y-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-bone/70">
                <span className="mt-0.5 text-gold">&#10003;</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="mailto:hello@ugcaffiliate.agency" className="btn-gold">
            Get Started
          </a>
          <Link href="/ugc-affiliate/contact" className="btn-dark">
            Book a Call
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-black uppercase">Related Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link key={p.id} href={`/ugc-affiliate/product/${p.slug}`} className="card group">
              <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{p.category}</p>
              <h3 className="mt-3 text-xl font-black uppercase group-hover:text-gold transition-colors">{p.name}</h3>
              <p className="mt-2 text-sm text-bone/60 line-clamp-2">{p.description}</p>
              <p className="mt-4">
                <span className="text-2xl font-black">${p.price}</span>
                {p.compareAt && <span className="ml-2 text-sm text-bone/40 line-through">${p.compareAt}</span>}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
