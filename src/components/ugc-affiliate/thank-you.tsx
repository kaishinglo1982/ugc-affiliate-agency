'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Order = {
  orderId: string;
  email: string;
  total: number;
  lineItems: { name: string; size: string; quantity: number; lineTotal: number }[];
};

export function ThankYou() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('wk-order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="grain rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-16">
      <p className="label">Order Confirmed</p>
      <h1 className="mt-4 text-5xl font-black uppercase leading-tight">You&apos;re In.</h1>
      <p className="mt-4 leading-relaxed text-bone/60">
        Nobody knows what&apos;s next — but your order is on its way. A confirmation is heading to
        your inbox.
      </p>

      {order ? (
        <div className="mt-8 rounded-2xl border border-white/10 p-6 text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
            Order {order.orderId}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {order.lineItems.map((l, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-bone/70">
                  {l.name} &middot; {l.size} &times; {l.quantity}
                </span>
                <span>&euro;{l.lineTotal}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-black">
            <span>Total</span>
            <span>&euro;{order.total}</span>
          </p>
        </div>
      ) : (
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-bone/40">
          No recent order found.
        </p>
      )}

      <Link href="/ugc-affiliate/products" className="btn-gold mt-8">
        Keep Shopping
      </Link>
    </div>
  );
}
