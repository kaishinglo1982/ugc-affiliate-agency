export const agencyProfile = {
  name: 'UGC Affiliate Agency',
  claim: "Content that converts.",
  tagline: 'UGC-first \u00b7 Est. 2025',
  tone: ['performance-driven', 'authentic', 'data-informed', 'creative'],
  colors: ['ink', 'bone', 'gold'],
  audience: ['DTC brands', 'SaaS companies', 'eCommerce stores', 'Affiliate managers'],
};

export type PriceTier = 'starter' | 'growth' | 'scale' | 'enterprise';

export type Service = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  tier: PriceTier;
  badge: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  revisions: number;
  usage: string;
  category: 'Video Production' | 'Creator Management' | 'Campaign Strategy' | 'Analytics & Reporting';
};

export const services: Service[] = [
  {
    id: 'ugc-vid-001',
    slug: 'starter-video-pack',
    name: 'Starter Video Pack',
    price: 499,
    compareAt: 799,
    tier: 'starter',
    badge: 'Most Popular',
    description: 'Perfect for brands testing UGC. Get 3 authentic, platform-native videos optimized for TikTok, Reels, and YouTube Shorts.',
    deliverables: ['3 UGC-style videos (15-60s)', '1 creator match per brief', 'Raw + edited files', 'Unlimited usage rights', 'Brief + script concept'],
    turnaround: '5-7 business days',
    revisions: 1,
    usage: 'Unlimited paid & organic',
    category: 'Video Production',
  },
  {
    id: 'ugc-vid-002',
    slug: 'growth-video-pack',
    name: 'Growth Video Pack',
    price: 1299,
    compareAt: 1899,
    tier: 'growth',
    badge: 'Best Value',
    description: 'Scale your content testing. 10 videos with multiple creators, hooks, and angles for aggressive split-testing.',
    deliverables: ['10 UGC-style videos (15-60s)', '3-4 creator matches per brief', 'Raw + edited files', 'Unlimited usage rights', 'Hook variations (5+ angles)', 'Performance report'],
    turnaround: '7-10 business days',
    revisions: 2,
    usage: 'Unlimited paid & organic',
    category: 'Video Production',
  },
  {
    id: 'ugc-vid-003',
    slug: 'scale-video-pack',
    name: 'Scale Video Pack',
    price: 2999,
    tier: 'scale',
    badge: 'For Agencies',
    description: 'High-volume content engine. 30 videos monthly with dedicated creator roster, strategic briefing, and performance optimization.',
    deliverables: ['30 UGC-style videos/month', '5-8 dedicated creators', 'Raw + edited + captioned files', 'Unlimited usage rights', 'Weekly performance reviews', 'Dedicated campaign manager', 'Creative strategy sessions'],
    turnaround: 'Monthly retainer',
    revisions: 3,
    usage: 'Unlimited paid & organic',
    category: 'Video Production',
  },
  {
    id: 'ugc-cm-001',
    slug: 'creator-match',
    name: 'Creator Match',
    price: 799,
    tier: 'starter',
    badge: '',
    description: 'We find and brief the perfect UGC creators for your brand. Vetted, briefed, and ready to produce.',
    deliverables: ['3 vetted creator matches', 'Custom brief per creator', 'Content rights agreement', 'Performance tracking link'],
    turnaround: '3-5 business days',
    revisions: 0,
    usage: 'Per campaign',
    category: 'Creator Management',
  },
  {
    id: 'ugc-cm-002',
    slug: 'managed-creator-roster',
    name: 'Managed Creator Roster',
    price: 2499,
    tier: 'growth',
    badge: '',
    description: 'Ongoing creator management. We recruit, brief, manage, and optimize your dedicated creator crew.',
    deliverables: ['5-10 dedicated creators', 'Monthly content calendar', 'Briefing + feedback management', 'Performance dashboards', 'Monthly strategy call'],
    turnaround: 'Monthly retainer',
    revisions: 2,
    usage: 'Monthly retainer',
    category: 'Creator Management',
  },
  {
    id: 'ugc-cs-001',
    slug: 'campaign-strategy',
    name: 'Campaign Strategy Session',
    price: 1499,
    tier: 'growth',
    badge: '',
    description: 'Full creative strategy: audience research, hook development, competitor analysis, and content roadmap.',
    deliverables: ['Creative strategy document', 'Hook library (20+ concepts)', 'Competitor content audit', 'Content calendar (30 days)', 'Performance KPI framework'],
    turnaround: '5 business days',
    revisions: 1,
    usage: 'One-time',
    category: 'Campaign Strategy',
  },
  {
    id: 'ugc-ar-001',
    slug: 'performance-analytics',
    name: 'Performance Analytics Dashboard',
    price: 999,
    tier: 'starter',
    badge: '',
    description: 'Track what converts. Custom dashboard with CPA, ROAS, CTR, and creative performance breakdowns.',
    deliverables: ['Custom analytics dashboard', 'Weekly performance reports', 'Creative scorecards', 'Optimization recommendations'],
    turnaround: 'Setup in 3 days + weekly reports',
    revisions: 1,
    usage: 'Monthly',
    category: 'Analytics & Reporting',
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export type Campaign = {
  id: string;
  name: string;
  status: 'active' | 'review' | 'upcoming' | 'completed';
  launchDate: string;
  hero: string;
  client: string;
  niche: string;
  budget: number;
  videosDelivered: number;
  targetCPA: number;
  actualCPA: number;
  ROAS: number;
  impressions: number;
};

export const campaigns: Campaign[] = [
  {
    id: 'cmp-001',
    name: 'Summer DTC Launch',
    status: 'active',
    launchDate: '2026-07-15',
    hero: 'Scaling a new DTC skincare brand from 0 to 50k revenue.',
    client: 'Glow Labs',
    niche: 'Skincare / DTC',
    budget: 5000,
    videosDelivered: 15,
    targetCPA: 12,
    actualCPA: 8.5,
    ROAS: 4.2,
    impressions: 1280000,
  },
  {
    id: 'cmp-002',
    name: 'SaaS Affiliate Program',
    status: 'active',
    launchDate: '2026-08-01',
    hero: 'Building a creator affiliate pipeline for a B2B SaaS platform.',
    client: 'DataFlow Inc.',
    niche: 'B2B SaaS',
    budget: 8000,
    videosDelivered: 22,
    targetCPA: 45,
    actualCPA: 38,
    ROAS: 3.8,
    impressions: 890000,
  },
  {
    id: 'cmp-003',
    name: 'Fashion Rebrand Campaign',
    status: 'review',
    launchDate: '2026-06-20',
    hero: 'UGC-first rebrand launch for a streetwear label.',
    client: 'Unknown Co.',
    niche: 'Fashion / Streetwear',
    budget: 3500,
    videosDelivered: 10,
    targetCPA: 15,
    actualCPA: 11.2,
    ROAS: 5.1,
    impressions: 2100000,
  },
  {
    id: 'cmp-004',
    name: 'Black Friday Prep',
    status: 'upcoming',
    launchDate: '2026-10-01',
    hero: 'Pre-BFCM content library build for a supplements brand.',
    client: 'Peak Nutrition',
    niche: 'Supplements / Health',
    budget: 12000,
    videosDelivered: 0,
    targetCPA: 18,
    actualCPA: 0,
    ROAS: 0,
    impressions: 0,
  },
  {
    id: 'cmp-005',
    name: 'Always-On Content Engine',
    status: 'completed',
    launchDate: '2026-04-01',
    hero: 'Monthly content retainer for an eCommerce home goods brand.',
    client: 'Haven Home',
    niche: 'Home Goods / eCommerce',
    budget: 6000,
    videosDelivered: 45,
    targetCPA: 10,
    actualCPA: 7.3,
    ROAS: 6.2,
    impressions: 3400000,
  },
];

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id);
}

