'use client';

import { useState } from 'react';
import { allAgents } from '@/lib/agents';
import { agentCommands, getAgentCommand } from '@/lib/agents/commands';
import type { AgentResult } from '@/lib/agents';

interface ExecutionResult {
  agent: string;
  status: 'pending' | 'success' | 'error';
  result?: string;
  error?: string;
  timestamp: Date;
}

export function AgentStudioInteractive() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Content');
  const [executions, setExecutions] = useState<ExecutionResult[]>([]);
  const [executing, setExecuting] = useState<string | null>(null);

  const categories = Array.from(new Set(allAgents.map((a) => a.category)));
  const agents = allAgents.filter((a) => a.category === selectedCategory);

  async function executeAgent(agent: AgentResult) {
    setExecuting(agent.agent);
    const execution: ExecutionResult = {
      agent: agent.agent,
      status: 'pending',
      timestamp: new Date(),
    };
    setExecutions((prev) => [execution, ...prev]);

    try {
      const command = getAgentCommand(agent.agent);
      if (!command) throw new Error('No command found for agent');

      const response = await fetch('/api/v1/agents/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: agent.agent,
          command: command.command,
          context: command.context,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Execution failed');

      setExecutions((prev) =>
        prev.map((e) =>
          e.agent === agent.agent && e.timestamp === execution.timestamp
            ? { ...e, status: 'success', result: data.data?.result }
            : e
        )
      );
    } catch (error) {
      setExecutions((prev) =>
        prev.map((e) =>
          e.agent === agent.agent && e.timestamp === execution.timestamp
            ? { ...e, status: 'error', error: (error as Error).message }
            : e
        )
      );
    } finally {
      setExecuting(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              selectedCategory === cat
                ? 'border border-gold bg-gold/10 text-gold'
                : 'border border-white/10 bg-white/5 text-bone/60 hover:border-bone/30'
            }`}
          >
            {cat} ({allAgents.filter((a) => a.category === cat).length})
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const command = getAgentCommand(agent.agent);
          const execution = executions.find((e) => e.agent === agent.agent);

          return (
            <article
              key={agent.agent}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-gold/30 hover:bg-gold/5"
            >
              {/* Agent Header */}
              <div className="flex-1">
                <h3 className="text-lg font-black text-gold">{agent.agent}</h3>
                <p className="mt-2 text-xs text-bone/40">{command?.description}</p>

                {/* Command Preview */}
                <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3">
                  <p className="text-[0.7rem] leading-relaxed text-bone/50 line-clamp-3">
                    {command?.command}
                  </p>
                </div>

                {/* Execution Result */}
                {execution && (
                  <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3">
                    {execution.status === 'pending' && (
                      <p className="text-[0.7rem] animate-pulse text-gold">Executing...</p>
                    )}
                    {execution.status === 'success' && (
                      <p className="text-[0.7rem] leading-relaxed text-bone/60 line-clamp-4">
                        {execution.result || 'Execution complete'}
                      </p>
                    )}
                    {execution.status === 'error' && (
                      <p className="text-[0.7rem] text-red-400/70">{execution.error}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Execute Button */}
              <button
                onClick={() => executeAgent(agent)}
                disabled={executing === agent.agent}
                className="mt-5 rounded-full border border-gold/30 bg-gold/10 py-2 font-mono text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/20 disabled:opacity-50"
              >
                {executing === agent.agent ? 'Executing...' : 'Execute'}
              </button>
            </article>
          );
        })}
      </div>

      {/* Execution Log */}
      {executions.length > 0 && (
        <div className="space-y-4">
          <p className="label">Execution Log</p>
          <div className="space-y-3">
            {executions.slice(0, 10).map((exec, idx) => (
              <div
                key={`${exec.agent}-${idx}`}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm text-bone">{exec.agent}</p>
                    <p className="text-xs text-bone/40">{exec.timestamp.toLocaleTimeString()}</p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      exec.status === 'success'
                        ? 'bg-green-400'
                        : exec.status === 'error'
                          ? 'bg-red-400'
                          : 'bg-yellow-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
