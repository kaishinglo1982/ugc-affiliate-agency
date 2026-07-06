import { Monogram } from '@/components/ugc-affiliate/logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Monogram size={40} className="h-10 w-10 object-contain" />
          <div>
            <p className="text-lg font-black uppercase tracking-[0.2em]">UGC Affiliate Agency</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
              UGC-first &middot; Est. 2025 &middot; Powered by Carry OS
            </p>
          </div>
        </div>
        <p className="max-w-sm text-sm text-bone/50">Content that converts.</p>
        <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
          &copy; {new Date().getFullYear()} UGC Affiliate Agency
        </p>
      </div>
    </footer>
  );
}
