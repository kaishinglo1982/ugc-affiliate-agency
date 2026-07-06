'use client'

import { useState } from 'react'

const apiTokens = [
  { id: 'tok-1', name: 'Production API Key', token: 'ugc_prod_••••••••••••a1b2', scopes: ['content:read', 'analytics:read', 'publishing:write'], rateLimit: 1000, expiresAt: '2027-01-01', lastUsed: '2026-07-06T09:00:00Z', status: 'active', createdAt: '2026-01-01' },
  { id: 'tok-2', name: 'Development Key', token: 'ugc_dev_••••••••••••c3d4', scopes: ['*'], rateLimit: 100, expiresAt: null, lastUsed: '2026-07-05T14:00:00Z', status: 'active', createdAt: '2026-01-01' },
  { id: 'tok-3', name: 'Staging Key (expired)', token: 'ugc_stg_••••••••••••e5f6', scopes: ['content:read'], rateLimit: 500, expiresAt: '2026-06-01', lastUsed: '2026-05-30T10:00:00Z', status: 'expired', createdAt: '2026-01-01' },
]

const scopes = [
  { name: 'content:read', description: 'Read content and assets', risk: 'low' },
  { name: 'content:write', description: 'Create and modify content', risk: 'medium' },
  { name: 'analytics:read', description: 'View analytics and reports', risk: 'low' },
  { name: 'publishing:read', description: 'View publishing schedules', risk: 'low' },
  { name: 'publishing:write', description: 'Create and publish content', risk: 'high' },
  { name: 'finance:read', description: 'View financial data', risk: 'medium' },
  { name: 'admin:read', description: 'Read admin configuration', risk: 'high' },
  { name: 'admin:write', description: 'Modify admin settings', risk: 'high' },
]

const rateLimits = [
  { scope: 'REST API', limit: 1000, remaining: 847, resetIn: '45 min', status: 'ok' },
  { scope: 'GraphQL', limit: 500, remaining: 123, resetIn: '12 min', status: 'warning' },
  { scope: 'Webhook', limit: 200, remaining: 200, resetIn: '—', status: 'ok' },
  { scope: 'Auth', limit: 100, remaining: 2, resetIn: '58 min', status: 'critical' },
]

const auditLogs = [
  { id: 'al-1', action: 'api.token.generate', user: 'admin@ugcagency.com', ip: '192.168.1.1', timestamp: '2026-07-06T09:00:00Z', details: 'Generated Production API Key' },
  { id: 'al-2', action: 'api.token.revoke', user: 'admin@ugcagency.com', ip: '192.168.1.1', timestamp: '2026-07-05T14:00:00Z', details: 'Revoked expired staging key' },
  { id: 'al-3', action: 'api.call', user: 'system', ip: '10.0.0.1', timestamp: '2026-07-06T10:00:00Z', details: 'GET /api/v1/analytics — 200 OK' },
  { id: 'al-4', action: 'api.rate_limit.hit', user: 'system', ip: '10.0.0.2', timestamp: '2026-07-06T09:30:00Z', details: 'Rate limit exceeded for dev key' },
]

const riskBadge = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-500/10 text-green-400'
    case 'medium': return 'bg-amber-500/10 text-amber-400'
    case 'high': return 'bg-red-500/10 text-red-400'
    default: return 'bg-bone/10 text-bone/60'
  }
}

const actionBadge = (action: string) => {
  if (action.startsWith('api.token.generate')) return 'bg-emerald-500/10 text-emerald-400'
  if (action.startsWith('api.token.revoke')) return 'bg-red-500/10 text-red-400'
  if (action.startsWith('api.call')) return 'bg-blue-500/10 text-blue-400'
  if (action.startsWith('api.rate_limit')) return 'bg-amber-500/10 text-amber-400'
  return 'bg-bone/10 text-bone/60'
}

const rateStatusStyles: Record<string, string> = {
  ok: 'text-green-400',
  warning: 'text-amber-400',
  critical: 'text-red-400',
}

const formatDate = (iso: string | null) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ApiLayerPage() {
  return (
    <div className="min-h-screen bg-ink text-bone p-6 space-y-8">
      <div>
        <h1 className="font-black uppercase tracking-widest text-3xl text-gold">
          API Layer
        </h1>
        <p className="text-bone/60 font-mono text-sm mt-1">
          Manage API tokens, scopes, rate limits, and audit logs
        </p>
      </div>

      {/* ─── API Tokens ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">API Tokens</h2>
          <button className="btn-dark text-xs px-4 py-2 rounded-xl font-mono">Generate New Token</button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[1fr_1.2fr_1.2fr_0.6fr_0.7fr_0.8fr_0.6fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Name</span>
              <span>Token</span>
              <span>Scopes</span>
              <span>Rate Limit</span>
              <span>Expires</span>
              <span>Last Used</span>
              <span>Status</span>
            </div>
            {apiTokens.map((token) => (
              <div
                key={token.id}
                className="grid grid-cols-[1fr_1.2fr_1.2fr_0.6fr_0.7fr_0.8fr_0.6fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className="font-medium">{token.name}</span>
                <span className="font-mono text-xs text-bone/60">{token.token}</span>
                <div className="flex flex-wrap gap-1">
                  {token.scopes.map((scope) => (
                    <span
                      key={scope}
                      className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-bone/60"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-bone/60">{token.rateLimit}/min</span>
                <span className="font-mono text-xs text-bone/60">
                  {token.expiresAt ? formatDate(token.expiresAt) : 'Never'}
                </span>
                <span className="font-mono text-xs text-bone/60">
                  {token.lastUsed ? formatDate(token.lastUsed) : '—'}
                </span>
                <span className={`font-mono text-xs ${token.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                  {token.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scopes ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">Available Scopes</h2>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scopes.map((scope) => (
            <div key={scope.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-bone">{scope.name}</span>
                <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${riskBadge(scope.risk)}`}>
                  {scope.risk}
                </span>
              </div>
              <p className="font-mono text-[10px] text-bone/50 leading-relaxed">{scope.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Rate Limits ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">Rate Limits</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.6fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Scope</span>
              <span>Limit</span>
              <span>Remaining</span>
              <span>Reset In</span>
              <span>Status</span>
            </div>
            {rateLimits.map((rl) => (
              <div
                key={rl.scope}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_0.6fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className="font-medium">{rl.scope}</span>
                <span className="font-mono text-xs text-bone/60">{rl.limit}</span>
                <span className="font-mono text-xs text-bone/60">{rl.remaining}</span>
                <span className="font-mono text-xs text-bone/60">{rl.resetIn}</span>
                <span className={`font-mono text-xs font-semibold uppercase ${rateStatusStyles[rl.status]}`}>
                  {rl.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Audit Logs ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">Audit Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1.5fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Action</span>
              <span>User</span>
              <span>IP</span>
              <span>Timestamp</span>
              <span>Details</span>
            </div>
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1.5fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${actionBadge(log.action)}`}>
                  {log.action}
                </span>
                <span className="font-mono text-xs text-bone/70">{log.user}</span>
                <span className="font-mono text-xs text-bone/50">{log.ip}</span>
                <span className="font-mono text-xs text-bone/60">
                  {formatDate(log.timestamp)}
                </span>
                <span className="font-mono text-xs text-bone/60">{log.details}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
