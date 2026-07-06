import Link from 'next/link';
import { ProductCard } from '@/components/ugc-affiliate/product-card';
import type { Product } from '@/data/mock';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Collection 001</p>
          <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">Shop the System</h2>
        </div>
        <Link href="/ugc-affiliate/products" className="btn-dark self-start md:self-auto">
          View All
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
