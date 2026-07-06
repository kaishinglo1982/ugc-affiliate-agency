import { AgentChat } from '@/components/admin/agent-chat'

export const metadata = { title: 'Agent Chat | Who Knows' }

export default function AgentsChatPage() {
  return (
    <main className="min-h-screen bg-background">
      <AgentChat />
    </main>
  )
}
