'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Channel = 'email' | 'whatsapp';

export function Waitlist({ source = 'landing-page' }: { source?: string }) {
  const [channel, setChannel] = useState<Channel>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/v1/ugc-affiliate/shop/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: channel === 'whatsapp' ? phone : undefined, channel, source }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setMessage('You\u2019re on the list. We\u2019ll be in touch with the next campaign opportunity.');
      setEmail('');
      setPhone('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Check your details and try again.');
    }
  }

  return (
    <section id="waitlist" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grain overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label">Early Access</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-balance md:text-6xl">
            Join the Waitlist
          </h2>
          <p className="mt-4 leading-relaxed text-bone/60">
            Campaigns are invite-first. Choose how you want early access before the public launch.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-white/15 p-1" role="tablist" aria-label="Contact channel">
            {(['email', 'whatsapp'] as Channel[]).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={channel === c}
                onClick={() => setChannel(c)}
                className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  channel === c ? 'bg-gold text-ink' : 'text-bone/60 hover:text-bone'
                }`}
              >
                {c === 'email' ? 'Email' : 'WhatsApp'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              disabled={status === 'loading'}
              className="flex-1 rounded-full border border-white/20 bg-ink px-6 py-3 text-bone placeholder:text-bone/40 focus:border-gold focus:outline-none disabled:opacity-60"
            />
            {channel === 'whatsapp' && (
              <>
                <label htmlFor="waitlist-phone" className="sr-only">
                  WhatsApp number
                </label>
                <input
                  id="waitlist-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7000 000000"
                  disabled={status === 'loading'}
                  className="flex-1 rounded-full border border-white/20 bg-ink px-6 py-3 text-bone placeholder:text-bone/40 focus:border-gold focus:outline-none disabled:opacity-60"
                />
              </>
            )}
            <button type="submit" className="btn-gold" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining\u2026' : 'Get Access'}
            </button>
          </form>

          {message && (
            <p
              role="status"
              className={`mt-4 font-mono text-sm ${status === 'error' ? 'text-red-400' : 'text-gold'}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
