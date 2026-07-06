import { marqueeWords } from '@/data/mock';

export function Marquee() {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-coal py-4">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {words.map((word, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm uppercase tracking-[0.35em] text-bone/60">
            {word}
            <span aria-hidden className="text-gold">
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
