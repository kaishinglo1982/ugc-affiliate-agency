'use client'

import { useState, useEffect, useCallback } from 'react'

interface AgentItem {
  id: string; name: string; version: string; description: string
  status: string; capabilities: string[]
  permissions: { resource: string; actions: string[] }[]
  metrics: { tasksProcessed: number; tasksSucceeded: number; tasksFailed: number; avgDurationMs: number; uptime: number; errorRate: number }
  health: { status: string; score: number; lastCheck: number; message?: string }
  monitoring: { status: string; healthScore: number; cpuAvg: number; ramAvg: number; queueAvg: number; latencyAvg: number; errorCount: number; uptime: number } | null
  memory: { shortTermSize: number; longTermSize: number; taskCount: number; knowledgeSize: number }
}

interface AgentStats { total: number; active: number; idle: number; running: number; error: number; offline: number; warning: number }

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22c55e', IDLE: '#6b7280', RUNNING: '#3b82f6',
  WARNING: '#f59e0b', ERROR: '#ef4444', DISABLED: '#4b5563',
  OFFLINE: '#374151', STARTING: '#3b82f6', STOPPING: '#f59e0b',
}

const AGENT_ICONS: Record<string, string> = {
  'ceo-agent': '👑', 'cfo-agent': '💰', 'tax-agent': '🏛️', 'security-agent': '🛡️',
  'research-agent': '🔍', 'campaign-agent': '📢', 'affiliate-agent': '🔗',
  'brand-agent': '🎯', 'script-agent': '📝', 'video-agent': '🎬', 'voice-agent': '🎤', 'avatar-agent': '👤',
  'tiktok-agent': '🎵', 'instagram-agent': '📸', 'youtube-agent': '▶️',
  'facebook-agent': '👍', 'x-agent': '🐦', 'pinterest-agent': '📌', 'reddit-agent': '🤖', 'linkedin-agent': '💼',
  'analytics-agent': '📊', 'publishing-agent': '📤',
  'seo-agent': '🔎', 'crm-agent': '👥', 'notification-agent': '🔔',
  'automation-agent': '⚡', 'knowledge-agent': '🧠',
}

