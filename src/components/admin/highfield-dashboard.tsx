'use client';

import { useState } from 'react';
import { allAgents } from '@/lib/agents';

interface CampaignData {
  campaignId: string;
  agentCount: number;
  status: string;
  accountsCreated: number;
  monthlyUGC: number;
}

export function HighfieldDashboard() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const socialMediaAgents = allAgents.filter((a) => a.category === 'Social Media');
  const contentAgents = allAgents.filter((a) => a.category === 'Content');
  const growthAgents = allAgents.filter((a) => a.category === 'Growth');

  const handleSelectAgent = (agentName: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentName) ? prev.filter((a) => a !== agentName) : [...prev, agentName]
    );
  };

  const handleCreateAccounts = async () => {
    if (selectedAgents.length === 0) {
      setError('Select at least one agent');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/v1/agents/highfield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-accounts',
          agents: selectedAgents,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      console.log('[v0] Accounts created:', data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (selectedAgents.length === 0) {
      setError('Select at least one agent');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/v1/agents/highfield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-campaign',
          agents: selectedAgents,
          campaign: {
            budget: 5000,
            targetAudience: '18-35 urban mystery-seekers',
            duration: 90,
          },
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setCampaign({
        campaignId: data.data.campaignId,
        agentCount: selectedAgents.length,
        status: data.data.status,
        accountsCreated: selectedAgents.length * 4,
        monthlyUGC: data.data.expectedMetrics.monthlyUGC,
      });

      console.log('[v0] Campaign created:', data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Campaign creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <div>
        <p className="label">Autonomous Agent Campaign Management</p>
        <h1 className="mt-3 text-5xl font-black uppercase">Highfield UGC</h1>
        <p className="mt-3 max-w-2xl text-bone/70">
          Enable all 26 agents to autonomously create and manage social media accounts. Generate 300+ UGC pieces monthly on TikTok, Instagram, YouTube, and Facebook. Real-time Highfield analytics tracking.
        </p>
      </div>

      {/* Campaign Status */}
      {campaign && (
        <div className="rounded-3xl border border-gold/30 bg-gold/5 p-6">
          <h2 className="text-xl font-black text-gold">Campaign Active</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-bone/60">Campaign ID</p>
              <p className="mt-1 font-mono text-sm">{campaign.campaignId.slice(-8)}</p>
            </div>
            <div>
              <p className="text-sm text-bone/60">Active Agents</p>
              <p className="mt-1 text-2xl font-black">{campaign.agentCount}</p>
            </div>
            <div>
              <p className="text-sm text-bone/60">Accounts Created</p>
              <p className="mt-1 text-2xl font-black">{campaign.accountsCreated}</p>
            </div>
            <div>
              <p className="text-sm text-bone/60">Monthly UGC Target</p>
              <p className="mt-1 text-2xl font-black">{campaign.monthlyUGC}</p>
            </div>
          </div>
        </div>
      )}

      {/* Agent Selection */}
      <div className="space-y-6">
        {/* Social Media Agents */}
        <div>
          <p className="label">Social Media Agents (Primary)</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {socialMediaAgents.map((agent) => (
              <label key={agent.agent} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-gold/50 hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.agent)}
                  onChange={() => handleSelectAgent(agent.agent)}
                  className="h-4 w-4 cursor-pointer rounded"
                />
                <div className="flex-1">
                  <p className="font-bold text-gold">{agent.agent}</p>
                  <p className="text-xs text-bone/50">Creates 3-4 platform accounts</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Content Agents */}
        <div>
          <p className="label">Content Agents (UGC Focus)</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {contentAgents.map((agent) => (
              <label key={agent.agent} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-gold/50 hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.agent)}
                  onChange={() => handleSelectAgent(agent.agent)}
                  className="h-4 w-4 cursor-pointer rounded"
                />
                <div className="flex-1">
                  <p className="font-bold text-gold">{agent.agent}</p>
                  <p className="text-xs text-bone/50">Content production</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Growth/Strategic Agents */}
        <div>
          <p className="label">Growth & Strategic Agents (Analytics)</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {growthAgents.map((agent) => (
              <label key={agent.agent} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-gold/50 hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.agent)}
                  onChange={() => handleSelectAgent(agent.agent)}
                  className="h-4 w-4 cursor-pointer rounded"
                />
                <div className="flex-1">
                  <p className="font-bold text-gold">{agent.agent}</p>
                  <p className="text-xs text-bone/50">Analytics & optimization</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCreateAccounts}
          disabled={loading || selectedAgents.length === 0}
          className="btn bg-gold/20 hover:bg-gold/30 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Accounts'}
        </button>
        <button
          onClick={handleCreateCampaign}
          disabled={loading || selectedAgents.length === 0}
          className="btn-dark disabled:opacity-50"
        >
          {loading ? 'Starting...' : 'Launch Campaign'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Campaign Brief */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-black text-gold">Campaign Structure</h2>
        <div className="mt-4 space-y-3 text-sm text-bone/70">
          <p>
            <strong>Account Creation:</strong> Each agent creates dedicated accounts on TikTok, Instagram, YouTube, Facebook.
            Every account optimized for autonomous content posting via Highfield API.
          </p>
          <p>
            <strong>UGC Strategy:</strong> Agents post 3-4x daily with optimized hashtags, content pillars, and timing.
            Real-time Highfield analytics track performance.
          </p>
          <p>
            <strong>Target Metrics (90 days):</strong> 500K TikTok followers, 300K Instagram, 200K YouTube subscribers,
            8%+ engagement rate, €1 ROAS minimum.
          </p>
          <p>
            <strong>Budget:</strong> €5,000 campaign fund. €2,500 TikTok, €1,250 Instagram, €750 YouTube, €500 Facebook.
          </p>
        </div>
      </div>
    </main>
  );
}
