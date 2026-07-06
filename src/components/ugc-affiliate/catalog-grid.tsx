'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ugc-affiliate/product-card';
import type { Product } from '@/data/mock';

const categories = ['All', 'Video Production', 'Creator Management', 'Campaign Strategy', 'Analytics & Reporting'] as const;

export function CatalogGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>('All');

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active, products],
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active === category
                ? 'border-gold bg-gold text-ink'
                : 'border-white/20 text-bone/70 hover:border-white/40 hover:text-bone'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
