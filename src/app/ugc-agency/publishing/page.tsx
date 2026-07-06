'use client'

import {
  contentCalendar,
  publishingJobs,
  platformPosts,
  postingRules,
  platformConnectors,
} from '@/data/enterprise'
import type { ContentCalendarItem, ApprovalState } from '@/data/enterprise'

const statusColors: Record<string, string> = {
  draft: 'text-gray-400',
  review: 'text-blue-400',
  approved: 'text-gold',
  scheduled: 'text-amber-400',
  published: 'text-green-400',
  failed: 'text-red-400',
}

const approvalColors: Record<string, string> = {
  pending: 'text-amber-400',
  approved: 'text-gold',
  rejected: 'text-red-400',
}

const platformIcons: Record<string, string> = {
  tiktok: '\u{1F4FA}',
  instagram: '\u{1F4F8}',
  youtube: '\u{1F3AC}',
  reddit: '\u{1F4DD}',
  twitter: '\u{1F426}',
  linkedin: '\u{1F4BC}',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function KpiCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-ash bg-coal p-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-bone/30">{label}</span>
      <span className={`text-2xl font-bold ${accent}`}>{value}</span>
    </div>
  )
}

const pendingApprovals = [
  { id: 'pa-1', title: 'Finance Tips Carousel', platform: 'instagram', currentStatus: 'review', requestedBy: 'Creator Bot', date: '2026-07-06' },
  { id: 'pa-2', title: 'Reddit AMA Post', platform: 'reddit', currentStatus: 'review', requestedBy: 'Creator Bot', date: '2026-07-06' },
]

