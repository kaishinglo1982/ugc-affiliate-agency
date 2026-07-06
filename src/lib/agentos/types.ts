export type AgentStatus =
  | 'ACTIVE' | 'IDLE' | 'RUNNING' | 'WARNING'
  | 'ERROR' | 'DISABLED' | 'OFFLINE'
  | 'STARTING' | 'STOPPING'

export type AgentCapability =
  | 'task.distribute'
  | 'content.script' | 'content.video' | 'content.voice' | 'content.avatar'
  | 'social.tiktok' | 'social.instagram' | 'social.youtube'
  | 'social.facebook' | 'social.x' | 'social.pinterest'
  | 'social.reddit' | 'social.linkedin'
  | 'analytics.report' | 'analytics.insights'
  | 'publishing.schedule' | 'publishing.publish'
  | 'campaign.manage' | 'campaign.optimize'
  | 'affiliate.manage' | 'affiliate.track'
  | 'research.market' | 'research.trends'
  | 'finance.calculate' | 'finance.budget'
  | 'tax.calculate' | 'tax.export'
  | 'security.scan' | 'security.audit'
  | 'crm.manage' | 'crm.pipeline'
  | 'seo.analyze' | 'seo.optimize'
  | 'notify.send' | 'notify.schedule'
  | 'automation.workflow' | 'automation.trigger'
  | 'knowledge.store' | 'knowledge.retrieve'
  | 'brand.dna' | 'brand.position'
  | (string & {})

export interface AgentPermission {
  resource: string
  actions: ('read' | 'write' | 'execute' | 'admin' | '*')[]
}

export interface AgentMemoryStore {
  shortTerm: Map<string, unknown>
  longTerm: Map<string, unknown>
  taskHistory: AgentTaskRecord[]
  knowledge: Map<string, unknown>
}

export interface AgentTaskRecord {
  id: string
  type: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  input: Record<string, unknown>
  output?: unknown
  error?: string
  startedAt: number
  completedAt?: number
  durationMs?: number
}

export interface AgentMetrics {
  tasksProcessed: number
  tasksSucceeded: number
  tasksFailed: number
  avgDurationMs: number
  lastRunAt?: number
  uptime: number
  errorRate: number
}

export interface AgentHealthScore {
  status: AgentStatus
  score: number
  lastCheck: number
  message?: string
}

export interface AgentDefinition {
  id: string
  name: string
  version: string
  description: string
  status: AgentStatus
  permissions: AgentPermission[]
  capabilities: AgentCapability[]
  memory: AgentMemoryStore
  tasks: AgentTaskRecord[]
  health: AgentHealthScore
  metrics: AgentMetrics
  metadata?: Record<string, unknown>
}

export interface AgentTask {
  id: string
  type: string
  priority: 'low' | 'normal' | 'high' | 'critical'
  input: Record<string, unknown>
  targetAgentId?: string
  sourceAgentId?: string
  correlationId?: string
  createdAt: number
  scheduledFor?: number
  maxRetries: number
  retryCount: number
}

export interface AgentEvent {
  id: string
  type: string
  source: string
  target?: string
  payload: Record<string, unknown>
  timestamp: number
  correlationId?: string
}

export interface AgentLogEntry {
  id: string
  agentId: string
  level: 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG' | 'SUCCESS'
  message: string
  metadata?: Record<string, unknown>
  timestamp: number
}

export interface AgentChatMessage {
  id: string
  role: 'user' | 'agent' | 'system'
  agentId?: string
  content: string
  timestamp: number
  metadata?: Record<string, unknown>
}
