'use client'

import { useState } from 'react'

type KeyStatus = 'Active' | 'Expired' | 'Revoked'

interface ApiKey {
  id: string
  name: string
  provider: string
  status: KeyStatus
  masked: string
  created: string
  lastUsed: string
  rotationInterval: string
}

interface AuditEntry {
  timestamp: string
  action: string
  user: string
  keyName: string
  status: string
}

const mockKeys: ApiKey[] = [
  { id: '1', name: 'Production GPT-4', provider: 'OpenAI', status: 'Active', masked: 'sk-...8f3a', created: '2025-11-03', lastUsed: '2026-07-06', rotationInterval: '90 days' },
  { id: '2', name: 'Claude API Key', provider: 'Anthropic', status: 'Active', masked: 'sk-ant-...c7e2', created: '2026-01-15', lastUsed: '2026-07-05', rotationInterval: '90 days' },
  { id: '3', name: 'Gemini Pro', provider: 'Google AI', status: 'Active', masked: 'AIza...9kLm', created: '2026-02-20', lastUsed: '2026-07-04', rotationInterval: '60 days' },
  { id: '4', name: 'Voice Synthesis', provider: 'ElevenLabs', status: 'Active', masked: 'sk_...b4d8', created: '2026-03-10', lastUsed: '2026-07-06', rotationInterval: '30 days' },
  { id: '5', name: 'Payment Gateway', provider: 'Stripe', status: 'Active', masked: 'sk_live_...x1y2', created: '2025-09-01', lastUsed: '2026-07-06', rotationInterval: '180 days' },
  { id: '6', name: 'Content API', provider: 'Meta', status: 'Expired', masked: 'EAAC...wxyz', created: '2025-06-12', lastUsed: '2026-04-30', rotationInterval: '90 days' },
  { id: '7', name: 'TikTok Business', provider: 'TikTok', status: 'Active', masked: 'tiktok_...jkl0', created: '2026-04-01', lastUsed: '2026-07-05', rotationInterval: '60 days' },
  { id: '8', name: 'YouTube Data', provider: 'YouTube', status: 'Revoked', masked: 'AIza...qRsT', created: '2025-03-15', lastUsed: '2026-05-20', rotationInterval: '90 days' },
  { id: '9', name: 'Reddit Ads', provider: 'Reddit', status: 'Active', masked: 'red_...uvw4', created: '2026-05-10', lastUsed: '2026-07-03', rotationInterval: '30 days' },
]

const auditLog: AuditEntry[] = [
  { timestamp: '2026-07-06 09:32:14', action: 'Key Rotated', user: 'jessica@ugcagency.io', keyName: 'Voice Synthesis', status: 'Completed' },
  { timestamp: '2026-07-05 22:10:47', action: 'Key Viewed', user: 'alex@ugcagency.io', keyName: 'Production GPT-4', status: 'Logged' },
  { timestamp: '2026-07-04 16:05:22', action: 'Key Revoked', user: 'admin@ugcagency.io', keyName: 'YouTube Data', status: 'Completed' },
  { timestamp: '2026-07-03 11:44:09', action: 'Scan Completed', user: 'Security Agent', keyName: '—', status: '12 threats found' },
  { timestamp: '2026-07-02 08:15:33', action: 'Auto-Rotation', user: 'Rotation Agent', keyName: 'Gemini Pro', status: 'Completed' },
]

const statusColor = (status: KeyStatus) => {
  switch (status) {
    case 'Active': return 'text-green-400'
    case 'Expired': return 'text-amber-400'
    case 'Revoked': return 'text-red-400'
  }
}

const statusDot = (status: KeyStatus) => {
  switch (status) {
    case 'Active': return 'bg-green-400'
    case 'Expired': return 'bg-amber-400'
    case 'Revoked': return 'bg-red-400'
  }
}

