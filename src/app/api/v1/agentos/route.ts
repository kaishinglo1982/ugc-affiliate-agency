import { NextResponse } from 'next/server'
import { agentRegistry, agentMonitoring, agentLogger } from '@/lib/agentos'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const capability = url.searchParams.get('capability')

  const agents = agentRegistry.list(
    status ? { status: status as any } :
    capability ? { capability: capability as any } :
    undefined
  )

  const overview = agentMonitoring.getSystemOverview()
  const stats = agentRegistry.getStats()
  const logStats = agentLogger.getStats()

  const result = agents.map(a => ({
    id: a.id,
    name: a.name,
    version: a.version,
    description: a.description,
    status: a.status,
    capabilities: a.capabilities,
    permissions: a.permissions,
    metrics: a.metrics,
    health: agentMonitoring.getHealthScore(a.id),
    monitoring: overview[a.id] ?? null,
    memory: a.memory.getStats(a.id),
  }))

  return NextResponse.json({
    agents: result,
    stats,
    monitoring: overview,
    logs: logStats,
    total: result.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agentId, input } = body

    if (!agentId || !input) {
      return NextResponse.json({ error: 'agentId and input required' }, { status: 400 })
    }

    const agent = agentRegistry.get(agentId)
    if (!agent) {
      return NextResponse.json({ error: `Agent not found: ${agentId}` }, { status: 404 })
    }

    const result = await agent.execute(input)
    return NextResponse.json({ success: true, agentId, result })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
