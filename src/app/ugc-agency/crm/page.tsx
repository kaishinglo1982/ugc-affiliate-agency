'use client'

import { useState } from 'react'
import {
  leads,
  contacts,
  deals,
  tasks,
  followUpTemplates,
} from '@/data/enterprise'
import type { Lead } from '@/data/enterprise'

type Tab = 'leads' | 'contacts' | 'deals' | 'tasks' | 'templates'

const tabs: { key: Tab; label: string }[] = [
  { key: 'leads', label: 'Leads' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'deals', label: 'Deals' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'templates', label: 'Follow-up Templates' },
]

const statusColors: Record<string, string> = {
  new: 'text-blue-400',
  contacted: 'text-gold',
  qualified: 'text-green-400',
  converted: 'text-emerald-400',
  lost: 'text-red-400',
}

const priorityColors: Record<string, string> = {
  low: 'text-gray-400',
  medium: 'text-blue-400',
  high: 'text-amber-400',
  urgent: 'text-red-400',
}

const sourceColors: Record<string, string> = {
  comment: 'bg-sky-500/20 text-sky-400',
  dm: 'bg-violet-500/20 text-violet-400',
  form: 'bg-emerald-500/20 text-emerald-400',
  'affiliate-request': 'bg-amber-500/20 text-amber-400',
  referral: 'bg-rose-500/20 text-rose-400',
}

const triggerColors: Record<string, string> = {
  'new-lead': 'bg-blue-500/20 text-blue-400',
  'no-response': 'bg-amber-500/20 text-amber-400',
  'deal-proposal': 'bg-emerald-500/20 text-emerald-400',
  'deal-closed': 'bg-violet-500/20 text-violet-400',
  're-engagement': 'bg-rose-500/20 text-rose-400',
}

const channelColors: Record<string, string> = {
  email: 'bg-sky-500/20 text-sky-400',
  dm: 'bg-violet-500/20 text-violet-400',
  whatsapp: 'bg-emerald-500/20 text-emerald-400',
}

const stageColors: Record<string, string> = {
  discovery: 'bg-blue-500/20 text-blue-400',
  proposal: 'bg-amber-500/20 text-amber-400',
  negotiation: 'bg-violet-500/20 text-violet-400',
  'closed-won': 'bg-emerald-500/20 text-emerald-400',
  'closed-lost': 'bg-red-500/20 text-red-400',
}

const taskStatusColors: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-amber-500/20 text-amber-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-gray-500/20 text-gray-400',
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0 })
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const scheduledFollowUps = [
  { id: 'sf-1', leadName: 'Max Mustermann', template: 'New Lead Welcome', scheduledAction: 'Send welcome email', requiresManualApproval: false, status: 'active' },
  { id: 'sf-2', leadName: 'Anna Schmidt', template: 'Follow-up No Response', scheduledAction: 'Send follow-up email', requiresManualApproval: true, status: 'pending-approval' },
]

