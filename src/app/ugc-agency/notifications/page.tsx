'use client'

import { useState } from 'react'
import {
  notificationsInbox,
  notificationChannels,
  alertRules,
} from '@/data/enterprise'
import type { Notification } from '@/data/enterprise'

type InboxTab = 'All' | 'Unread' | 'Alerts' | 'Warnings' | 'Info'

const inboxTabs: InboxTab[] = ['All', 'Unread', 'Alerts', 'Warnings', 'Info']

const badgeColors: Record<string, string> = {
  security: 'bg-rose-400/20 text-rose-400',
  finance: 'bg-amber-400/20 text-amber-400',
  content: 'bg-emerald-400/20 text-emerald-400',
  system: 'bg-violet-400/20 text-violet-400',
  crm: 'bg-sky-400/20 text-sky-400',
}

const severityColors: Record<string, string> = {
  low: 'bg-bone/10 text-bone/60',
  medium: 'bg-yellow-400/20 text-yellow-400',
  high: 'bg-orange-400/20 text-orange-400',
  critical: 'bg-red-400/20 text-red-400',
}

const typeIcons: Record<string, string> = {
  alert: '🔴',
  warning: '🟡',
  info: '🔵',
  success: '🟢',
}

const channelIcons: Record<string, string> = {
  'in-app': '💻',
  email: '📧',
  slack: '💬',
  discord: '🎮',
  telegram: '✈️',
  whatsapp: '📱',
}

const channelLabels: Record<string, string> = {
  'in-app': 'In-App',
  email: 'Email',
  slack: 'Slack',
  discord: 'Discord',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCooldown(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h${m > 0 ? ` ${m}m` : ''}`
  return `${m}m`
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<InboxTab>('All')
  const [inbox, setInbox] = useState<Notification[]>(notificationsInbox)

  const filteredNotifications = inbox.filter((n) => {
    switch (activeTab) {
      case 'Unread':
        return !n.read
      case 'Alerts':
        return n.type === 'alert'
      case 'Warnings':
        return n.type === 'warning'
      case 'Info':
        return n.type === 'info' || n.type === 'success'
      default:
        return true
    }
  })

  const tabUnreadCounts = inboxTabs.reduce(
    (acc, tab) => {
      switch (tab) {
        case 'All':
          acc[tab] = inbox.filter((n) => !n.read).length
          break
        case 'Unread':
          acc[tab] = inbox.filter((n) => !n.read).length
          break
        case 'Alerts':
          acc[tab] = inbox.filter((n) => n.type === 'alert' && !n.read).length
          break
        case 'Warnings':
          acc[tab] = inbox.filter((n) => n.type === 'warning' && !n.read).length
          break
        case 'Info':
          acc[tab] = inbox.filter((n) => (n.type === 'info' || n.type === 'success') && !n.read).length
          break
      }
      return acc
    },
    {} as Record<InboxTab, number>
  )

  function handleMarkAllRead() {
    setInbox((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function handleToggleRead(id: string) {
    setInbox((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    )
  }

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">NOTIFICATION CENTER</h1>
          <p className="text-bone/40 mt-1 text-sm">
            Manage alerts, channels, and notification rules
          </p>
        </div>

        {/* ── Inbox Section ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-bone">INBOX</h2>
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-gold text-ink hover:shadow-lg hover:shadow-gold/20 transition-all duration-150"
            >
              MARK ALL AS READ
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {inboxTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                    : 'bg-smoke text-bone/40 hover:text-bone/70 hover:bg-ash'
                }`}
              >
                {tab}
                {tabUnreadCounts[tab] > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === tab
                        ? 'bg-ink text-gold'
                        : 'bg-ash text-bone/60'
                    }`}
                  >
                    {tabUnreadCounts[tab]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-coal border border-ash rounded-xl p-10 text-center">
                <span className="text-bone/30 text-sm">No notifications</span>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`bg-coal border rounded-xl p-5 flex items-start gap-4 transition-all duration-150 cursor-pointer hover:bg-ash/50 ${
                    n.read ? 'border-ash/50' : 'border-gold/30'
                  }`}
                  onClick={() => handleToggleRead(n.id)}
                >
                  {/* Type Icon */}
                  <span className="text-xl mt-0.5">{typeIcons[n.type]}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        className={`text-sm ${
                          n.read ? 'text-bone/60' : 'text-bone font-bold'
                        }`}
                      >
                        {n.title}
                      </h3>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-bone/50 mt-1">{n.body}</p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          badgeColors[n.category] || 'bg-bone/10 text-bone/60'
                        }`}
                      >
                        {n.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${severityColors[n.severity]}`}
                      >
                        {n.severity}
                      </span>
                      <span className="text-[10px] text-bone/30">
                        {formatTimestamp(n.createdAt)}
                      </span>
                      {n.link && (
                        <a
                          href={n.link}
                          onClick={(e) => e.stopPropagation()}
                          className="ml-auto px-3 py-1 rounded-lg border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-wider hover:bg-gold/10 transition-colors"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Channels Section ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">CHANNELS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notificationChannels.map((ch) => (
              <div
                key={ch.id}
                className="bg-coal border border-ash rounded-xl p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{channelIcons[ch.type]}</span>
                    <span className="text-sm font-bold text-bone">
                      {channelLabels[ch.type]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {ch.verified && (
                      <span className="text-emerald-400 text-sm" title="Verified">
                        ✓
                      </span>
                    )}
                    <span
                      className={`w-3 h-3 rounded-full ${
                        ch.enabled ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                  </div>
                </div>
                {Object.keys(ch.config).length > 0 && (
                  <div className="text-xs text-bone/50 font-mono tracking-wider bg-smoke rounded-lg p-3">
                    {Object.entries(ch.config).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-bone/30 uppercase text-[10px]">
                          {key}:
                        </span>
                        <span className="text-bone/70 truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Alert Rules Section ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">ALERT RULES</h2>
          <div className="bg-coal border border-ash rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono tracking-wider">
                <thead>
                  <tr className="border-b border-ash text-[10px] uppercase tracking-[0.2em] text-bone/40">
                    <th className="pb-3 pt-4 px-5 font-semibold">Name</th>
                    <th className="pb-3 pt-4 px-5 font-semibold">Condition</th>
                    <th className="pb-3 pt-4 px-5 font-semibold">Cooldown</th>
                    <th className="pb-3 pt-4 px-5 font-semibold">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {alertRules.map((rule) => (
                    <tr
                      key={rule.id}
                      className="border-b border-ash/50 transition-colors hover:bg-ash/30 last:border-b-0"
                    >
                      <td className="py-4 px-5 text-bone font-medium">
                        {rule.name}
                      </td>
                      <td className="py-4 px-5 text-bone/70 text-xs">
                        <span className="text-gold">{rule.condition.metric}</span>{' '}
                        <span className="text-bone/40">{rule.condition.operator}</span>{' '}
                        <span className="text-gold">{rule.condition.value}</span>
                        <span className="text-bone/30 ml-1">
                          ({rule.condition.duration})
                        </span>
                      </td>
                      <td className="py-4 px-5 text-bone/70 text-xs">
                        {formatCooldown(rule.cooldown)}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            rule.enabled ? 'bg-emerald-400' : 'bg-red-400'
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
