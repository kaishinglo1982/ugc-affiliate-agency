'use client';

import Link from 'next/link';
import { useState } from 'react';

type IntegrationStep = {
  name: string;
  required: boolean;
  status: 'pending' | 'configured' | 'optional';
  envVars: string[];
  description: string;
  guide: string;
};

export function OnboardingDashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [envValues, setEnvValues] = useState<Record<string, string>>({});
  const [savedValues, setSavedValues] = useState<Record<string, boolean>>({});

  const steps: IntegrationStep[] = [
    {
      name: 'Neon Database',
      required: true,
      status: 'configured',
      envVars: ['DATABASE_URL', 'NEON_DATABASE_URL'],
      description: 'PostgreSQL database for products, orders, users, and agent logs',
      guide: 'Already connected. Check Settings → Integrations to manage.',
    },
    {
      name: 'Better Auth Secret',
      required: true,
      status: 'pending',
      envVars: ['BETTER_AUTH_SECRET'],
      description: 'Authentication secret for session signing (min 32 characters)',
      guide: 'Generate: openssl rand -base64 32. Add to Settings → Vars',
    },
    {
      name: 'Vercel AI Gateway',
      required: true,
      status: 'configured',
      envVars: ['AI_GATEWAY_API_KEY'],
      description: 'AI models for agent execution (Gemini 2.0 Flash, GPT-4, Claude)',
      guide: 'Already connected via Vercel. No additional setup required.',
    },
    {
      name: 'Stripe Payments',
      required: false,
      status: 'optional',
      envVars: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET'],
      description: 'Payment processing for checkout and order management',
      guide: 'Add Stripe integration in Settings → Integrations. Get keys from stripe.com/dashboard',
    },
    {
      name: 'Highfield MCP',
      required: false,
      status: 'optional',
      envVars: ['HIGHFIELD_API_KEY', 'HIGHFIELD_PROJECT_ID'],
      description: 'UGC campaign management and social media account automation',
      guide: 'Contact Highfield for API access. Add keys to Settings → Vars',
    },
  ];

  const completedSteps = steps.filter((s) => s.status === 'configured').length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  const handleSaveEnvVar = async (envVar: string, value: string) => {
    if (!value.trim()) {
      alert(`Please enter a value for ${envVar}`);
      return;
    }
    console.log('[v0] Saving environment variable:', envVar);
    setSavedValues({ ...savedValues, [envVar]: true });
    // In production, this would call an API to save the env var
    setTimeout(() => {
      setSavedValues((prev) => ({ ...prev, [envVar]: false }));
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <p className="label">Who Knows Enterprise</p>
        <h1 className="mt-3 text-5xl font-black uppercase">CEO Onboarding</h1>
        <p className="mt-3 max-w-2xl text-bone/70">
          Welcome to Who Knows Enterprise. Complete the setup below to unlock all 26 AI agents, database integrations, and payment processing.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-mono uppercase tracking-widest text-bone/50">Setup Progress</p>
            <p className="mt-2 text-3xl font-black text-gold">{progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-bone/50">{completedSteps} of {steps.length} integrations</p>
            <div className="mt-2 h-2 w-48 rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Steps */}
      <div className="space-y-4">
        <p className="label">Integration Setup</p>
        {steps.map((step, idx) => (
          <div
            key={step.name}
            className={`rounded-3xl border p-6 transition-all ${
              step.status === 'configured'
                ? 'border-gold/30 bg-gold/5'
                : step.required
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-bone">{step.name}</h3>
                  {step.required && step.status !== 'configured' && (
                    <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                      Required
                    </span>
                  )}
                  {step.status === 'configured' && (
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                      Configured
                    </span>
                  )}
                  {!step.required && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-bone/50">
                      Optional
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-bone/60">{step.description}</p>
                <div className="mt-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-bone/40">Environment Variables</p>
                  <div className="mt-4 space-y-4">
                    {step.envVars.map((envVar) => (
                      <div key={envVar} className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <label className="block">
                          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-bone/60">{envVar}</p>
                          <input
                            type={showApiKey[envVar] ? 'text' : 'password'}
                            placeholder={`Enter ${envVar}...`}
                            value={envValues[envVar] || ''}
                            onChange={(e) => setEnvValues({ ...envValues, [envVar]: e.target.value })}
                            className="mb-3 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-bone placeholder-bone/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                          />
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowApiKey({ ...showApiKey, [envVar]: !showApiKey[envVar] })}
                            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-bone/70 transition-colors hover:bg-white/10 hover:text-bone"
                          >
                            {showApiKey[envVar] ? 'Hide' : 'Show'}
                          </button>
                          <button
                            onClick={() => handleSaveEnvVar(envVar, envValues[envVar] || '')}
                            disabled={savedValues[envVar]}
                            className="rounded-lg bg-gold/20 px-3 py-1 text-xs font-medium text-gold transition-colors hover:bg-gold/30 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {savedValues[envVar] ? '✓ Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-black/20 p-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-bone/40">Setup Guide</p>
                  <p className="mt-2 text-sm text-bone/70">{step.guide}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-3xl border border-gold/30 bg-gold/5 p-6">
        <p className="text-sm font-mono uppercase tracking-widest text-gold">Quick Actions</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/ugc-affiliate"
            className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-center hover:bg-black/30"
          >
            <p className="font-black text-bone">Agent Control Center</p>
            <p className="mt-1 text-xs text-bone/50">View all 26 agents</p>
          </Link>
          <Link
            href="/admin/agent-studio"
            className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-center hover:bg-black/30"
          >
            <p className="font-black text-bone">Agent Studio</p>
            <p className="mt-1 text-xs text-bone/50">Execute & manage agents</p>
          </Link>
          <Link
            href="/admin/ceo"
            className="rounded-2xl border border-gold/30 bg-black/20 p-4 text-center hover:bg-black/30"
          >
            <p className="font-black text-bone">CEO Dashboard</p>
            <p className="mt-1 text-xs text-bone/50">Strategic overview</p>
          </Link>
        </div>
      </div>

      {/* API Key Management Guide */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="label">API Key Best Practices</p>
        <ul className="mt-4 space-y-3 text-sm text-bone/70">
          <li className="flex gap-3">
            <span className="text-gold">→</span>
            <span>Never commit API keys to Git. Always use environment variables.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold">→</span>
            <span>Access keys via Settings (top right) → Vars → Add Variable</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold">→</span>
            <span>Rotate keys every 90 days. Update in Settings → Vars</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold">→</span>
            <span>Use separate keys for development vs production environments</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold">→</span>
            <span>Enable Vercel deployment protection for production keys</span>
          </li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="rounded-3xl border border-gold/30 bg-gold/5 p-6">
        <p className="text-sm font-mono uppercase tracking-widest text-gold">What's Next?</p>
        <div className="mt-4 space-y-3 text-sm text-bone/70">
          <p>1. Complete required integrations (Better Auth Secret)</p>
          <p>2. Test agent execution in Agent Studio</p>
          <p>3. Launch your first Highfield UGC campaign</p>
          <p>4. Monitor performance in CEO Dashboard</p>
          <p>5. Scale to 100K+ monthly views and €50K revenue by Q2 2027</p>
        </div>
      </div>
    </div>
  );
}
