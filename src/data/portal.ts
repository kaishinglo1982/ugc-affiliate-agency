// Platform types
export type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'reddit' | 'pinterest' | 'x' | 'linkedin'

export type Niche = 'fitness' | 'gaming' | 'beauty' | 'finance' | 'fashion' | 'health' | 'tech' | 'lifestyle' | 'food' | 'travel'

export type AccountStatus = 'active' | 'paused' | 'suspended' | 'setup' | 'verification_needed'

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

// Portal agent definition
export type PortalAgent = {
  id: string
  platform: Platform
  name: string
  description: string
  capabilities: string[]
  icon: string
  color: string
  status: 'active' | 'beta' | 'planned'
}

// A managed account across platforms
export type ManagedAccount = {
  id: string
  name: string
  platform: Platform
  niche: Niche
  username: string
  followerCount: number
  status: AccountStatus
  riskLevel: RiskLevel
  agentId: string
  dailyPostTarget: number
  todayPosted: number
  revenue: number
  costs: number
  profit: number
  affiliatePrograms: string[]
  performanceScore: number
  lastActive: string
  createdAt: string
}

// A niche with its strategy
export type NicheStrategy = {
  id: string
  niche: Niche
  name: string
  description: string
  targetAudience: string
  contentStyle: string
  postingFrequency: string
  activeAccounts: number
  totalRevenue: number
  topPlatforms: Platform[]
}

export const portalAgents: PortalAgent[] = [
  {
    id: 'agent-fb-001',
    platform: 'facebook',
    name: 'Facebook Agent',
    description: 'Manages Facebook groups, Marketplace listings, and feed content for affiliate link distribution.',
    capabilities: ['Group posting automation', 'Marketplace listing management', 'Feed content scheduling', 'Community engagement tracking'],
    icon: '📘',
    color: '#1877F2',
    status: 'active',
  },
  {
    id: 'agent-ig-001',
    platform: 'instagram',
    name: 'Instagram Agent',
    description: 'Handles Reels, Stories, and carousel posts optimized for swipe-up affiliate conversions.',
    capabilities: ['Reel scheduling & optimization', 'Story link management', 'Carousel content creation', 'DM automation campaigns'],
    icon: '📸',
    color: '#E4405F',
    status: 'active',
  },
  {
    id: 'agent-tt-001',
    platform: 'tiktok',
    name: 'TikTok Agent',
    description: 'Drives viral UGC content and manages TikTok Shop affiliate links with trend-based scheduling.',
    capabilities: ['Trend detection & hook generation', 'TikTok Shop link management', 'Post scheduling & A/B testing', 'Comment engagement automation'],
    icon: '🎵',
    color: '#000000',
    status: 'active',
  },
  {
    id: 'agent-yt-001',
    platform: 'youtube',
    name: 'YouTube Agent',
    description: 'Manages long-form content, Shorts, and description link optimization for evergreen affiliate revenue.',
    capabilities: ['Video SEO & description optimization', 'Shorts scheduling', 'Card & end-screen link management', 'Analytics & CTR tracking'],
    icon: '▶️',
    color: '#FF0000',
    status: 'active',
  },
  {
    id: 'agent-rd-001',
    platform: 'reddit',
    name: 'Reddit Agent',
    description: 'Monitors relevant subreddits and manages organic affiliate placements within community guidelines.',
    capabilities: ['Subreddit monitoring', 'Comment engagement timing', 'Crosspost management', 'Karma & reputation tracking'],
    icon: '🤖',
    color: '#FF4500',
    status: 'beta',
  },
  {
    id: 'agent-pi-001',
    platform: 'pinterest',
    name: 'Pinterest Agent',
    description: 'Creates and schedules Idea Pins with shoppable links for visual search affiliate traffic.',
    capabilities: ['Idea Pin creation & scheduling', 'Board optimization', 'Shoppable link embedding', 'SEO keyword planning'],
    icon: '📌',
    color: '#BD081C',
    status: 'beta',
  },
  {
    id: 'agent-x-001',
    platform: 'x',
    name: 'X Agent',
    description: 'Manages thread-style affiliate content and engagement spikes for real-time conversion.',
    capabilities: ['Thread drafting & scheduling', 'Trend monitoring & hashtag strategy', 'Link-in-bio management', 'Engagement reply automation'],
    icon: '🐦',
    color: '#000000',
    status: 'planned',
  },
  {
    id: 'agent-li-001',
    platform: 'linkedin',
    name: 'LinkedIn Agent',
    description: 'Handles B2B affiliate content, thought leadership posts, and InMail campaign sequences.',
    capabilities: ['Article & post scheduling', 'InMail campaign management', 'Profile optimization for credibility', 'B2B network building'],
    icon: '💼',
    color: '#0A66C2',
    status: 'planned',
  },
]

