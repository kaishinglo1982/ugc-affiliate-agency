import Link from 'next/link';
import type { Product } from '@/data/mock';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/ugc-affiliate/product/${product.slug}`}
      className="card group flex flex-col"
      aria-label={`View ${product.name}`}
    >
      <div className="flex items-center justify-between">
        <p className="label">{product.badge}</p>
        <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
          {product.category}
        </p>
      </div>
      <div className="my-6 flex items-center justify-center rounded-2xl bg-coal p-8">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-bone/40">
          {product.tier} tier
        </p>
      </div>
      <h3 className="text-2xl font-black uppercase leading-tight">{product.name}</h3>
      <p className="mt-2 text-sm text-bone/60">{product.description}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black">&euro;{product.price}</p>
          {product.compareAt && (
            <p className="font-mono text-sm text-bone/40 line-through">&euro;{product.compareAt}</p>
          )}
        </div>
        <span className="btn">View</span>
      </div>
    </Link>
  );
}
