// ─── Band 2 Enterprise Data Models ───

// Helper IDs
const ids = {
  script: { h1: 'hook-1', h2: 'hook-2', h3: 'hook-3', s1: 'script-1', s2: 'script-2', cap1: 'cap-1', cap2: 'cap-2', cta1: 'cta-1', cta2: 'cta-2', cta3: 'cta-3', ad1: 'ad-1', c1: 'cap2-1', c2: 'cap2-2' },
  ugc: { a1: 'avatar-1', a2: 'avatar-2', v1: 'voice-1', v2: 'voice-2', j1: 'vjob-1', j2: 'vjob-2', va1: 'vasset-1' },
  pub: { c1: 'cal-1', c2: 'cal-2', p1: 'pub-1', p2: 'pub-2' },
  analytics: { i1: 'imp-1', i2: 'imp-2', cl1: 'click-1' },
  finance: { r1: 'rev-1', r2: 'rev-2', e1: 'exp-1', e2: 'exp-2', e3: 'exp-3' },
  crm: { l1: 'lead-1', l2: 'lead-2', d1: 'deal-1', d2: 'deal-2' },
  tax: { tp1: 'tp-1' },
  automation: { w1: 'wf-1', w2: 'wf-2' },
  notify: { n1: 'notif-1', n2: 'notif-2', n3: 'notif-3', n4: 'notif-4' },
  enterprise: { t1: 'tenant-1' },
}

// ─── Pre-Phase 10 — Research & Product Models ───

export interface ResearchInsight {
  id: string
  keyword: string
  searchVolume: number
  competition: 'low' | 'medium' | 'high'
  trending: boolean
  relatedTopics: string[]
  platform: string
  niche: string
  suggestedAngle: string
  createdAt: string
}

export interface AffiliateProduct {
  id: string
  name: string
  brand: string
  category: string
  price: number
  commissionRate: number
  commissionType: 'percent' | 'fixed'
  network: string
  description: string
  strengths: string[]
  targetAudience: string
  averageRating: number
  status: 'active' | 'paused' | 'discontinued'
}

export const researchInsights: ResearchInsight[] = [
  { id: 'ri-1', keyword: 'fitness tracker review', searchVolume: 14200, competition: 'high', trending: true, relatedTopics: ['best fitness tracker', 'fitness tracker 2026', 'affordable fitness tracker'], platform: 'tiktok', niche: 'fitness', suggestedAngle: 'Vergleich der 5 besten Fitness-Tracker unter 50€', createdAt: '2026-07-01' },
  { id: 'ri-2', keyword: 'passives Einkommen 2026', searchVolume: 8900, competition: 'medium', trending: true, relatedTopics: ['affiliate marketing', 'side hustle', 'online business'], platform: 'youtube', niche: 'finance', suggestedAngle: 'Wie ich mit Affiliate-Marketing 5000€/Monat verdiene', createdAt: '2026-07-02' },
  { id: 'ri-3', keyword: 'beauty routine viral', searchVolume: 6500, competition: 'low', trending: true, relatedTopics: ['skincare', 'makeup tutorial', 'beauty hacks'], platform: 'instagram', niche: 'beauty', suggestedAngle: 'Diese Beauty-Routine geht gerade viral', createdAt: '2026-07-03' },
]

export const affiliateProducts: AffiliateProduct[] = [
  { id: 'ap-1', name: 'FitTracker Pro', brand: 'HealthTech', category: 'fitness', price: 49.99, commissionRate: 0.15, commissionType: 'percent', network: 'Digistore24', description: 'Der beste Fitness-Tracker für Einsteiger', strengths: ['günstig', 'viele Funktionen', 'lange Akkulaufzeit'], targetAudience: 'Fitness-Anfänger', averageRating: 4.5, status: 'active' },
  { id: 'ap-2', name: 'Wealth Builder Kurs', brand: 'Finanzbildung GmbH', category: 'finance', price: 199.00, commissionRate: 0.40, commissionType: 'percent', network: 'Tradedoubler', description: 'Kompletter Kurs zum passiven Einkommen', strengths: ['hohe Provision', 'hohe Conversion', 'Premium-Produkt'], targetAudience: 'Finanz-Interessenten', averageRating: 4.2, status: 'active' },
  { id: 'ap-3', name: 'Glow Serum', brand: 'BeautyLab', category: 'beauty', price: 29.99, commissionRate: 0.20, commissionType: 'percent', network: 'Awin', description: 'Veganes Hautpflege-Serum', strengths: ['vegan', 'clean beauty', 'wiederkehrende Käufe'], targetAudience: 'Beauty-Enthusiasten', averageRating: 4.8, status: 'active' },
]

// ─── Phase 10 — Script Studio Models ───

export interface Hook {
  id: string
  text: string
  style: 'question' | 'stat' | 'story' | 'shock' | 'benefit' | 'howto' | 'myth' | 'comparison'
  platform: string
  niche: string
  score: number
  status: 'draft' | 'review' | 'approved' | 'rejected'
  createdAt: string
}

export interface Script {
  id: string
  title: string
  hookId: string
  body: string
  platform: string
  niche: string
  tone: 'casual' | 'professional' | 'funny' | 'educational' | 'inspirational' | 'urgent'
  duration: number
  status: 'draft' | 'review' | 'approved' | 'rejected'
  score: number
  tenantId: string
  campaignId: string
  accountId: string
  createdAt: string
}