export default function AgentOSPage() {
  const [agents, setAgents] = useState<AgentItem[]>([])
  const [stats, setStats] = useState<AgentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'dashboard' | 'registry' | 'chat'>('dashboard')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [agentDetail, setAgentDetail] = useState<any>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string; agentId?: string }>>([])
  const [chatSession] = useState(() => `session-${Date.now()}`)
  const [chatLoading, setChatLoading] = useState(false)

  const loadAgents = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/agentos')
      const data = await res.json()
      setAgents(data.agents)
      setStats(data.stats)
    } catch { /* */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadAgents() }, [loadAgents])

  const loadAgentDetail = async (id: string) => {
    setSelectedAgent(id)
    try {
      const res = await fetch(`/api/v1/agentos/${id}`)
      setAgentDetail(await res.json())
    } catch { setAgentDetail(null) }
  }

  const runAgent = async (id: string) => {
    try {
      await fetch(`/api/v1/agentos/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { action: 'execute', timestamp: Date.now() } }),
      })
      loadAgents()
    } catch { /* */ }
  }

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    setChatLoading(true)
    const msg = chatInput
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: msg }])

    try {
      const res = await fetch('/api/v1/agentos/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: chatSession, message: msg, agentId: selectedAgent }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'agent', content: data.message.content, agentId: data.agentId }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'agent', content: 'Failed to get response.' }])
    }
    setChatLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-bone/40 text-xs tracking-[0.25em] uppercase">Initializing AgentOS...</p>
      </div>
    )
  }

  const totalHealth = agents.length > 0
    ? Math.round(agents.reduce((sum, a) => sum + a.health.score, 0) / agents.length)
    : 0

  return (
    <div className="p-8 font-mono tracking-widest uppercase text-bone">
      <header className="mb-8">
        <h1 className="text-2xl text-gold">Agent OS</h1>
        <p className="mt-2 text-xs tracking-[0.25em] text-bone/50">
          {stats?.total ?? 0} Agents · System Health: {totalHealth}%
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border border-white/5 bg-coal/40 p-1 rounded-sm">
        {(['dashboard', 'registry', 'chat'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-[10px] tracking-[0.2em] transition-colors rounded-sm ${
              tab === t ? 'bg-gold text-ink' : 'text-bone/40 hover:text-bone/70'
            }`}
          >
            {t === 'dashboard' ? '📊 Dashboard' : t === 'registry' ? '📋 Registry' : '💬 Chat'}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {tab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-3">
            {[
              { label: 'Total', value: stats?.total ?? 0, color: 'text-bone/60' },
              { label: 'Active', value: stats?.active ?? 0, color: 'text-green-400' },
              { label: 'Running', value: stats?.running ?? 0, color: 'text-blue-400' },
              { label: 'Warning', value: stats?.warning ?? 0, color: 'text-amber-400' },
              { label: 'Error', value: stats?.error ?? 0, color: 'text-red-400' },
              { label: 'Idle', value: stats?.idle ?? 0, color: 'text-bone/40' },
              { label: 'Offline', value: stats?.offline ?? 0, color: 'text-gray-500' },
            ].map(kpi => (
              <div key={kpi.label} className="border border-white/5 bg-coal/40 px-4 py-3 rounded-sm">
                <p className="text-[10px] tracking-[0.2em] text-bone/40">{kpi.label}</p>
                <p className={`text-xl mt-1 font-bold ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {agents.map(agent => {
              const sc = STATUS_COLORS[agent.status] ?? '#6b7280'
              return (
                <div
                  key={agent.id}
                  className="border border-white/5 bg-coal/40 px-4 py-4 rounded-sm cursor-pointer hover:border-gold/30 transition-colors"
                  onClick={() => loadAgentDetail(agent.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{AGENT_ICONS[agent.id] ?? '🤖'}</span>
                      <span className="text-xs text-bone">{agent.name}</span>
                    </div>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ color: sc, backgroundColor: `${sc}18` }}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="flex gap-3 text-[9px] text-bone/30">
                    <span>Health: {agent.health.score}%</span>
                    <span>Tasks: {agent.metrics.tasksProcessed}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Registry Tab */}
      {tab === 'registry' && (
        <div className="space-y-3">
          <p className="text-[10px] text-bone/40 mb-4">{agents.length} registered agents</p>
          <div className="border border-white/5 overflow-hidden rounded-sm">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-coal/60 border-b border-white/5">
                  {['Agent', 'Status', 'Health', 'Tasks', 'Capabilities', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-bone/40 text-[9px] tracking-[0.2em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {agents.map(agent => {
                  const sc = STATUS_COLORS[agent.status] ?? '#6b7280'
                  return (
                    <tr key={agent.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{AGENT_ICONS[agent.id] ?? '🤖'}</span>
                          <div>
                            <span className="text-bone text-[11px]">{agent.name}</span>
                            <span className="text-bone/20 text-[9px] ml-2">v{agent.version}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ color: sc, backgroundColor: `${sc}18` }}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-bone/40 text-[10px]">{agent.health.score}%</span>
                      </td>
                      <td className="px-4 py-3 text-bone/40 text-[10px]">
                        {agent.metrics.tasksSucceeded}/{agent.metrics.tasksProcessed}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {agent.capabilities.slice(0, 2).map(cap => (
                            <span key={cap} className="text-[8px] px-1.5 py-0.5 border border-white/5 text-bone/30">{cap}</span>
                          ))}
                          {agent.capabilities.length > 2 && (
                            <span className="text-[8px] text-bone/20">+{agent.capabilities.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => runAgent(agent.id)} className="text-[9px] text-gold hover:text-gold/80">▶ Run</button>
                          <button onClick={() => loadAgentDetail(agent.id)} className="text-[9px] text-bone/40 hover:text-bone/70">Details</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Detail Panel */}
          {selectedAgent && agentDetail && (
            <div className="fixed inset-0 z-50 flex" onClick={() => { setSelectedAgent(null); setAgentDetail(null) }}>
              <div className="flex-1" />
              <div className="w-full max-w-lg h-full overflow-auto border-l border-white/5 bg-ink flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div>
                    <h2 className="text-sm text-gold">{agentDetail.name}</h2>
                    <p className="text-[10px] text-bone/40 mt-1">{agentDetail.id} · v{agentDetail.version}</p>
                  </div>
                  <button onClick={() => { setSelectedAgent(null); setAgentDetail(null) }} className="text-bone/40">✕</button>
                </div>
                <div className="flex-1 overflow-auto p-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-1 rounded-full" style={{ color: STATUS_COLORS[agentDetail.status], backgroundColor: `${STATUS_COLORS[agentDetail.status]}18` }}>
                      {agentDetail.status}
                    </span>
                    <span className="text-[10px] text-bone/40">Health: {agentDetail.health.score}%</span>
                  </div>
                  <p className="text-[11px] text-bone/50 lowercase leading-relaxed">{agentDetail.description}</p>

                  <div>
                    <h3 className="text-[9px] tracking-[0.2em] text-bone/30 mb-3 uppercase">Metrics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Tasks Processed', value: agentDetail.metrics.tasksProcessed },
                        { label: 'Succeeded', value: agentDetail.metrics.tasksSucceeded },
                        { label: 'Failed', value: agentDetail.metrics.tasksFailed },
                        { label: 'Avg Duration', value: `${agentDetail.metrics.avgDurationMs}ms` },
                        { label: 'Error Rate', value: `${(agentDetail.metrics.errorRate * 100).toFixed(1)}%` },
                        { label: 'Uptime', value: `${Math.round(agentDetail.metrics.uptime / 1000)}s` },
                      ].map(m => (
                        <div key={m.label} className="border border-white/5 bg-coal/30 px-3 py-3 rounded-sm">
                          <p className="text-[8px] text-bone/30 uppercase tracking-wider">{m.label}</p>
                          <p className="text-sm text-bone mt-1">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[9px] tracking-[0.2em] text-bone/30 mb-3 uppercase">Capabilities</h3>
                    <div className="flex gap-1 flex-wrap">
                      {agentDetail.capabilities.map((cap: string) => (
                        <span key={cap} className="text-[9px] px-2 py-1 border border-white/5 text-bone/40">{cap}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[9px] tracking-[0.2em] text-bone/30 mb-3 uppercase">Permissions</h3>
                    {agentDetail.permissions.map((perm: any, i: number) => (
                      <div key={i} className="text-[10px] text-bone/40 mb-1">
                        🔒 {perm.resource}: {perm.actions.join(', ')}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-[9px] tracking-[0.2em] text-bone/30 mb-3 uppercase">Memory</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Short Term', value: agentDetail.memory.shortTermSize },
                        { label: 'Long Term', value: agentDetail.memory.longTermSize },
                        { label: 'Task History', value: agentDetail.memory.taskCount },
                        { label: 'Knowledge', value: agentDetail.memory.knowledgeSize },
                      ].map(m => (
                        <div key={m.label} className="border border-white/5 px-3 py-2 text-[10px]">
                          <span className="text-bone/30">{m.label}: </span>
                          <span className="text-bone/60">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => runAgent(agentDetail.id)}
                    className="w-full py-3 text-[10px] tracking-[0.2em] bg-gold text-ink font-bold rounded-sm hover:opacity-90 transition-opacity"
                  >
                    ▶ RUN {agentDetail.name.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'chat' && (
        <div className="flex gap-4 h-[calc(100vh-300px)]">
          <div className="w-44 space-y-1 shrink-0">
            <p className="text-[9px] tracking-[0.2em] text-bone/30 mb-3 uppercase">Agents</p>
            <button
              onClick={() => setSelectedAgent(null)}
              className={`w-full text-left px-3 py-2 text-[10px] rounded-sm transition-colors border border-white/5 ${
                !selectedAgent ? 'bg-gold text-ink' : 'bg-coal/40 text-bone/40 hover:text-bone/70'
              }`}
            >
              🤖 Auto-Detect
            </button>
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left px-3 py-2 text-[10px] rounded-sm transition-colors border border-white/5 ${
                  selectedAgent === agent.id ? 'bg-gold text-ink' : 'bg-coal/40 text-bone/40 hover:text-bone/70'
                }`}
              >
                {AGENT_ICONS[agent.id] ?? '🤖'} {agent.name}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col border border-white/5 bg-coal/30 rounded-sm">
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-sm text-bone/40">Ask anything about your agents</p>
                    <p className="text-[10px] mt-2 text-bone/20">Try: "What's our TikTok strategy?" or "Analyze our campaign"</p>
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 text-[11px] ${
                    msg.role === 'user' ? 'bg-gold text-ink rounded-sm' : 'border border-white/5 bg-coal/60 rounded-sm'
                  }`}>
                    {msg.role === 'agent' && msg.agentId && (
                      <p className="text-gold text-[9px] mb-1">
                        {agents.find(a => a.id === msg.agentId)?.name ?? msg.agentId}
                      </p>
                    )}
                    <pre className="whitespace-pre-wrap font-sans lowercase leading-relaxed">{msg.content}</pre>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="border border-white/5 bg-coal/60 px-4 py-3 rounded-sm">
                    <span className="text-bone/40 text-[10px]">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-white/5 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder={selectedAgent ? `Ask ${agents.find(a => a.id === selectedAgent)?.name ?? 'agent'}...` : 'Ask any agent...'}
                  className="flex-1 bg-ink border border-white/5 px-4 py-2 text-[11px] text-bone outline-none rounded-sm"
                />
                <button
                  onClick={sendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-5 py-2 text-[10px] tracking-[0.2em] bg-gold text-ink font-bold rounded-sm disabled:opacity-40"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