export const managedAccounts: ManagedAccount[] = [
  {
    id: 'acct-tt-fitness-01',
    name: 'FitnessTok_DE_01',
    platform: 'tiktok',
    niche: 'fitness',
    username: 'fit_with_lisa_d',
    followerCount: 24600,
    status: 'active',
    riskLevel: 'low',
    agentId: 'agent-tt-001',
    dailyPostTarget: 6,
    todayPosted: 4,
    revenue: 184,
    costs: 22,
    profit: 162,
    affiliatePrograms: ['Gymshark', 'MyProtein', 'Alani Nu'],
    performanceScore: 87,
    lastActive: '2026-07-06T08:30:00Z',
    createdAt: '2025-11-03T00:00:00Z',
  },
  {
    id: 'acct-ig-beauty-01',
    platform: 'instagram',
    niche: 'beauty',
    name: 'GlowReels_DE',
    username: 'glowwithemma',
    followerCount: 38500,
    status: 'active',
    riskLevel: 'low',
    agentId: 'agent-ig-001',
    dailyPostTarget: 3,
    todayPosted: 3,
    revenue: 312,
    costs: 45,
    profit: 267,
    affiliatePrograms: ['Sephora', 'Rare Beauty', 'Charlotte Tilbury', 'Sol de Janeiro'],
    performanceScore: 92,
    lastActive: '2026-07-06T10:15:00Z',
    createdAt: '2025-09-12T00:00:00Z',
  },
  {
    id: 'acct-yt-gaming-01',
    platform: 'youtube',
    niche: 'gaming',
    name: 'GameGearReviews',
    username: 'levelup_liam',
    followerCount: 62400,
    status: 'active',
    riskLevel: 'low',
    agentId: 'agent-yt-001',
    dailyPostTarget: 1,
    todayPosted: 0,
    revenue: 578,
    costs: 95,
    profit: 483,
    affiliatePrograms: ['Razer', 'SteelSeries', 'Corsair', 'Logitech G'],
    performanceScore: 78,
    lastActive: '2026-07-06T06:45:00Z',
    createdAt: '2025-07-20T00:00:00Z',
  },
  {
    id: 'acct-tt-fashion-01',
    platform: 'tiktok',
    niche: 'fashion',
    name: 'StreetwearSelects',
    username: 'maya_curates',
    followerCount: 52100,
    status: 'active',
    riskLevel: 'medium',
    agentId: 'agent-tt-001',
    dailyPostTarget: 4,
    todayPosted: 2,
    revenue: 423,
    costs: 68,
    profit: 355,
    affiliatePrograms: ['ASOS', 'Zalando', 'H&M', 'Adidas'],
    performanceScore: 81,
    lastActive: '2026-07-05T19:20:00Z',
    createdAt: '2025-10-15T00:00:00Z',
  },
  {
    id: 'acct-ig-finance-01',
    platform: 'instagram',
    niche: 'finance',
    name: 'SmartMoneyHabits',
    username: 'finwithjake',
    followerCount: 18700,
    status: 'active',
    riskLevel: 'medium',
    agentId: 'agent-ig-001',
    dailyPostTarget: 2,
    todayPosted: 1,
    revenue: 267,
    costs: 31,
    profit: 236,
    affiliatePrograms: ['TradingView', 'Monzo', 'Revolut', 'Investopedia Pro'],
    performanceScore: 73,
    lastActive: '2026-07-06T09:00:00Z',
    createdAt: '2026-01-08T00:00:00Z',
  },
  {
    id: 'acct-fb-lifestyle-01',
    platform: 'facebook',
    niche: 'lifestyle',
    name: 'HomeHackHive',
    username: 'homehacks.with.sarah',
    followerCount: 8900,
    status: 'paused',
    riskLevel: 'low',
    agentId: 'agent-fb-001',
    dailyPostTarget: 3,
    todayPosted: 0,
    revenue: 98,
    costs: 12,
    profit: 86,
    affiliatePrograms: ['Amazon Home', 'Wayfair', 'IKEA'],
    performanceScore: 55,
    lastActive: '2026-07-02T14:00:00Z',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'acct-tt-health-01',
    platform: 'tiktok',
    niche: 'health',
    name: 'WellnessWave',
    username: 'dr.natalie_wellness',
    followerCount: 73400,
    status: 'active',
    riskLevel: 'medium',
    agentId: 'agent-tt-001',
    dailyPostTarget: 5,
    todayPosted: 3,
    revenue: 451,
    costs: 55,
    profit: 396,
    affiliatePrograms: ['AG1', 'Organifi', 'Momentous', 'Whoop'],
    performanceScore: 85,
    lastActive: '2026-07-06T07:30:00Z',
    createdAt: '2025-08-05T00:00:00Z',
  },
  {
    id: 'acct-yt-tech-01',
    platform: 'youtube',
    niche: 'tech',
    name: 'GadgetLabPro',
    username: 'techwithnoah',
    followerCount: 112000,
    status: 'active',
    riskLevel: 'low',
    agentId: 'agent-yt-001',
    dailyPostTarget: 1,
    todayPosted: 1,
    revenue: 892,
    costs: 140,
    profit: 752,
    affiliatePrograms: ['Amazon Tech', 'Best Buy', 'B&H Photo', 'NordVPN'],
    performanceScore: 90,
    lastActive: '2026-07-06T11:00:00Z',
    createdAt: '2025-05-18T00:00:00Z',
  },
  {
    id: 'acct-pi-fashion-01',
    platform: 'pinterest',
    niche: 'fashion',
    name: 'StyleBoardStudio',
    username: 'styleboardstudio',
    followerCount: 14500,
    status: 'setup',
    riskLevel: 'low',
    agentId: 'agent-pi-001',
    dailyPostTarget: 5,
    todayPosted: 0,
    revenue: 0,
    costs: 0,
    profit: 0,
    affiliatePrograms: ['ASOS', 'Revolve', 'NA-KD'],
    performanceScore: 10,
    lastActive: '2026-07-04T16:00:00Z',
    createdAt: '2026-06-28T00:00:00Z',
  },
  {
    id: 'acct-tt-food-01',
    platform: 'tiktok',
    niche: 'food',
    name: 'KitchenGrams',
    username: 'tasteby_talia',
    followerCount: 41300,
    status: 'active',
    riskLevel: 'low',
    agentId: 'agent-tt-001',
    dailyPostTarget: 3,
    todayPosted: 2,
    revenue: 205,
    costs: 38,
    profit: 167,
    affiliatePrograms: ['HelloFresh', 'Ninja Kitchen', 'Gourmia', 'Amazon Pantry'],
    performanceScore: 76,
    lastActive: '2026-07-06T08:00:00Z',
    createdAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'acct-rd-gaming-01',
    platform: 'reddit',
    niche: 'gaming',
    name: 'BuildAPC_Picks',
    username: 'buildapc_picks',
    followerCount: 3200,
    status: 'setup',
    riskLevel: 'high',
    agentId: 'agent-rd-001',
    dailyPostTarget: 2,
    todayPosted: 0,
    revenue: 34,
    costs: 5,
    profit: 29,
    affiliatePrograms: ['Newegg', 'Amazon Tech', 'Micro Center'],
    performanceScore: 25,
    lastActive: '2026-07-03T22:15:00Z',
    createdAt: '2026-06-15T00:00:00Z',
  },
  {
    id: 'acct-ig-travel-01',
    platform: 'instagram',
    niche: 'travel',
    name: 'WanderlinkPicks',
    username: 'wander.with.alex',
    followerCount: 29100,
    status: 'active',
    riskLevel: 'medium',
    agentId: 'agent-ig-001',
    dailyPostTarget: 2,
    todayPosted: 1,
    revenue: 189,
    costs: 27,
    profit: 162,
    affiliatePrograms: ['Tripadvisor', 'Booking.com', 'Airbnb', 'Expedia'],
    performanceScore: 68,
    lastActive: '2026-07-05T17:45:00Z',
    createdAt: '2026-03-10T00:00:00Z',
  },
]

