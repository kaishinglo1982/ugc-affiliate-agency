import Image from 'next/image';

export function Monogram({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/wk-monogram.png"
      alt="UGC Affiliate Agency monogram"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function Wordmark({ className = '', tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Monogram size={30} className="h-7 w-7 object-contain" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-black uppercase tracking-[0.2em]">UGC Affiliate Agency</span>
        {tagline && (
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">
            Creator-First &middot; Est. 2024
          </span>
        )}
      </span>
    </span>
  );
}

export function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center text-center ${className}`}>
      <Monogram size={64} className="h-16 w-16 object-contain" />
      <span className="mt-4 text-4xl font-black uppercase tracking-[0.15em] md:text-5xl">UGC Affiliate Agency</span>
      <span className="mt-3 font-mono text-xs uppercase tracking-[0.4em] text-bone/50">
        Oversize &middot; Est. 2024
      </span>
    </span>
  );
}
