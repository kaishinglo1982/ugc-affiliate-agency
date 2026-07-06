/**
 * Highfield UGC & Account Management Commands
 * Enables all 26 agents to autonomously create accounts and manage UGC campaigns
 */

export interface HighfieldAgentCommand {
  agentName: string;
  highfieldRole: string;
  accountCreation: string;
  ugcStrategy: string;
  contentPillars: string[];
  hashtagStrategy: string;
  targetMetrics: {
    followers: number;
    monthlyEngagement: number;
    ugcContentPerMonth: number;
  };
}

export const highfieldCommands: Record<string, HighfieldAgentCommand> = {
  /* SOCIAL MEDIA AGENTS - PRIMARY HIGHFIELD ROLES */
  TikTokAgent: {
    agentName: 'TikTokAgent',
    highfieldRole: 'UGC Creator & Influencer Coordinator',
    accountCreation: 'Create 3 autonomous TikTok accounts for Who Knows: (1) @whoknows_official (brand account), (2) @whoknows_unboxing (UGC focus), (3) @whoknows_insiders (community leaks). Each with unique aesthetic but cohesive brand identity. Highfield role: Manage influencer seeding (10k-100k creators), coordinate affiliate drops (15% commission code "whoknows15").',
    ugcStrategy: 'Post 3x daily content: Morning (6AM): Mystery teasers, Noon (12PM): Unboxing/fit-checks, Evening (8PM): Behind-scenes/manufacturing. Leverage trending audio, community polls (Highfield engagement tracking). Focus: authentic customer styling, before/after transformations, community stories.',
    contentPillars: [
      '"Unboxing The Unknown" - Unpack mystery drops, show cracked prints detail',
      '"Fit Check In The Dark" - How to style oversize pieces, dark moody aesthetic',
      '"Manufacturing Mysteries" - Behind-scenes production, fabric sourcing',
      '"POV: You\'re on the waitlist" - Trend-jacking, scarcity narrative',
      '"Community Stories" - Repost customer UGC, feature loyal customers',
    ],
    hashtagStrategy: '#WhoKnowsMystery #OverSizeLife #MysteryDrop #LuxuryStreetwear #VintageWashed #UnboxingTheUnknown #GiveawayFit #HypeBeast #StreetStyle #TrendCheck (rotate based on Highfield trending analysis)',
    targetMetrics: {
      followers: 500000,
      monthlyEngagement: 2000000,
      ugcContentPerMonth: 90,
    },
  },

  InstagramAgent: {
    agentName: 'InstagramAgent',
    highfieldRole: 'Community Manager & UGC Curator',
    accountCreation: 'Create 2 Instagram accounts: (1) @who.knows (main grid aesthetic), (2) @whoknows.ugc (dedicated UGC/repost account). Highfield role: Manage Reels production, Stories daily engagement, carousel campaigns.',
    ugcStrategy: 'Feed (1-2x weekly): Moody product flat-lays with cracked print details, customer features (tagged UGC), editorial brand moments. Stories (daily): Drop countdowns, polls "What color next?", behind-scenes stitches. Reels (3x weekly): Trending audio, 15-30s styling tips, influencer collabs, drop reveals. Highfield tracking: engagement rate >8%, link-click rate >12%.',
    contentPillars: [
      'Product flat-lays (moody, detail-focused)',
      'Customer UGC features (tagged, stories)',
      'Drop countdowns & scarcity',
      'Styling tutorials (how to wear oversize)',
      'Behind-the-brand narrative',
    ],
    hashtagStrategy: '#WhoKnows #MysteryDrop #StreetStyle #OversizeAesthetic #VintageVibes #LuxuryStreetWear #IndieDesigner #DropCulture #FashionCommunity #StyleInspo (Highfield AI determines trending tags daily)',
    targetMetrics: {
      followers: 300000,
      monthlyEngagement: 800000,
      ugcContentPerMonth: 80,
    },
  },

  YouTubeAgent: {
    agentName: 'YouTubeAgent',
    highfieldRole: 'Long-Form Video Producer & Documentary Creator',
    accountCreation: 'Create YouTube channel "Who Knows Official" with Highfield integration for community tab monetization & Shorts. Account structure: (1) Long-form (8-12min), (2) Shorts (15-60s repurposed), (3) Premieres (drop day live reveals).',
    ugcStrategy: 'Long-form series "Making The Mystery" (production process, fabric sourcing), "Behind the Drop" (design philosophy), "Customer Stories" (fan styling features). Shorts: TikTok repurposing + YouTube-optimized hooks. Premieres: Real-time drop day events with community chat (Highfield engagement peak).',
    contentPillars: [
      '"Making The Mystery" series (production deep-dives)',
      '"Behind the Drop" (design philosophy & artist interviews)',
      '"Customer Stories" (UGC fan features)',
      'Manufacturing tutorials (fabric care, craftsmanship)',
      'Community premiere events (drop launches)',
    ],
    hashtagStrategy: '#WhoKnows #StreetWear #Fashion #MysteryDrop #ProductionVlog #ManufacturingProcess #DesignProcess #CommunityFocused #IndependentBrand',
    targetMetrics: {
      followers: 200000,
      monthlyEngagement: 1000000,
      ugcContentPerMonth: 40,
    },
  },

  FacebookAgent: {
    agentName: 'FacebookAgent',
    highfieldRole: 'Community Group Leader & Retargeting Specialist',
    accountCreation: 'Create Facebook community: "Who Knows Insiders Club" (500+ vetted members, Highfield verified). Separate ad account for carousel/video campaigns. Highfield role: Group moderation, member engagement, retargeting campaigns.',
    ugcStrategy: 'Group: Daily engagement (drop announcements, customer Q&A, styling tips, exclusive sales 10% group-only). Paid campaigns: Carousel ads (product range €69-129), Video ads (60s "Making The Mystery"), Lookalike audiences (Highfield targeting). Retargeting: Cart abandoners (10% discount), email subscribers (early access 24h), site visitors (new drops).',
    contentPillars: [
      'Drop announcements & countdowns',
      'Customer testimonials & stories',
      'Styling tips & lookbooks',
      'Group-exclusive sales & early access',
      'Q&A & community feedback',
    ],
    hashtagStrategy: '#WhoKnowsInsiders #CommunityDriven #ExclusiveDrop #StreetWear #Fashion #MysteryBrand #EarlyAccess #LoyaltyProgram',
    targetMetrics: {
      followers: 150000,
      monthlyEngagement: 500000,
      ugcContentPerMonth: 60,
    },
  },

  /* CONTENT AGENTS - UGC FOCUS */
  ContentIdeaAgent: {
    agentName: 'ContentIdeaAgent',
    highfieldRole: 'UGC Concept Generator & Trend Analyst',
    accountCreation: 'Create agency accounts on Highfield for UGC brief generation: 1) whoknows_ugc_lab (concept testing), 2) whoknows_trends (competitive analysis). Highfield role: Brief creators, monitor UGC performance, identify winning concepts.',
    ugcStrategy: 'Generate 10 UGC concepts weekly targeting: mystery unboxing, fit transformations, before/afters, sustainability angle, manufacturing narrative, community stories. Test on TikTok/Instagram Reels. Highfield algorithm: identify top-performing concepts, scale with creator partnerships.',
    contentPillars: [
      'Mystery unboxing formats',
      'Fit transformation stories',
      'Sustainability & craftsmanship',
      'Community customer features',
      'Trend-jacking opportunities',
    ],
    hashtagStrategy: '#UGCContent #ContentCreator #WhoKnows #TrendAnalysis #StreetStyle #CreatorEconomy #HighfieldUGC',
    targetMetrics: {
      followers: 100000,
      monthlyEngagement: 300000,
      ugcContentPerMonth: 50,
    },
  },

  /* GROWTH AGENTS - CONVERSION FOCUS */
  ConversionAgent: {
    agentName: 'ConversionAgent',
    highfieldRole: 'UGC Performance Optimizer & A/B Tester',
    accountCreation: 'Create Highfield testing accounts: whoknows_ab_test_a, whoknows_ab_test_b (parallel A/B testing). Track variant performance across platforms.',
    ugcStrategy: 'A/B test UGC variants: Hook type (scarcity vs. mystery vs. FOMO), video length (15s vs. 30s vs. 60s), music choice, caption length, CTA format. Highfield dashboard: real-time metrics (CTR, engagement, conversion). Scale winning variants across all agents.',
    contentPillars: [
      'Scarcity-focused UGC variants',
      'Mystery narrative angles',
      'FOMO-driven messaging',
      'Social proof (testimonials)',
      'CTA optimization (shop now vs. join waitlist)',
    ],
    hashtagStrategy: '#ConversionOptimization #UGCPerformance #HighfieldAnalytics #A/BTesting #ContentPerformance',
    targetMetrics: {
      followers: 80000,
      monthlyEngagement: 250000,
      ugcContentPerMonth: 40,
    },
  },

  /* STRATEGIC AGENTS - CAMPAIGN LEADERSHIP */
  TargetAudienceAgent: {
    agentName: 'TargetAudienceAgent',
    highfieldRole: 'Audience Insights & Segmentation Lead',
    accountCreation: 'Create Highfield audience research account: whoknows_audience_lab. Highfield role: Demographic analysis, psychographic targeting, platform behavior analysis.',
    ugcStrategy: 'Analyze UGC performance by segment: 18-22 (TikTok/Reels dominant), 23-27 (Instagram/YouTube balance), 28-35 (YouTube/Facebook). Tailor content pillars per segment. Highfield AI: predict audience preferences, recommend content timing & format.',
    contentPillars: [
      'Segment-specific UGC variants',
      'Platform-optimized content (short vs. long-form)',
      'Age-appropriate tone & trends',
      'Psychographic alignment (early-adopters, mystery-seekers)',
      'Geographic customization (EU focus: UK, DE, FR)',
    ],
    hashtagStrategy: '#AudienceInsights #DemographicAnalysis #TargetAudience #CreatorEconomy #HighfieldAI',
    targetMetrics: {
      followers: 50000,
      monthlyEngagement: 150000,
      ugcContentPerMonth: 30,
    },
  },

  MarketAnalysisAgent: {
    agentName: 'MarketAnalysisAgent',
    highfieldRole: 'Competitive UGC Benchmarking & ROI Tracking',
    accountCreation: 'Create Highfield competitive analysis account: whoknows_market_watch. Monitor Fear of God, Yeezy, Stüssy UGC performance.',
    ugcStrategy: 'Track competitor UGC: hook types, engagement rates, creator demographics, trending sounds. Analyze Who Knows performance gap. Highfield benchmarking: identify underexploited content angles. Generate weekly reports on market opportunities.',
    contentPillars: [
      'Competitive UGC analysis',
      'Market trend identification',
      'ROI benchmarking (Who Knows vs. competitors)',
      'Emerging creator opportunities',
      'Untapped content angles',
    ],
    hashtagStrategy: '#MarketAnalysis #CompetitiveIntelligence #HighfieldBenchmarking #StreetWearTrends #CreatorEconomy',
    targetMetrics: {
      followers: 40000,
      monthlyEngagement: 100000,
      ugcContentPerMonth: 25,
    },
  },
};

