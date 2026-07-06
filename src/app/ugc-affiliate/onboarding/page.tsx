'use client'
import { useState } from 'react'

interface FormData {
  companyProfile: {
    companyName: string
    contactPerson: string
    email: string
    phone: string
    country: string
    language: string
    timezone: string
    taxCountry: string
    currency: string
  }
  branding: {
    brandColors: string
    fontSelection: string
    toneOfVoice: string
    targetAudience: string
  }
  domains: {
    mainDomain: string
    landingPageUrl: string
    shopUrl: string
    blogUrl: string
  }
  socialConsole: Record<string, boolean>
  affiliateConsole: Record<string, boolean>
  aiConsole: Record<string, { enabled: boolean; apiKey: string }>
  financeConsole: {
    stripe: boolean
    paypal: boolean
    bankAccount: string
    accountingSystem: string
    taxCountry: string
    vatId: string
  }
  deployment: string
}

const countries = ['United States', 'Germany', 'United Kingdom', 'France', 'Canada', 'Australia', 'Japan', 'Brazil', 'India', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Switzerland', 'Austria']
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'BRL', 'INR', 'CHF', 'SEK', 'NOK']
const languages = ['English', 'German', 'French', 'Spanish', 'Japanese', 'Portuguese', 'Italian', 'Dutch', 'Swedish', 'Norwegian']
const timezones = ['UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4', 'UTC+5', 'UTC+5:30', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12']
const toneOptions = ['Professional', 'Casual', 'Luxury', 'Funny']
const fonts = ['Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Poppins', 'Lora', 'Space Grotesk']
const socialPlatforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Pinterest', 'Reddit', 'LinkedIn', 'X']
const affiliateNetworks = ['Digistore24', 'CopeCart', 'Awin', 'CJ', 'Impact', 'Amazon', 'PartnerStack']
const aiProviders = ['OpenAI', 'Anthropic', 'Google', 'ElevenLabs', 'Fal', 'Replicate', 'Stability AI']
const accountingSystems = ['QuickBooks', 'Xero', 'FreshBooks', 'Wave', 'SAP', 'Oracle NetSuite', 'DATEV', 'Lexoffice']

const emojis = ['🏢', '🎨', '🌐', '📱', '🔗', '🤖', '💰', '🚀']
const stepTitles = [
  'Company Profile',
  'Branding',
  'Domains',
  'Social Console',
  'Affiliate Console',
  'AI Console',
  'Finance Console',
  'Deployment',
]
const stepDescriptions = [
  'Tell us about your company and contact details.',
  'Define your brand identity and visual style.',
  'Connect your web properties.',
  'Link your social media accounts.',
  'Connect your affiliate networks.',
  'Configure AI provider integrations.',
  'Set up your payment and billing details.',
  'Choose your deployment method.',
]

const initialFormData: FormData = {
  companyProfile: {
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    language: '',
    timezone: '',
    taxCountry: '',
    currency: '',
  },
  branding: {
    brandColors: '',
    fontSelection: '',
    toneOfVoice: '',
    targetAudience: '',
  },
  domains: {
    mainDomain: '',
    landingPageUrl: '',
    shopUrl: '',
    blogUrl: '',
  },
  socialConsole: Object.fromEntries(socialPlatforms.map(p => [p.toLowerCase(), false])),
  affiliateConsole: Object.fromEntries(affiliateNetworks.map(n => [n.toLowerCase().replace(/\s+/g, ''), false])),
  aiConsole: Object.fromEntries(aiProviders.map(p => [p.toLowerCase().replace(/\s+/g, ''), { enabled: false, apiKey: '' }])),
  financeConsole: {
    stripe: false,
    paypal: false,
    bankAccount: '',
    accountingSystem: '',
    taxCountry: '',
    vatId: '',
  },
  deployment: '',
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showSummary, setShowSummary] = useState(false)

  const totalSteps = 8
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  const updateCompanyProfile = (field: keyof FormData['companyProfile'], value: string) => {
    setFormData(prev => ({ ...prev, companyProfile: { ...prev.companyProfile, [field]: value } }))
  }

  const updateBranding = (field: keyof FormData['branding'], value: string) => {
    setFormData(prev => ({ ...prev, branding: { ...prev.branding, [field]: value } }))
  }

  const updateDomains = (field: keyof FormData['domains'], value: string) => {
    setFormData(prev => ({ ...prev, domains: { ...prev.domains, [field]: value } }))
  }

  const toggleSocial = (platform: string) => {
    setFormData(prev => ({ ...prev, socialConsole: { ...prev.socialConsole, [platform]: !prev.socialConsole[platform] } }))
  }

  const toggleAffiliate = (network: string) => {
    setFormData(prev => ({ ...prev, affiliateConsole: { ...prev.affiliateConsole, [network]: !prev.affiliateConsole[network] } }))
  }

  const toggleAiProvider = (provider: string) => {
    setFormData(prev => ({
      ...prev,
      aiConsole: {
        ...prev.aiConsole,
        [provider]: { ...prev.aiConsole[provider], enabled: !prev.aiConsole[provider].enabled },
      },
    }))
  }

  const updateAiApiKey = (provider: string, apiKey: string) => {
    setFormData(prev => ({
      ...prev,
      aiConsole: {
        ...prev.aiConsole,
        [provider]: { ...prev.aiConsole[provider], apiKey },
      },
    }))
  }

  const updateFinance = (field: keyof FormData['financeConsole'], value: string | boolean) => {
    setFormData(prev => ({ ...prev, financeConsole: { ...prev.financeConsole, [field]: value } }))
  }

  const setDeployment = (value: string) => {
    setFormData(prev => ({ ...prev, deployment: value }))
  }

  const handleNext = () => {
    if (isLastStep) {
      setShowSummary(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (showSummary) {
      setShowSummary(false)
      setCurrentStep(totalSteps - 1)
    } else {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    console.log('Setup complete:', formData)
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {stepTitles.map((_, idx) => {
          const isCompleted = idx < currentStep
          const isCurrent = idx === currentStep
          return (
            <div key={idx} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                isCompleted
                  ? 'bg-gold text-ink'
                  : isCurrent
                    ? 'bg-gold/20 text-gold border border-gold/50'
                    : 'bg-white/[0.03] text-bone/40 border border-white/10'
              }`}>
                {isCompleted ? '✓' : isCurrent ? '●' : '○'}
              </div>
              {idx < totalSteps - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                  idx < currentStep ? 'bg-gold' : 'bg-white/10'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderInput = (label: string, value: string, onChange: (v: string) => void, options?: { type?: string; placeholder?: string; isSelect?: boolean; selectOptions?: string[] }) => (
    <div className="space-y-1.5">
      <label className="label text-bone/70 text-xs uppercase tracking-widest font-mono">{label}</label>
      {options?.isSelect ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-bone focus:outline-none focus:border-gold/50 transition-colors text-sm"
        >
          <option value="" className="bg-ink">Select {label}</option>
          {options.selectOptions?.map(opt => (
            <option key={opt} value={opt} className="bg-ink">{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={options?.type || 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={options?.placeholder || `Enter ${label.toLowerCase()}`}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-bone placeholder:text-bone/30 focus:outline-none focus:border-gold/50 transition-colors text-sm"
        />
      )}
    </div>
  )

  const renderToggle = (label: string, checked: boolean, onToggle: () => void, extraContent?: React.ReactNode) => (
    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
      <span className="text-bone text-sm">{label}</span>
      <div className="flex items-center gap-3">
        {extraContent}
        <button
          onClick={onToggle}
          className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-gold' : 'bg-white/20'}`}
        >
          <div className={`w-3.5 h-3.5 rounded-full bg-ink absolute top-0.5 transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  )

  const renderStepContent = () => {
    const step = currentStep

    switch (step) {
      case 0: {
        const p = formData.companyProfile
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('Company Name', p.companyName, v => updateCompanyProfile('companyName', v), { placeholder: 'Acme Corp' })}
            {renderInput('Contact Person', p.contactPerson, v => updateCompanyProfile('contactPerson', v), { placeholder: 'John Doe' })}
            {renderInput('Email', p.email, v => updateCompanyProfile('email', v), { type: 'email', placeholder: 'john@acme.com' })}
            {renderInput('Phone', p.phone, v => updateCompanyProfile('phone', v), { type: 'tel', placeholder: '+1 234 567 890' })}
            {renderInput('Country', p.country, v => updateCompanyProfile('country', v), { isSelect: true, selectOptions: countries })}
            {renderInput('Language', p.language, v => updateCompanyProfile('language', v), { isSelect: true, selectOptions: languages })}
            {renderInput('Timezone', p.timezone, v => updateCompanyProfile('timezone', v), { isSelect: true, selectOptions: timezones })}
            {renderInput('Tax Country', p.taxCountry, v => updateCompanyProfile('taxCountry', v), { isSelect: true, selectOptions: countries })}
            {renderInput('Currency', p.currency, v => updateCompanyProfile('currency', v), { isSelect: true, selectOptions: currencies })}
          </div>
        )
      }
      case 1: {
        const b = formData.branding
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/[0.03] border border-dashed border-white/10 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl text-bone/50">
                🖼
              </div>
              <div>
                <p className="text-bone text-sm font-mono uppercase tracking-widest text-xs text-bone/50 mb-1">Logo</p>
                <p className="text-bone/40 text-xs">Upload your brand logo (placeholder)</p>
                <button className="btn-dark text-xs px-3 py-1 mt-2 rounded-lg border border-white/10 text-bone/70">Upload</button>
              </div>
            </div>
            {renderInput('Brand Colors', b.brandColors, v => updateBranding('brandColors', v), { placeholder: '#FF6B35, #004E64, ...' })}
            {renderInput('Font Selection', b.fontSelection, v => updateBranding('fontSelection', v), { isSelect: true, selectOptions: fonts })}
            {renderInput('Tone of Voice', b.toneOfVoice, v => updateBranding('toneOfVoice', v), { isSelect: true, selectOptions: toneOptions })}
            {renderInput('Target Audience', b.targetAudience, v => updateBranding('targetAudience', v), { placeholder: 'e.g. Small business owners, 25-45' })}
          </div>
        )
      }
      case 2: {
        const d = formData.domains
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('Main Domain', d.mainDomain, v => updateDomains('mainDomain', v), { placeholder: 'acme.com' })}
            {renderInput('Landing Page URL', d.landingPageUrl, v => updateDomains('landingPageUrl', v), { placeholder: 'acme.com/landing' })}
            {renderInput('Shop URL', d.shopUrl, v => updateDomains('shopUrl', v), { placeholder: 'shop.acme.com' })}
            {renderInput('Blog URL', d.blogUrl, v => updateDomains('blogUrl', v), { placeholder: 'acme.com/blog' })}
            <div className="md:col-span-2">
              <button className="btn-dark px-4 py-2 rounded-xl border border-white/10 text-bone/70 text-sm hover:border-gold/30 transition-colors">
                Verify DNS
              </button>
            </div>
          </div>
        )
      }
      case 3:
        return (
          <div className="space-y-3">
            {socialPlatforms.map(p => (
              <div key={p}>
                {renderToggle(p, formData.socialConsole[p.toLowerCase()], () => toggleSocial(p.toLowerCase()),
                  <button className="btn-dark text-xs px-3 py-1 rounded-lg border border-white/10 text-bone/70">Connect</button>
                )}
              </div>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-3">
            {affiliateNetworks.map(n => {
              const key = n.toLowerCase().replace(/\s+/g, '')
              return (
                <div key={n}>
                  {renderToggle(n, formData.affiliateConsole[key], () => toggleAffiliate(key),
                    <button className="btn-dark text-xs px-3 py-1 rounded-lg border border-white/10 text-bone/70">Connect API</button>
                  )}
                </div>
              )
            })}
          </div>
        )
      case 5:
        return (
          <div className="space-y-3">
            {aiProviders.map(p => {
              const key = p.toLowerCase().replace(/\s+/g, '')
              const provider = formData.aiConsole[key]
              return (
                <div key={p} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-bone text-sm">{p}</span>
                    <button
                      onClick={() => toggleAiProvider(key)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${provider.enabled ? 'bg-gold' : 'bg-white/20'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-ink absolute top-0.5 transition-transform ${provider.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {provider.enabled && (
                    <input
                      type="password"
                      value={provider.apiKey}
                      onChange={e => updateAiApiKey(key, e.target.value)}
                      placeholder="Enter API key"
                      className="w-full bg-ink border border-white/10 rounded-xl px-4 py-2 text-bone placeholder:text-bone/30 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  )}
                </div>
              )
            })}
          </div>
        )
      case 6: {
        const f = formData.financeConsole
        return (
          <div className="space-y-4">
            {renderToggle('Stripe', f.stripe, () => updateFinance('stripe', !f.stripe))}
            {renderToggle('PayPal', f.paypal, () => updateFinance('paypal', !f.paypal))}
            {renderInput('Bank Account (IBAN)', f.bankAccount, v => updateFinance('bankAccount', v), { placeholder: 'DE89 3704 0044 0532 0130 00' })}
            {renderInput('Accounting System', f.accountingSystem, v => updateFinance('accountingSystem', v), { isSelect: true, selectOptions: accountingSystems })}
            {renderInput('Tax Country', f.taxCountry, v => updateFinance('taxCountry', v), { isSelect: true, selectOptions: countries })}
            {renderInput('VAT ID', f.vatId, v => updateFinance('vatId', v), { placeholder: 'DE123456789' })}
          </div>
        )
      }
      case 7:
        return (
          <div className="space-y-3">
            {[
              { value: 'vercel', label: 'Vercel', desc: 'Deploy on Vercel with automatic CI/CD and serverless functions. Best for Next.js apps.' },
              { value: 'cloudflare', label: 'Cloudflare', desc: 'Deploy on Cloudflare Pages with global edge network and DDoS protection.' },
              { value: 'docker', label: 'Docker', desc: 'Self-host using Docker containers. Full control over infrastructure and scaling.' },
              { value: 'own-server', label: 'Own Server', desc: 'Deploy on your own bare-metal or VPS server. Maximum flexibility and customization.' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setDeployment(opt.value)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  formData.deployment === opt.value
                    ? 'border-gold/50 bg-gold/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                    formData.deployment === opt.value ? 'border-gold' : 'border-white/30'
                  }`}>
                    {formData.deployment === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                  </div>
                  <div>
                    <p className="text-bone text-sm font-medium">{opt.label}</p>
                    <p className="text-bone/40 text-xs mt-1">{opt.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gold text-lg font-black uppercase tracking-widest font-mono">Summary</p>
        <p className="text-bone/50 text-sm mt-1">Review your setup before completing</p>
      </div>
      {stepTitles.map((title, idx) => {
        const emoji = emojis[idx]
        let summaryContent: React.ReactNode = null

        switch (idx) {
          case 0: {
            const p = formData.companyProfile
            summaryContent = <p className="text-bone/60 text-xs">{p.companyName || '—'} · {p.email || '—'} · {p.country || '—'}</p>
            break
          }
          case 1: {
            const b = formData.branding
            summaryContent = <p className="text-bone/60 text-xs">{b.toneOfVoice || '—'} tone · {b.fontSelection || '—'} · {b.targetAudience || '—'}</p>
            break
          }
          case 2: {
            const d = formData.domains
            summaryContent = <p className="text-bone/60 text-xs">{d.mainDomain || '—'}</p>
            break
          }
          case 3: {
            const active = Object.entries(formData.socialConsole).filter(([, v]) => v).map(([k]) => k)
            summaryContent = <p className="text-bone/60 text-xs">{active.length ? active.join(', ') : 'None connected'}</p>
            break
          }
          case 4: {
            const active = Object.entries(formData.affiliateConsole).filter(([, v]) => v).map(([k]) => k)
            summaryContent = <p className="text-bone/60 text-xs">{active.length ? active.join(', ') : 'None connected'}</p>
            break
          }
          case 5: {
            const active = Object.entries(formData.aiConsole).filter(([, v]) => v.enabled).map(([k]) => k)
            summaryContent = <p className="text-bone/60 text-xs">{active.length ? active.join(', ') : 'None connected'}</p>
            break
          }
          case 6: {
            const f = formData.financeConsole
            const active = []
            if (f.stripe) active.push('Stripe')
            if (f.paypal) active.push('PayPal')
            summaryContent = <p className="text-bone/60 text-xs">{active.length ? `${active.join(', ')}` : 'None'} · {f.taxCountry || '—'}</p>
            break
          }
          case 7:
            summaryContent = <p className="text-bone/60 text-xs capitalize">{formData.deployment || 'Not selected'}</p>
            break
        }

        return (
          <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <span className="text-lg">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-bone text-sm font-medium">{title}</p>
              {summaryContent}
            </div>
            <span className="text-gold/60">✓</span>
          </div>
        )
      })}
      <button
        onClick={handleComplete}
        className="btn-gold w-full py-3 rounded-2xl text-ink font-black uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
      >
        Complete Setup
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-ink text-bone">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-widest text-gold font-mono">
            <span className="mr-2">{emojis[currentStep]}</span>
            {showSummary ? 'Review' : stepTitles[currentStep]}
          </h1>
          {!showSummary && (
            <p className="text-bone/50 text-sm mt-2">{stepDescriptions[currentStep]}</p>
          )}
        </div>

        {!showSummary && renderStepIndicator()}

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
          {!showSummary ? (
            <>
              <div className="mb-6">
                <span className="text-gold/60 text-xs font-mono uppercase tracking-widest">
                  Step {currentStep + 1} / {totalSteps}
                </span>
              </div>
              {renderStepContent()}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={isFirstStep}
                  className="btn-dark px-6 py-2.5 rounded-xl border border-white/10 text-bone disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/20 transition-colors text-sm font-mono uppercase tracking-widest"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="btn-gold px-6 py-2.5 rounded-xl text-ink font-black uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                >
                  {isLastStep ? 'Review Setup' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <>
              {renderSummary()}
              <div className="mt-6">
                <button
                  onClick={handlePrev}
                  className="w-full btn-dark py-2.5 rounded-xl border border-white/10 text-bone hover:border-white/20 transition-colors text-sm font-mono uppercase tracking-widest"
                >
                  Back to Edit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
