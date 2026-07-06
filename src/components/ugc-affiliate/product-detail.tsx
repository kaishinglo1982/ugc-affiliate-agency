'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/components/ugc-affiliate/cart-provider';
import type { Product, Review } from '@/data/mock';

export function ProductDetail({ product, reviews }: { product: Product; reviews: Review[] }) {
  const { add } = useCart();
  const router = useRouter();
  const [error, setError] = useState('');

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  function handleAdd(goToCart = false) {
    setError('');
    add(product.id, 'default');
    if (goToCart) router.push('/ugc-affiliate/cart');
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-coal p-12">
          <div className="text-center">
            <p className="label">{product.category}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-bone/40">{product.tier} tier</p>
            <p className="mt-2 text-6xl font-black text-gold">&euro;{product.price}</p>
            {product.compareAt && (
              <p className="font-mono text-bone/40 line-through">&euro;{product.compareAt}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="label">{product.badge}</p>
          {avgRating && (
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50">
              {avgRating} / 5 &middot; {reviews.length} reviews
            </p>
          )}
        </div>
        <h1 className="mt-3 text-4xl font-black uppercase leading-tight md:text-5xl">{product.name}</h1>
        <p className="mt-6 leading-relaxed text-bone/70">{product.description}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <dt className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Turnaround</dt>
            <dd className="mt-1 text-sm font-semibold">{product.turnaround}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <dt className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Revisions</dt>
            <dd className="mt-1 text-sm font-semibold">{product.revisions}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <dt className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Usage</dt>
            <dd className="mt-1 text-sm font-semibold">{product.usage}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn-gold flex-1" onClick={() => handleAdd(false)}>
            Add to Cart
          </button>
          <button type="button" className="btn flex-1" onClick={() => handleAdd(true)}>
            Buy Now
          </button>
        </div>
        {error && <p role="alert" className="mt-3 font-mono text-sm text-red-400">{error}</p>}

        <ul className="mt-10 space-y-2 border-t border-white/10 pt-8">
          {product.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-sm text-bone/70">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {d}
            </li>
          ))}
        </ul>

        {reviews.length > 0 && (
          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-xl font-black uppercase">Reviews</h2>
            <div className="mt-5 space-y-5">
              {reviews.map((r) => (
                <article key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.title}</p>
                    <p className="font-mono text-xs text-gold" aria-label={`${r.rating} out of 5`}>
                      {'\u2605'.repeat(r.rating)}
                      <span className="text-bone/20">{'\u2605'.repeat(5 - r.rating)}</span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-bone/60">{r.body}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-bone/40">
                    {r.author} &middot; {r.date}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