/**
 * Get all Highfield commands for campaign initialization
 */
export function getHighfieldCampaignBrief(agentNames: string[]): string {
  const briefs = agentNames.map((name) => highfieldCommands[name]).filter(Boolean);
  
  return `
WHO KNOWS HIGHFIELD UGC CAMPAIGN BRIEF
=====================================

PARTICIPATING AGENTS: ${agentNames.join(', ')}

CAMPAIGN OBJECTIVES:
- Create autonomous agent-managed accounts across TikTok, Instagram, YouTube, Facebook
- Generate 300+ UGC pieces monthly via agent accounts
- Achieve €0.50 per acquisition cost via Highfield network
- Build 2M+ combined followers across platforms
- Drive 5M+ monthly views
- 15% conversion rate improvement vs. baseline

ACCOUNT CREATION PROTOCOL:
Each agent creates dedicated accounts on assigned platforms. Highfield verification: all accounts linked to WhoKnows.agency master account for analytics & payout coordination.

UGC PERFORMANCE TRACKING:
Real-time Highfield dashboard: views, engagement, CTR, conversion, audience demographics, trending content.

TIMELINE:
- Week 1: Account creation & verification (all agents)
- Week 2-3: Content calendar setup & first 30 pieces
- Week 4+: Scale & optimization based on Highfield analytics

BUDGET ALLOCATION:
TikTok (50%), Instagram (25%), YouTube (15%), Facebook (10%)

SUCCESS METRICS:
- 500K+ TikTok followers (3 months)
- 300K+ Instagram followers (3 months)  
- 200K+ YouTube subscribers (3 months)
- 8%+ average engagement rate
- €1 ROAS minimum across all campaigns
`;
}
