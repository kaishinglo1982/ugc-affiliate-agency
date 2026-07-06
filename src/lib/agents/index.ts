export type AgentResult = {
  agent: string;
  category: 'Content' | 'Shop' | 'Growth' | 'Social Media' | 'Ops';
  output: string[];
  nextActions: string[];
};

/* ---------- Content / Video Center agents ---------- */

export function BrandDNAAgent(): AgentResult {
  return { agent: 'BrandDNAAgent', category: 'Content', output: ['Mystery luxury streetwear', 'Dark visuals', 'Short confident copy'], nextActions: ['Generate drop story', 'Validate creative consistency'] };
}

export function TrendRadarAgent(): AgentResult {
  return { agent: 'TrendRadarAgent', category: 'Content', output: ['Fit-check hooks', 'Flashlight closeups', 'Countdown waitlists'], nextActions: ['Create 10 video ideas', 'Score formats'] };
}

export function ContentIdeaAgent(format = 'Mystery Drop'): AgentResult {
  return { agent: 'ContentIdeaAgent', category: 'Content', output: [`Format: ${format}`, 'Hook: Nobody knows this brand yet.', 'CTA: Join the drop before it opens.'], nextActions: ['Write script', 'Create shotlist'] };
}

export function ScriptAgent(): AgentResult {
  return { agent: 'ScriptAgent', category: 'Content', output: ['0-2s: Logo closeup', '2-6s: Oversize fit reveal', '6-10s: Drop countdown', '10-12s: Join waitlist'], nextActions: ['Generate voiceover', 'Generate subtitle pack'] };
}

export function VideoPromptAgent(): AgentResult {
  return { agent: 'VideoPromptAgent', category: 'Content', output: ['vertical 9:16, dark studio, luxury streetwear hoodie, flashlight, slow motion, grain, high contrast'], nextActions: ['Send to video provider', 'Create captions'] };
}

/* ---------- Shop agents ---------- */

export function LandingPageAgent(): AgentResult {
  return { agent: 'LandingPageAgent', category: 'Shop', output: ['Hero + claim + CTA', 'Drop / highlights / social proof', 'Countdown + waitlist blocks'], nextActions: ['Assemble drop landing page', 'A/B test hero claim'] };
}

export function ProductPageAgent(): AgentResult {
  return { agent: 'ProductPageAgent', category: 'Shop', output: ['Auto product copy', 'Fit + size guidance', 'Gallery + variant layout'], nextActions: ['Generate detail pages', 'Sync imagery'] };
}

export function ShopCatalogAgent(): AgentResult {
  return { agent: 'ShopCatalogAgent', category: 'Shop', output: ['Category grouping', 'Collection ordering', 'Sold-out surfacing'], nextActions: ['Rebuild catalog', 'Feature live drop'] };
}

export function PricingAgent(): AgentResult {
  return { agent: 'PricingAgent', category: 'Shop', output: ['Anchor vs sale price', 'Bundle logic', 'Drop-scarcity pricing'], nextActions: ['Propose bundles', 'Set drop tiers'] };
}

export function UpsellAgent(): AgentResult {
  return { agent: 'UpsellAgent', category: 'Shop', output: ['Cart cross-sells', 'Complete-the-fit bundles', 'Threshold for free shipping'], nextActions: ['Attach cart offers', 'Score attach rate'] };
}

export function CheckoutOptimizationAgent(): AgentResult {
  return { agent: 'CheckoutOptimizationAgent', category: 'Shop', output: ['Express checkout', 'Trust + returns copy', 'One-tap wallet ready'], nextActions: ['Reduce steps', 'Prep Stripe / Shopify'] };
}

export function InventoryAgent(): AgentResult {
  return { agent: 'InventoryAgent', category: 'Shop', output: ['Variant stock watch', 'Low-stock alerts', 'Size curve balancing'], nextActions: ['Flag low stock', 'Recommend restock'] };
}

export function DropLaunchAgent(): AgentResult {
  return { agent: 'DropLaunchAgent', category: 'Shop', output: ['Countdown scheduling', 'Early-access windows', 'Waitlist gating'], nextActions: ['Schedule Drop 002', 'Open early access'] };
}

/* ---------- Growth agents ---------- */

export function SEOAgent(): AgentResult {
  return { agent: 'SEOAgent', category: 'Growth', output: ['Meta titles + descriptions', 'Keyword mapping', 'Structured data'], nextActions: ['Optimise product pages', 'Generate sitemap copy'] };
}

export function CRMLeadAgent(): AgentResult {
  return { agent: 'CRMLeadAgent', category: 'Growth', output: ['Lead capture + scoring', 'Waitlist segmentation', 'Abandoned-cart recovery'], nextActions: ['Score leads', 'Trigger recovery flow'] };
}

export function EmailFlowAgent(): AgentResult {
  return { agent: 'EmailFlowAgent', category: 'Growth', output: ['Welcome flow', 'Drop announcements', 'Abandoned cart series'], nextActions: ['Ship welcome flow', 'Schedule drop blast'] };
}