export const nicheStrategies: NicheStrategy[] = [
  {
    id: 'niche-fit-001',
    niche: 'fitness',
    name: 'Fitness & Performance',
    description: 'High-energy UGC showing workouts, before/after transformations, supplement reviews, and equipment unboxings. Strong TikTok and Instagram Reels performance with commission rates of 10-25%.',
    targetAudience: 'Men and women aged 18-45 interested in home workouts, gym culture, and sports nutrition.',
    contentStyle: 'Raw, high-energy, transformation-driven. CapCut-heavy editing with trending audio overlays.',
    postingFrequency: '4-6 videos/day across TikTok and Instagram Reels',
    activeAccounts: 3,
    totalRevenue: 12450,
    topPlatforms: ['tiktok', 'instagram', 'youtube'],
  },
  {
    id: 'niche-game-001',
    niche: 'gaming',
    name: 'Gaming & Esports',
    description: 'Peripheral reviews, setup tours, gameplay clips with affiliate links to gear, chairs, monitors, and software. Steady YouTube revenue supplemented by TikTok discovery.',
    targetAudience: 'Gamers aged 16-35, PC builders, streamers looking to upgrade their setup.',
    contentStyle: 'Polished reviews, setup cinematography, meme-heavy shorts. Detailed descriptions with timestamped links.',
    postingFrequency: '1 long-form YouTube video/week + 3-4 Shorts/TikToks daily',
    activeAccounts: 2,
    totalRevenue: 18750,
    topPlatforms: ['youtube', 'tiktok', 'reddit'],
  },
  {
    id: 'niche-beauty-001',
    niche: 'beauty',
    name: 'Beauty & Skincare',
    description: 'GRWM routines, product first impressions, empties reviews, and shelfie hauls. High conversion on Instagram with strong brand loyalty and repeat commissions.',
    targetAudience: 'Women aged 18-40 interested in skincare routines, makeup tutorials, and clean beauty.',
    contentStyle: 'Aesthetic, well-lit, close-up detail shots. Authentic first impressions and honest reviews build trust.',
    postingFrequency: '2-4 posts/day on Instagram, 3-5 TikToks/day',
    activeAccounts: 2,
    totalRevenue: 22100,
    topPlatforms: ['instagram', 'tiktok', 'pinterest'],
  },
  {
    id: 'niche-fin-001',
    niche: 'finance',
    name: 'Personal Finance & Wealth',
    description: 'Money-saving tips, investing app reviews, credit card comparisons, and side-hustle income reports. High-ticket commissions from fintech and trading platforms.',
    targetAudience: 'Adults aged 22-50 interested in FIRE movement, passive income, and financial independence.',
    contentStyle: 'Educational, data-driven, trustworthy. Carousel posts perform best. Clear disclaimers mandatory.',
    postingFrequency: '1-2 posts/day on Instagram, daily tweets/X threads, weekly YouTube breakdowns',
    activeAccounts: 1,
    totalRevenue: 9800,
    topPlatforms: ['instagram', 'x', 'youtube'],
  },
  {
    id: 'niche-fash-001',
    niche: 'fashion',
    name: 'Fashion & Streetwear',
    description: 'OOTD posts, haul reviews, styling tips, and try-on hauls. Pinterest-driven discovery with Instagram and TikTok for engagement and conversions.',
    targetAudience: 'Fashion-conscious men and women aged 16-35, streetwear enthusiasts, sustainable fashion shoppers.',
    contentStyle: 'Visual-first, trend-aware, outfit-grid carousels. Short-form try-on hauls and styling transformations.',
    postingFrequency: '3-4 posts/day on Instagram, 3-5 TikTok posts, 5-10 Pinterest pins/day',
    activeAccounts: 2,
    totalRevenue: 16200,
    topPlatforms: ['instagram', 'tiktok', 'pinterest'],
  },
  {
    id: 'niche-health-001',
    niche: 'health',
    name: 'Health & Wellness',
    description: 'Supplement reviews, wellness routine vlogs, sleep/habit tracking, and holistic health tips. Doctor-backed credibility drives high conversion on premium products.',
    targetAudience: 'Health-conscious adults aged 25-55 interested in biohacking, supplements, sleep optimization, and mental wellness.',
    contentStyle: 'Educational, calming, expert-driven. Mix of talking-head reviews and lifestyle integration content.',
    postingFrequency: '3-5 TikToks/day, 2-3 Instagram posts, 1 YouTube video/week',
    activeAccounts: 2,
    totalRevenue: 14300,
    topPlatforms: ['tiktok', 'instagram', 'youtube'],
  },
]