export default function SecurityVaultPage() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="min-h-screen bg-ink text-bone p-6 space-y-8">
      <div>
        <h1 className="font-black uppercase tracking-widest text-3xl text-gold">
          Security Vault
        </h1>
        <p className="text-bone/60 font-mono text-sm mt-1">
          Manage API keys, OAuth tokens, and secrets
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Keys', value: '9', color: 'text-bone' },
          { label: 'Active', value: '6', color: 'text-green-400' },
          { label: 'Expiring Soon', value: '2', color: 'text-amber-400' },
          { label: 'Rotation Required', value: '3', color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{stat.label}</p>
            <p className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">API Keys</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_1fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Name</span>
              <span>Provider</span>
              <span>Status</span>
              <span>Created</span>
              <span>Last Used</span>
              <span>Rotation</span>
              <span className="text-center">Actions</span>
            </div>
            {mockKeys.map((key) => (
              <div
                key={key.id}
                className="grid grid-cols-[1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_1fr] items-center px-5 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <div>
                  <p className="font-medium">{key.name}</p>
                  <p className="font-mono text-xs text-bone/50">{key.masked}</p>
                </div>
                <span className="font-mono text-xs text-bone/70">{key.provider}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot(key.status)}`} />
                  <span className={`font-mono text-xs ${statusColor(key.status)}`}>{key.status}</span>
                </div>
                <span className="font-mono text-xs text-bone/60">{key.created}</span>
                <span className="font-mono text-xs text-bone/60">{key.lastUsed}</span>
                <span className="font-mono text-xs text-bone/60">{key.rotationInterval}</span>
                <div className="flex items-center justify-center gap-2">
                  <button className="btn-dark text-xs px-2 py-1 rounded-xl font-mono">View</button>
                  <button className="btn-dark text-xs px-2 py-1 rounded-xl font-mono">Rotate</button>
                  <button className="btn-dark text-xs px-2 py-1 rounded-xl font-mono text-red-400">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-black uppercase tracking-widest text-gold">Security Agent</h2>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Last Scan', value: '3 min ago' },
              { label: 'Threats Detected', value: '12', color: 'text-red-400' },
              { label: 'Issues Resolved', value: '187', color: 'text-green-400' },
              { label: 'Active Alerts', value: '1', color: 'text-amber-400' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color || 'text-bone'}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <button className="btn-gold w-full py-2.5 rounded-xl font-black uppercase tracking-widest text-sm">
            Run Security Scan
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-black uppercase tracking-widest text-gold">Rotation Agent</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-mono text-xs uppercase tracking-widest text-bone/50">Auto</span>
              <div
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${autoRotate ? 'bg-gold' : 'bg-white/10'}`}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                <div className={`w-4 h-4 rounded-full bg-ink mt-0.5 transition-transform ${autoRotate ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Keys Due', value: '3', color: 'text-amber-400' },
              { label: 'Last Rotation', value: 'Jul 02' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color || 'text-bone'}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3">
            <p className="font-mono text-xs text-amber-400 font-black uppercase tracking-widest">Keys Due for Rotation</p>
            <ul className="mt-2 space-y-1">
              {['Voice Synthesis (ElevenLabs)', 'Reddit Ads (Reddit)', 'Gemini Pro (Google AI)'].map((k) => (
                <li key={k} className="font-mono text-xs text-bone/70 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <button className="btn w-full py-2.5 rounded-xl border border-white/10 font-black uppercase tracking-widest text-sm">
            Rotate All Due
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="font-black uppercase tracking-widest text-lg text-gold mb-4">Audit Log</h2>
        <div className="space-y-0">
          <div className="grid grid-cols-[1.5fr_1fr_1.2fr_1.2fr_1fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-4 py-2 border-b border-white/10">
            <span>Timestamp</span>
            <span>Action</span>
            <span>User</span>
            <span>Key Name</span>
            <span>Status</span>
          </div>
          {auditLog.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.5fr_1fr_1.2fr_1.2fr_1fr] items-center px-4 py-2.5 border-b border-white/5 last:border-0 text-sm hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-mono text-xs text-bone/60">{entry.timestamp}</span>
              <span className="font-mono text-xs text-bone/80">{entry.action}</span>
              <span className="font-mono text-xs text-bone/70">{entry.user}</span>
              <span className="font-mono text-xs text-bone/70">{entry.keyName}</span>
              <span className="font-mono text-xs text-bone/60">{entry.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal/40 p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40 text-center">
          Security Vault &mdash; Secrets are never displayed in full &bull; All access is logged &bull; Rotate keys regularly
        </p>
      </div>
    </div>
  )
}
