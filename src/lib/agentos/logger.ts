import type { AgentLogEntry } from './types'

export class AgentLogger {
  private logs = new Map<string, AgentLogEntry[]>()
  private maxLogsPerAgent = 200
  private allLogs: AgentLogEntry[] = []

  log(agentId: string, level: AgentLogEntry['level'], message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    const entry: AgentLogEntry = {
      id: `${agentId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      agentId,
      level,
      message,
      metadata,
      timestamp: Date.now(),
    }

    if (!this.logs.has(agentId)) {
      this.logs.set(agentId, [])
    }
    const agentLogs = this.logs.get(agentId)!
    agentLogs.push(entry)
    if (agentLogs.length > this.maxLogsPerAgent) {
      agentLogs.shift()
    }

    this.allLogs.push(entry)
    if (this.allLogs.length > 1000) {
      this.allLogs = this.allLogs.slice(-1000)
    }

    return entry
  }

  info(agentId: string, message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    return this.log(agentId, 'INFO', message, metadata)
  }

  warning(agentId: string, message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    return this.log(agentId, 'WARNING', message, metadata)
  }

  error(agentId: string, message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    return this.log(agentId, 'ERROR', message, metadata)
  }

  debug(agentId: string, message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    return this.log(agentId, 'DEBUG', message, metadata)
  }

  success(agentId: string, message: string, metadata?: Record<string, unknown>): AgentLogEntry {
    return this.log(agentId, 'SUCCESS', message, metadata)
  }

  getAgentLogs(agentId: string, limit?: number): AgentLogEntry[] {
    const logs = this.logs.get(agentId) ?? []
    return limit ? logs.slice(-limit) : logs
  }

  getRecentLogs(limit = 50): AgentLogEntry[] {
    return this.allLogs.slice(-limit).reverse()
  }

  getLogsByLevel(level: AgentLogEntry['level'], limit = 50): AgentLogEntry[] {
    return this.allLogs.filter(l => l.level === level).slice(-limit).reverse()
  }

  getErrorLogs(limit = 50): AgentLogEntry[] {
    return this.getLogsByLevel('ERROR', limit)
  }

  clearAgentLogs(agentId: string): void {
    this.logs.delete(agentId)
  }

  getStats(): { totalLogs: number; byLevel: Record<string, number> } {
    const byLevel: Record<string, number> = { INFO: 0, WARNING: 0, ERROR: 0, DEBUG: 0, SUCCESS: 0 }
    for (const log of this.allLogs) {
      byLevel[log.level] = (byLevel[log.level] ?? 0) + 1
    }
    return { totalLogs: this.allLogs.length, byLevel }
  }
}

export const agentLogger = new AgentLogger()