export interface Storyboard {
  id: string
  scriptId: string
  scenes: { index: number; description: string; duration: number; visual: string; audio: string }[]
  status: 'draft' | 'review' | 'approved'
}

export interface Caption {
  id: string
  text: string
  platform: string
  hashtags: string[]
  mentions: string[]
  tone: string
  ctaText: string
  status: 'draft' | 'approved' | 'used'
  score: number
}

export interface AdCopy {
  id: string
  headline: string
  body: string
  cta: string
  platform: string
  format: 'feed' | 'story' | 'reel' | 'search' | 'display'
  status: 'draft' | 'review' | 'approved' | 'rejected'
  performance: { impressions: number; clicks: number; ctr: number }
}

export interface CTASuggestion {
  id: string
  text: string
  style: 'direct' | 'urgent' | 'soft' | 'value' | 'social' | 'curiosity'
  platform: string
  effectiveness: number
}

export interface ComplianceResult {
  passed: boolean
  checks: { name: string; passed: boolean; severity: 'error' | 'warning'; message: string }[]
}

// ─── Phase 11 — UGC Studio Models ───

export interface AvatarProfile {
  id: string
  name: string
  niche: string[]
  platform: string[]
  language: string
  gender: 'male' | 'female' | 'neutral'
  ageGroup: '18-25' | '25-35' | '35-50' | '50+'
  style: 'realistic' | 'stylized' | 'cartoon' | 'professional'
  provider: 'heygen' | 'synthesia' | 'd-id' | 'kling' | 'mock'
  status: 'active' | 'rendering' | 'error'
  thumbnailUrl: string
}

export interface VoiceProfile {
  id: string
  name: string
  provider: 'elevenlabs' | 'openai' | 'google-tts' | 'microsoft' | 'mock'
  language: string
  accent: string
  gender: 'male' | 'female' | 'neutral'
  speed: number
  pitch: number
  status: 'active' | 'generating' | 'error'
}

export interface VideoJob {
  id: string
  title: string
  scriptId: string
  avatarId: string
  voiceId: string
  platform: string
  format: '9:16' | '1:1' | '16:9'
  status: 'pending' | 'rendering' | 'completed' | 'failed'
  progress: number
  outputUrl: string | null
  error: string | null
  createdAt: string
  completedAt: string | null
}

export interface VideoAsset {
  id: string
  jobId: string
  url: string
  format: string
  duration: number
  fileSize: number
  thumbnailUrl: string
}

export interface SubtitleAsset {
  id: string
  videoId: string
  language: string
  format: 'srt' | 'vtt' | 'ass'
  url: string
}

export interface BrollAsset {
  id: string
  url: string
  type: 'footage' | 'image' | 'animation' | 'screen-recording'
  tags: string[]
  source: 'stock' | 'uploaded' | 'generated'
  duration: number
}

export interface RenderPreset {
  id: string
  name: string
  format: '9:16' | '1:1' | '16:9'
  resolution: '720p' | '1080p' | '4k'
  fps: 24 | 30 | 60
  bitrate: string
  codec: 'h264' | 'h265' | 'vp9'
}

// ─── Phase 12 — Publishing Models ───

export interface ContentCalendarItem {
  id: string
  title: string
  platform: string
  accountId: string
  scheduledAt: string
  status: 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'failed'
  contentType: 'video' | 'image' | 'carousel' | 'story' | 'text'
  assetUrl: string | null
  campaignId: string
  niche: string
  approvalStatus: 'pending' | 'approved' | 'rejected'
  approvedBy: string | null
}

export interface PublishingJob {
  id: string
  calendarItemId: string
  platform: string
  status: 'queued' | 'publishing' | 'published' | 'failed'
  platformPostId: string | null
  publishUrl: string | null
  error: string | null
  attemptCount: number
  createdAt: string
}

export interface PlatformPost {
  id: string
  platformPostId: string
  platform: string
  url: string
  publishedAt: string
  status: 'active' | 'deleted' | 'flagged'
  performance: { views: number; likes: number; comments: number; shares: number; saved: number }
}

export interface PostingRule {
  id: string
  platform: string
  maxDaily: number
  minInterval: number
  requireApproval: boolean
  riskLevels: string[]
  bestTimes: string[]
  blackoutDays: string[]
}

export interface ApprovalState {
  id: string
  calendarItemId: string
  status: 'pending' | 'approved' | 'rejected'
  reviewerId: string | null
  comment: string | null
  reviewedAt: string | null
}

export interface PlatformConnector {
  id: string
  platform: string
  connected: boolean
  accountName: string
  lastSync: string | null
  rateLimitRemaining: number
  rateLimitReset: string | null
}

export interface RateLimitState {
  id: string
  platform: string
  remaining: number
  limit: number
  resetAt: string
  isThrottled: boolean
}

// ─── Phase 13 — Analytics Models ───

export interface Impression {
  id: string
  date: string
  platform: string
  accountId: string
  count: number
  cost: number
}

export interface View {
  id: string
  date: string
  platform: string
  assetId: string
  count: number
  avgWatchTime: number
  completionRate: number
}

export interface Click {
  id: string
  date: string
  platform: string
  linkType: 'affiliate' | 'landing' | 'profile'
  destination: string
  count: number
  cost: number
}

export interface AttributionRecord {
  id: string
  clickId: string
  saleId: string
  touchpoints: { source: string; value: number }[]
  model: 'last-click' | 'multi-touch' | 'first-click'
  attributedRevenue: number
}

