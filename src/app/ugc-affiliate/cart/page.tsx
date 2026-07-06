export const metadata = {
  title: 'Contact — UGC Affiliate Agency',
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="label">Get in Touch</p>
      <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">Contact</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-bone/60">
        Ready to scale your brand with UGC content? Tell us about your campaign and we&apos;ll
        put together a custom proposal within 48 hours.
      </p>

      <form className="mt-10 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-bone/50">Name</label>
            <input type="text" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold/50" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-bone/50">Email</label>
            <input type="email" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold/50" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-bone/50">Budget Range</label>
          <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold/50">
            <option className="bg-ink">Under $1,000</option>
            <option className="bg-ink">$1,000 - $3,000</option>
            <option className="bg-ink">$3,000 - $10,000</option>
            <option className="bg-ink">$10,000+</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-bone/50">Message</label>
          <textarea rows={5} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold/50" placeholder="Tell us about your brand and campaign goals..." />
        </div>
        <button type="submit" className="btn-gold">
          Send Inquiry
        </button>
      </form>
    </section>
  );
}
