'use client'

import { systemHealth, whiteLabelSettings, teamMembers } from '@/data/enterprise'

const apiTokens = [
  { id: 'tok-1', tenantId: 't1', name: 'Production API Key', scopes: ['content:read', 'analytics:read'], expiresAt: '2027-01-01', lastUsed: '2026-07-06T09:00:00Z', createdAt: '2026-01-01' },
  { id: 'tok-2', tenantId: 't1', name: 'Development Key', scopes: ['*'], expiresAt: null, lastUsed: '2026-07-05T14:00:00Z', createdAt: '2026-01-01' },
]

const statusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'text-green-400'
    case 'degraded': return 'text-amber-400'
    case 'down': return 'text-red-400'
    default: return 'text-bone/50'
  }
}

const statusDot = (status: string) => {
  switch (status) {
    case 'healthy': return 'bg-green-400'
    case 'degraded': return 'bg-amber-400'
    case 'down': return 'bg-red-400'
    default: return 'bg-bone/20'
  }
}

const roleBadge = (role: string) => {
  switch (role) {
    case 'admin': return 'text-red-400'
    case 'manager': return 'text-gold'
    case 'agent': return 'text-blue-400'
    case 'viewer': return 'text-gray-400'
    default: return 'text-bone/50'
  }
}

const memberStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400'
    case 'invited': return 'text-amber-400'
    case 'disabled': return 'text-red-400'
    default: return 'text-bone/50'
  }
}

const formatDate = (iso: string | null) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function EnterpriseAdminConsole() {
  return (
    <div className="min-h-screen bg-ink text-bone p-6 space-y-8">
      <div>
        <h1 className="font-black uppercase tracking-widest text-3xl text-gold">
          Enterprise Admin Console
        </h1>
        <p className="text-bone/60 font-mono text-sm mt-1">
          System administration and monitoring
        </p>
      </div>

      {/* ─── System Health ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">System Health</h2>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusDot(systemHealth.status)}`} />
            <span className={`font-mono text-xs uppercase tracking-widest ${statusColor(systemHealth.status)}`}>
              {systemHealth.status}
            </span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-4 gap-4 border-b border-white/10">
          {[
            { label: 'Uptime', value: `${systemHealth.uptime}%` },
            { label: 'Active Agents', value: String(systemHealth.activeAgents) },
            { label: 'Queue Depth', value: String(systemHealth.queueDepth) },
            { label: 'Last Incident', value: systemHealth.lastIncident ? formatDate(systemHealth.lastIncident) : 'None' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-bone">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="grid grid-cols-[1fr_1fr_1fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Service</span>
              <span>Status</span>
              <span>Latency</span>
            </div>
            {systemHealth.services.map((service) => (
              <div
                key={service.name}
                className="grid grid-cols-[1fr_1fr_1fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className="font-medium">{service.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot(service.status)}`} />
                  <span className={`font-mono text-xs ${statusColor(service.status)}`}>{service.status}</span>
                </div>
                <span className="font-mono text-xs text-bone/60">{service.latency} ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── White Label Settings ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">White Label Settings</h2>
          <button className="btn-dark text-xs px-4 py-2 rounded-xl font-mono">Edit</button>
        </div>
        <div className="p-5 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mb-1">Primary Color</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: whiteLabelSettings.primaryColor }} />
                <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.primaryColor}</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mb-1">Secondary Color</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: whiteLabelSettings.secondaryColor }} />
                <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.secondaryColor}</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mb-1">Custom Domain</p>
              <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.customDomain || 'Not set'}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mb-1">Email Sender</p>
              <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.emailSender}</span>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mb-1">Login Branding</p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-1">
                <p className="font-mono text-xs text-bone/80">{whiteLabelSettings.loginBranding.title}</p>
                <p className="font-mono text-[10px] text-bone/50">{whiteLabelSettings.loginBranding.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Team Members ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">Team Members</h2>
          <button className="btn-dark text-xs px-4 py-2 rounded-xl font-mono">Invite Member</button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1fr_1.2fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last Active</span>
              <span>Permissions</span>
            </div>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1fr_1.2fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className="font-medium">{member.name}</span>
                <span className="font-mono text-xs text-bone/70">{member.email}</span>
                <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${roleBadge(member.role)}`}>
                  {member.role}
                </span>
                <span className={`font-mono text-xs ${memberStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <span className="font-mono text-xs text-bone/60">
                  {member.lastActive ? formatDate(member.lastActive) : '—'}
                </span>
                <span className="font-mono text-[10px] text-bone/50 truncate" title={member.permissions.join(', ')}>
                  {member.permissions.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── API Tokens ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">API Tokens</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_0.8fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Name</span>
              <span>Scopes</span>
              <span>Expires</span>
              <span>Last Used</span>
              <span>Status</span>
            </div>
            {apiTokens.map((token) => {
              const expired = token.expiresAt && new Date(token.expiresAt) < new Date()
              return (
                <div
                  key={token.id}
                  className="grid grid-cols-[1fr_1.2fr_1fr_1fr_0.8fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
                >
                  <span className="font-medium">{token.name}</span>
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
                  <span className="font-mono text-xs text-bone/60">
                    {token.expiresAt ? formatDate(token.expiresAt) : 'Never'}
                  </span>
                  <span className="font-mono text-xs text-bone/60">
                    {token.lastUsed ? formatDate(token.lastUsed) : '—'}
                  </span>
                  <span className={`font-mono text-xs ${expired ? 'text-red-400' : 'text-green-400'}`}>
                    {expired ? 'Expired' : 'Active'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
