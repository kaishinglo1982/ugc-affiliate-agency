import { NextResponse } from 'next/server'
import { agentRegistry, agentLogger, agentMonitoring } from '@/lib/agentos'
import type { AgentChatMessage } from '@/lib/agentos'

const chatHistories = new Map<string, AgentChatMessage[]>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, message, agentId } = body

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'sessionId and message required' }, { status: 400 })
    }

    if (!chatHistories.has(sessionId)) {
      chatHistories.set(sessionId, [])
    }
    const history = chatHistories.get(sessionId)!

    const userMsg: AgentChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    }
    history.push(userMsg)

    let targetAgent
    if (agentId) {
      targetAgent = agentRegistry.get(agentId)
    } else {
      targetAgent = determineAgentForMessage(message)
    }

    let response: string
    let respondedAgentId: string

    if (targetAgent) {
      agentMonitoring.heartbeat(targetAgent.id, 'RUNNING')
      agentLogger.info(targetAgent.id, `Chat input: ${message.slice(0, 100)}`)

      try {
        const result = await targetAgent.execute({ message, history: history.slice(-10) })
        response = typeof result === 'object' && result !== null
          ? JSON.stringify(result, null, 2)
          : String(result)
        respondedAgentId = targetAgent.id
        agentLogger.success(targetAgent.id, 'Chat response sent')
        agentMonitoring.heartbeat(targetAgent.id, 'IDLE')
      } catch (error: any) {
        response = `Agent ${targetAgent.name} encountered an error: ${error.message}. Please try again or rephrase.`
        respondedAgentId = targetAgent.id
        agentMonitoring.recordError(targetAgent.id)
      }
    } else {
      const agents = agentRegistry.list()
      const names = agents.map(a => `- **${a.name}** (\`${a.id}\`): ${a.description}`).join('\n')
      response = `I'm the AgentOS orchestrator. Here are the agents I can route you to:\n\n${names}\n\nReply with the agent name or ID you'd like to talk to.`
      respondedAgentId = 'orchestrator'
    }

    const agentMsg: AgentChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: 'agent',
      agentId: respondedAgentId,
      content: response,
      timestamp: Date.now(),
    }
    history.push(agentMsg)

    if (history.length > 100) {
      chatHistories.set(sessionId, history.slice(-100))
    }

    return NextResponse.json({
      message: agentMsg,
      history: history.slice(-20),
      agentId: respondedAgentId,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function determineAgentForMessage(message: string): ReturnType<typeof agentRegistry.get> {
  const lower = message.toLowerCase()

  if (lower.includes('brand') || lower.includes('dna') || lower.includes('positioning') || lower.includes('identity')) {
    return agentRegistry.get('brand-agent')
  }
  if (lower.includes('script') || lower.includes('caption') || lower.includes('copy') || lower.includes('hook') || lower.includes('cta')) {
    return agentRegistry.get('script-agent')
  }
  if (lower.includes('video') || lower.includes('render') || lower.includes('generate')) {
    return agentRegistry.get('video-agent')
  }
  if (lower.includes('voice') || lower.includes('tts') || lower.includes('voiceover')) {
    return agentRegistry.get('voice-agent')
  }
  if (lower.includes('avatar')) {
    return agentRegistry.get('avatar-agent')
  }
  if (lower.includes('tiktok')) {
    return agentRegistry.get('tiktok-agent')
  }
  if (lower.includes('instagram')) {
    return agentRegistry.get('instagram-agent')
  }
  if (lower.includes('youtube')) {
    return agentRegistry.get('youtube-agent')
  }
  if (lower.includes('facebook') || lower.includes('meta')) {
    return agentRegistry.get('facebook-agent')
  }
  if (lower.includes('x ') || lower.includes('twitter')) {
    return agentRegistry.get('x-agent')
  }
  if (lower.includes('pinterest')) {
    return agentRegistry.get('pinterest-agent')
  }
  if (lower.includes('reddit')) {
    return agentRegistry.get('reddit-agent')
  }
  if (lower.includes('linkedin')) {
    return agentRegistry.get('linkedin-agent')
  }
  if (lower.includes('analytics') || lower.includes('report') || lower.includes('ctr') || lower.includes('roas') || lower.includes('insight')) {
    return agentRegistry.get('analytics-agent')
  }
  if (lower.includes('publish') || lower.includes('schedule') || lower.includes('upload')) {
    return agentRegistry.get('publishing-agent')
  }
  if (lower.includes('campaign') || lower.includes('ad') || lower.includes('marketing')) {
    return agentRegistry.get('campaign-agent')
  }
  if (lower.includes('affiliate') || lower.includes('commission') || lower.includes('payout')) {
    return agentRegistry.get('affiliate-agent')
  }
  if (lower.includes('research') || lower.includes('market') || lower.includes('trend') || lower.includes('competitor') || lower.includes('keyword')) {
    return agentRegistry.get('research-agent')
  }
  if (lower.includes('seo')) {
    return agentRegistry.get('seo-agent')
  }
  if (lower.includes('crm') || lower.includes('customer') || lower.includes('pipeline') || lower.includes('lead')) {
    return agentRegistry.get('crm-agent')
  }
  if (lower.includes('notification') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('slack') || lower.includes('discord')) {
    return agentRegistry.get('notification-agent')
  }
  if (lower.includes('automation') || lower.includes('workflow') || lower.includes('trigger')) {
    return agentRegistry.get('automation-agent')
  }
  if (lower.includes('knowledge') || lower.includes('documentation') || lower.includes('playbook') || lower.includes('lesson')) {
    return agentRegistry.get('knowledge-agent')
  }
  if (lower.includes('cashflow') || lower.includes('profit') || lower.includes('cost') || lower.includes('budget') || lower.includes('revenue') || lower.includes('finance')) {
    return agentRegistry.get('cfo-agent')
  }
  if (lower.includes('tax') || lower.includes('steuer') || lower.includes('datev') || lower.includes('export')) {
    return agentRegistry.get('tax-agent')
  }
  if (lower.includes('security') || lower.includes('api key') || lower.includes('vault') || lower.includes('oauth') || lower.includes('audit')) {
    return agentRegistry.get('security-agent')
  }
  if (lower.includes('ceo') || lower.includes('distribute') || lower.includes('assign') || lower.includes('task')) {
    return agentRegistry.get('ceo-agent')
  }

  return null
}
