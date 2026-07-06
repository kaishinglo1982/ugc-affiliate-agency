'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/components/ugc-affiliate/cart-provider';
import { products } from '@/data/mock';

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const shipping = subtotal >= 150 ? 0 : 12;

  if (items.length === 0 && status !== 'loading') {
    return (
      <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <p className="text-xl text-bone/70">Nothing to check out.</p>
        <Link href="/ugc-affiliate/products" className="btn-gold mt-6">
          Shop the Drop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/v1/ugc-affiliate/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          items: items.map((i) => ({ productId: i.productId, size: i.size, quantity: i.quantity })),
          shipping: {
            name: form.get('name'),
            address: form.get('address'),
            city: form.get('city'),
            country: form.get('country'),
            zip: form.get('zip'),
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error('Checkout failed');
      sessionStorage.setItem('wk-order', JSON.stringify(json.data));
      clear();
      router.push('/ugc-affiliate/thank-you');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="label mb-2">Contact</legend>
          <Field name="email" type="email" label="Email" placeholder="you@email.com" required />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="label mb-2">Shipping</legend>
          <Field name="name" label="Full name" placeholder="Alex Doe" required />
          <Field name="address" label="Address" placeholder="221B Baker Street" required />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field name="city" label="City" placeholder="London" required />
            <Field name="zip" label="ZIP" placeholder="NW1" required />
            <Field name="country" label="Country" placeholder="UK" required />
          </div>
        </fieldset>

        <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
          Payment is handled securely by Stripe on the next step.
        </p>
        {error && <p role="alert" className="font-mono text-sm text-red-400">{error}</p>}
      </div>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-black uppercase">Order</h2>
        <ul className="mt-5 space-y-3 text-sm">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <li key={`${item.productId}-${item.size}`} className="flex justify-between gap-2">
                <span className="text-bone/70">
                  {product.name} &middot; {item.size} &times; {item.quantity}
                </span>
                <span>&euro;{product.price * item.quantity}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-bone/60">Subtotal</dt>
            <dd>&euro;{subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-bone/60">Shipping</dt>
            <dd>{shipping === 0 ? 'Free' : `\u20ac${shipping}`}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-black">
            <dt>Total</dt>
            <dd>&euro;{subtotal + shipping}</dd>
          </div>
        </dl>
        <button type="submit" className="btn-gold mt-6 w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Processing\u2026' : 'Pay Now'}
        </button>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-widest text-bone/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/20 bg-ink px-4 py-3 text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
