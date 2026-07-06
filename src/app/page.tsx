import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-ink p-8">
      <section className="mx-auto max-w-5xl py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.5em] text-gold">Carry OS Enterprise Module</p>
        <h1 className="text-5xl font-black md:text-7xl">UGC Affiliate Agency</h1>
        <p className="mt-6 max-w-2xl text-lg text-bone/70">Performance-driven UGC content production, creator management, and affiliate campaign orchestration — powered by AI agents.</p>
        <div className="mt-10 flex gap-4">
          <Link className="btn" href="/ugc-affiliate">Agency Site ansehen</Link>
          <Link className="btn-dark" href="/admin/ugc-affiliate">Admin öffnen</Link>
        </div>
      </section>
    </main>
  );
}
