'use client'

import { useState } from 'react'
import { workflows, runLogs } from '@/data/enterprise'
import type { ApprovalGate } from '@/data/enterprise'

const pendingGates: ApprovalGate[] = [
  { id: 'ag-1', workflowId: 'wf-2', name: 'Reddit Post Approval', requiredRole: 'manager', status: 'pending', requestedAt: '2026-07-06T08:00:00Z', resolvedAt: null, resolvedBy: null },
]

const statusColor: Record<string, string> = {
  active: 'text-green-400',
  paused: 'text-amber-400',
  draft: 'text-gray-400',
  completed: 'text-green-400',
  running: 'text-blue-400',
  failed: 'text-red-400',
  pending: 'text-amber-400',
  approved: 'text-green-400',
  rejected: 'text-red-400',
  cancelled: 'text-gray-400',
  queued: 'text-gray-400',
  processing: 'text-blue-400',
}

const triggerColor: Record<string, string> = {
  schedule: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  event: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDuration(start: string, end: string | null) {
  if (!end) return '—'
  const ms = new Date(end).getTime() - new Date(start).getTime()
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return `${sec}s`
  return `${Math.floor(sec / 60)}m ${sec % 60}s`
}

const engineStatus = { status: 'running', activeJobs: 3, queueDepth: 5, lastRun: '2026-07-06T10:00:00Z' }

const queueItems = [
  { id: 'q-1', workflowName: 'Weekly Content Review', scheduledFor: '2026-07-08T09:00:00Z', status: 'queued' },
  { id: 'q-2', workflowName: 'High Risk Post Approval', scheduledFor: '2026-07-07T14:00:00Z', status: 'processing' },
]

const safetyRules = [
  { name: 'No Secret Output', description: 'Workflows dürfen keine Secrets in Logs oder Outputs ausgeben', enabled: true },
  { name: 'Approval Gates', description: 'Riskante Posts benötigen manuelle Freigabe vor Veröffentlichung', enabled: true },
  { name: 'Rate Limits', description: 'Max 3 Posts/Stunde pro Plattform, 50 API-Calls/Minute', enabled: true },
  { name: 'Tenant Isolation', description: 'Workflows können nicht auf andere Tenant-Daten zugreifen', enabled: true },
]

export default function AutomationPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const activeWf = workflows.filter((w) => w.status === 'active').length
  const totalRuns = runLogs.length
  const failedRuns = runLogs.filter((r) => r.status === 'failed').length
  const pendingGatesCount = pendingGates.filter((g) => g.status === 'pending').length

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-bone">AUTOMATION CENTER</h1>
            <p className="text-bone/40 mt-1 text-sm">Automate workflows, approvals, and scheduled tasks</p>
          </div>
          <button className="px-5 py-2.5 bg-gold text-ink text-xs font-bold rounded-lg hover:bg-gold/90 transition-all shadow-lg shadow-gold/20">
            + CREATE WORKFLOW
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Workflows', value: activeWf, accent: 'text-green-400' },
            { label: 'Total Runs', value: totalRuns, accent: 'text-bone' },
            { label: 'Failed Runs', value: failedRuns, accent: 'text-red-400' },
            { label: 'Approval Gates Pending', value: pendingGatesCount, accent: 'text-amber-400' },
          ].map((s) => (
            <div key={s.label} className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">{s.label}</span>
              <span className={`text-2xl font-bold ${s.accent}`}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Automation Engine */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">AUTOMATION ENGINE</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">Engine Status</span>
              <span className="text-2xl font-bold text-green-400">{engineStatus.status}</span>
            </div>
            <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">Active Jobs</span>
              <span className="text-2xl font-bold text-bone">{engineStatus.activeJobs}</span>
            </div>
            <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">Queue Depth</span>
              <span className="text-2xl font-bold text-amber-400">{engineStatus.queueDepth}</span>
            </div>
            <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">Last Run</span>
              <span className="text-sm font-bold text-bone">{formatDate(engineStatus.lastRun)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">In-Memory Scheduler</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Workflow Name</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Scheduled For</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Status</th>
                </tr>
              </thead>
              <tbody>
                {queueItems.map((qi) => (
                  <tr key={qi.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-bone">{qi.workflowName}</td>
                    <td className="px-4 py-3 text-bone/70">{formatDate(qi.scheduledFor)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold uppercase ${statusColor[qi.status] || 'text-bone/50'}`}>
                        {qi.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {queueItems.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-xs text-bone/20">No queued items</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Safety Rules */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">SAFETY RULES</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {safetyRules.map((rule) => (
              <div key={rule.name} className="bg-coal border border-ash rounded-xl p-5 flex items-start gap-4">
                <div className={`h-3 w-3 mt-0.5 rounded-full shrink-0 ${rule.enabled ? 'bg-green-400' : 'bg-gray-400'}`} />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-bone">{rule.name}</span>
                  <p className="text-xs text-bone/60 leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflows */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">WORKFLOWS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf) => {
              const isOpen = expanded === wf.id
              return (
                <div key={wf.id} className="bg-coal border border-ash rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : wf.id)}
                    className="w-full text-left p-5 flex flex-col gap-3 hover:bg-smoke/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-bone truncate">{wf.name}</h3>
                        <p className="text-xs text-bone/40 mt-1 line-clamp-2">{wf.description}</p>
                      </div>
                      <span className={`shrink-0 text-xs font-semibold uppercase ${statusColor[wf.status] || 'text-bone/50'}`}>
                        {wf.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${triggerColor[wf.trigger.type] || 'bg-smoke text-bone/40 border-ash'}`}>
                        {wf.trigger.type} — {Object.values(wf.trigger.config)[0] || ''}
                      </span>
                      {wf.conditions.slice(0, 3).map((c, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-ash/40 text-bone/40 border border-ash/30">
                          {c.field} {c.operator} {c.value}
                        </span>
                      ))}
                      {wf.conditions.length > 3 && (
                        <span className="text-[10px] text-bone/30">+{wf.conditions.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-bone/30">
                      <span>Last run: {wf.lastRun ? formatDate(wf.lastRun) : 'Never'}</span>
                      <span>Runs: {wf.runCount}</span>
                    </div>

                    <div className="flex items-center text-[10px] text-bone/20">
                      <span className={isOpen ? 'text-gold' : ''}>
                        {isOpen ? '▲ HIDE ACTIONS' : '▼ SHOW ACTIONS'} ({wf.actions.length})
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-ash px-5 py-4 space-y-2">
                      <p className="text-[10px] text-bone/30 uppercase tracking-[0.2em] mb-2">Actions</p>
                      {wf.actions.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-bone/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                          <span className="font-medium text-bone/80">{a.type}</span>
                          <span className="text-bone/30">—</span>
                          {Object.entries(a.config).map(([k, v]) => (
                            <span key={k} className="text-[10px] text-bone/40">{k}={v}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Run Logs */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">RUN LOGS</h2>
          <div className="bg-coal border border-ash rounded-xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ash text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                  <th className="p-4 pr-3">Workflow ID</th>
                  <th className="p-4 pr-3">Status</th>
                  <th className="p-4 pr-3">Started</th>
                  <th className="p-4 pr-3">Duration</th>
                  <th className="p-4 pr-3">Actions</th>
                  <th className="p-4">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash">
                {runLogs.map((log) => {
                  const wf = workflows.find((w) => w.id === log.workflowId)
                  return (
                    <tr key={log.id} className="hover:bg-smoke/20 transition-colors">
                      <td className="p-4 pr-3 text-bone font-semibold text-xs">{log.workflowId} {wf ? `(${wf.name})` : ''}</td>
                      <td className="p-4 pr-3">
                        <span className={`text-xs font-semibold uppercase ${statusColor[log.status] || 'text-bone/50'}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 pr-3 text-xs text-bone/60">{formatDate(log.startedAt)}</td>
                      <td className="p-4 pr-3 text-xs text-bone/60">{formatDuration(log.startedAt, log.completedAt)}</td>
                      <td className="p-4 pr-3 text-xs text-bone/60">{log.actionsExecuted} action{log.actionsExecuted !== 1 ? 's' : ''}</td>
                      <td className="p-4 text-xs">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${triggerColor[log.triggeredBy] || 'bg-smoke text-bone/40 border-ash'}`}>
                          {log.triggeredBy}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {runLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-xs text-bone/20">No run logs</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Approval Gates */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">APPROVAL GATES</h2>
          <div className="bg-coal border border-ash rounded-xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ash text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                  <th className="p-4 pr-3">Name</th>
                  <th className="p-4 pr-3">Workflow</th>
                  <th className="p-4 pr-3">Required Role</th>
                  <th className="p-4 pr-3">Status</th>
                  <th className="p-4">Requested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash">
                {pendingGates.map((gate) => {
                  const wf = workflows.find((w) => w.id === gate.workflowId)
                  return (
                    <tr key={gate.id} className="hover:bg-smoke/20 transition-colors">
                      <td className="p-4 pr-3 text-bone font-semibold text-xs">{gate.name}</td>
                      <td className="p-4 pr-3 text-xs text-bone/60">{wf ? wf.name : gate.workflowId}</td>
                      <td className="p-4 pr-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {gate.requiredRole}
                        </span>
                      </td>
                      <td className="p-4 pr-3">
                        <span className={`text-xs font-semibold uppercase ${statusColor[gate.status] || 'text-bone/50'}`}>
                          {gate.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-bone/60">{formatDate(gate.requestedAt)}</td>
                    </tr>
                  )
                })}
                {pendingGates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-xs text-bone/20">No approval gates</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