export interface ProfitMetric {
  id: string
  entityType: 'campaign' | 'account' | 'niche' | 'platform' | 'product' | 'agent' | 'provider'
  entityId: string
  revenue: number
  cost: number
  profit: number
  roas: number
  period: string
}

export interface AnalyticsAgentInsight {
  id: string
  type: 'winner' | 'loser' | 'cost_spike' | 'viral' | 'low_ctr' | 'high_api_cost'
  entityType: string
  entityId: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  metric: number
  threshold: number
  timestamp: string
}

// ─── Phase 14 — Finance Models ───

export interface Revenue {
  id: string
  date: string
  source: 'affiliate' | 'service' | 'ads' | 'other'
  amount: number
  platform: string
  campaignId: string
  accountId: string
  status: 'booked' | 'pending' | 'reconciled'
}

export interface Expense {
  id: string
  date: string
  category: 'api' | 'ads' | 'tools' | 'hosting' | 'salary' | 'other'
  provider: string
  amount: number
  description: string
  receiptUrl: string | null
  status: 'booked' | 'pending' | 'reconciled'
}

export interface CashflowEntry {
  id: string
  date: string
  type: 'inflow' | 'outflow'
  category: string
  amount: number
  balance: number
  description: string
}

export interface CampaignProfit {
  campaignId: string
  campaignName: string
  revenue: number
  costs: { api: number; ads: number; tools: number; other: number }
  profit: number
  roas: number
  margin: number
}

export interface Invoice {
  id: string
  number: string
  clientName: string
  amount: number
  vatRate: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  paidAt: string | null
}

export interface ExpenseImportAdapter {
  id: string
  provider: string
  type: 'stripe' | 'paypal' | 'bank' | 'meta-ads' | 'tiktok-ads' | 'openai' | 'anthropic' | 'elevenlabs' | 'hosting'
  connected: boolean
  lastImport: string | null
  importCount: number
}

// ─── Phase 15 — Tax Models ───

export interface TaxProfile {
  id: string
  country: string
  legalForm: 'einzelunternehmen' | 'gmbh' | 'ug' | 'kg' | 'other'
  vatId: string
  taxNumber: string
  vatRate: number
  vatFiled: boolean
  vatFilingPeriod: 'monthly' | 'quarterly' | 'yearly'
  tradeTaxRate: number
  incomeTaxRate: number
  fiscalYearEnd: string
}

export interface VatEstimate {
  id: string
  period: string
  revenue: number
  vatOnRevenue: number
  expenses: number
  vatOnExpenses: number
  vatDue: number
  status: 'estimated' | 'filed' | 'paid'
}

export interface IncomeTaxReserve {
  id: string
  year: number
  estimatedProfit: number
  taxRate: number
  reserveAmount: number
  monthlyReserve: number
}

export interface TaxCalendarEvent {
  id: string
  title: string
  dueDate: string
  type: 'vat' | 'income-tax' | 'trade-tax' | 'payroll' | 'other'
  status: 'upcoming' | 'due' | 'filed' | 'overdue'
  amount: number
}

export interface AccountingExport {
  id: string
  format: 'csv' | 'datev' | 'lexoffice' | 'sevdesk'
  period: string
  status: 'generating' | 'ready' | 'exported'
  url: string | null
  createdAt: string
}

// ─── Phase 16 — CRM Models ───

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  source: 'comment' | 'dm' | 'form' | 'affiliate-request' | 'referral'
  platform: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  score: number
  notes: string
  assignedTo: string | null
  createdAt: string
}

export interface Contact {
  id: string
  leadId: string
  name: string
  email: string
  phone: string | null
  company: string | null
  role: string | null
  socialProfiles: { platform: string; handle: string }[]
  tags: string[]
}

export interface Deal {
  id: string
  name: string
  contactId: string
  value: number
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: number
  expectedCloseDate: string
  source: string
  notes: string
}

