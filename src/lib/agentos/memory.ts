import type { AgentMemoryStore, AgentTaskRecord } from './types'

export class AgentMemory {
  private stores = new Map<string, AgentMemoryStore>()

  private getStore(agentId: string): AgentMemoryStore {
    if (!this.stores.has(agentId)) {
      this.stores.set(agentId, {
        shortTerm: new Map(),
        longTerm: new Map(),
        taskHistory: [],
        knowledge: new Map(),
      })
    }
    return this.stores.get(agentId)!
  }

  storeShortTerm(agentId: string, key: string, value: unknown): void {
    const store = this.getStore(agentId)
    store.shortTerm.set(key, value)
    if (store.shortTerm.size > 100) {
      const firstKey = store.shortTerm.keys().next().value
      if (firstKey) store.shortTerm.delete(firstKey)
    }
  }

  getShortTerm(agentId: string, key: string): unknown | undefined {
    return this.getStore(agentId).shortTerm.get(key)
  }

  storeLongTerm(agentId: string, key: string, value: unknown): void {
    this.getStore(agentId).longTerm.set(key, value)
  }

  getLongTerm(agentId: string, key: string): unknown | undefined {
    return this.getStore(agentId).longTerm.get(key)
  }

  storeKnowledge(agentId: string, key: string, value: unknown): void {
    this.getStore(agentId).knowledge.set(key, value)
  }

  getKnowledge(agentId: string, key: string): unknown | undefined {
    return this.getStore(agentId).knowledge.get(key)
  }

  recordTask(agentId: string, task: AgentTaskRecord): void {
    const store = this.getStore(agentId)
    store.taskHistory.push(task)
    if (store.taskHistory.length > 500) {
      store.taskHistory = store.taskHistory.slice(-500)
    }
  }

  getTaskHistory(agentId: string): AgentTaskRecord[] {
    return this.getStore(agentId).taskHistory
  }

  getStats(agentId: string): { shortTermSize: number; longTermSize: number; taskCount: number; knowledgeSize: number } {
    const store = this.getStore(agentId)
    return {
      shortTermSize: store.shortTerm.size,
      longTermSize: store.longTerm.size,
      taskCount: store.taskHistory.length,
      knowledgeSize: store.knowledge.size,
    }
  }

  clearShortTerm(agentId: string): void {
    this.getStore(agentId).shortTerm.clear()
  }

  clearAgentMemory(agentId: string): void {
    this.stores.delete(agentId)
  }
}

export const agentMemory = new AgentMemory()
