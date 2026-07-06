import type {
  AgentDefinition, AgentStatus, AgentCapability,
  AgentPermission, AgentTask, AgentMetrics, AgentHealthScore,
} from './types'
import { agentMemory } from './memory'
import { agentLogger } from './logger'
import { agentMonitoring } from './monitoring'
import { agentPermissions } from './permissions'

export class BaseAgent implements AgentDefinition {
  id: string
  name: string
  version: string
  description: string
  status: AgentStatus
  permissions: AgentPermission[]
  capabilities: AgentCapability[]
  memory = agentMemory
  tasks: AgentTask[] = []
  health: AgentHealthScore = { status: 'IDLE', score: 100, lastCheck: Date.now() }
  metrics: AgentMetrics = {
    tasksProcessed: 0, tasksSucceeded: 0, tasksFailed: 0,
    avgDurationMs: 0, uptime: 0, errorRate: 0,
  }
  metadata?: Record<string, unknown>

  constructor(config: {
    id: string; name: string; version?: string; description: string
    capabilities: AgentCapability[]; permissions?: AgentPermission[]
    metadata?: Record<string, unknown>
  }) {
    this.id = config.id
    this.name = config.name
    this.version = config.version ?? '1.0.0'
    this.description = config.description
    this.capabilities = config.capabilities
    this.permissions = config.permissions ?? [{ resource: this.id, actions: ['read', 'execute'] }]
    this.metadata = config.metadata
    this.status = 'ACTIVE'
    agentMemory.storeLongTerm(this.id, 'created', Date.now())
    agentMonitoring.registerAgent(this.id)
    agentPermissions.define(this.id, this.permissions)
  }

  async execute(input: Record<string, unknown>): Promise<unknown> {
    const startTime = Date.now()
    this.status = 'RUNNING'
    agentMonitoring.heartbeat(this.id, 'RUNNING')
    agentLogger.info(this.id, `Executing with input: ${JSON.stringify(input).slice(0, 200)}`)

    try {
      const result = await this.run(input)
      const duration = Date.now() - startTime
      this.metrics.tasksProcessed++
      this.metrics.tasksSucceeded++
      this.metrics.avgDurationMs = Math.round(
        (this.metrics.avgDurationMs * (this.metrics.tasksProcessed - 1) + duration) / this.metrics.tasksProcessed
      )
      agentMonitoring.recordMetric(this.id, { latencyMs: duration })
      this.status = 'IDLE'
      agentMonitoring.heartbeat(this.id, 'IDLE')
      return result
    } catch (error: any) {
      const duration = Date.now() - startTime
      this.metrics.tasksProcessed++
      this.metrics.tasksFailed++
      this.metrics.errorRate = this.metrics.tasksFailed / this.metrics.tasksProcessed
      agentMonitoring.recordError(this.id)
      agentLogger.error(this.id, `Execution failed: ${error.message}`)
      this.status = 'ERROR'
      agentMonitoring.heartbeat(this.id, 'ERROR')
      throw error
    }
  }

  protected async run(_input: Record<string, unknown>): Promise<unknown> {
    return { agentId: this.id, message: `Executed by ${this.name}`, status: 'ok' }
  }
}

export class AgentRegistry {
  private agents = new Map<string, BaseAgent>()

  register(agent: BaseAgent): void {
    this.agents.set(agent.id, agent)
    agentLogger.info('registry', `Agent registered: ${agent.id} (${agent.name})`, {
      capabilities: agent.capabilities,
      permissions: agent.permissions,
    })
  }

  get(id: string): BaseAgent | undefined {
    return this.agents.get(id)
  }

  list(filter?: { status?: AgentStatus; capability?: AgentCapability }): BaseAgent[] {
    let result = Array.from(this.agents.values())
    if (filter?.status) result = result.filter(a => a.status === filter.status)
    if (filter?.capability) result = result.filter(a => a.capabilities.includes(filter.capability!))
    return result
  }

  findByCapability(capability: AgentCapability): BaseAgent | undefined {
    return Array.from(this.agents.values()).find(a => a.capabilities.includes(capability))
  }

  getStatus(id: string): AgentStatus | undefined {
    return this.agents.get(id)?.status
  }

  setStatus(id: string, status: AgentStatus): void {
    const agent = this.agents.get(id)
    if (agent) {
      agent.status = status
      agentMonitoring.heartbeat(id, status)
      agentLogger.info(id, `Status changed to ${status}`)
    }
  }

