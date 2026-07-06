export const metadata = {
  title: 'Booking — UGC Affiliate Agency',
};

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="label">Book a Call</p>
      <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">Discovery Call</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-bone/60">
        Let&apos;s talk about your brand. In a 30-minute call we&apos;ll assess your current
        content strategy, identify opportunities, and outline a UGC plan tailored to your goals.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-xl font-black uppercase">What to expect</h2>
        <ul className="mt-4 space-y-3">
          {[
            'Review of your current content and ad performance',
            'Audience and competitor analysis',
            'Custom UGC strategy outline',
            'Pricing and package recommendation',
            'No commitment — just insights',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-bone/70">
              <span className="mt-0.5 text-gold">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href="mailto:hello@ugcaffiliate.agency"
          className="btn-gold mt-8 inline-flex"
        >
          Book Your Free Call
        </a>
      </div>
    </section>
  );
}
