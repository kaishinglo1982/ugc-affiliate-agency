'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MarketData {
  targetAudience: {
    demographics: string[];
    psychographics: string[];
    channels: string[];
  };
  marketAnalysis: {
    marketSize: string;
    competitors: string[];
    trends: string[];
  };
  loading: boolean;
}

export function CEODashboard() {
  const [marketData, setMarketData] = useState<MarketData>({
    targetAudience: {
      demographics: ['18-35 years old', 'Urban dwellers', 'High disposable income', 'Tech-savvy early adopters'],
      psychographics: ['Mystery-seekers', 'Trend leaders', 'Community-focused', 'Authenticity-driven'],
      channels: ['TikTok (60%)', 'Instagram (35%)', 'Discord (25%)', 'YouTube (15%)'],
    },
    marketAnalysis: {
      marketSize: '€2.8B global luxury streetwear market',
      competitors: ['Fear of God', 'Yeezy', 'Stüssy', 'Palm Angels', 'Essentials'],
      trends: [
        'DTC drop model growing 28% YoY',
        'Mystery/exclusivity premium: +45% engagement',
        'Community-first brands outperforming traditional retail by 3x',
      ],
    },
    loading: false,
  });

  return (
    <main className="min-h-screen bg-ink p-6 text-bone">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="label">Carry OS &middot; Executive Suite</p>
            <h1 className="mt-3 text-6xl font-black uppercase">CEO Dashboard</h1>
            <p className="mt-2 text-xl text-bone/60">Strategic Intelligence & Market Position</p>
          </div>
          <Link href="/admin/ugc-affiliate" className="btn-dark self-start md:self-auto">
            Back to Control Center
          </Link>
        </div>

        {/* Strategic KPIs */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Market Opportunity', value: '€2.8B', sub: 'Global TAM' },
            { label: 'Who Knows Share', value: '0.2%', sub: 'Target Year 2' },
            { label: 'Community Size', value: '12.5K', sub: 'Engaged followers' },
            { label: 'Revenue Goal', value: '€450K', sub: 'Year 1 projection' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-bone/40">{kpi.label}</p>
              <p className="mt-3 text-4xl font-black">{kpi.value}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-gold">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Target Audience Analysis */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-6">
              <p className="label">Strategic Intelligence</p>
              <h2 className="mt-3 text-2xl font-black uppercase">Target Audience</h2>
            </div>

            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Demographics</h3>
                <ul className="mt-3 space-y-2">
                  {marketData.targetAudience.demographics.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-bone/70">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Psychographics */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Psychographics</h3>
                <ul className="mt-3 space-y-2">
                  {marketData.targetAudience.psychographics.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-bone/70">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Channels */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Primary Channels</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {marketData.targetAudience.channels.map((channel, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="text-sm font-semibold text-bone">{channel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Market Analysis */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-6">
              <p className="label">Market Intelligence</p>
              <h2 className="mt-3 text-2xl font-black uppercase">Market Position</h2>
            </div>

            <div className="space-y-6">
              {/* Market Size */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Total Addressable Market</h3>
                <div className="mt-3 rounded-2xl border border-gold/20 bg-gold/5 p-4">
                  <p className="text-lg font-semibold text-bone">{marketData.marketAnalysis.marketSize}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-bone/40">
                    Luxury streetwear category, year-over-year growth
                  </p>
                </div>
              </div>

              {/* Competitors */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Key Competitors</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {marketData.marketAnalysis.competitors.map((comp, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="font-semibold text-bone">{comp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trends */}
              <div>
                <h3 className="text-lg font-semibold text-gold">Market Trends</h3>
                <ul className="mt-3 space-y-2">
                  {marketData.marketAnalysis.trends.map((trend, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                      <span className="mt-1 inline-block h-1 w-1 rounded-full bg-gold" />
                      <span className="text-sm text-bone/70">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Strategic Initiatives */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-black uppercase">Strategic Initiatives</h2>
          
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Phase 1: Foundation',
                status: '70% complete',
                items: ['Launch storefront', 'Seed community (12.5K)', 'First two drops completed'],
              },
              {
                title: 'Phase 2: Scale',
                status: 'Q4 2026',
                items: ['Monthly drop cadence', 'Global shipping', 'Influencer partnerships'],
              },
              {
                title: 'Phase 3: Enterprise',
                status: '2027',
                items: ['Physical retail (2-3 stores)', 'Licensed manufacturing', 'Web3 loyalty program'],
              },
            ].map((phase) => (
              <div key={phase.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-black uppercase">{phase.title}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gold">{phase.status}</p>
                <ul className="mt-4 space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-bone/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <div className="mt-8 flex gap-3">
          <Link href="/admin/agent-studio" className="btn">
            Agent Studio
          </Link>
          <Link href="/admin/ugc-affiliate" className="btn-dark">
            Control Center
          </Link>
        </div>
      </div>
    </main>
  );
}