  getStats(): {
    total: number; active: number; idle: number
    running: number; error: number; offline: number; warning: number
  } {
    const agents = Array.from(this.agents.values())
    return {
      total: agents.length,
      active: agents.filter(a => a.status === 'ACTIVE').length,
      idle: agents.filter(a => a.status === 'IDLE').length,
      running: agents.filter(a => a.status === 'RUNNING').length,
      error: agents.filter(a => a.status === 'ERROR').length,
      offline: agents.filter(a => a.status === 'OFFLINE' || a.status === 'DISABLED').length,
      warning: agents.filter(a => a.status === 'WARNING').length,
    }
  }
}

export const agentRegistry = new AgentRegistry()

function register(id: string, name: string, description: string, capabilities: AgentCapability[], permissions?: AgentPermission[], metadata?: Record<string, unknown>): BaseAgent {
  const agent = new BaseAgent({ id, name, description, capabilities, permissions, metadata })
  agentRegistry.register(agent)
  return agent
}

// ── Register all agents ────────────────────────────

// Executive
register('ceo-agent', 'CEO Agent', 'Distributes tasks to the right agents based on capabilities and priorities.', ['task.distribute'], [
  { resource: '*', actions: ['read', 'execute'] },
])

register('cfo-agent', 'CFO Agent', 'Calculates profit, cashflow, costs, API usage, budgets, forecasts, and warnings.', ['finance.calculate', 'finance.budget'], [
  { resource: 'finance', actions: ['read', 'write', 'execute'] },
  { resource: 'dashboard', actions: ['read', 'write'] },
])

register('tax-agent', 'Tax Agent', 'Manages tax reserves, tax calendar, DATEV preparation, export, and warnings.', ['tax.calculate', 'tax.export'], [
  { resource: 'tax', actions: ['read', 'write', 'execute'] },
  { resource: 'finance', actions: ['read'] },
])

register('security-agent', 'Security Agent', 'Manages API keys, secrets, vault, OAuth, audit logging, key rotation, and permissions.', ['security.scan', 'security.audit'], [
  { resource: 'security', actions: ['read', 'write', 'execute', 'admin'] },
  { resource: '*', actions: ['read'] },
])

// Research & Campaign
register('research-agent', 'Research Agent', 'Performs market analysis, keyword research, product research, competitor analysis, and trend detection.', ['research.market', 'research.trends'], [
  { resource: 'research', actions: ['read', 'write', 'execute'] },
  { resource: 'knowledge', actions: ['read', 'write'] },
])

register('campaign-agent', 'Campaign Agent', 'Manages campaigns, budgets, platforms, and performance tracking.', ['campaign.manage', 'campaign.optimize'], [
  { resource: 'campaigns', actions: ['read', 'write', 'execute'] },
  { resource: 'social', actions: ['read', 'write'] },
  { resource: 'finance', actions: ['read'] },
])

register('affiliate-agent', 'Affiliate Agent', 'Manages affiliate links, commissions, payouts, and performance tracking.', ['affiliate.manage', 'affiliate.track'], [
  { resource: 'affiliate', actions: ['read', 'write', 'execute'] },
  { resource: 'finance', actions: ['read'] },
])

// Brand & Content
register('brand-agent', 'Brand Agent', 'Defines and maintains brand DNA, positioning, voice, and visual identity guidelines.', ['brand.dna', 'brand.position'], [
  { resource: 'brand', actions: ['read', 'write', 'execute'] },
  { resource: 'knowledge', actions: ['read', 'write'] },
])

register('script-agent', 'Script Agent', 'Writes hooks, UGC scripts, captions, CTAs, and ad copies based on brand guidelines and platform rules.', ['content.script'], [
  { resource: 'script', actions: ['read', 'write', 'execute'] },
  { resource: 'knowledge', actions: ['read'] },
])

register('video-agent', 'Video Agent', 'Generates and renders videos using AI providers. Manages video assets and production pipeline.', ['content.video'], [
  { resource: 'video', actions: ['read', 'write', 'execute'] },
])

register('voice-agent', 'Voice Agent', 'Synthesizes and clones voices for voiceovers and brand audio assets.', ['content.voice'], [
  { resource: 'voice', actions: ['read', 'write', 'execute'] },
])

