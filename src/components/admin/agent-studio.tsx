'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allAgents, contentAgents, shopAgents, growthAgents, strategicAgents, type AgentResult } from '@/lib/agents';

const categories: AgentResult['category'][] = ['Content', 'Shop', 'Growth'];

export function AgentStudio() {
  const [selectedAgent, setSelectedAgent] = useState<AgentResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<AgentResult['category']>('Content');

  const getCategoryAgents = (cat: AgentResult['category']) => {
    return allAgents.filter((a) => a.category === cat);
  };

  const selectedAgentData = selectedAgent ? allAgents.find((a) => a.agent === selectedAgent.agent) : null;

  return (
    <main className="min-h-screen bg-ink p-6 text-bone">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="label">Carry OS &middot; Agent Studio</p>
            <h1 className="mt-3 text-5xl font-black uppercase">Agent Studio</h1>
          </div>
          <Link href="/admin/ugc-affiliate" className="btn-dark">
            Back to Control Center
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Agent List */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-black uppercase">Available Agents</h2>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
                      activeCategory === cat ? 'bg-gold text-ink' : 'border border-white/20 text-bone/60 hover:text-bone'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                {getCategoryAgents(activeCategory).map((agent) => (
                  <button
                    key={agent.agent}
                    type="button"
                    onClick={() => setSelectedAgent(agent)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                      selectedAgent?.agent === agent.agent
                        ? 'border-gold bg-gold/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <p className="font-semibold text-bone">{agent.agent}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-bone/40">
                      {agent.output.length} outputs
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Details */}
          <div className="lg:col-span-2">
            {selectedAgentData ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <div className="mb-6">
                  <p className="label">{selectedAgentData.category} Agent</p>
                  <h2 className="mt-3 text-3xl font-black uppercase">{selectedAgentData.agent}</h2>
                </div>

                <div className="space-y-8">
                  {/* Outputs */}
                  <section>
                    <h3 className="text-lg font-black uppercase text-gold">Output</h3>
                    <ul className="mt-4 space-y-3">
                      {selectedAgentData.output.map((output, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 font-mono text-xs font-semibold text-gold">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed text-bone/80">{output}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Next Actions */}
                  <section>
                    <h3 className="text-lg font-black uppercase text-gold">Next Actions</h3>
                    <ul className="mt-4 space-y-2">
                      {selectedAgentData.nextActions.map((action, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-bone/70">
                          <span className="h-2 w-2 rounded-full bg-gold" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6">
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-gold py-3 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
                    >
                      Execute Agent
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-white/20 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-bone transition-colors hover:bg-white/5"
                    >
                      View Logs
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-8" style={{ minHeight: '400px' }}>
                <p className="font-mono text-sm uppercase tracking-widest text-bone/40">Select an agent to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Ops Overview */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-black uppercase">All Agents Overview</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Total Agents', value: allAgents.length },
              { label: 'Content Agents', value: contentAgents.length },
              { label: 'Shop Agents', value: shopAgents.length },
              { label: 'Growth Agents', value: growthAgents.length },
              { label: 'Strategic Agents', value: strategicAgents.length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/40">{stat.label}</p>
                <p className="mt-2 text-3xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
