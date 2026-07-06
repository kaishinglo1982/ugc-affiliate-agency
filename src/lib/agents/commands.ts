export interface AgentCommand {
  name: string;
  agent: string;
  command: string;
  description: string;
  context: string;
}

export const agentCommands: Record<string, AgentCommand> = {
  /* CONTENT AGENTS */
  BrandDNAAgent: {
    name: 'BrandDNA',
    agent: 'BrandDNAAgent',
    command: 'Define Who Knows brand DNA: Mystery, luxury streetwear (18-35 urban audience), oversize silhouettes, vintage-washed black aesthetic, drop culture, cracked bone-tan prints. Core values: exclusivity, unpredictability, quality craftsmanship. Tone: cryptic, confident, aspirational.',
    description: 'Define core brand identity & values',
    context: 'Brand identity for Who Knows',
  },
  TrendRadarAgent: {
    name: 'TrendRadar',
    agent: 'TrendRadarAgent',
    command: 'Monitor luxury streetwear trends (Q3 2026): oversized fits dominating, vintage/distressed details trending, mystery drop model gaining traction (Fear of God, Yeezy model), TikTok Gen-Z driving demand, sustainable materials gaining interest. Identify Who Knows positioning opportunities vs. competitors.',
    description: 'Track market trends & competitive landscape',
    context: 'Streetwear market intelligence',
  },
  ContentIdeaAgent: {
    name: 'ContentIdea',
    agent: 'ContentIdeaAgent',
    command: 'Generate UGC content ideas for Who Knows targeting 18-35 urban audience (60% TikTok, 35% Instagram): "Unboxing the unknown" (mystery drop videos), "Fit checks in the dark" (moody aesthetic), "Behind the drop" (exclusivity/scarcity angle), "Who are you?" (brand mystery narrative). Focus on authentic streetwear culture, early-adopter energy.',
    description: 'Generate viral content angles',
    context: 'Who Knows content strategy',
  },
  ScriptAgent: {
    name: 'Script',
    agent: 'ScriptAgent',
    command: 'Write 15-30s TikTok scripts for Who Knows drops: Hook with mystery (\"Nobody knows what\'s next\"), showcase vintage-black aesthetic, highlight limited scarcity (\"Only 100 per size\"), call-to-action (\"Join the waitlist\"). Use Gen-Z slang, cryptic tone, fast cuts. 3 variations: hype, luxury, mystery angles.',
    description: 'Create short-form video scripts',
    context: 'TikTok/Shorts content',
  },
  VideoPromptAgent: {
    name: 'VideoPrompt',
    agent: 'VideoPromptAgent',
    command: 'Generate Gemini image/video prompts for Who Knows campaign: Dark moody aesthetic, vintage-washed black oversized garments, bone-tan distressed prints, film grain, cinematic lighting, mysterious model (often faceless), urban industrial settings, luxury-streetwear energy. Avoid bright colors, focus on mood & exclusivity.',
    description: 'Generate visual production briefs',
    context: 'Video production',
  },

  /* SHOP AGENTS */
  LandingPageAgent: {
    name: 'LandingPage',
    agent: 'LandingPageAgent',
    command: 'Optimize Who Knows landing page for waitlist conversion: Hero section: large AV monogram, "WHO KNOWS / OVERSIZE / EST 2024" tagline, drop countdown, "Join the Drop" CTA. Product carousel: 5 pieces with prices (€69-129). Social proof: "1,200+ on waitlist". Trust signals: "100% Cotton, Pre-washed, Cracked Prints". Mobile-first, 60% CTR target.',
    description: 'Optimize landing page conversion',
    context: 'Landing page strategy',
  },
  ProductPageAgent: {
    name: 'ProductPage',
    agent: 'ProductPageAgent',
    command: 'Build product page for Unknown Oversized Hoodie (€129): Hero: large product image, "Heavyweight vintage-washed French terry" spec line. Tabs: Details (specs, fabric, GSM), Size Guide (XS-5XL CM measurements), Care Instructions. Social proof: "Sold out in 48h on Drop 001". Size selector with live inventory. Upsell: matching sweatpants. Scarcity messaging: limited stock.',
    description: 'Optimize product detail pages',
    context: 'Product merchandising',
  },
  ShopCatalogAgent: {
    name: 'ShopCatalog',
    agent: 'ShopCatalogAgent',
    command: 'Organize Who Knows catalog: 5-piece core line (Hoodies €129, Tees €79, Sweatpants €109, Crewneck €99, Shorts €69). All Vintage Black, 100% Cotton/French Terry, sizes XS-5XL. Filter by category, price. Featured: "New Drop 002", "Best Sellers". Average order value target: €180+. Bundle incentive: Buy 3 items, free shipping.',
    description: 'Organize product catalog & categories',
    context: 'Inventory management',
  },
  PricingAgent: {
    name: 'Pricing',
    agent: 'PricingAgent',
    command: 'Set Who Knows pricing strategy: Hoodies €129, Sweatpants €109, Crewneck €99, Tees €79, Shorts €69. Justify via: 100% premium cotton/French terry (€8-12/kg material cost), vintage wash process, cracked screen printing (€3-5 per unit), oversize fit (15-20% more fabric), limited production (€2-3 premium). Target margin: 60-65%. Competitor positioning: Fear of God (€140-180), Yeezy (€120-160).',
    description: 'Optimize pricing & margins',
    context: 'Pricing strategy',
  },
  UpsellAgent: {
    name: 'Upsell',
    agent: 'UpsellAgent',
    command: 'Create Who Knows upsell flows: Cart value <€150 → "Complete the Fit" (suggest matching bottoms/tops, free shipping at €150). After hoodie add → sweatpants/shorts (62% bundle rate). Post-checkout → newsletter signup (5% discount on next drop). Loyalty: €500 spent = early access to Drop 003. Lifetime value target: €450+ per customer.',
    description: 'Drive average order value',
    context: 'Checkout optimization',
  },
  CheckoutOptimizationAgent: {
    name: 'CheckoutOpt',
    agent: 'CheckoutOptimizationAgent',
    command: 'Optimize Who Knows checkout: 1-page Stripe flow, minimal friction. Show free shipping threshold (€12 at €150+). Trust badges: "100% Cotton", "Pre-washed", "Ships within 48h". Offer: "Newsletter signup = 5% off next drop". Order summary highlights limited inventory ("Only 3 Hoodies left in M"). Expect 3.2% checkout conversion, 98% payment success.',
    description: 'Reduce cart abandonment',
    context: 'Checkout funnel',
  },
  InventoryAgent: {
    name: 'Inventory',
    agent: 'InventoryAgent',
    command: 'Manage Who Knows inventory: Drop 001 allocations (100 units per size = 900 total per product × 5 = 4,500 SKUs). Track real-time depletion. Sizes M-L historically 60% faster sell-through. Restock strategy: if <30 units left in top 3 sizes, trigger waitlist email "Nearly sold out". End-of-line discount (20% off) on remaining stock after 14 days.',
    description: 'Manage stock & allocations',
    context: 'Supply chain',
  },
  DropLaunchAgent: {
    name: 'DropLaunch',
    agent: 'DropLaunchAgent',
    command: 'Plan Who Knows Drop 002: Launch date Q4 2026. New SKUs: Bomber jacket (€159), Track pants (€119), Vintage tee (€89). Pre-launch: 7-day teaser on TikTok (cryptic monogram clips), waitlist-only access (24h head start), influencer seeding to 50K+ followers. Launch: midnight drop, 30-min scarcity window messaging, Instagram Story countdown. Expected sell-through: 60% in first 48h.',
    description: 'Orchestrate limited drops',
    context: 'Drop campaigns',
  },

  /* GROWTH AGENTS */
  SEOAgent: {
    name: 'SEO',
    agent: 'SEOAgent',
    command: 'Build Who Knows SEO strategy: Target keywords "luxury streetwear mystery brand", "vintage black hoodies", "oversized fashion drops". Meta: Title "Who Knows | Exclusive Dark Streetwear Drops", Desc "Limited edition oversized pieces, 100% cotton. Join 1,200+ on the waitlist." Image alt text: "Unknown Oversized Hoodie in Vintage Black, Cracked Bone-tan Print". Expect 12K monthly organic by Q1 2027.',
    description: 'Optimize search rankings',
    context: 'SEO strategy',
  },
  CRMLeadAgent: {
    name: 'CRMLead',
    agent: 'CRMLeadAgent',
    command: 'Segment Who Knows leads: 1. Waitlist (1,200) → nurture with drop teasers, exclusive previews, 15% discount on first purchase. 2. Past buyers (45) → VIP early access, loyalty track (€500 = early drop preview). 3. Newsletter (3,500) → weekly trend posts, 5% discount codes, user-generated content features. Lead score: engagement + purchase history. Target: 25% waitlist → customer conversion in Q4.',
    description: 'Nurture leads & segments',
    context: 'CRM & loyalty',
  },
  EmailFlowAgent: {
    name: 'EmailFlow',
    agent: 'EmailFlowAgent',
    command: 'Design Who Knows email flows: Welcome (Day 0): "Welcome to the mystery" + 5% discount. Pre-drop (Day -2): "Something is coming..." teaser + 48h countdown. Drop day: "Drop is live, only 100 per size" + direct link. Post-purchase: "Thank you" + care guide + next drop preview. Re-engagement (Day 30): "What\'s next?" + new product showcase. Target open rate: 28%, click rate: 4.2%.',
    description: 'Automate email campaigns',
    context: 'Email marketing',
  },
  WhatsAppSalesAgent: {
    name: 'WhatsAppSales',
    agent: 'WhatsAppSalesAgent',
    command: 'Launch Who Knows WhatsApp sales: Opt-in via waitlist form (Telegram/WhatsApp choice). Day 1: "Welcome, exclusive deals incoming". Pre-drop: 12h countdown videos (TikTok clips), size availability real-time. Post-purchase: order tracking, care tips, referral incentive ("Invite 2 friends, get 10% off"). Target: 8% waitlist → WhatsApp conversion, 18% click-through on product links.',
    description: 'Drive sales via WhatsApp',
    context: 'Direct messaging',
  },
  ReviewAgent: {
    name: 'Review',
    agent: 'ReviewAgent',
    command: 'Build Who Knows review strategy: Post-purchase (Day 3): email requesting review + product image. Highlight: "Material quality", "Sizing accuracy", "Shipping speed". Feature 5-star reviews on product page + Instagram Stories. Incentive: verified purchase review = entry to monthly €50 store credit raffle. Target: 35% review rate, 4.7+ star rating. User-generated content reposting (with permission) on brand account.',
    description: 'Generate social proof',
    context: 'Reviews & UGC',
  },
  ConversionAgent: {
    name: 'Conversion',
    agent: 'ConversionAgent',
    command: 'Optimize Who Knows conversion funnel: Landing page → 18% signup rate, email capture €5 discount incentive. Product page → 12% add-to-cart rate, size guide reduces returns (-40%). Checkout → 3.2% order rate, "Only 3 left" scarcity messaging. Email → 4.2% click-through to product. Overall: 0.8% visitor → customer. Test: 50% "Join Drop" vs. "Shop Now" buttons on hero.',
    description: 'Optimize conversion rates',
    context: 'Growth metrics',
  },
  AnalyticsAgent: {
    name: 'Analytics',
    agent: 'AnalyticsAgent',
    command: 'Track Who Knows analytics: Weekly KPIs: 8K landing page views, 18% signup, 45 conversions (€7.2K revenue). Channels: TikTok 60% traffic (€2.1K), Instagram 25% (€1.8K), Direct 15% (€1.3K). Device: 78% mobile (optimize mobile UX). Cohort: November signup → 22% repeat purchase. Churn: <3% monthly. Monthly targets: 35K views, 150 conversions, €24K revenue.',
    description: 'Monitor KPIs & health',
    context: 'Performance tracking',
  },

  /* STRATEGIC INTELLIGENCE AGENTS */
  TargetAudienceAgent: {
    name: 'TargetAudience',
    agent: 'TargetAudienceAgent',
    command: 'Analyze Who Knows target audience: Primary (70%): 18-27, urban (London, Berlin, Paris, NYC, LA), High disposable income (€500+/month), Gen-Z early adopters. Psychographics: Mystery lovers, trend-setters, anti-mainstream, value exclusivity & scarcity, authentic streetwear culture, TikTok natives (6h/day). Pain points: Oversaturated fast fashion, lack of exclusivity. Motivation: Status, belonging, authenticity. Media: TikTok 60%, Instagram 35%, Discord communities 5%.',
    description: 'Deep audience analysis',
    context: 'Market research',
  },
  MarketAnalysisAgent: {
    name: 'MarketAnalysis',
    agent: 'MarketAnalysisAgent',
    command: 'Analyze luxury streetwear market for Who Knows: TAM: €2.8B globally (2026). Direct competitors: Fear of God (€2B+ annual), Yeezy (€1.5B), Stüssy (€400M), Awake NY (€120M). Market growth: 28% YoY. DTC drops model: 35% of luxury streetwear sales (growing from 22% in 2023). Who Knows positioning: Niche player, €3-5M Year 1 potential (0.1% share). Opportunity: Community-driven drops, stronger TikTok presence than competitors.',
    description: 'Market sizing & competition',
    context: 'Strategic planning',
  },

  /* SOCIAL MEDIA AGENTS */
  YouTubeAgent: {
    name: 'YouTube',
    agent: 'YouTubeAgent',
    command: 'Build Who Knows YouTube strategy: Long-form (8-12min): "Making The Mystery" series (production process, fabric sourcing, why oversized?), "Behind the Drop" (design philosophy, artist interviews), "Customer Stories" (how fans style pieces). Shorts (15-60s): TikTok repurposing (unboxings, fit-checks, styling tips), Product showcase reels. Playlists: "The Unknown" (brand story archive), "Making The Mystery" (production 101). SEO: Keywords "luxury streetwear", "oversized fashion", "mystery drops". Target: 50K subs Year 1, 1.2M total views.',
    description: 'YouTube channel strategy',
    context: 'Long-form video content',
  },
  InstagramAgent: {
    name: 'Instagram',
    agent: 'InstagramAgent',
    command: 'Execute Who Knows Instagram strategy: Feed (1-2x weekly): Moody product flat-lays (vintage lighting, cracked prints detail shots), Customer features (tagged UGC), Editorial brand moments. Captions: Cryptic, 2-3 lines max ("Nobody knows what\'s next" style), 18-35 Gen-Z voice. Stories (daily): Drop countdowns (80K+ reach), polls ("What color next?"), Behind-scenes stitches, Swipe-up links to shop. Reels (3x/week): Trending audio, 15-30s styling tips, Influencer collabs, Drop reveals. Target: 50K followers by EOY, 8% engagement rate, 12% link-click rate.',
    description: 'Instagram content strategy',
    context: 'Social media growth',
  },
  FacebookAgent: {
    name: 'Facebook',
    agent: 'FacebookAgent',
    command: 'Launch Who Knows Facebook strategy: Community Group: 500+ members, drop announcements, customer Q&A, styling tips, exclusive group-only sales (10% discount). Paid campaigns: Carousel ads (5-piece product range €69-129), Video ads (60s "Making The Mystery" clips), Lookalike audiences (1% LLA targeting high-value customers). Retargeting: Cart abandoners (10% discount incentive), Email subscribers (early access 24h), Website visitors (new drop announcements). Analytics targets: 8% engagement rate, 3%+ CTR, 4:1 ROAS minimum. Lifespan: 14-day campaigns.',
    description: 'Facebook community & ads',
    context: 'Paid social media',
  },
  TikTokAgent: {
    name: 'TikTok',
    agent: 'TikTokAgent',
    command: 'Dominate Who Knows TikTok (60% of audience): Content pillars: 1) "Unboxing The Unknown" (mystery drop unboxing videos), 2) "Fit Checks in The Dark" (styling oversize pieces, dark moody aesthetic), 3) "Manufacturing Mysteries" (behind-scenes production 15-30s clips), 4) "POV: You\'re on the waitlist" (trend-jacking, limited scarcity angle). Upload 3x daily (6AM, 12PM, 8PM peak times). Influencer collab: Partner with 10k-100k creators (aesthetic match = dark/moody/streetwear), seeded drops, 15% affiliate code ("whoknows15"). Hashtag strategy: #WhoKnowsMystery #OverSizeLife #MysteryDrop #LuxuryStreetwear. Target: 2M views/month by Q1 2027, 500K followers.',
    description: 'TikTok viral growth strategy',
    context: 'Short-form video & influencers',
  },
};

export function getAgentCommand(agentName: string): AgentCommand | undefined {
  return agentCommands[agentName];
}
