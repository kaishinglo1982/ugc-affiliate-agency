export default function BrandPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto mb-6">
              <text x="30" y="35" fontSize="32" fontWeight="900" textAnchor="middle" fill="#D4AF9C" fontFamily="Georgia">
                ✦
              </text>
              <path d="M30 50 L35 40 L40 50" stroke="#D4AF9C" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <h1 className="text-7xl md:text-8xl font-serif font-black tracking-tight mb-8" style={{ color: '#D4AF9C' }}>
            UGC
            <br />
            Agency
          </h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase font-light mb-4 text-bone/60">
            Creator-First
          </p>
          <p className="text-sm tracking-widest uppercase font-light text-bone/50">
            Est 2024
          </p>
        </div>

        {/* Background accent */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif mb-8 text-gold">Agency Philosophy</h2>
            <div className="space-y-4 text-bone/70">
              <p className="text-lg font-light leading-relaxed">
                We believe the best brand content comes from real creators, not ad agencies. UGC Affiliate Agency bridges the gap between authentic storytelling and performance marketing.
              </p>
              <ul className="space-y-3 text-sm uppercase tracking-widest font-light">
                <li className="flex items-center gap-3">
                  <span className="text-gold">◆</span> Authentic Content
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">◆</span> Performance-Driven
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">◆</span> Creator Network
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">◆</span> Full-Funnel Strategy
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">◆</span> Data-Backed Decisions
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-serif mb-8 text-gold">Our Approach</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-white/20 rounded" />
                  <div>
                    <p className="font-mono text-sm font-bold">CREATOR BRIEFING</p>
                    <p className="text-xs text-bone/50">Strategic alignment</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#D4AF9C] border border-white/20 rounded" />
                  <div>
                    <p className="font-mono text-sm font-bold">CONTENT PRODUCTION</p>
                    <p className="text-xs text-bone/50">Native UGC assets</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#2a2a2a] border border-white/20 rounded" />
                  <div>
                    <p className="font-mono text-sm font-bold">PERFORMANCE OPTIMISATION</p>
                    <p className="text-xs text-bone/50">Data-driven scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-serif mb-16 text-center text-gold">Core Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/[0.02] border border-white/10 rounded p-8">
              <h3 className="text-2xl font-bold mb-4 text-gold uppercase tracking-wide">UGC Production</h3>
              <ul className="space-y-2 text-bone/70">
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>TikTok Organic Content</span>
                  <span className="text-gold">From €999</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Meta Ad Creatives</span>
                  <span className="text-gold">From €999</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>YouTube Shorts / Reels</span>
                  <span className="text-gold">From €1,499</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>Product Demos & Reviews</span>
                  <span className="text-gold">From €799</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded p-8">
              <h3 className="text-2xl font-bold mb-4 text-gold uppercase tracking-wide">Affiliate Management</h3>
              <ul className="space-y-2 text-bone/70">
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Program Setup & Strategy</span>
                  <span className="text-gold">From €2,999</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Creator Recruitment</span>
                  <span className="text-gold">From €1,499</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Campaign Management</span>
                  <span className="text-gold">From €2,499</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>Performance Analytics</span>
                  <span className="text-gold">From €999</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded p-8">
            <h3 className="text-2xl font-bold mb-4 text-gold uppercase tracking-wide">Add-On Services</h3>
            <ul className="grid md:grid-cols-3 gap-6">
              <li className="flex justify-between items-center py-2">
                <span>Creative Strategy</span>
                <span className="text-gold">€499</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>Ad Copy & Scripting</span>
                <span className="text-gold">€399</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>Influencer Gifting</span>
                <span className="text-gold">€699</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-serif mb-16 text-center text-gold">Why UGC Affiliate Agency</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold uppercase tracking-wide">Creator Network</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-mono text-sm font-bold text-bone">Curated Talent</p>
                  <p className="text-sm text-bone/60">500+ pre-vetted UGC creators across 20+ niches</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-mono text-sm font-bold text-bone">Diverse Styles</p>
                  <p className="text-sm text-bone/60">From lifestyle to tech, fashion to fitness</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-mono text-sm font-bold text-bone">Global Reach</p>
                  <p className="text-sm text-bone/60">Creators across US, UK, EU, and APAC markets</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-mono text-sm font-bold text-bone">Performance Data</p>
                  <p className="text-sm text-bone/60">Every creator tracked on real conversion metrics</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-gold uppercase tracking-wide">Platforms</h3>
              <div className="bg-white/[0.05] rounded p-6">
                <div className="grid grid-cols-4 gap-2 text-center text-sm font-mono">
                  {['TikTok', 'Instagram', 'YouTube', 'Meta Ads', 'Pinterest', 'Snapchat', 'LinkedIn', 'X'].map((platform) => (
                    <div key={platform} className="bg-white/10 rounded py-2 text-bone/70">
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gold uppercase tracking-wide">What Sets Us Apart</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Creator-First Matching', desc: 'AI-powered creator selection based on brand voice and audience fit' },
                { title: 'Performance Guarantee', desc: 'Every campaign includes A/B testing and optimisation' },
                { title: 'Full Rights Management', desc: 'Clear usage rights and licensing for all content produced' },
                { title: 'Real-Time Analytics', desc: 'Live dashboard showing content performance and conversion data' },
              ].map((tech) => (
                <div key={tech.title} className="bg-white/[0.05] rounded p-4">
                  <p className="font-bold text-gold mb-1">{tech.title}</p>
                  <p className="text-sm text-bone/60">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif mb-8 text-gold">Ready to Scale</h2>
          <p className="text-lg text-bone/70 mb-12 leading-relaxed">
            Partner with UGC Affiliate Agency and turn authentic creator content into your biggest growth channel.
          </p>
          <a
            href="/ugc-affiliate/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-bold uppercase tracking-widest rounded hover:bg-gold/90 transition-colors"
          >
            View All Services
          </a>
        </div>
      </section>
    </main>
  );
}
