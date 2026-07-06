'use client';

import { useState } from 'react';

type ApiKey = {
  id: string;
  name: string;
  value: string;
  masked: string;
  service: string;
  createdAt: string;
  lastUsed: string;
  isActive: boolean;
};

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Neon Database',
      value: 'postgresql://[user]:[password]@[host]/[database]',
      masked: 'postgresql://***:***@db-*.neon.tech/neon',
      service: 'Neon',
      createdAt: '2026-07-01',
      lastUsed: '2 minutes ago',
      isActive: true,
    },
    {
      id: '2',
      name: 'Gemini AI Gateway',
      value: 'sk-ant-***',
      masked: 'sk-ant-***',
      service: 'Vercel AI',
      createdAt: '2026-06-15',
      lastUsed: '1 minute ago',
      isActive: true,
    },
  ]);

  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  const handleCopyKey = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopySuccess({ ...copySuccess, [id]: true });
    setTimeout(() => setCopySuccess({ ...copySuccess, [id]: false }), 2000);
  };

  const handleRotateKey = (id: string) => {
    // In production, this would call an API to generate a new key
    alert(`Rotate key for ${apiKeys.find((k) => k.id === id)?.name}? This action requires Vercel dashboard access.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="label">Active API Keys</p>
        <p className="mt-2 text-sm text-bone/60">
          Manage integration keys. Never share these values. Rotate every 90 days.
        </p>
      </div>

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className={`rounded-3xl border p-6 transition-all ${
              key.isActive ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/[0.03] opacity-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-bone">{key.name}</h3>
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-mono uppercase text-gold">
                    {key.service}
                  </span>
                  {key.isActive ? (
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-mono uppercase text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-mono uppercase text-red-400">
                      Inactive
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <code className="flex-1 rounded-lg bg-black/30 px-4 py-2 font-mono text-sm text-bone/70">
                      {showValues[key.id] ? key.value : key.masked}
                    </code>
                    <button
                      onClick={() => setShowValues({ ...showValues, [key.id]: !showValues[key.id] })}
                      className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold uppercase hover:bg-white/20"
                    >
                      {showValues[key.id] ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => handleCopyKey(key.id, key.value)}
                      className="rounded-lg bg-gold/20 px-3 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/30"
                    >
                      {copySuccess[key.id] ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-6 text-xs text-bone/50">
                  <div>
                    <p className="font-mono uppercase tracking-wider">Created</p>
                    <p>{key.createdAt}</p>
                  </div>
                  <div>
                    <p className="font-mono uppercase tracking-wider">Last Used</p>
                    <p>{key.lastUsed}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRotateKey(key.id)}
                  className="rounded-lg border border-gold/30 bg-black/20 px-4 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/20"
                >
                  Rotate Key
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Key Section */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="font-black text-bone">Add New Integration</p>
        <p className="mt-2 text-sm text-bone/60">Add API keys for new integrations (Stripe, Highfield, etc.)</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <button className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-left hover:bg-black/30">
            <p className="font-black text-gold">+ Stripe</p>
            <p className="mt-1 text-xs text-bone/50">Payment processing</p>
          </button>
          <button className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-left hover:bg-black/30">
            <p className="font-black text-gold">+ Highfield</p>
            <p className="mt-1 text-xs text-bone/50">UGC campaigns</p>
          </button>
          <button className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-left hover:bg-black/30">
            <p className="font-black text-gold">+ Custom Service</p>
            <p className="mt-1 text-xs text-bone/50">Add any API key</p>
          </button>
        </div>
      </div>
    </div>
  );
}
