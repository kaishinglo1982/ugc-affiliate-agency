export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ink py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-bone mb-4">
            Start a Campaign
          </h1>
          <p className="text-lg text-bone/70 max-w-2xl mx-auto">
            Tell us about your brand and goals. Once you submit, our team reviews your
            brief and responds within 24 hours with a tailored proposal.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <form className="md:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-2 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-bone placeholder:text-bone/30 focus:border-gold/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-bone placeholder:text-bone/30 focus:border-gold/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-2 block">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Brand or business name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-bone placeholder:text-bone/30 focus:border-gold/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="budget" className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-2 block">
                  Budget Range
                </label>
                <select
                  id="budget"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-bone focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-ink text-bone/50">Select a range</option>
                  <option value="under-5k" className="bg-ink text-bone">Under $5,000</option>
                  <option value="5k-10k" className="bg-ink text-bone">$5,000 – $10,000</option>
                  <option value="10k-25k" className="bg-ink text-bone">$10,000 – $25,000</option>
                  <option value="25k-50k" className="bg-ink text-bone">$25,000 – $50,000</option>
                  <option value="50k+" className="bg-ink text-bone">$50,000+</option>
                </select>
              </div>
            </div>

            <fieldset>
              <legend className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-3 block">
                Service Interest
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "video-production", label: "Video Production" },
                  { id: "creator-management", label: "Creator Management" },
                  { id: "campaign-strategy", label: "Campaign Strategy" },
                  { id: "analytics", label: "Analytics" },
                ].map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-gold/30 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      className="accent-gold w-4 h-4"
                    />
                    <span className="text-bone/80 text-sm">{service.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="message" className="label text-bone/80 text-sm font-mono uppercase tracking-widest mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your campaign goals, target audience, and any specific requirements..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-bone placeholder:text-bone/30 focus:border-gold/50 focus:outline-none transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold w-full sm:w-auto px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Send Inquiry
            </button>
          </form>

          <aside className="md:col-span-2 space-y-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h2 className="font-black uppercase tracking-widest text-gold text-sm mb-6">
                What happens next?
              </h2>
              <ol className="space-y-5">
                {[
                  { step: "01", title: "We review within 24h", desc: "Our team reads your brief and assesses fit." },
                  { step: "02", title: "Custom proposal", desc: "We craft a tailored campaign plan and pricing." },
                  { step: "03", title: "Creator match", desc: "We pair you with UGC creators that fit your brand." },
                  { step: "04", title: "Campaign launch", desc: "Production begins and content goes live." },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="text-gold font-black font-mono text-lg leading-none mt-0.5 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-bone font-bold text-sm uppercase tracking-widest">
                        {item.title}
                      </h3>
                      <p className="text-bone/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h2 className="font-black uppercase tracking-widest text-gold text-sm mb-4">
                Direct Contact
              </h2>
              <p className="text-bone/80 text-sm mb-2">Prefer to reach out directly?</p>
              <a
                href="mailto:hello@ugcaffiliate.agency"
                className="text-gold font-mono text-sm hover:underline"
              >
                hello@ugcaffiliate.agency
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
