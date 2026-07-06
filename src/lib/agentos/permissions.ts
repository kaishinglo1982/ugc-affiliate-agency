import type { AgentPermission } from './types'

export class AgentPermissions {
  private permissions = new Map<string, AgentPermission[]>()

  define(agentId: string, permissions: AgentPermission[]): void {
    this.permissions.set(agentId, permissions)
  }

  getPermissions(agentId: string): AgentPermission[] {
    return this.permissions.get(agentId) ?? []
  }

  can(agentId: string, resource: string, action: AgentPermission['actions'][number]): boolean {
    const perms = this.permissions.get(agentId) ?? []
    for (const p of perms) {
      if (p.resource === resource || p.resource === '*') {
        if (p.actions.includes('admin') || p.actions.includes(action) || p.actions.includes('*')) {
          return true
        }
      }
    }
    return false
  }

  addPermission(agentId: string, permission: AgentPermission): void {
    const existing = this.permissions.get(agentId) ?? []
    existing.push(permission)
    this.permissions.set(agentId, existing)
  }

  removePermission(agentId: string, resource: string): void {
    const existing = this.permissions.get(agentId) ?? []
    this.permissions.set(agentId, existing.filter(p => p.resource !== resource))
  }

  listAll(): Array<{ agentId: string; permissions: AgentPermission[] }> {
    return Array.from(this.permissions.entries()).map(([agentId, perms]) => ({ agentId, permissions: perms }))
  }

  checkAccess(agentId: string, requiredPermissions: AgentPermission[]): { allowed: boolean; denied: string[] } {
    const denied: string[] = []
    for (const req of requiredPermissions) {
      for (const action of req.actions) {
        if (!this.can(agentId, req.resource, action)) {
          denied.push(`${action}:${req.resource}`)
        }
      }
    }
    return { allowed: denied.length === 0, denied }
  }
}

export const agentPermissions = new AgentPermissions()