export interface Task {
  id: string
  title: string
  description: string
  relatedTo: { type: 'lead' | 'deal' | 'contact'; id: string }
  assignee: string
  dueDate: string
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export interface FollowUpTemplate {
  id: string
  name: string
  trigger: 'new-lead' | 'no-response' | 'deal-proposal' | 'deal-closed' | 're-engagement'
  subject: string
  body: string
  delayDays: number
  channel: 'email' | 'dm' | 'whatsapp'
}

// ─── Phase 17 — Automation Models ───

export interface Workflow {
  id: string
  name: string
  description: string
  trigger: { type: 'schedule' | 'event'; config: Record<string, string> }
  conditions: { field: string; operator: string; value: string }[]
  actions: { type: string; config: Record<string, string> }[]
  status: 'active' | 'paused' | 'draft'
  lastRun: string | null
  runCount: number
  tenantId: string
}

export interface RunLog {
  id: string
  workflowId: string
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  startedAt: string
  completedAt: string | null
  error: string | null
  actionsExecuted: number
  triggeredBy: 'schedule' | 'event' | 'manual'
}

export interface ApprovalGate {
  id: string
  workflowId: string
  name: string
  requiredRole: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  resolvedAt: string | null
  resolvedBy: string | null
}

// ─── Phase 18 — Notification Models ───

export interface Notification {
  id: string
  title: string
  body: string
  type: 'alert' | 'warning' | 'info' | 'success'
  category: 'security' | 'finance' | 'content' | 'system' | 'crm'
  severity: 'low' | 'medium' | 'high' | 'critical'
  read: boolean
  link: string | null
  createdAt: string
}

export interface NotificationChannel {
  id: string
  type: 'in-app' | 'email' | 'slack' | 'discord' | 'telegram' | 'whatsapp'
  enabled: boolean
  config: Record<string, string>
  verified: boolean
}

export interface Subscription {
  id: string
  channelId: string
  eventTypes: string[]
  filters: Record<string, string>[]
}

export interface AlertRule {
  id: string
  name: string
  condition: { metric: string; operator: string; value: number; duration: string }
  channelIds: string[]
  cooldown: number
  enabled: boolean
}

// ─── Phase 19 — Enterprise Models ───

export interface WhiteLabelSettings {
  id: string
  tenantId: string
  logoUrl: string | null
  primaryColor: string
  secondaryColor: string
  accentColor: string
  customDomain: string | null
  emailSender: string
  loginBranding: { title: string; subtitle: string }
  dashboardBranding: { title: string; faviconUrl: string | null }
}

export interface TeamMember {
  id: string
  tenantId: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'agent' | 'viewer'
  status: 'active' | 'invited' | 'disabled'
  lastActive: string | null
  permissions: string[]
}

export interface ApiToken {
  id: string
  tenantId: string
  name: string
  scopes: string[]
  expiresAt: string | null
  lastUsed: string | null
  createdAt: string
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  uptime: number
  activeAgents: number
  queueDepth: number
  lastIncident: string | null
  services: { name: string; status: 'healthy' | 'degraded' | 'down'; latency: number }[]
}

// ─── Mock Data ───

export const hooks: Hook[] = [
  { id: ids.script.h1, text: "I tried this affiliate product for 30 days — here's what happened", style: 'story', platform: 'tiktok', niche: 'fitness', score: 92, status: 'approved', createdAt: '2026-06-01' },
  { id: ids.script.h2, text: "Stop wasting money on ads until you watch this", style: 'shock', platform: 'instagram', niche: 'finance', score: 88, status: 'approved', createdAt: '2026-06-02' },
  { id: ids.script.h3, text: "The 3-step morning routine that changed everything", style: 'howto', platform: 'youtube', niche: 'health', score: 85, status: 'draft', createdAt: '2026-06-03' },
]

export const scripts: Script[] = [
  { id: ids.script.s1, title: "30-Day Fitness Product Challenge", hookId: ids.script.h1, body: "I've been testing this supplement for 30 days...", platform: 'tiktok', niche: 'fitness', tone: 'casual', duration: 60, status: 'approved', score: 90, tenantId: 't1', campaignId: 'camp-1', accountId: 'acc-1', createdAt: '2026-06-01' },
  { id: ids.script.s2, title: "Why Most Ads Fail", hookId: ids.script.h2, body: "Here's the hard truth about affiliate marketing ads...", platform: 'instagram', niche: 'finance', tone: 'professional', duration: 90, status: 'draft', score: 82, tenantId: 't1', campaignId: 'camp-2', accountId: 'acc-2', createdAt: '2026-06-02' },
]

export const captions: Caption[] = [
  { id: ids.script.c1, text: "30 days. One product. Honest results.", platform: 'tiktok', hashtags: ['#ugc', '#fitness', '#supplements', '#honestreview'], mentions: [], tone: 'casual', ctaText: "Link in bio", status: 'approved', score: 91 },
  { id: ids.script.c2, text: "The finance advice that actually works.", platform: 'instagram', hashtags: ['#finance', '#moneytips', '#affiliatemarketing'], mentions: [], tone: 'professional', ctaText: "Tap to learn more", status: 'draft', score: 78 },
]

export const adCopies: AdCopy[] = [
  { id: ids.script.ad1, headline: "Transform Your Body in 30 Days", body: "Real results from real people. Start your journey today.", cta: "Shop Now", platform: 'facebook', format: 'feed', status: 'approved', performance: { impressions: 15000, clicks: 450, ctr: 3.0 } },
]

export const ctaSuggestions: CTASuggestion[] = [
  { id: ids.script.cta1, text: "Get yours before they're gone", style: 'urgent', platform: 'tiktok', effectiveness: 87 },
  { id: ids.script.cta2, text: "Swipe up to claim your discount", style: 'value', platform: 'instagram', effectiveness: 82 },
  { id: ids.script.cta3, text: "Watch the full transformation", style: 'curiosity', platform: 'youtube', effectiveness: 79 },
]

export const complianceResults: ComplianceResult[] = [
  {
    passed: false,
    checks: [
      { name: 'Affiliate Disclosure', passed: true, severity: 'error', message: 'Disclosure present' },
      { name: 'No Health Claims', passed: false, severity: 'error', message: '"Cures headaches" is a prohibited health claim' },
      { name: 'Platform Rules', passed: true, severity: 'warning', message: 'TikTok rules met' },
      { name: 'Brand Safety', passed: true, severity: 'warning', message: 'No brand conflicts' },
    ],
  },
]

// ─── Phase 10 Extended — Content Models ───

export interface BlogOutline {
  id: string
  title: string
  sections: { heading: string; subheadings: string[]; wordCount: number }[]
  keywords: string[]
  targetAudience: string
  tone: string
  status: 'draft' | 'review' | 'approved'
  tenantId: string
  niche: string
  portal: string
  campaignId: string
  createdAt: string
}

export interface NewsletterDraft {
  id: string
  subject: string
  previewText: string
  body: string
  audience: string
  platform: string
  status: 'draft' | 'review' | 'approved' | 'sent'
  openRate: number | null
  clickRate: number | null
  tenantId: string
  niche: string
  campaignId: string
  createdAt: string
}

export const blogOutlines: BlogOutline[] = [
  { id: 'blog-1', title: '10 Fitness-Tipps für Anfänger', sections: [{ heading: 'Warum Fitness wichtig ist', subheadings: ['Gesundheit', 'Wohlbefinden'], wordCount: 300 }, { heading: 'Die besten Übungen', subheadings: ['Krafttraining', 'Ausdauer'], wordCount: 500 }], keywords: ['fitness', 'anfänger', 'training'], targetAudience: 'Fitness-Anfänger', tone: 'motivational', status: 'approved', tenantId: 't1', niche: 'fitness', portal: 'instagram', campaignId: 'camp-1', createdAt: '2026-06-15' },
]

export const newsletterDrafts: NewsletterDraft[] = [
  { id: 'nl-1', subject: 'Deine Fitness-Transformation beginnt hier', previewText: 'Die besten Tipps für deinen Start', body: 'Hallo zusammen! Diese Woche haben wir...', audience: 'Fitness-Interessenten', platform: 'email', status: 'approved', openRate: 45.2, clickRate: 12.8, tenantId: 't1', niche: 'fitness', campaignId: 'camp-1', createdAt: '2026-06-20' },
]

// Phase 11
export const avatarProfiles: AvatarProfile[] = [
  { id: ids.ugc.a1, name: 'Alex Fitness', niche: ['fitness', 'health'], platform: ['tiktok', 'instagram'], language: 'en', gender: 'male', ageGroup: '25-35', style: 'realistic', provider: 'mock', status: 'active', thumbnailUrl: '/avatars/alex.png' },
  { id: ids.ugc.a2, name: 'Sophia Finance', niche: ['finance', 'business'], platform: ['youtube', 'linkedin'], language: 'en', gender: 'female', ageGroup: '25-35', style: 'professional', provider: 'mock', status: 'active', thumbnailUrl: '/avatars/sophia.png' },
]

export const voiceProfiles: VoiceProfile[] = [
  { id: ids.ugc.v1, name: 'James (Casual)', provider: 'elevenlabs', language: 'en', accent: 'american', gender: 'male', speed: 1.0, pitch: 1.0, status: 'active' },
  { id: ids.ugc.v2, name: 'Emma (Professional)', provider: 'openai', language: 'en', accent: 'british', gender: 'female', speed: 0.95, pitch: 1.05, status: 'active' },
]

export const videoJobs: VideoJob[] = [
  { id: ids.ugc.j1, title: 'Fitness Product Review', scriptId: ids.script.s1, avatarId: ids.ugc.a1, voiceId: ids.ugc.v1, platform: 'tiktok', format: '9:16', status: 'completed', progress: 100, outputUrl: '/mock/video-1.mp4', error: null, createdAt: '2026-06-05', completedAt: '2026-06-05' },
  { id: ids.ugc.j2, title: 'Finance Tips Reel', scriptId: ids.script.s2, avatarId: ids.ugc.a2, voiceId: ids.ugc.v2, platform: 'instagram', format: '9:16', status: 'rendering', progress: 65, outputUrl: null, error: null, createdAt: '2026-06-06', completedAt: null },
]

export const videoAssets: VideoAsset[] = [
  { id: ids.ugc.va1, jobId: ids.ugc.j1, url: '/mock/video-1.mp4', format: 'mp4', duration: 60, fileSize: 15_000_000, thumbnailUrl: '/mock/thumb-1.png' },
]

export const subtitleAssets: SubtitleAsset[] = [
  { id: 'sub-1', videoId: ids.ugc.va1, language: 'en', format: 'srt', url: '/mock/sub-1.srt' },
]

export const brollAssets: BrollAsset[] = [
  { id: 'broll-1', url: '/mock/broll-1.mp4', type: 'footage', tags: ['fitness', 'gym', 'workout'], source: 'stock', duration: 30 },
]

export const renderPresets: RenderPreset[] = [
  { id: 'preset-1', name: 'TikTok Vertical', format: '9:16', resolution: '1080p', fps: 30, bitrate: '8mbps', codec: 'h264' },
  { id: 'preset-2', name: 'Instagram Feed', format: '1:1', resolution: '1080p', fps: 30, bitrate: '6mbps', codec: 'h264' },
  { id: 'preset-3', name: 'YouTube Landscape', format: '16:9', resolution: '1080p', fps: 30, bitrate: '12mbps', codec: 'h264' },
]

// Phase 12
export const contentCalendar: ContentCalendarItem[] = [
  { id: ids.pub.c1, title: 'Fitness Product Review', platform: 'tiktok', accountId: 'acc-1', scheduledAt: '2026-07-08T14:00:00Z', status: 'scheduled', contentType: 'video', assetUrl: null, campaignId: 'camp-1', niche: 'fitness', approvalStatus: 'approved', approvedBy: 'user-1' },
  { id: ids.pub.c2, title: 'Finance Tips Carousel', platform: 'instagram', accountId: 'acc-2', scheduledAt: '2026-07-09T10:00:00Z', status: 'review', contentType: 'carousel', assetUrl: null, campaignId: 'camp-2', niche: 'finance', approvalStatus: 'pending', approvedBy: null },
]

export const publishingJobs: PublishingJob[] = [
  { id: ids.pub.p1, calendarItemId: ids.pub.c1, platform: 'tiktok', status: 'published', platformPostId: 'tt-12345', publishUrl: 'https://tiktok.com/@ugcagency/video/12345', error: null, attemptCount: 1, createdAt: '2026-07-08' },
  { id: ids.pub.p2, calendarItemId: ids.pub.c2, platform: 'instagram', status: 'queued', platformPostId: null, publishUrl: null, error: null, attemptCount: 0, createdAt: '2026-07-08' },
]

export const platformPosts: PlatformPost[] = [
  { id: 'pp-1', platformPostId: 'tt-12345', platform: 'tiktok', url: 'https://tiktok.com/@ugcagency/video/12345', publishedAt: '2026-07-08T14:00:00Z', status: 'active', performance: { views: 12500, likes: 890, comments: 45, shares: 230, saved: 156 } },
]

export const postingRules: PostingRule[] = [
  { id: 'rule-1', platform: 'tiktok', maxDaily: 3, minInterval: 240, requireApproval: false, riskLevels: ['low', 'medium'], bestTimes: ['07:00', '12:00', '19:00'], blackoutDays: [] },
  { id: 'rule-2', platform: 'reddit', maxDaily: 1, minInterval: 1440, requireApproval: true, riskLevels: ['medium', 'high'], bestTimes: ['08:00', '18:00'], blackoutDays: [] },
]

export const platformConnectors: PlatformConnector[] = [
  { id: 'conn-1', platform: 'tiktok', connected: true, accountName: '@ugcagency', lastSync: '2026-07-06T12:00:00Z', rateLimitRemaining: 180, rateLimitReset: '2026-07-07T12:00:00Z' },
  { id: 'conn-2', platform: 'instagram', connected: true, accountName: '@ugc.agency', lastSync: '2026-07-06T12:00:00Z', rateLimitRemaining: 150, rateLimitReset: '2026-07-07T12:00:00Z' },
  { id: 'conn-3', platform: 'reddit', connected: false, accountName: '', lastSync: null, rateLimitRemaining: 0, rateLimitReset: null },
]

export const rateLimitStates: RateLimitState[] = [
  { id: 'rls-1', platform: 'tiktok', remaining: 180, limit: 200, resetAt: '2026-07-07T12:00:00Z', isThrottled: false },
  { id: 'rls-2', platform: 'reddit', remaining: 45, limit: 60, resetAt: '2026-07-07T12:00:00Z', isThrottled: false },
  { id: 'rls-3', platform: 'meta', remaining: 0, limit: 100, resetAt: '2026-07-07T12:00:00Z', isThrottled: true },
]

// Phase 13
export const impressions: Impression[] = [
  { id: ids.analytics.i1, date: '2026-07-01', platform: 'tiktok', accountId: 'acc-1', count: 45000, cost: 120 },
  { id: ids.analytics.i2, date: '2026-07-01', platform: 'instagram', accountId: 'acc-2', count: 32000, cost: 95 },
]

export const views: View[] = [
  { id: 'view-1', date: '2026-07-01', platform: 'tiktok', assetId: ids.ugc.va1, count: 12500, avgWatchTime: 32, completionRate: 0.45 },
]

export const clicks: Click[] = [
  { id: ids.analytics.cl1, date: '2026-07-01', platform: 'tiktok', linkType: 'affiliate', destination: 'https://example.com/product', count: 580, cost: 48 },
]

export const attributionRecords: AttributionRecord[] = [
  { id: 'attr-1', clickId: ids.analytics.cl1, saleId: 'sale-1', touchpoints: [{ source: 'tiktok-video', value: 0.7 }, { source: 'instagram-story', value: 0.3 }], model: 'last-click', attributedRevenue: 89.00 },
]

export const profitMetrics: ProfitMetric[] = [
  { id: 'pm-1', entityType: 'campaign', entityId: 'camp-1', revenue: 12500, cost: 3400, profit: 9100, roas: 3.68, period: '2026-07' },
  { id: 'pm-2', entityType: 'platform', entityId: 'tiktok', revenue: 45200, cost: 12800, profit: 32400, roas: 3.53, period: '2026-07' },
  { id: 'pm-3', entityType: 'niche', entityId: 'fitness', revenue: 28900, cost: 7600, profit: 21300, roas: 3.80, period: '2026-07' },
]

export const analyticsInsights: AnalyticsAgentInsight[] = [
  { id: 'ai-1', type: 'winner', entityType: 'campaign', entityId: 'camp-1', message: 'Fitness campaign is top performer with 3.68 ROAS', severity: 'info', metric: 3.68, threshold: 2.0, timestamp: '2026-07-06T08:00:00Z' },
  { id: 'ai-2', type: 'low_ctr', entityType: 'account', entityId: 'acc-2', message: 'Instagram account CTR dropped to 1.2%', severity: 'warning', metric: 1.2, threshold: 2.0, timestamp: '2026-07-06T08:00:00Z' },
]

// Phase 14
export const revenues: Revenue[] = [
  { id: ids.finance.r1, date: '2026-07-01', source: 'affiliate', amount: 12500, platform: 'tiktok', campaignId: 'camp-1', accountId: 'acc-1', status: 'booked' },
  { id: ids.finance.r2, date: '2026-07-02', source: 'service', amount: 5000, platform: 'instagram', campaignId: 'camp-2', accountId: 'acc-2', status: 'pending' },
]

export const expenses: Expense[] = [
  { id: ids.finance.e1, date: '2026-07-01', category: 'api', provider: 'openai', amount: 450, description: 'GPT-4 API usage June', receiptUrl: null, status: 'booked' },
  { id: ids.finance.e2, date: '2026-07-01', category: 'ads', provider: 'meta-ads', amount: 1200, description: 'Instagram ads campaign #2', receiptUrl: null, status: 'booked' },
  { id: ids.finance.e3, date: '2026-07-02', category: 'tools', provider: 'elevenlabs', amount: 99, description: 'ElevenLabs subscription June', receiptUrl: null, status: 'pending' },
]

export const cashflowEntries: CashflowEntry[] = [
  { id: 'cf-1', date: '2026-07-01', type: 'inflow', category: 'affiliate', amount: 12500, balance: 12500, description: 'TikTok campaign payouts' },
  { id: 'cf-2', date: '2026-07-01', type: 'outflow', category: 'api', amount: 450, balance: 12050, description: 'OpenAI API' },
  { id: 'cf-3', date: '2026-07-02', type: 'outflow', category: 'ads', amount: 1200, balance: 10850, description: 'Meta Ads' },
]

export const expenseImportAdapters: ExpenseImportAdapter[] = [
  { id: 'eia-1', provider: 'stripe', type: 'stripe', connected: true, lastImport: '2026-07-06', importCount: 45 },
  { id: 'eia-2', provider: 'meta-ads', type: 'meta-ads', connected: true, lastImport: '2026-07-06', importCount: 128 },
  { id: 'eia-3', provider: 'openai', type: 'openai', connected: false, lastImport: null, importCount: 0 },
]

// Phase 15
export const taxProfile: TaxProfile = {
  id: ids.tax.tp1,
  country: 'DE',
  legalForm: 'einzelunternehmen',
  vatId: 'DE123456789',
  taxNumber: '123/456/78901',
  vatRate: 19,
  vatFiled: true,
  vatFilingPeriod: 'quarterly',
  tradeTaxRate: 3.5,
  incomeTaxRate: 30,
  fiscalYearEnd: '2026-12-31',
}

export const vatEstimates: VatEstimate[] = [
  { id: 'vat-1', period: '2026-Q2', revenue: 85000, vatOnRevenue: 16150, expenses: 52000, vatOnExpenses: 9880, vatDue: 6270, status: 'filed' },
  { id: 'vat-2', period: '2026-Q3', revenue: 95000, vatOnRevenue: 18050, expenses: 58000, vatOnExpenses: 11020, vatDue: 7030, status: 'estimated' },
]

export const incomeTaxReserves: IncomeTaxReserve[] = [
  { id: 'itr-1', year: 2026, estimatedProfit: 180000, taxRate: 30, reserveAmount: 54000, monthlyReserve: 4500 },
]

export const taxCalendarEvents: TaxCalendarEvent[] = [
  { id: 'tce-1', title: 'Umsatzsteuervoranmeldung Q3', dueDate: '2026-10-10', type: 'vat', status: 'upcoming', amount: 7030 },
  { id: 'tce-2', title: 'Einkommensteuervorauszahlung', dueDate: '2026-09-15', type: 'income-tax', status: 'upcoming', amount: 13500 },
]

// Phase 16
export const leads: Lead[] = [
  { id: ids.crm.l1, name: 'Max Mustermann', email: 'max@example.com', phone: '+49123456789', source: 'comment', platform: 'tiktok', status: 'new', score: 78, notes: 'Interested in fitness affiliate program', assignedTo: null, createdAt: '2026-07-05' },
  { id: ids.crm.l2, name: 'Anna Schmidt', email: 'anna@example.com', phone: null, source: 'form', platform: 'instagram', status: 'contacted', score: 85, notes: 'Looking for finance niche partnership', assignedTo: 'agent-1', createdAt: '2026-07-04' },
]

export const contacts: Contact[] = [
  { id: 'c-1', leadId: ids.crm.l2, name: 'Anna Schmidt', email: 'anna@example.com', phone: '+49123456788', company: 'FinTech GmbH', role: 'Marketing Manager', socialProfiles: [{ platform: 'instagram', handle: '@anna.finance' }], tags: ['finance', 'high-value'] },
]

export const deals: Deal[] = [
  { id: ids.crm.d1, name: 'Fitness Partnership - Max', contactId: 'c-2', value: 15000, stage: 'discovery', probability: 20, expectedCloseDate: '2026-08-01', source: 'tiktok-comment', notes: 'Initial interest confirmed' },
  { id: ids.crm.d2, name: 'Finance Campaign - Anna', contactId: 'c-1', value: 25000, stage: 'proposal', probability: 60, expectedCloseDate: '2026-07-20', source: 'website-form', notes: 'Proposal sent, awaiting feedback' },
]

export const tasks: Task[] = [
  { id: 't-1', title: 'Follow up with Max', description: 'Send partnership details and pricing', relatedTo: { type: 'lead', id: ids.crm.l1 }, assignee: 'agent-1', dueDate: '2026-07-08', status: 'open', priority: 'high' },
  { id: 't-2', title: 'Prepare finance proposal', description: 'Create custom proposal for Anna', relatedTo: { type: 'deal', id: ids.crm.d2 }, assignee: 'agent-1', dueDate: '2026-07-10', status: 'in-progress', priority: 'high' },
]

export const followUpTemplates: FollowUpTemplate[] = [
  { id: 'fut-1', name: 'New Lead Welcome', trigger: 'new-lead', subject: 'Welcome to UGC Affiliate Agency!', body: 'Hi {{name}}, thanks for reaching out...', delayDays: 0, channel: 'email' },
  { id: 'fut-2', name: 'Follow-up No Response', trigger: 'no-response', subject: 'Just checking in', body: 'Hi {{name}}, I wanted to follow up...', delayDays: 3, channel: 'email' },
]

// Phase 17
export const workflows: Workflow[] = [
  { id: ids.automation.w1, name: 'Weekly Content Review', description: 'Every Monday, check content calendar for pending reviews', trigger: { type: 'schedule', config: { cron: '0 9 * * 1' } }, conditions: [{ field: 'status', operator: 'equals', value: 'review' }], actions: [{ type: 'notify-reviewers', config: { channel: 'slack', message: 'Content pending review' } }], status: 'active', lastRun: '2026-07-06T09:00:00Z', runCount: 12, tenantId: 't1' },
  { id: ids.automation.w2, name: 'High Risk Post Approval', description: 'Require manual approval for high-risk platform posts', trigger: { type: 'event', config: { event: 'post.created' } }, conditions: [{ field: 'platform', operator: 'equals', value: 'reddit' }], actions: [{ type: 'create-approval-gate', config: { role: 'manager' } }], status: 'active', lastRun: '2026-07-05T14:00:00Z', runCount: 8, tenantId: 't1' },
]

export const runLogs: RunLog[] = [
  { id: 'rl-1', workflowId: ids.automation.w1, status: 'completed', startedAt: '2026-07-06T09:00:00Z', completedAt: '2026-07-06T09:00:05Z', error: null, actionsExecuted: 3, triggeredBy: 'schedule' },
]

// Phase 18
export const notificationsInbox: Notification[] = [
  { id: ids.notify.n1, title: 'API Secret läuft ab', body: 'OpenAI API Key läuft in 7 Tagen ab. Bitte erneuern.', type: 'alert', category: 'security', severity: 'high', read: false, link: '/admin/security', createdAt: '2026-07-06T10:00:00Z' },
  { id: ids.notify.n2, title: 'Kampagne verliert Geld', body: 'Instagram-Kampagne #2 hat -5% ROI in den letzten 24h.', type: 'warning', category: 'finance', severity: 'medium', read: false, link: '/admin/finance', createdAt: '2026-07-06T09:30:00Z' },
  { id: ids.notify.n3, title: 'Content freigegeben', body: 'Fitness Video wurde freigegeben und wird morgen veröffentlicht.', type: 'success', category: 'content', severity: 'low', read: true, link: '/admin/publishing', createdAt: '2026-07-06T08:00:00Z' },
  { id: ids.notify.n4, title: 'Steuerfrist naht', body: 'Umsatzsteuervoranmeldung Q3 fällig am 10.10.2026.', type: 'info', category: 'finance', severity: 'medium', read: false, link: '/admin/tax', createdAt: '2026-07-05T12:00:00Z' },
]

export const notificationChannels: NotificationChannel[] = [
  { id: 'nc-1', type: 'in-app', enabled: true, config: {}, verified: true },
  { id: 'nc-2', type: 'email', enabled: true, config: { address: 'admin@ugcagency.com' }, verified: true },
  { id: 'nc-3', type: 'slack', enabled: false, config: { webhook: '' }, verified: false },
]

export const alertRules: AlertRule[] = [
  { id: 'ar-1', name: 'Secret Expiry Warning', condition: { metric: 'secret.days_until_expiry', operator: 'less_than', value: 14, duration: '1d' }, channelIds: ['nc-1', 'nc-2'], cooldown: 86400, enabled: true },
  { id: 'ar-2', name: 'Negative Campaign ROAS', condition: { metric: 'campaign.roas', operator: 'less_than', value: 1.0, duration: '1d' }, channelIds: ['nc-1'], cooldown: 43200, enabled: true },
]

// Phase 19
export const whiteLabelSettings: WhiteLabelSettings = {
  id: 'wl-1',
  tenantId: 't1',
  logoUrl: null,
  primaryColor: '#C9A94E',
  secondaryColor: '#1C1C1E',
  accentColor: '#F5F5F0',
  customDomain: null,
  emailSender: 'noreply@ugcagency.com',
  loginBranding: { title: 'UGC Affiliate Agency', subtitle: 'Enterprise Login' },
  dashboardBranding: { title: 'UGC Affiliate Agency', faviconUrl: null },
}

export const teamMembers: TeamMember[] = [
  { id: 'tm-1', tenantId: 't1', email: 'admin@ugcagency.com', name: 'System Admin', role: 'admin', status: 'active', lastActive: '2026-07-06T10:00:00Z', permissions: ['all'] },
  { id: 'tm-2', tenantId: 't1', email: 'manager@ugcagency.com', name: 'Content Manager', role: 'manager', status: 'active', lastActive: '2026-07-05T16:00:00Z', permissions: ['content:write', 'publishing:approve', 'analytics:read'] },
  { id: 'tm-3', tenantId: 't1', email: 'new@example.com', name: 'New Member', role: 'agent', status: 'invited', lastActive: null, permissions: ['content:read'] },
]

export const systemHealth: SystemHealth = {
  status: 'healthy',
  uptime: 99.8,
  activeAgents: 8,
  queueDepth: 2,
  lastIncident: '2026-06-28T14:00:00Z',
  services: [
    { name: 'Script Agent', status: 'healthy', latency: 245 },
    { name: 'Video Agent', status: 'healthy', latency: 3200 },
    { name: 'Publishing Agent', status: 'healthy', latency: 180 },
    { name: 'Analytics Agent', status: 'degraded', latency: 4500 },
    { name: 'CFO Agent', status: 'healthy', latency: 300 },
  ],
}
