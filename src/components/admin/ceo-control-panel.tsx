'use client';

import { useState } from 'react';
import { allAgents } from '@/lib/agents';

type AgentStatus = 'active' | 'paused' | 'disabled';

interface AgentControl {
  agent: string;
  status: AgentStatus;
  lastRun: string;
  executionCount: number;
  avgResponseTime: number;
  enabled: boolean;
}

const initialAgentControls: AgentControl[] = allAgents.map((agent) => ({
  agent: agent.agent,
  status: 'active',
  lastRun: '2 min ago',
  executionCount: Math.floor(Math.random() * 50) + 5,
  avgResponseTime: Math.floor(Math.random() * 3000) + 1000,
  enabled: true,
}));

export function CEOControlPanel() {
  const [agentControls, setAgentControls] = useState<AgentControl[]>(initialAgentControls);
  const [globalStatus, setGlobalStatus] = useState<'running' | 'paused'>('running');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Content' | 'Shop' | 'Growth' | 'Social Media'>('all');

  const categories = ['all', 'Content', 'Shop', 'Growth', 'Social Media'] as const;
  const agentsByCategory = allAgents.reduce(
    (acc, agent) => {
      if (!acc[agent.category]) acc[agent.category] = [];
      acc[agent.category].push(agent.agent);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const filteredAgents = agentControls.filter((control) => {
    if (selectedCategory === 'all') return true;
    const agent = allAgents.find((a) => a.agent === control.agent);
    return agent?.category === selectedCategory;
  });

  const toggleAgent = (agentName: string) => {
    setAgentControls((prev) =>
      prev.map((control) =>
        control.agent === agentName
          ? { ...control, enabled: !control.enabled, status: !control.enabled ? 'active' : 'disabled' }
          : control
      )
    );
  };

  const toggleGlobalStatus = () => {
    setGlobalStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
    setAgentControls((prev) =>
      prev.map((control) => ({
        ...control,
        status: globalStatus === 'running' ? 'paused' : 'active',
      }))
    );
  };

  const activateAll = () => {
    setGlobalStatus('running');
    setAgentControls((prev) =>
      prev.map((control) => ({
        ...control,
        enabled: true,
        status: 'active',
      }))
    );
  };

  const pauseAll = () => {
    setGlobalStatus('paused');
    setAgentControls((prev) =>
      prev.map((control) => ({
        ...control,
        status: 'paused',
      }))
    );
  };

  const disableAll = () => {
    setGlobalStatus('paused');
    setAgentControls((prev) =>
      prev.map((control) => ({
        ...control,
        enabled: false,
        status: 'disabled',
      }))
    );
  };

  const launchCampaign = () => {
    alert('Campaign Launch Initiated!\n\nAll active agents will begin coordinated Who Knows promotion on their respective platforms with UGC-focused content strategy.');
  };

  const generateReport = () => {
    const report = {
      timestamp: new Date().toLocaleString(),
      totalAgents: agentControls.length,
      activeAgents: agentControls.filter((c) => c.enabled && c.status === 'active').length,
      totalExecutions,
      averageResponseTime: avgResponseTime,
      systemStatus: globalStatus,
    };
    console.log('[v0] CEO Control Panel Report:', report);
    alert(`Report Generated!\n\nActive Agents: ${report.activeAgents}/${report.totalAgents}\nTotal Executions: ${report.totalExecutions}\nAvg Response Time: ${report.averageResponseTime}ms\n\nCheck console for full report.`);
  };

  const activeCount = agentControls.filter((c) => c.enabled && c.status === 'active').length;
  const totalExecutions = agentControls.reduce((sum, c) => sum + c.executionCount, 0);
  const avgResponseTime = Math.round(agentControls.reduce((sum, c) => sum + c.avgResponseTime, 0) / agentControls.length);

  return (
    <div className="space-y-8">
      {/* System Status */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label">System Status</p>
            <div className="mt-3 flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${globalStatus === 'running' ? 'bg-gold' : 'bg-bone/30'}`} />
              <h2 className="text-2xl font-black uppercase">{globalStatus === 'running' ? 'All Systems Go' : 'Paused'}</h2>
            </div>
          </div>
          <button
            onClick={toggleGlobalStatus}
            className={`rounded-2xl px-8 py-3 font-bold uppercase tracking-widest transition-all ${
              globalStatus === 'running'
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-gold/20 text-gold hover:bg-gold/30'
            }`}
          >
            {globalStatus === 'running' ? 'Pause All' : 'Resume All'}
          </button>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-bone/50">Active Agents</p>
            <p className="mt-2 text-3xl font-black text-gold">{activeCount}/26</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-bone/50">Total Executions</p>
            <p className="mt-2 text-3xl font-black text-gold">{totalExecutions}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-bone/50">Avg Response Time</p>
            <p className="mt-2 text-3xl font-black text-gold">{avgResponseTime}ms</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-2xl px-4 py-2 font-bold uppercase tracking-widest transition-all ${
              selectedCategory === category ? 'bg-gold text-background' : 'bg-white/10 text-bone hover:bg-white/20'
            }`}
          >
            {category === 'all' ? 'All Agents' : `${category} (${agentsByCategory[category]?.length || 0})`}
          </button>
        ))}
      </div>

      {/* Agent Controls Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((control) => (
          <div
            key={control.agent}
            className={`rounded-3xl border p-6 transition-all ${
              control.enabled
                ? 'border-gold/30 bg-gold/5'
                : 'border-white/10 bg-white/[0.03] opacity-60'
            }`}
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-black text-gold">{control.agent}</h3>
                <p className={`mt-1 text-xs uppercase tracking-widest ${
                  control.status === 'active'
                    ? 'text-green-400'
                    : control.status === 'paused'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                }`}>
                  {control.status.toUpperCase()}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleAgent(control.agent)}
                className={`h-8 w-14 rounded-full transition-all ${
                  control.enabled ? 'bg-gold' : 'bg-white/10'
                } flex items-center ${control.enabled ? 'justify-end' : 'justify-start'} px-1`}
              >
                <div className="h-6 w-6 rounded-full bg-background" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-bone/60">Executions</span>
                <span className="font-bold text-gold">{control.executionCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-bone/60">Avg Response</span>
                <span className="font-bold text-gold">{control.avgResponseTime}ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-bone/60">Last Run</span>
                <span className="font-mono text-gold">{control.lastRun}</span>
              </div>
            </div>

            {/* Health Bar */}
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  control.avgResponseTime < 2000
                    ? 'bg-green-500'
                    : control.avgResponseTime < 3000
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${100 - (control.avgResponseTime / 4000) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Command Center */}
      <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
        <p className="label">Command Center</p>
        <h3 className="mt-3 text-2xl font-black uppercase">Mass Operations</h3>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <button
            onClick={activateAll}
            className="rounded-2xl bg-green-500/20 px-6 py-4 font-bold uppercase tracking-widest text-green-400 transition-all hover:bg-green-500/30 active:scale-95"
          >
            Activate All
          </button>
          <button
            onClick={pauseAll}
            className="rounded-2xl bg-yellow-500/20 px-6 py-4 font-bold uppercase tracking-widest text-yellow-400 transition-all hover:bg-yellow-500/30 active:scale-95"
          >
            Pause All
          </button>
          <button
            onClick={disableAll}
            className="rounded-2xl bg-red-500/20 px-6 py-4 font-bold uppercase tracking-widest text-red-400 transition-all hover:bg-red-500/30 active:scale-95"
          >
            Disable All
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            onClick={launchCampaign}
            className="rounded-2xl bg-blue-500/20 px-6 py-4 font-bold uppercase tracking-widest text-blue-400 transition-all hover:bg-blue-500/30 active:scale-95"
          >
            Launch Campaign
          </button>
          <button
            onClick={generateReport}
            className="rounded-2xl bg-purple-500/20 px-6 py-4 font-bold uppercase tracking-widest text-purple-400 transition-all hover:bg-purple-500/30 active:scale-95"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Agent Categories Breakdown */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="label">Agent Categories</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {Object.entries(agentsByCategory)
            .filter(([category]) => category !== 'Ops')
            .map(([category, agents]) => {
              const categoryAgents = agentControls.filter((c) => agents.includes(c.agent));
              const activeInCategory = categoryAgents.filter((c) => c.enabled && c.status === 'active').length;

              return (
                <div key={category} className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold uppercase tracking-widest text-gold">{category}</h4>
                    <span className="text-xs font-bold text-gold">
                      {activeInCategory}/{agents.length}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all"
                      style={{ width: `${(activeInCategory / agents.length) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-bone/60">{agents.join(', ')}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
