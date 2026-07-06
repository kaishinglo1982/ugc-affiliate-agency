import { accountManager, AgentAccount, HighfieldCampaign } from '@/lib/agents/account-manager';
import { getHighfieldCampaignBrief, highfieldCommands } from '@/lib/agents/highfield-commands';

/**
 * Highfield Campaign Management API
 * POST /api/v1/agents/highfield - Create autonomous agent accounts & campaign
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, agents, campaign } = body;

    if (action === 'create-campaign') {
      return handleCreateCampaign(agents, campaign);
    } else if (action === 'create-accounts') {
      return handleCreateAccounts(agents);
    } else if (action === 'post-ugc') {
      return handlePostUGC(body);
    } else if (action === 'get-analytics') {
      return handleGetAnalytics(body.campaignId);
    } else {
      return Response.json(
        { success: false, error: 'Unknown action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('[v0] Highfield API error:', error);
    return Response.json(
      { success: false, error: 'Campaign management failed' },
      { status: 500 }
    );
  }
}

/**
 * Create autonomous agent accounts across platforms
 */
async function handleCreateAccounts(agentNames: string[]) {
  try {
    const accounts: AgentAccount[] = [];

    for (const agentName of agentNames) {
      const command = highfieldCommands[agentName];
      if (!command) continue;

      // Create accounts based on agent role
      const platforms = getPlatformsForAgent(agentName);

      for (const platform of platforms) {
        const account = await accountManager.createAgentAccount(agentName, platform, {
          username: `${agentName.toLowerCase()}_who_knows`,
        });

        // Activate account immediately
        await accountManager.activateAccount(account.id);
        accounts.push(account);
      }
    }

    console.log(`[v0] Created ${accounts.length} accounts for ${agentNames.length} agents`);

    return Response.json({
      success: true,
      data: {
        accountsCreated: accounts.length,
        accounts: accounts.map((a) => ({
          id: a.id,
          agent: a.agentName,
          platform: a.platform,
          username: a.username,
          status: a.accountStatus,
        })),
      },
    });
  } catch (error) {
    console.error('[v0] Account creation failed:', error);
    return Response.json(
      { success: false, error: 'Failed to create accounts' },
      { status: 500 }
    );
  }
}

/**
 * Create Highfield campaign with all agents
 */
async function handleCreateCampaign(
  agentNames: string[],
  campaignConfig: {
    budget: number;
    targetAudience: string;
    duration: number;
  }
) {
  try {
    // Create campaign in account manager
    const campaign = await accountManager.createHighfieldCampaign(
      agentNames,
      campaignConfig.budget,
      campaignConfig.targetAudience
    );

    // Generate campaign brief
    const brief = getHighfieldCampaignBrief(agentNames);

    console.log(`[v0] Highfield campaign created: ${campaign.id}`);

    return Response.json({
      success: true,
      data: {
        campaignId: campaign.id,
        agentCount: agentNames.length,
        budget: campaignConfig.budget,
        status: campaign.status,
        brief: brief,
        expectedMetrics: {
          monthlyUGC: agentNames.length * 60,
          estimatedFollowers: agentNames.length * 50000,
          projectedViews: agentNames.length * 500000,
          targetROAS: '4:1',
        },
      },
    });
  } catch (error) {
    console.error('[v0] Campaign creation failed:', error);
    return Response.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

/**
 * Post UGC content from agent account
 */
async function handlePostUGC(ugcData: {
  accountId: string;
  contentType: 'video' | 'image' | 'carousel' | 'reel' | 'short';
  caption: string;
  content: string;
  hashtags: string[];
}) {
  try {
    const account = accountManager.getAllAccounts().find((a) => a.id === ugcData.accountId);

    if (!account) {
      return Response.json(
        { success: false, error: 'Account not found' },
        { status: 404 }
      );
    }

    const ugc = await accountManager.postUGCContent(ugcData.accountId, {
      agentName: account.agentName,
      platform: account.platform,
      contentType: ugcData.contentType,
      content: ugcData.content,
      caption: ugcData.caption,
      hashtags: ugcData.hashtags,
      status: 'posted',
    });

    console.log(`[v0] UGC posted: ${ugc.id} from ${account.username}`);

    return Response.json({
      success: true,
      data: {
        ugcId: ugc.id,
        account: account.username,
        platform: account.platform,
        status: ugc.status,
        postedAt: ugc.postedAt,
      },
    });
  } catch (error) {
    console.error('[v0] UGC posting failed:', error);
    return Response.json(
      { success: false, error: 'Failed to post UGC' },
      { status: 500 }
    );
  }
}

/**
 * Get campaign analytics
 */
async function handleGetAnalytics(campaignId: string) {
  try {
    const analytics = accountManager.getCampaignAnalytics(campaignId);

    if (!analytics) {
      return Response.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('[v0] Analytics retrieval failed:', error);
    return Response.json(
      { success: false, error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}

/**
 * Determine platforms for each agent
 */
function getPlatformsForAgent(
  agentName: string
): ('tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'highfield')[] {
  const platformMap: Record<string, ('tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'highfield')[]> = {
    // Social Media Agents - all platforms
    TikTokAgent: ['tiktok', 'instagram', 'highfield'],
    InstagramAgent: ['instagram', 'tiktok', 'highfield'],
    YouTubeAgent: ['youtube', 'instagram', 'highfield'],
    FacebookAgent: ['facebook', 'instagram', 'highfield'],

    // Content Agents - content creation focus
    BrandDNAAgent: ['tiktok', 'instagram', 'highfield'],
    ContentIdeaAgent: ['tiktok', 'instagram', 'youtube', 'highfield'],
    VideoPromptAgent: ['youtube', 'instagram', 'highfield'],
    ScriptAgent: ['tiktok', 'instagram', 'highfield'],
    TrendRadarAgent: ['tiktok', 'instagram', 'highfield'],

    // Growth Agents - performance & analytics focus
    ConversionAgent: ['tiktok', 'instagram', 'highfield'],
    AnalyticsAgent: ['highfield'],
    TargetAudienceAgent: ['highfield'],
    MarketAnalysisAgent: ['highfield'],

    // Default: all platforms
  };

  return platformMap[agentName] || ['tiktok', 'instagram', 'youtube', 'highfield'];
}