export default function PublishingCenterPage() {
  const scheduledToday = contentCalendar.filter(
    (item) =>
      item.status === 'scheduled' &&
      new Date(item.scheduledAt).toDateString() === new Date().toDateString(),
  ).length

  const pendingReview = contentCalendar.filter((item) => item.status === 'review').length

  const publishedThisWeek = contentCalendar.filter((item) => {
    if (item.status !== 'published') return false
    const d = new Date(item.scheduledAt)
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    return d >= startOfWeek
  }).length

  const failed = contentCalendar.filter((item) => item.status === 'failed').length

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">PUBLISHING CENTER</h1>
          <p className="mt-1 text-sm text-bone/40">
            Schedule, approve, and publish content across platforms
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KpiCard label="Scheduled Today" value={String(scheduledToday)} accent="text-amber-400" />
          <KpiCard label="Pending Review" value={String(pendingReview)} accent="text-blue-400" />
          <KpiCard label="Published This Week" value={String(publishedThisWeek)} accent="text-green-400" />
          <KpiCard label="Failed" value={String(failed)} accent="text-red-400" />
        </div>

        {/* ── Approval Workflow ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">APPROVAL WORKFLOW</h2>
          <div className="bg-coal rounded-xl p-4 flex items-center gap-4 overflow-x-auto">
            {[
              { label: 'draft', color: 'text-gray-400 bg-gray-400/10' },
              { label: 'review', color: 'text-blue-400 bg-blue-400/10' },
              { label: 'approved', color: 'text-gold bg-gold/10' },
              { label: 'scheduled', color: 'text-amber-400 bg-amber-400/10' },
              { label: 'published/failed', color: 'text-green-400 bg-green-400/10' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className={`rounded-lg border border-ash px-4 py-2 text-xs font-bold uppercase ${step.color}`}>
                  {step.label}
                </div>
                {i < 4 && <span className="text-bone/20 text-lg">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Calendar Item</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Current Status</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Requested By</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((pa) => (
                  <tr key={pa.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-bone">{pa.title}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase ${statusColors[pa.currentStatus] || 'text-bone/60'}`}>
                        {pa.currentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-bone/70">{pa.requestedBy}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded bg-green-500/20 px-3 py-1 text-[10px] font-semibold text-green-400 hover:bg-green-500/30 transition-colors">
                          Approve
                        </button>
                        <button className="rounded bg-red-500/20 px-3 py-1 text-[10px] font-semibold text-red-400 hover:bg-red-500/30 transition-colors">
                          Reject
                        </button>
                        <span className="text-[10px] text-bone/30">with comment</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {pendingApprovals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-xs text-bone/20">No pending approvals</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Calendar View ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">CONTENT CALENDAR</h2>
          <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Title</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Platform</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Account</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Scheduled</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Status</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Approval</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Content Type</th>
                </tr>
              </thead>
              <tbody>
                {contentCalendar.map((item) => (
                  <tr key={item.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-bone">{item.title}</td>
                    <td className="px-4 py-3 text-bone/80">
                      {platformIcons[item.platform] || '\u{1F310}'} {item.platform}
                    </td>
                    <td className="px-4 py-3 text-bone/70">{item.accountId}</td>
                    <td className="px-4 py-3 text-bone/80">{formatDate(item.scheduledAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase ${statusColors[item.status] || 'text-bone/60'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-medium ${approvalColors[item.approvalStatus] || 'text-bone/60'}`}>
                      {item.approvalStatus}
                    </td>
                    <td className="px-4 py-3 text-bone/70">{item.contentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Publishing Queue ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">PUBLISHING QUEUE</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {publishingJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-ash bg-coal p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platformIcons[job.platform] || '\u{1F310}'}</span>
                    <span className="text-sm font-bold text-bone">{job.platform}</span>
                  </div>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase ${statusColors[job.status] || 'text-bone/60'}`}>
                    {job.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-xs text-bone/70">
                  <div className="flex justify-between">
                    <span>Attempts</span>
                    <span className="font-medium text-bone">{job.attemptCount}</span>
                  </div>
                  {job.error && (
                    <div className="flex justify-between">
                      <span>Error</span>
                      <span className="text-right font-medium text-red-400">{job.error}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Created</span>
                    <span className="font-medium text-bone">{formatDate(job.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Platform Post Performance ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">PLATFORM POST PERFORMANCE</h2>
          <div className="overflow-x-auto rounded-xl border border-ash bg-coal">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ash text-bone/40">
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Platform</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Views</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Likes</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Comments</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Shares</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Saved</th>
                </tr>
              </thead>
              <tbody>
                {platformPosts.map((post) => (
                  <tr key={post.id} className="border-b border-ash/50 last:border-0">
                    <td className="px-4 py-3 text-bone/80">
                      {platformIcons[post.platform] || '\u{1F310}'} {post.platform}
                    </td>
                    <td className="px-4 py-3 font-medium text-bone">{post.performance.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-bone/80">{post.performance.likes.toLocaleString()}</td>
                    <td className="px-4 py-3 text-bone/80">{post.performance.comments.toLocaleString()}</td>
                    <td className="px-4 py-3 text-bone/80">{post.performance.shares.toLocaleString()}</td>
                    <td className="px-4 py-3 text-bone/80">{post.performance.saved.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Posting Rules ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">POSTING RULES</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {postingRules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-xl border border-ash bg-coal p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{platformIcons[rule.platform] || '\u{1F310}'}</span>
                  <span className="text-sm font-bold text-bone">{rule.platform}</span>
                </div>
                <div className="mt-4 space-y-2 text-xs text-bone/70">
                  <div className="flex justify-between">
                    <span>Max Daily</span>
                    <span className="font-medium text-bone">{rule.maxDaily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min Interval (min)</span>
                    <span className="font-medium text-bone">{rule.minInterval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requires Approval</span>
                    <span className={`font-medium ${rule.requireApproval ? 'text-gold' : 'text-green-400'}`}>
                      {rule.requireApproval ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Times</span>
                    <span className="font-medium text-bone">{rule.bestTimes.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Platform Connectors ── */}
        <section>
          <h2 className="mb-5 text-lg font-bold text-bone">PLATFORM CONNECTORS</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {platformConnectors.map((conn) => (
              <div
                key={conn.id}
                className="rounded-xl border border-ash bg-coal p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platformIcons[conn.platform] || '\u{1F310}'}</span>
                    <span className="text-sm font-bold text-bone">{conn.platform}</span>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${conn.connected ? 'bg-green-400' : 'bg-red-400'}`} />
                </div>
                {conn.connected ? (
                  <div className="mt-4 space-y-2 text-xs text-bone/70">
                    <div className="flex justify-between">
                      <span>Account</span>
                      <span className="font-medium text-bone">{conn.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate Limit Remaining</span>
                      <span className="font-medium text-bone">{conn.rateLimitRemaining}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Sync</span>
                      <span className="font-medium text-bone">{conn.lastSync ? formatDate(conn.lastSync) : '—'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-xs text-red-400">Disconnected</div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
