import { AgentStudioInteractive } from '@/components/admin/agent-studio-interactive';

export const metadata = {
  title: 'Agent Studio — Who Knows',
};

export default function AgentStudioPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="label">Agent Control Center</p>
          <h1 className="mt-3 text-5xl font-black uppercase">Agent Studio</h1>
          <p className="mt-3 max-w-2xl text-bone/70">
            Execute all 22 agents with optimized commands. Each agent has pre-configured prompts tailored to Who Knows brand identity, target audience (18-35 urban mystery-seekers), and market positioning. Click Execute to run real AI analysis.
          </p>
        </div>
        <AgentStudioInteractive />
      </div>
    </main>
  );
}