export default function CrmPage() {
  const [activeTab, setActiveTab] = useState<Tab>('leads')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredLeads: Lead[] =
    statusFilter === 'all'
      ? leads
      : leads.filter((l) => l.status === statusFilter)

  const statuses = ['all', ...new Set(leads.map((l) => l.status))]

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">CRM</h1>
          <p className="mt-1 text-sm text-bone/40">
            Manage leads, contacts, deals, and tasks
          </p>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex flex-wrap gap-1 rounded-xl border border-ash bg-coal p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all duration-150 ${
                activeTab === tab.key
                  ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                  : 'text-bone/40 hover:bg-ash hover:text-bone/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Leads Tab ── */}
        {activeTab === 'leads' && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-bone">LEADS</h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg bg-smoke px-3 py-1.5 text-xs text-bone/70 outline-none ring-1 ring-ash focus:ring-gold"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ash text-bone/40">
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Name</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Email</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Source</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Platform</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Status</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Score</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-ash/50 last:border-0">
                      <td className="px-4 py-3 font-medium text-bone">{lead.name}</td>
                      <td className="px-4 py-3 text-bone/70">{lead.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                            sourceColors[lead.source] || 'bg-ash text-bone/60'
                          }`}
                        >
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-bone/70">{lead.platform}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                            statusColors[lead.status] || 'text-bone/60'
                          } bg-ash`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ash">
                            <div
                              className="h-full rounded-full bg-gold"
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-bone/50">{lead.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-bone/50">{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Contacts Tab ── */}
        {activeTab === 'contacts' && (
          <section>
            <h2 className="mb-5 text-lg font-bold text-bone">CONTACTS</h2>
            <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ash text-bone/40">
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Name</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Email</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Company</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Role</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Social Profiles</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-ash/50 last:border-0">
                      <td className="px-4 py-3 font-medium text-bone">{contact.name}</td>
                      <td className="px-4 py-3 text-bone/70">{contact.email}</td>
                      <td className="px-4 py-3 text-bone/70">{contact.company || '—'}</td>
                      <td className="px-4 py-3 text-bone/70">{contact.role || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {contact.socialProfiles.map((sp, i) => (
                            <span
                              key={i}
                              className="rounded bg-ash px-2 py-0.5 text-[10px] text-bone/70"
                            >
                              {sp.platform}: {sp.handle}
                            </span>
                          ))}
                          {contact.socialProfiles.length === 0 && (
                            <span className="text-bone/30">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-ash px-2 py-0.5 text-[10px] text-bone/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Deals Tab ── */}
        {activeTab === 'deals' && (
          <section>
            <h2 className="mb-5 text-lg font-bold text-bone">DEALS</h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4" style={{ minWidth: '900px' }}>
                {(['discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost'] as const).map(
                  (stage) => {
                    const stageLabel = stage
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')
                    const stageDeals = deals.filter((d) => d.stage === stage)
                    return (
                      <div key={stage} className="flex w-64 shrink-0 flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                              stageColors[stage]
                            }`}
                          >
                            {stageLabel}
                          </span>
                          <span className="text-[10px] text-bone/30">{stageDeals.length}</span>
                        </div>
                        {stageDeals.map((deal) => (
                          <div
                            key={deal.id}
                            className="flex flex-col gap-2 rounded-xl border border-ash bg-coal p-4"
                          >
                            <span className="text-sm font-bold text-bone">{deal.name}</span>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                              <span className="text-bone/40">Value</span>
                              <span className="text-right font-medium text-gold">
                                {formatCurrency(deal.value)}
                              </span>
                              <span className="text-bone/40">Probability</span>
                              <span className="text-right font-medium text-bone">
                                {deal.probability}%
                              </span>
                              <span className="text-bone/40">Close</span>
                              <span className="text-right text-bone/70">
                                {formatDate(deal.expectedCloseDate)}
                              </span>
                              <span className="text-bone/40">Source</span>
                              <span className="text-right text-bone/70">{deal.source}</span>
                            </div>
                            <span
                              className={`self-start rounded px-2 py-0.5 text-[10px] font-medium ${
                                stageColors[deal.stage]
                              }`}
                            >
                              {stageLabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  },
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Tasks Tab ── */}
        {activeTab === 'tasks' && (
          <section>
            <h2 className="mb-5 text-lg font-bold text-bone">TASKS</h2>
            <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ash text-bone/40">
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Title</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Related To</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Assignee</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Due Date</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Status</th>
                    <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-ash/50 last:border-0">
                      <td className="px-4 py-3 font-medium text-bone">{task.title}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-ash px-2 py-0.5 text-[10px] text-bone/70">
                          {task.relatedTo.type}:{task.relatedTo.id}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-bone/70">{task.assignee}</td>
                      <td className="px-4 py-3 text-bone/50">{formatDate(task.dueDate)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                            taskStatusColors[task.status]
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                            priorityColors[task.priority]
                          } bg-ash`}
                        >
                          {task.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Follow-up Templates Tab ── */}
        {activeTab === 'templates' && (
          <section>
            <h2 className="mb-5 text-lg font-bold text-bone">FOLLOW-UP TEMPLATES</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {followUpTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="flex flex-col gap-3 rounded-xl border border-ash bg-coal p-5"
                >
                  <span className="text-sm font-bold text-bone">{tpl.name}</span>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                        triggerColors[tpl.trigger] || 'bg-ash text-bone/60'
                      }`}
                    >
                      {tpl.trigger}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                        channelColors[tpl.channel] || 'bg-ash text-bone/60'
                      }`}
                    >
                      {tpl.channel}
                    </span>
                  </div>
                  <p className="text-xs italic leading-relaxed text-bone/60">
                    &ldquo;{tpl.subject}&rdquo;
                  </p>
                  <span className="text-[10px] text-bone/40">
                    Delay: {tpl.delayDays} day{tpl.delayDays !== 1 ? 's' : ''}
                  </span>
                  <button className="mt-2 self-start rounded-lg bg-gold px-4 py-1.5 text-[10px] font-bold text-ink transition-all hover:bg-gold/90 shadow-lg shadow-gold/20">
                    Trigger Follow-up
                  </button>
                </div>
              ))}
            </div>

            {/* ── Scheduled Follow-ups ── */}
            <div className="mt-10">
              <h3 className="mb-4 text-base font-bold text-bone">SCHEDULED FOLLOW-UPS</h3>
              <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-ash text-bone/40">
                      <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Lead Name</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Template</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Scheduled Action</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Status</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledFollowUps.map((sf) => (
                      <tr key={sf.id} className="border-b border-ash/50 last:border-0">
                        <td className="px-4 py-3 font-medium text-bone">{sf.leadName}</td>
                        <td className="px-4 py-3 text-bone/80">{sf.template}</td>
                        <td className="px-4 py-3 text-bone/70">{sf.scheduledAction}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase ${
                            sf.status === 'active' ? 'text-green-400 bg-green-400/10' : 'text-amber-400 bg-amber-400/10'
                          }`}>
                            {sf.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {sf.requiresManualApproval ? (
                            <button className="rounded bg-gold/20 px-3 py-1 text-[10px] font-semibold text-gold hover:bg-gold/30 transition-colors">
                              Approve
                            </button>
                          ) : (
                            <span className="text-[10px] text-bone/30">Auto-approved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {scheduledFollowUps.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-xs text-bone/20">No scheduled follow-ups</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
