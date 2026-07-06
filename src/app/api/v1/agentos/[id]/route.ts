import { NextResponse } from 'next/server'
import { agentRegistry, agentLogger, agentMemory, agentMonitoring } from '@/lib/agentos'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const agent = agentRegistry.get(id)

  if (!agent) {
    return NextResponse.json({ error: `Agent not found: ${id}` }, { status: 404 })
  }

  return NextResponse.json({
    id: agent.id,
    name: agent.name,
    version: agent.version,
    description: agent.description,
    status: agent.status,
    capabilities: agent.capabilities,
    permissions: agent.permissions,
    metrics: agent.metrics,
    health: agentMonitoring.getHealthScore(id),
    memory: agentMemory.getStats(id),
    logs: agentLogger.getAgentLogs(id, 20),
    metadata: agent.metadata,
  })
}
