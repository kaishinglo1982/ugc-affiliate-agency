'use client'

import { useState } from 'react'
import { teamMembers } from '@/data/enterprise'

const roleColors: Record<string, string> = {
  admin: 'text-red-400',
  manager: 'text-gold',
  agent: 'text-blue-400',
  viewer: 'text-gray-400',
}

const statusColors: Record<string, string> = {
  active: 'text-green-400',
  invited: 'text-amber-400',
  disabled: 'text-red-400',
}

const statusDotColors: Record<string, string> = {
  active: 'bg-green-400',
  invited: 'bg-amber-400',
  disabled: 'bg-red-400',
}

function relativeTime(iso: string | null): string {
  if (!iso) return '—'
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function TeamManagementPage() {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('agent')

  const handleInvite = () => {
    if (!inviteEmail) return
    setShowInviteForm(false)
    setInviteEmail('')
    setInviteRole('agent')
  }

  return (
    <div className="min-h-screen bg-ink text-bone p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black uppercase tracking-widest text-3xl text-gold">
            Team Management
          </h1>
          <p className="text-bone/60 font-mono text-sm mt-1">
            Manage team members, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="bg-gold text-ink text-xs px-4 py-2 rounded-xl font-mono font-semibold"
        >
          Invite Member
        </button>
      </div>

      {/* ─── Invite Form ─── */}
      {showInviteForm && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-black uppercase tracking-widest text-sm text-gold">Invite New Member</h2>
          </div>
          <div className="p-5 flex items-end gap-4">
            <div className="flex-1 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Email Address</p>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 font-mono text-sm text-bone outline-none focus:border-gold/50 transition-colors placeholder:text-bone/30"
              />
            </div>
            <div className="w-40 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Role</p>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 font-mono text-sm text-bone outline-none focus:border-gold/50 transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="agent">Agent</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button
              onClick={handleInvite}
              className="bg-gold text-ink text-xs px-6 py-2.5 rounded-xl font-mono font-semibold"
            >
              Send Invite
            </button>
          </div>
        </div>
      )}

      {/* ─── Team Members Table ─── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">
            Members ({teamMembers.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_1fr_1.2fr_0.8fr] font-mono text-xs uppercase tracking-widest text-bone/50 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last Active</span>
              <span>Permissions</span>
              <span>Actions</span>
            </div>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_1fr_1.2fr_0.8fr] items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-sm"
              >
                <span className="font-medium">{member.name}</span>
                <span className="font-mono text-xs text-bone/70">{member.email}</span>
                <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${roleColors[member.role] || 'text-bone/50'}`}>
                  {member.role}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotColors[member.status] || 'bg-bone/20'}`} />
                  <span className={`font-mono text-xs ${statusColors[member.status] || 'text-bone/50'}`}>
                    {member.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-bone/60">
                  {relativeTime(member.lastActive)}
                </span>
                <span
                  className="font-mono text-[10px] text-bone/50 truncate block max-w-[200px]"
                  title={member.permissions.join(', ')}
                >
                  {member.permissions.join(', ')}
                </span>
                <div className="flex items-center gap-2">
                  <button className="font-mono text-[10px] text-bone/40 hover:text-bone/70 transition-colors">Edit</button>
                  <button className="font-mono text-[10px] text-red-400/60 hover:text-red-400 transition-colors">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
