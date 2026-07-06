import type { AgentStatus, AgentMetrics, AgentHealthScore } from './types'

interface AgentMonitorState {
  cpuUsage: number[]
  ramUsage: number[]
  queueDepth: number[]
  errorCount: number
  latencyMs: number[]
  lastHeartbeat: number
  status: AgentStatus
  startTime: number
}

export class AgentMonitoring {
  private agents = new Map<string, AgentMonitorState>()
  private windowSize = 60

  registerAgent(agentId: string): void {
    if (!this.agents.has(agentId)) {
      this.agents.set(agentId, {
        cpuUsage: [],
        ramUsage: [],
        queueDepth: [],
        errorCount: 0,
        latencyMs: [],
        lastHeartbeat: Date.now(),
        status: 'IDLE',
        startTime: Date.now(),
      })
    }
  }

  recordMetric(agentId: string, metric: { cpu?: number; ram?: number; queueDepth?: number; latencyMs?: number }): void {
    const state = this.agents.get(agentId)
    if (!state) return

    if (metric.cpu !== undefined) {
      state.cpuUsage.push(metric.cpu)
      if (state.cpuUsage.length > this.windowSize) state.cpuUsage.shift()
    }
    if (metric.ram !== undefined) {
      state.ramUsage.push(metric.ram)
      if (state.ramUsage.length > this.windowSize) state.ramUsage.shift()
    }
    if (metric.queueDepth !== undefined) {
      state.queueDepth.push(metric.queueDepth)
      if (state.queueDepth.length > this.windowSize) state.queueDepth.shift()
    }
    if (metric.latencyMs !== undefined) {
      state.latencyMs.push(metric.latencyMs)
      if (state.latencyMs.length > this.windowSize) state.latencyMs.shift()
    }

    state.lastHeartbeat = Date.now()
  }

  recordError(agentId: string): void {
    const state = this.agents.get(agentId)
    if (state) state.errorCount++
  }

  heartbeat(agentId: string, status: AgentStatus): void {
    const state = this.agents.get(agentId)
    if (state) {
      state.lastHeartbeat = Date.now()
      state.status = status
    }
  }

  getMetrics(agentId: string): AgentMetrics | null {
    const state = this.agents.get(agentId)
    if (!state) return null

    const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

    return {
      tasksProcessed: state.cpuUsage.length,
      tasksSucceeded: Math.max(0, state.cpuUsage.length - state.errorCount),
      tasksFailed: state.errorCount,
      avgDurationMs: Math.round(avg(state.latencyMs)),
      lastRunAt: state.lastHeartbeat,
      uptime: Date.now() - state.startTime,
      errorRate: state.cpuUsage.length > 0 ? state.errorCount / state.cpuUsage.length : 0,
    }
  }

  getHealthScore(agentId: string): AgentHealthScore {
    const state = this.agents.get(agentId)
    if (!state) {
      return { status: 'OFFLINE', score: 0, lastCheck: Date.now(), message: 'Agent not registered' }
    }

    const metrics = this.getMetrics(agentId)!
    const elapsed = Date.now() - state.lastHeartbeat
    const isResponsive = elapsed < 60000

    if (!isResponsive) {
      return { status: 'OFFLINE', score: 0, lastCheck: Date.now(), message: 'No heartbeat received' }
    }

    const cpuAvg = state.cpuUsage.length > 0 ? state.cpuUsage.reduce((a, b) => a + b, 0) / state.cpuUsage.length : 0
    const errorRate = metrics.errorRate

    let score = 100
    if (cpuAvg > 80) score -= 20
    else if (cpuAvg > 60) score -= 10
    if (errorRate > 0.2) score -= 30
    else if (errorRate > 0.1) score -= 15
    if (state.status === 'ERROR') score -= 40
    if (state.status === 'WARNING') score -= 20

    const status: AgentStatus = score >= 80 ? 'ACTIVE' : score >= 50 ? 'WARNING' : 'ERROR'

    return {
      status,
      score: Math.max(0, score),
      lastCheck: Date.now(),
      message: score >= 80 ? 'Healthy' : score >= 50 ? 'Degraded performance' : 'Critical state',
    }
  }

  getSystemOverview(): Record<string, {
    status: AgentStatus
    healthScore: number
    cpuAvg: number
    ramAvg: number
    queueAvg: number
    latencyAvg: number
    errorCount: number
    uptime: number
  }> {
    const overview: Record<string, any> = {}
    for (const [agentId, state] of this.agents) {
      const avg = (arr: number[]) => arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0
      const health = this.getHealthScore(agentId)
      overview[agentId] = {
        status: health.status,
        healthScore: health.score,
        cpuAvg: avg(state.cpuUsage),
        ramAvg: avg(state.ramUsage),
        queueAvg: avg(state.queueDepth),
        latencyAvg: avg(state.latencyMs),
        errorCount: state.errorCount,
        uptime: Date.now() - state.startTime,
      }
    }
    return overview
  }

  unregisterAgent(agentId: string): void {
    this.agents.delete(agentId)
  }
}

export const agentMonitoring = new AgentMonitoring()