export function WhatsAppSalesAgent(): AgentResult {
  return { agent: 'WhatsAppSalesAgent', category: 'Growth', output: ['Drop reminders', 'Customer Q&A', 'VIP early access'], nextActions: ['Send drop reminder', 'Answer sizing questions'] };
}

export function ReviewAgent(): AgentResult {
  return { agent: 'ReviewAgent', category: 'Growth', output: ['Collect post-purchase reviews', 'Surface top reviews', 'Flag issues'], nextActions: ['Request reviews', 'Publish social proof'] };
}

export function ConversionAgent(): AgentResult {
  return { agent: 'ConversionAgent', category: 'Growth', output: ['A/B test hero + CTA', 'Funnel drop-off analysis', 'ROAS tracking'], nextActions: ['Launch A/B test', 'Report on winners'] };
}

export function AnalyticsAgent(): AgentResult {
  return { agent: 'AnalyticsAgent', category: 'Growth', output: ['Track hook retention', 'Track CTR', 'Track waitlist conversion'], nextActions: ['A/B test first 3 seconds', 'Repurpose winning creative'] };
}

/* ---------- Strategic Intelligence agents ---------- */

export function TargetAudienceAgent(): AgentResult {
  return { agent: 'TargetAudienceAgent', category: 'Growth', output: ['Primary: 18-35, Urban, High-disposable income', 'Psychographic: Mystery-seekers, Trend-early adopters', 'Engagement: 60%+ via TikTok, 35% Instagram'], nextActions: ['Segment audience by behavior', 'Tailor messaging per segment'] };
}

export function MarketAnalysisAgent(): AgentResult {
  return { agent: 'MarketAnalysisAgent', category: 'Growth', output: ['Luxury streetwear market: €2.8B globally', 'Direct competitors: Fear of God, Yeezy, Stüssy', 'Market trend: DTC drop model growing 28% YoY'], nextActions: ['Monitor competitor pricing', 'Forecast Who Knows share'] };
}

/* ---------- Social Media agents ---------- */

export function YouTubeAgent(): AgentResult {
  return { agent: 'YouTubeAgent', category: 'Social Media', output: ['Long-form (8-12min): Behind-the-design, Drop process, Manufacturing', 'Shorts (15-60s): Product showcase, Customer unboxings, Lifestyle snippets', 'Playlist strategy: "The Unknown" (brand story), "Making The Mystery" (production)', 'SEO tags: luxury streetwear, oversize fashion, mystery brand, vintage black'], nextActions: ['Upload weekly shorts', 'Plan quarterly documentaries'] };
}

export function InstagramAgent(): AgentResult {
  return { agent: 'InstagramAgent', category: 'Social Media', output: ['Feed strategy: 1-2x weekly editorial, product flat-lays, customer features', 'Captions: Mysterious, minimal text ("Nobody knows..." style), 18-35 voice', 'Stories (daily): Drop countdowns, Behind-scenes, Polls (what\'s next?), Swipe-up links', 'Reels (3x/week): 15-30s trending audio, styling tips, UGC features, drop reveals'], nextActions: ['Create weekly content calendar', 'Engage top 1% followers'] };
}

export function FacebookAgent(): AgentResult {
  return { agent: 'FacebookAgent', category: 'Social Media', output: ['Community group: 500+ members, drop announcements, customer stories, Q&A', 'Paid campaigns: Carousel ads (product range), Video ads (60s brand films), Lookalike audiences', 'Retargeting: Cart abandoners (10% off), Email subscribers (early access), Website visitors (new drops)', 'Analytics focus: Engagement rate >8%, CTR >3%, ROAS >4:1 target'], nextActions: ['Launch community group', 'Set up retargeting campaigns'] };
}

export function TikTokAgent(): AgentResult {
  return { agent: 'TikTokAgent', category: 'Social Media', output: ['Primary platform for 18-35: 60% of audience organic reach', 'Content pillars: Unboxing (show mystery), Styling (how to wear oversize), Behind-scenes (manufacturing)', 'Trending hooks: "POV: You\'re on the waitlist", "Drop day countdown", "Nobody knows but..." trend jacking', 'Influencer collab: Partner with 10k-100k creators (aesthetic match), seeded drops, affiliate code (15%)'], nextActions: ['Upload 3x daily', 'Partner with TikTok creators'] };
}

export const contentAgents = [BrandDNAAgent, TrendRadarAgent, ContentIdeaAgent, ScriptAgent, VideoPromptAgent];
export const shopAgents = [LandingPageAgent, ProductPageAgent, ShopCatalogAgent, PricingAgent, UpsellAgent, CheckoutOptimizationAgent, InventoryAgent, DropLaunchAgent];
export const growthAgents = [SEOAgent, CRMLeadAgent, EmailFlowAgent, WhatsAppSalesAgent, ReviewAgent, ConversionAgent, AnalyticsAgent, TargetAudienceAgent, MarketAnalysisAgent];
export const socialMediaAgents = [YouTubeAgent, InstagramAgent, FacebookAgent, TikTokAgent];
export const strategicAgents = [TargetAudienceAgent, MarketAnalysisAgent];

export const allAgents: AgentResult[] = [...contentAgents, ...shopAgents, ...growthAgents, ...socialMediaAgents].map((fn) => fn());
