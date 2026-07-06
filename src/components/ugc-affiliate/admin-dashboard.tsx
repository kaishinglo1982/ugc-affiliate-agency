'use client';

import { campaigns, creators, sales, conversionFunnel } from '@/data/mock';

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const fmt = (n: number) => n.toLocaleString('en-US');

const statusBadge: Record<string, string> = {
  active: 'bg-gold/20 text-gold',
  review: 'bg-yellow-400/20 text-yellow-400',
  upcoming: 'bg-blue-400/20 text-blue-400',
  completed: 'bg-green-400/20 text-green-400',
};

const creatorStatus: Record<string, string> = {
  active: 'text-green-400',
  onboarding: 'text-yellow-400',
  available: 'text-blue-400',
  inactive: 'text-red-400',
};

export function AdminDashboard() {
  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const activeCreators = creators.filter((c) => c.status === 'active');

  const revenueMTD = sales
    .filter((s) => s.date.startsWith('2026-07'))
    .reduce((sum, s) => sum + s.amount, 0);

  const roasArr = campaigns.filter((c) => c.ROAS > 0);
  const avgROAS = roasArr.length
    ? (roasArr.reduce((s, c) => s + c.ROAS, 0) / roasArr.length).toFixed(1)
    : '0.0';

  const cpaArr = campaigns.filter((c) => c.actualCPA > 0);
  const avgCPA = cpaArr.length
    ? (cpaArr.reduce((s, c) => s + c.actualCPA, 0) / cpaArr.length).toFixed(2)
    : '0.00';

  const today = new Date('2026-07-06');
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const dailySales = last7.map((date) => ({
    date,
    total: sales
      .filter((s) => s.date === date)
      .reduce((sum, s) => sum + s.amount, 0),
  }));

  const maxDaily = Math.max(...dailySales.map((d) => d.total), 1);
  const funnelMax = Math.max(...conversionFunnel.map((f) => f.value));

  return (
    <main className="min-h-screen bg-ink p-6 text-bone">
      <div className="mx-auto max-w-7xl py-10">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-gold">
            Carry OS &middot; UGC Affiliate Agency
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Revenue (MTD)" value={money(revenueMTD)} />
          <StatCard label="Active Campaigns" value={String(activeCampaigns.length)} />
          <StatCard label="Active Creators" value={String(activeCreators.length)} />
          <StatCard label="Avg ROAS" value={`${avgROAS}x`} />
          <StatCard label="Avg CPA" value={`$${avgCPA}`} />
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-coal p-6">
          <h2 className="font-black uppercase tracking-widest">Active Campaigns</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
                <tr>
                  <th className="py-3 pr-4">Campaign</th>
                  <th className="py-3 pr-4">Client</th>
                  <th className="py-3 pr-4">Niche</th>
                  <th className="py-3 pr-4">Videos</th>
                  <th className="py-3 pr-4">CPA</th>
                  <th className="py-3 pr-4">ROAS</th>
                  <th className="py-3 pr-4">Impressions</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {activeCampaigns.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 pr-4 font-semibold">{c.name}</td>
                    <td className="py-3 pr-4 text-bone/60">{c.client}</td>
                    <td className="py-3 pr-4 text-bone/60">{c.niche}</td>
                    <td className="py-3 pr-4">{c.videosDelivered}</td>
                    <td className="py-3 pr-4 font-mono">${c.actualCPA || c.targetCPA}</td>
                    <td className="py-3 pr-4 font-mono text-gold">{c.ROAS}x</td>
                    <td className="py-3 pr-4 font-mono">{fmt(c.impressions)}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${statusBadge[c.status] || 'bg-white/10 text-bone/50'}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-black uppercase tracking-widest">Creator Overview</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
                <tr>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Channel</th>
                  <th className="py-3 pr-4">Niche</th>
                  <th className="py-3 pr-4">Rate</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {activeCreators.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 pr-4 font-semibold">{c.name}</td>
                    <td className="py-3 pr-4 font-mono text-xs uppercase tracking-widest text-bone/60">
                      {c.channel}
                    </td>
                    <td className="py-3 pr-4 text-bone/60">{c.niche}</td>
                    <td className="py-3 pr-4 font-mono">${c.rate}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`font-mono text-xs uppercase tracking-widest ${creatorStatus[c.status] || 'text-bone/50'}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono">{c.avgEngagement}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-coal p-6">
          <h2 className="font-black uppercase tracking-widest">Revenue (Last 7 Days)</h2>
          <div className="mt-6 flex items-end gap-3">
            {dailySales.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-xs text-bone/40">{money(d.total)}</span>
                <div
                  className="w-full rounded-t-md bg-gold transition-all"
                  style={{ height: `${Math.max((d.total / maxDaily) * 120, 4)}px` }}
                />
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bone/40">
                  {new Date(d.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-black uppercase tracking-widest">Conversion Funnel</h2>
          <div className="mt-6 space-y-4">
            {conversionFunnel.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                  <span className="text-bone/60">{stage.stage}</span>
                  <span className="text-gold">{fmt(stage.value)}</span>
                </div>
                <div className="mt-1.5 flex gap-[2px]">
                  <div
                    className="h-3 rounded-l-full bg-gold/80"
                    style={{ width: `${(stage.value / funnelMax) * 100}%` }}
                  />
                  <div className="h-3 flex-1 rounded-r-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-coal p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-bone/40">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-gold">{value}</p>
    </div>
  );
}
