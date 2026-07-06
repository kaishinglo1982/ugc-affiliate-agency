'use client'

import { whiteLabelSettings } from '@/data/enterprise'

export default function WhiteLabelPage() {
  return (
    <div className="min-h-screen bg-ink text-bone p-6 space-y-8">
      <div>
        <h1 className="font-black uppercase tracking-widest text-3xl text-gold">
          White Label Settings
        </h1>
        <p className="text-bone/60 font-mono text-sm mt-1">
          Configure tenant branding and custom domain
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black uppercase tracking-widest text-lg text-gold">Branding Configuration</h2>
          <div className="flex items-center gap-3">
            <button className="btn-dark text-xs px-4 py-2 rounded-xl font-mono">Preview</button>
            <button className="bg-gold text-ink text-xs px-4 py-2 rounded-xl font-mono font-semibold">Save Settings</button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant ID */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Tenant ID</p>
            <p className="font-mono text-sm text-bone/80">{whiteLabelSettings.tenantId}</p>
          </div>

          {/* Logo */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Logo</p>
            {whiteLabelSettings.logoUrl ? (
              <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center overflow-hidden">
                <img src={whiteLabelSettings.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                <span className="font-mono text-[10px] text-bone/30">No logo</span>
              </div>
            )}
          </div>

          {/* Primary Color */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Primary Color</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: whiteLabelSettings.primaryColor }} />
              <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.primaryColor}</span>
            </div>
          </div>

          {/* Secondary Color */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Secondary Color</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: whiteLabelSettings.secondaryColor }} />
              <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.secondaryColor}</span>
            </div>
          </div>

          {/* Accent Color */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Accent Color</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: whiteLabelSettings.accentColor }} />
              <span className="font-mono text-sm text-bone/70">{whiteLabelSettings.accentColor}</span>
            </div>
          </div>

          {/* Custom Domain */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Custom Domain</p>
            <p className="font-mono text-sm text-bone/80">{whiteLabelSettings.customDomain || 'Not set'}</p>
          </div>

          {/* Email Sender */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Email Sender</p>
            <p className="font-mono text-sm text-bone/80">{whiteLabelSettings.emailSender}</p>
          </div>

          {/* Login Branding */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Login Branding</p>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-1">
              <p className="font-mono text-xs text-bone/80">{whiteLabelSettings.loginBranding.title}</p>
              <p className="font-mono text-[10px] text-bone/50">{whiteLabelSettings.loginBranding.subtitle}</p>
            </div>
          </div>

          {/* Dashboard Branding */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Dashboard Branding</p>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-1">
              <p className="font-mono text-xs text-bone/80">{whiteLabelSettings.dashboardBranding.title}</p>
              <p className="font-mono text-[10px] text-bone/50">
                {whiteLabelSettings.dashboardBranding.faviconUrl ? `Favicon: ${whiteLabelSettings.dashboardBranding.faviconUrl}` : 'No favicon'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
