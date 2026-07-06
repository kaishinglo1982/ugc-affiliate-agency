import type { VideoIdea } from '@/data/mock';

export function VideoPipeline({ ideas }: { ideas: VideoIdea[] }) {
  return (
    <section id="video" className="border-y border-white/10 bg-coal">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Carry OS &middot; UGC Engine</p>
            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">Video Pipeline</h2>
          </div>
          <p className="max-w-xs text-sm text-bone/50">
            AI-scored hooks feeding the automated content center.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ideas.map((idea) => (
            <article key={idea.id} className="card flex flex-col">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{idea.format}</p>
                <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-xs text-gold">
                  {idea.score}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black uppercase leading-tight">{idea.hook}</h3>
              <p className="mt-auto pt-6 text-sm text-bone/60">
                <span className="text-gold">CTA</span> &middot; {idea.cta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
