import { agentLogger } from './logger'
import { agentMemory } from './memory'
import { agentMonitoring } from './monitoring'
import { agentRegistry } from './registry'
import type { AgentTask, AgentEvent } from './types'

export class AgentOrchestrator {
  private tasks = new Map<string, AgentTask>()
  private taskResults = new Map<string, unknown>()
  private taskErrors = new Map<string, string>()

  async dispatchTask(task: Omit<AgentTask, 'id' | 'createdAt' | 'maxRetries' | 'retryCount'>): Promise<AgentTask> {
    const fullTask: AgentTask = {
      ...task,
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      maxRetries: 3,
      retryCount: 0,
    }

    this.tasks.set(fullTask.id, fullTask)

    agentLogger.info('orchestrator', `Task ${fullTask.id} dispatched to ${fullTask.targetAgentId ?? 'any'}`, {
      taskType: fullTask.type,
      targetAgent: fullTask.targetAgentId,
      priority: fullTask.priority,
    })

    if (fullTask.targetAgentId) {
      const agent = agentRegistry.get(fullTask.targetAgentId)
      if (agent) {
        agentLogger.info(fullTask.targetAgentId, `Task received: ${fullTask.type}`, { taskId: fullTask.id })
        agentMonitoring.heartbeat(fullTask.targetAgentId, 'RUNNING')
        agentMemory.recordTask(fullTask.targetAgentId, {
          id: fullTask.id,
          type: fullTask.type,
          status: 'queued',
          input: fullTask.input,
          startedAt: Date.now(),
        })
      }
    }

    const result = await this.executeTask(fullTask)
    return { ...fullTask, ...result }
  }

  async executeTask(task: AgentTask): Promise<{ success: boolean; result?: unknown; error?: string }> {
    agentLogger.info('orchestrator', `Executing task ${task.id}`, { taskType: task.type, target: task.targetAgentId })

    try {
      const result = await this.routeTask(task)
      this.taskResults.set(task.id, result)
      this.tasks.set(task.id, { ...task })

      if (task.targetAgentId) {
        agentLogger.success(task.targetAgentId, `Task completed: ${task.type}`, { taskId: task.id, durationMs: Date.now() - task.createdAt })
        agentMemory.recordTask(task.targetAgentId, {
          id: task.id,
          type: task.type,
          status: 'completed',
          input: task.input,
          output: result,
          startedAt: task.createdAt,
          completedAt: Date.now(),
          durationMs: Date.now() - task.createdAt,
        })
        agentMonitoring.recordMetric(task.targetAgentId, { latencyMs: Date.now() - task.createdAt })
        agentMonitoring.heartbeat(task.targetAgentId, 'IDLE')
      }

      return { success: true, result }
    } catch (error: any) {
      const errorMsg = error.message ?? 'Unknown error'
      this.taskErrors.set(task.id, errorMsg)

      if (task.targetAgentId) {
        agentLogger.error(task.targetAgentId, `Task failed: ${task.type}`, { taskId: task.id, error: errorMsg })
        agentMemory.recordTask(task.targetAgentId, {
          id: task.id,
          type: task.type,
          status: 'failed',
          input: task.input,
          error: errorMsg,
          startedAt: task.createdAt,
          completedAt: Date.now(),
          durationMs: Date.now() - task.createdAt,
        })
        agentMonitoring.recordError(task.targetAgentId)
      }

      return { success: false, error: errorMsg }
    }
  }

  private async routeTask(task: AgentTask): Promise<unknown> {
    if (task.targetAgentId) {
      const agent = agentRegistry.get(task.targetAgentId)
      if (!agent) throw new Error(`Agent not found: ${task.targetAgentId}`)
      return agent.execute(task.input)
    }

    const agent = agentRegistry.findByCapability(task.type as any)
    if (agent) {
      agentMonitoring.heartbeat(agent.id, 'RUNNING')
      return agent.execute(task.input)
    }

    throw new Error(`No agent available for task type: ${task.type}`)
  }

  getTask(taskId: string): AgentTask | undefined {
    return this.tasks.get(taskId)
  }

  getTaskResult(taskId: string): unknown | undefined {
    return this.taskResults.get(taskId)
  }

  getTaskError(taskId: string): string | undefined {
    return this.taskErrors.get(taskId)
  }

  listTasks(filter?: { status?: string; agentId?: string }): AgentTask[] {
    let result = Array.from(this.tasks.values())
    if (filter?.agentId) result = result.filter(t => t.targetAgentId === filter.agentId)
    return result.sort((a, b) => b.createdAt - a.createdAt).slice(0, 100)
  }

  getStats(): { totalTasks: number; completed: number; failed: number; running: number; queued: number } {
    const tasks = Array.from(this.tasks.values())
    const last24h = tasks.filter(t => t.createdAt > Date.now() - 86400000)
    return {
      totalTasks: tasks.length,
      completed: this.taskResults.size,
      failed: this.taskErrors.size,
      running: last24h.filter(t => !this.taskResults.has(t.id) && !this.taskErrors.has(t.id)).length,
      queued: last24h.filter(t => !this.taskResults.has(t.id) && !this.taskErrors.has(t.id)).length,
    }
  }
}

export const agentOrchestrator = new AgentOrchestrator()
