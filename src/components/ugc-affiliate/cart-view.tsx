'use client';

import Link from 'next/link';
import { useCart } from '@/components/ugc-affiliate/cart-provider';
import { products } from '@/data/mock';

export function CartView() {
  const { items, subtotal, setQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <p className="text-xl text-bone/70">Your cart is empty.</p>
        <Link href="/ugc-affiliate/products" className="btn-gold mt-6">
          Browse Services
        </Link>
      </div>
    );
  }

  const inCartIds = new Set(items.map((i) => i.productId));
  const upsells = products.filter((p) => !inCartIds.has(p.id)).slice(0, 2);

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <article
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-coal p-3">
                <p className="text-center font-mono text-xs uppercase tracking-widest text-bone/40">
                  {product.category}
                </p>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-black uppercase leading-tight">{product.name}</h2>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-bone/50">
                      {product.tier} tier
                    </p>
                  </div>
                  <p className="font-black">&euro;{product.price * item.quantity}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1 rounded-full border border-white/20">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(item.productId, item.size, item.quantity - 1)}
                      className="px-3 py-1 text-bone/70 hover:text-bone"
                    >
                      &minus;
                    </button>
                    <span className="min-w-6 text-center font-mono text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(item.productId, item.size, item.quantity + 1)}
                      className="px-3 py-1 text-bone/70 hover:text-bone"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId, item.size)}
                    className="font-mono text-xs uppercase tracking-widest text-bone/40 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {upsells.length > 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 p-5">
            <p className="label">You May Also Like</p>
            <div className="mt-4 space-y-3">
              {upsells.map((p) => (
                <Link
                  key={p.id}
                  href={`/ugc-affiliate/product/${p.slug}`}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-coal">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                      {p.category === 'Video Production' ? 'VP' : p.category === 'Creator Management' ? 'CM' : p.category === 'Campaign Strategy' ? 'CS' : 'AR'}
                    </span>
                  </div>
                  <span className="flex-1 text-sm">{p.name}</span>
                  <span className="font-mono text-sm text-bone/60">&euro;{p.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-black uppercase">Summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-bone/60">Subtotal</dt>
            <dd>&euro;{subtotal}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-black">
            <dt>Total</dt>
            <dd>&euro;{subtotal}</dd>
          </div>
        </dl>
        <Link href="/ugc-affiliate/checkout" className="btn-gold mt-6 w-full">
          Checkout
        </Link>
        <Link href="/ugc-affiliate/products" className="btn-dark mt-3 w-full">
          Continue Shopping
        </Link>
      </aside>
    </div>
  );
}