register('avatar-agent', 'Avatar Agent', 'Creates and animates brand avatars for content creation and brand presence.', ['content.avatar'], [
  { resource: 'avatar', actions: ['read', 'write', 'execute'] },
])

// Social Media (Platform-Specific)
register('tiktok-agent', 'TikTok Agent', 'Analyzes trends, tests hooks, posts videos, suggests sounds/hashtags, manages comments and engagement.', ['social.tiktok'], [
  { resource: 'social.tiktok', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

register('instagram-agent', 'Instagram Agent', 'Manages Reels, Stories, Highlights, Captions, DM requests, and creator branding.', ['social.instagram'], [
  { resource: 'social.instagram', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

register('youtube-agent', 'YouTube Agent', 'Publishes Shorts, optimizes titles/descriptions, creates thumbnails, manages playlists, analyzes analytics.', ['social.youtube'], [
  { resource: 'social.youtube', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
  { resource: 'analytics', actions: ['read'] },
])

register('facebook-agent', 'Facebook Agent', 'Manages Facebook Pages, posts, Reels, groups, leads, comments, and Meta Ads preparation.', ['social.facebook'], [
  { resource: 'social.facebook', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

register('x-agent', 'X Agent', 'Manages X/Twitter posts, threads, and engagement.', ['social.x'], [
  { resource: 'social.x', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

register('pinterest-agent', 'Pinterest Agent', 'Creates and manages Pins, boards, and Pinterest SEO strategy.', ['social.pinterest'], [
  { resource: 'social.pinterest', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

register('reddit-agent', 'Reddit Agent', 'Finds relevant subreddits, adapts content to community rules, suggests responses, builds organic expertise.', ['social.reddit'], [
  { resource: 'social.reddit', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read'] },
])

register('linkedin-agent', 'LinkedIn Agent', 'Manages LinkedIn posts, articles, and professional networking.', ['social.linkedin'], [
  { resource: 'social.linkedin', actions: ['read', 'write', 'execute'] },
  { resource: 'publishing', actions: ['read', 'write'] },
])

// Analytics & Publishing
register('analytics-agent', 'Analytics Agent', 'Tracks CTR, ROAS, EPC, engagement, follower growth, and profit analytics across all platforms.', ['analytics.report', 'analytics.insights'], [
  { resource: 'analytics', actions: ['read', 'write', 'execute'] },
  { resource: 'social', actions: ['read'] },
  { resource: 'finance', actions: ['read'] },
  { resource: 'dashboard', actions: ['read', 'write'] },
])

register('publishing-agent', 'Publishing Agent', 'Handles scheduling, queue management, uploads, retry logic, and publishing monitoring.', ['publishing.schedule', 'publishing.publish'], [
  { resource: 'publishing', actions: ['read', 'write', 'execute'] },
  { resource: 'social', actions: ['write'] },
])

// Enterprise
register('seo-agent', 'SEO Agent', 'Analyzes and optimizes SEO for content across all platforms and search engines.', ['seo.analyze', 'seo.optimize'], [
  { resource: 'seo', actions: ['read', 'write', 'execute'] },
  { resource: 'analytics', actions: ['read'] },
])

register('crm-agent', 'CRM Agent', 'Manages customer relationships, pipeline tracking, lead nurturing, and audience segmentation.', ['crm.manage', 'crm.pipeline'], [
  { resource: 'crm', actions: ['read', 'write', 'execute'] },
  { resource: 'analytics', actions: ['read'] },
])

register('notification-agent', 'Notification Agent', 'Sends notifications via Email, WhatsApp, Telegram, Discord, Slack, and Push.', ['notify.send', 'notify.schedule'], [
  { resource: 'notifications', actions: ['read', 'write', 'execute'] },
])

register('automation-agent', 'Automation Agent', 'Creates and manages workflow automation, triggers, and scheduled jobs.', ['automation.workflow', 'automation.trigger'], [
  { resource: 'automation', actions: ['read', 'write', 'execute', 'admin'] },
])

register('knowledge-agent', 'Knowledge Agent', 'Maintains documentation, playbooks, agent memory, lessons learned, and best practices.', ['knowledge.store', 'knowledge.retrieve'], [
  { resource: 'knowledge', actions: ['read', 'write', 'execute', 'admin'] },
])

agentLogger.success('registry', `All ${agentRegistry.getStats().total} agents registered successfully`)
