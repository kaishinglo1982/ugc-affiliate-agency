import { campaigns, services, videoIdeas, reviews } from '@/data/mock';
import { Hero } from '@/components/ugc-affiliate/hero';
import { VideoPipeline } from '@/components/ugc-affiliate/video-pipeline';
import { Marquee } from '@/components/ugc-affiliate/marquee';
import { Waitlist } from '@/components/ugc-affiliate/waitlist';

export default function UGCAffiliateLandingPage() {
  const featured = services.filter((s) => s.tier === 'starter' || s.tier === 'growth');
  return (
    <>
      <Hero campaign={campaigns[0]} />

      <Marquee />

      {/* Services Preview */}
      <section className="border-y border-white/10 bg-coal">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-10">
            <p className="label">Services</p>
            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">How We Scale Brands</h2>
            <p className="mt-3 max-w-xl text-bone/60">
              From starter packs to enterprise retainers — every service is built for performance.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((service) => (
              <article key={service.id} className="card flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{service.category}</p>
                  {service.badge && (
                    <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-xs text-gold">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-black uppercase leading-tight">{service.name}</h3>
                <p className="mt-2 text-sm text-bone/60">{service.description}</p>
                <p className="mt-4">
                  <span className="text-3xl font-black">${service.price}</span>
                  <span className="ml-1 text-sm text-bone/50">{service.tier === 'scale' ? '/mo' : ''}</span>
                  {service.compareAt && (
                    <span className="ml-2 text-sm text-bone/40 line-through">${service.compareAt}</span>
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-bone/70">
                      <span className="mt-0.5 text-gold">&#10003;</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <a href={`/ugc-affiliate/contact`} className="btn-gold text-xs">
                    Get Started
                  </a>
                  <a href={`/ugc-affiliate/services`} className="btn-dark text-xs">
                    Details
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlights
      <section className="...">
      </section> */}

      <VideoPipeline ideas={videoIdeas} />

      {/* Testimonials */}
      <section className="border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-10">
            <p className="label">Testimonials</p>
            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">What Clients Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <article key={review.id} className="card">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="text-gold">&#9733;</span>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-black uppercase">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">&ldquo;{review.body}&rdquo;</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                    {review.role} &middot; {review.client}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Waitlist />
    </>
  );
}
