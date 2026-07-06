export type KnowledgeEntry = {
  id?: number
  title: string
  slug: string
  content: string
  summary?: string
  category: string
  tags: string[]
  source?: string
  confidence_level: 'high' | 'medium' | 'low'
  verified: boolean
  status: 'draft' | 'published' | 'archived'
  created_at?: string
  updated_at?: string
  access_count?: number
}

export type KnowledgeCategory = 
  | 'Brand'
  | 'Product'
  | 'Marketing'
  | 'Sales'
  | 'Operations'
  | 'Design'
  | 'Analytics'
  | 'Agent'
  | 'Strategy'
  | 'Process'

export const defaultCategories: KnowledgeCategory[] = [
  'Brand',
  'Product',
  'Marketing',
  'Sales',
  'Operations',
  'Design',
  'Analytics',
  'Agent',
  'Strategy',
  'Process',
]

// Mock knowledge base for demo
export const mockKnowledge: KnowledgeEntry[] = [
  {
    id: 1,
    title: 'Who Knows Brand DNA',
    slug: 'who-knows-brand-dna',
    content: `Who Knows is a dark luxury streetwear brand defined by mystery and craftsmanship. 
    
Core Identity:
- Mystery aesthetic with vintage-washed black garments
- Oversized silhouettes with precision tailoring details
- Limited drops model creating exclusivity
- Community-driven through UGC and authentic storytelling

Target Audience: 18-35 urban early-adopters, TikTok-native, seeking authentic brands with narrative depth.

Brand Values:
1. Mystery - Intrigue through limited information
2. Craftsmanship - Quality materials (450-500gsm cotton)
3. Community - Built on authentic user-generated content
4. Exclusivity - Limited drops, numbered collections`,
    summary: 'Core brand identity and DNA of Who Knows',
    category: 'Brand',
    tags: ['identity', 'core-values', 'positioning'],
    source: 'Brand Guidelines v2.0',
    confidence_level: 'high',
    verified: true,
    status: 'published',
    access_count: 24,
  },
  {
    id: 2,
    title: 'Product Lineup Strategy',
    slug: 'product-lineup-strategy',
    content: `Who Knows operates a 5-6 piece core collection refreshed quarterly with limited drops.

Q2 2026 Core Lineup:
- Oversized Hoodies: €129 (primary revenue driver, 450-500gsm)
- Crewneck Sweatshirts: €109 (versatile, secondary tier)
- Wordmark Tees: €79 (entry point, 260-300gsm)
- Oversize Shorts: €69 (seasonal)
- Utility Cargo Pants: €119 (new, high-margin)

Q3 2026 Limited Drop:
- Biker Jackets: €189 (premium, 680gsm canvas)
- Mini Skirts: €89 (women's expansion)
- Bodysuit: €79 (fitted silhouette)

Accessories Strategy:
- Bucket Hats: €49 (brand integration)
- Canvas Tote Bags: €79 (lifestyle)`,
    summary: 'Complete product lineup with pricing and strategy',
    category: 'Product',
    tags: ['pricing', 'collections', 'drops', 'strategy'],
    confidence_level: 'high',
    verified: true,
    status: 'published',
    access_count: 18,
  },
  {
    id: 3,
    title: 'TikTok Growth Strategy',
    slug: 'tiktok-growth-strategy',
    content: `TikTok is the primary channel for Who Knows, representing 60% of organic reach.

Content Pillars:
1. Unboxing The Unknown (mystery appeal)
   - 15-30s unboxing videos with ASMR elements
   - Show cracked print details and vintage wash
   - 3x weekly uploads

2. Fit Checks in The Dark (styling)
   - How to style oversized pieces
   - Layering techniques
   - Dark moody aesthetic consistency
   - 2x weekly

3. Manufacturing Mysteries (transparency)
   - Behind-scenes production footage
   - Fabric sourcing stories
   - Craftmanship showcase
   - 1x weekly

4. Trend Jacking (viral moments)
   - "POV: You're on the waitlist"
   - "Nobody knows but..." format
   - Scarcity-driven FOMO
   - Real-time trends

Target Metrics:
- 3M total uploads by Q1 2027
- 500K followers (from 2K baseline)
- 8-12% engagement rate
- 2M+ views per month`,
    summary: 'TikTok content strategy and metrics',
    category: 'Marketing',
    tags: ['tiktok', 'content', 'social-media', 'growth'],
    confidence_level: 'high',
    verified: true,
    status: 'published',
    access_count: 32,
  },
  {
    id: 4,
    title: 'Agent System Architecture',
    slug: 'agent-system-architecture',
    content: `Who Knows operates 26 specialized AI agents across 4 categories:

CONTENT AGENTS (5):
- BrandDNA: Maintains brand consistency
- TrendRadar: Monitors market trends
- ContentIdea: Generates UGC concepts
- Script: Creates video scripts
- VideoPrompt: Generates image/video prompts

SHOP AGENTS (8):
- LandingPage: Hero messaging and CTAs
- ProductPage: Product detail optimization
- ShopCatalog: Collection management
- Pricing: Dynamic pricing strategy
- Upsell: Cart value optimization
- CheckoutOpt: Conversion funnel
- Inventory: Stock management
- DropLaunch: Limited release planning

GROWTH AGENTS (9):
- SEO: Organic search optimization
- CRMLead: Waitlist → Customer nurture
- EmailFlow: Automated campaigns
- WhatsAppSales: Direct messaging
- Review: Social proof strategy
- Conversion: Funnel optimization
- Analytics: KPI tracking
- TargetAudience: Demographic analysis
- MarketAnalysis: Competitive intelligence

SOCIAL MEDIA AGENTS (4):
- YouTube: Long-form + Shorts strategy
- Instagram: Feed, Stories, Reels
- Facebook: Community + paid ads
- TikTok: Viral content strategy

Each agent has pre-configured prompts tailored to Who Knows brand and 18-35 urban target audience.`,
    summary: 'Complete agent system architecture and roles',
    category: 'Agent',
    tags: ['agents', 'automation', 'systems', 'architecture'],
    confidence_level: 'high',
    verified: true,
    status: 'published',
    access_count: 28,
  },
  {
    id: 5,
    title: 'Q2 2026 Financial Targets',
    slug: 'q2-2026-financial-targets',
    content: `Q2 2026 Revenue Projections: €200,000

Breakdown:
- Core lineup sales: €140,000 (70%)
  - Hoodies: €70,000 (50% margin)
  - Tees: €35,000 (60% margin)
  - Sweatshirts: €25,000 (50% margin)
  - Bottoms: €10,000 (45% margin)

- Limited drop sales: €40,000 (20%)
  - Biker Jackets (Q3 pre-orders): €30,000
  - Early accessories: €10,000

- Marketplace/Resale: €20,000 (10%)

Cost Structure:
- COGS: 35% (€70,000)
- Fulfillment: 15% (€30,000)
- Marketing: 20% (€40,000)
- Operations: 15% (€30,000)
- Profit Margin: 15% (€30,000)

Key Drivers:
- 5,128 waitlist (15% conversion target = 769 orders)
- AOV target: €150 (increased from €125 via upsell)
- Repeat purchase rate: 22% (secondary revenue)`,
    summary: 'Financial targets and revenue projections for Q2 2026',
    category: 'Strategy',
    tags: ['financial', 'revenue', 'targets', 'metrics'],
    confidence_level: 'medium',
    verified: false,
    status: 'published',
    access_count: 12,
  },
]