export type VideoIdea = {
  id: string;
  hook: string;
  format: string;
  cta: string;
  score: number;
};

export const videoIdeas: VideoIdea[] = [
  { id: 'vid-001', hook: 'I tested this brand so you don\'t have to.', format: 'Honest Review', cta: 'Shop now — link in bio', score: 94 },
  { id: 'vid-002', hook: 'Stop overpaying for [product] — try this instead.', format: 'Comparison', cta: 'Get the better option', score: 91 },
  { id: 'vid-003', hook: '3 months using [product] — here\'s what happened.', format: 'Transformation', cta: 'Start your journey', score: 88 },
  { id: 'vid-004', hook: 'My affiliate secret: this product pays me daily.', format: 'Behind the Scenes', cta: 'Join the affiliate program', score: 86 },
  { id: 'vid-005', hook: 'Don\'t buy [product] until you watch this.', format: 'Myth Busting', cta: 'See the truth', score: 83 },
  { id: 'vid-006', hook: 'How I make $Xk/month with just my phone.', format: 'Income Proof', cta: 'Start earning', score: 79 },
];

export type Review = {
  id: string;
  client: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export const reviews: Review[] = [
  { id: 'rev-001', client: 'Glow Labs', author: 'Sarah Chen', role: 'Marketing Director', rating: 5, title: 'ROI doubled in 30 days', body: 'The UGC content we got from this agency outperformed our studio-produced ads by 3x. CPA dropped from $15 to $8.50 within two weeks of launching their videos.', date: '2026-06-15' },
  { id: 'rev-002', client: 'DataFlow Inc.', author: 'Marcus Webb', role: 'Head of Growth', rating: 5, title: 'Our affiliate program finally works', body: 'We struggled with creator outreach until we partnered with UGC Affiliate Agency. They onboarded 12 creators in week one and our affiliate channel is now our #1 acquisition source.', date: '2026-06-28' },
  { id: 'rev-003', client: 'Peak Nutrition', author: 'Jordan Lee', role: 'Founder', rating: 4, title: 'Consistent quality at scale', body: 'The managed creator roster gives us 30+ videos per month without any internal overhead. Quality varies by creator, but the top performers are gold.', date: '2026-07-02' },
  { id: 'rev-004', client: 'Haven Home', author: 'Olivia Park', role: 'eCommerce Manager', rating: 5, title: 'Best vendor we\'ve worked with', body: '6.2 ROAS over 3 months. The analytics dashboard alone is worth the retainer. We know exactly which hooks, creators, and formats drive revenue.', date: '2026-06-20' },
  { id: 'rev-005', client: 'Unknown Co.', author: 'Alex Rivera', role: 'Brand Director', rating: 5, title: 'They understand brand + performance', body: 'Rare to find an agency that balances creative quality with conversion data. The rebrand campaign launched with 10 videos and every single one had a positive ROAS.', date: '2026-07-01' },
];

export function getReviews() {
  return reviews;
}

export type Creator = {
  id: string;
  name: string;
  email: string;
  channel: 'tiktok' | 'instagram' | 'youtube' | 'multiple';
  niche: string;
  rate: number;
  followerCount: number;
  status: 'active' | 'onboarding' | 'available' | 'inactive';
  avgEngagement: number;
  topPerformingHook: string;
  createdAt: string;
};

export const creators: Creator[] = [
  { id: 'cr-001', name: 'Maya Johnson', email: 'maya@example.com', channel: 'tiktok', niche: 'Beauty & Skincare', rate: 250, followerCount: 45000, status: 'active', avgEngagement: 4.8, topPerformingHook: 'I tried this for 30 days...', createdAt: '2026-05-01' },
  { id: 'cr-002', name: 'Ethan Park', email: 'ethan@example.com', channel: 'instagram', niche: 'Fashion & Streetwear', rate: 350, followerCount: 62000, status: 'active', avgEngagement: 3.2, topPerformingHook: 'Stop wearing [brand], wear this instead.', createdAt: '2026-05-03' },
  { id: 'cr-003', name: 'Sofia Martinez', email: 'sofia@example.com', channel: 'tiktok', niche: 'Health & Supplements', rate: 200, followerCount: 28000, status: 'active', avgEngagement: 5.1, topPerformingHook: 'My doctor was shocked when I showed her this.', createdAt: '2026-05-10' },
  { id: 'cr-004', name: 'Liam O\'Brien', email: 'liam@example.com', channel: 'youtube', niche: 'Tech & SaaS', rate: 500, followerCount: 85000, status: 'active', avgEngagement: 2.9, topPerformingHook: 'This tool saved my team 20 hours/week.', createdAt: '2026-04-15' },
  { id: 'cr-005', name: 'Aisha Williams', email: 'aisha@example.com', channel: 'multiple', niche: 'Lifestyle & Home', rate: 300, followerCount: 51000, status: 'active', avgEngagement: 4.2, topPerformingHook: 'Amazon finds that look expensive but aren\'t.', createdAt: '2026-05-20' },
  { id: 'cr-006', name: 'Jack Thompson', email: 'jack@example.com', channel: 'tiktok', niche: 'Finance & Wealth', rate: 400, followerCount: 78000, status: 'onboarding', avgEngagement: 3.8, topPerformingHook: 'How I made $5k last month doing nothing.', createdAt: '2026-06-28' },
  { id: 'cr-007', name: 'Emma Davis', email: 'emma@example.com', channel: 'instagram', niche: 'Fashion & Beauty', rate: 280, followerCount: 34000, status: 'available', avgEngagement: 4.5, topPerformingHook: 'GRWM using only affiliate links.', createdAt: '2026-06-15' },
  { id: 'cr-008', name: 'Noah Garcia', email: 'noah@example.com', channel: 'youtube', niche: 'Gaming & Tech', rate: 450, followerCount: 120000, status: 'available', avgEngagement: 2.5, topPerformingHook: 'The best budget [product] in 2026.', createdAt: '2026-06-01' },
];

export function getCreator(id: string) {
  return creators.find((c) => c.id === id);
}

export type Flow = {
  id: string;
  name: string;
  channel: 'Email' | 'SMS' | 'WhatsApp' | 'Slack';
  trigger: string;
  steps: string[];
  status: 'active' | 'draft';
};

export const flows: Flow[] = [
  { id: 'flow-001', name: 'Client Onboarding', channel: 'Email', trigger: 'Contract signed', steps: ['Instant: Welcome + project brief template', 'Day 1: Creator selection guide', 'Day 3: Content calendar preview'], status: 'active' },
  { id: 'flow-002', name: 'Campaign Launch', channel: 'Slack', trigger: 'Campaign goes live', steps: ['Instant: Campaign brief posted', 'Day 1: First content batch delivered', 'Day 7: Performance review report'], status: 'active' },
  { id: 'flow-003', name: 'Lead Nurture', channel: 'Email', trigger: 'Inquiry form submitted', steps: ['1h: Thanks for reaching out', '24h: Case studies + pricing', '72h: Free consultation offer'], status: 'active' },
  { id: 'flow-004', name: 'Creator Payout Reminder', channel: 'WhatsApp', trigger: 'Content approved', steps: ['Instant: Content approved ✅', 'Same day: Invoice submitted', '7 days: Payment processed'], status: 'draft' },
];

export type Sale = {
  id: string;
  serviceName: string;
  amount: number;
  channel: string;
  client: string;
  date: string;
};

export const sales: Sale[] = [
  { id: 'sale-001', serviceName: 'Growth Video Pack', amount: 1299, channel: 'Organic Search', client: 'Glow Labs', date: '2026-07-03' },
  { id: 'sale-002', serviceName: 'Creator Match', amount: 799, channel: 'Referral', client: 'DataFlow Inc.', date: '2026-07-03' },
  { id: 'sale-003', serviceName: 'Starter Video Pack', amount: 499, channel: 'Instagram', client: 'Peak Nutrition', date: '2026-07-02' },
  { id: 'sale-004', serviceName: 'Scale Video Pack', amount: 2999, channel: 'LinkedIn', client: 'Haven Home', date: '2026-07-02' },
  { id: 'sale-005', serviceName: 'Campaign Strategy Session', amount: 1499, channel: 'Referral', client: 'Unknown Co.', date: '2026-07-01' },
  { id: 'sale-006', serviceName: 'Managed Creator Roster', amount: 2499, channel: 'TikTok', client: 'Glow Labs', date: '2026-06-28' },
  { id: 'sale-007', serviceName: 'Starter Video Pack', amount: 499, channel: 'Google Ads', client: 'Barefoot Coffee', date: '2026-06-25' },
  { id: 'sale-008', serviceName: 'Performance Analytics Dashboard', amount: 999, channel: 'Email', client: 'DataFlow Inc.', date: '2026-06-22' },
];

export const conversionFunnel = [
  { stage: 'Video Views', value: 245000 },
  { stage: 'Website Visits', value: 42000 },
  { stage: 'Inquiry Forms', value: 5800 },
  { stage: 'Consultation Calls', value: 1200 },
  { stage: 'Proposals Sent', value: 480 },
  { stage: 'Deals Closed', value: 185 },
];

export const abTests = [
  { id: 'ab-001', name: 'Service page headline', variantA: 'Content that converts.', variantB: 'UGC that sells.', winner: 'A', lift: '+23% CTR' },
  { id: 'ab-002', name: 'CTA button colour', variantA: 'Gold button', variantB: 'White button', winner: 'A', lift: '+12% CVR' },
  { id: 'ab-003', name: 'Pricing display', variantA: 'Monthly pricing', variantB: 'Per-project pricing', winner: 'B', lift: '+18% conversion' },
];

export const portfolio = [
  { id: 'pf-1', title: 'Glow Labs — Skincare Launch', caption: '15 UGC videos | 4.2 ROAS | $8.50 CPA', image: '/images/who-knows-brand-overview.jpg' },
  { id: 'pf-2', title: 'Haven Home — Always-On Content', caption: '45 videos/month | 6.2 ROAS | $7.30 CPA', image: '/images/who-knows-showcase.jpg' },
  { id: 'pf-3', title: 'Unknown Co. — Rebrand Launch', caption: '10 videos | 5.1 ROAS | $11.20 CPA', image: '/images/hero.png' },
  { id: 'pf-4', title: 'DataFlow Inc. — Affiliate Pipeline', caption: '22 videos | 3.8 ROAS | 890k impressions', image: '/images/drop-002.png' },
];

export const faqs = [
  { q: 'What is UGC content?', a: 'User-generated content (UGC) is authentic, creator-made video content that looks and feels organic — not like a polished ad. It performs better on TikTok, Instagram Reels, and paid social because it blends in with native content.' },
  { q: 'How do you match creators to my brand?', a: 'We review your brand identity, audience, and campaign goals, then select creators from our vetted roster whose style, niche, and audience align with your target market. You approve every creator before they start.' },
  { q: 'What are the usage rights?', a: 'All content includes unlimited usage rights for both paid and organic channels. You own the content forever, across all platforms.' },
  { q: 'How fast can I get my first videos?', a: 'Starter packs deliver in 5-7 business days. Growth packs take 7-10 days for larger batches. Monthly retainers operate on a content calendar with weekly deliveries.' },
  { q: 'Do you work with small brands?', a: 'Yes. Our Starter Video Pack ($499) is designed for brands testing UGC for the first time. No minimum commitment, no long-term contracts.' },
  { q: 'What platforms do your creators cover?', a: 'TikTok, Instagram Reels, and YouTube Shorts. Most creators specialize in one platform, but we have multi-platform creators available.' },
  { q: 'How do you measure performance?', a: 'Every video gets tracked with UTM parameters and custom links. Our analytics dashboard shows CPA, ROAS, CTR, and creative-level performance breakdowns.' },
];

export const marqueeWords = [
  'UGC THAT CONVERTS',
  'CREATOR-LED CONTENT',
  'PERFORMANCE FIRST',
  'AUTHENTIC STORYTELLING',
  'SCALE YOUR BRAND',
  'UGC AFFILIATE AGENCY',
];

/* ─── backward-compatible aliases ─── */
export type Product = Service;
export const products: Service[] = services;
export const getProduct = getService;
export const drops = campaigns;
export const leads = creators;
export const techPack = { colorway: '', fabric: '', gsm: {}, print: '', embroidery: '', wash: '', care: [], madeIn: '', tolerance: '' };
export const sizeGuide = { measurements: [], note: '' };
