import { impressions, views, clicks, profitMetrics, analyticsInsights } from '@/data/enterprise'
import type { Impression, View, Click, ProfitMetric, AnalyticsAgentInsight } from '@/data/enterprise'

export class AnalyticsAgent {
  getInsights(): AnalyticsAgentInsight[] {
    return analyticsInsights
  }

  getProfitByEntity(type: string): ProfitMetric[] {
    return profitMetrics.filter(p => p.entityType === type)
  }

  getTopPlatform(): string {
    const platformMetrics = profitMetrics.filter(p => p.entityType === 'platform')
    if (platformMetrics.length === 0) return ''
    return platformMetrics.reduce((best, curr) => (curr.revenue > best.revenue ? curr : best), platformMetrics[0]).entityId
  }

  getWinners(): AnalyticsAgentInsight[] {
    return analyticsInsights.filter(i => i.type === 'winner')
  }

  getWarnings(): AnalyticsAgentInsight[] {
    return analyticsInsights.filter(i => i.severity === 'warning' || i.severity === 'critical')
  }

  detectWinners(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    return profitMetrics
      .filter(p => p.roas > 3)
      .map(p => ({
        id: `insight-winner-${p.id}`,
        type: 'winner' as const,
        entityType: p.entityType,
        entityId: p.entityId,
        message: `${p.entityType} ${p.entityId} has ROAS of ${p.roas.toFixed(2)} — above 3.0 threshold`,
        severity: 'info' as const,
        metric: p.roas,
        threshold: 3,
        timestamp: now,
      }))
  }

  detectLosers(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    return profitMetrics
      .filter(p => p.roas < 1)
      .map(p => ({
        id: `insight-loser-${p.id}`,
        type: 'loser' as const,
        entityType: p.entityType,
        entityId: p.entityId,
        message: `${p.entityType} ${p.entityId} has ROAS of ${p.roas.toFixed(2)} — below 1.0 threshold`,
        severity: 'critical' as const,
        metric: p.roas,
        threshold: 1,
        timestamp: now,
      }))
  }

  detectCostSpikes(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    return impressions
      .filter(i => i.cost > 0)
      .map(i => {
        const avgCost = impressions.reduce((s, x) => s + x.cost, 0) / impressions.length
        const spike = avgCost > 0 && i.cost > avgCost * 1.2
        if (!spike) return null
        return {
          id: `insight-spike-${i.id}`,
          type: 'cost_spike' as const,
          entityType: 'platform',
          entityId: i.platform,
          message: `Cost spike on ${i.platform}: $${i.cost} (${((i.cost / avgCost - 1) * 100).toFixed(0)}% above average)`,
          severity: 'warning' as const,
          metric: i.cost,
          threshold: Math.round(avgCost * 1.2 * 100) / 100,
          timestamp: now,
        }
      })
      .filter(Boolean) as AnalyticsAgentInsight[]
  }

  detectViralContent(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    return views
      .filter(v => v.count > 10000)
      .map(v => ({
        id: `insight-viral-${v.id}`,
        type: 'viral' as const,
        entityType: 'asset',
        entityId: v.assetId,
        message: `Asset ${v.assetId} has ${v.count.toLocaleString()} views — potential viral content`,
        severity: 'info' as const,
        metric: v.count,
        threshold: 10000,
        timestamp: now,
      }))
  }

  detectLowCTR(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    return clicks
      .filter(c => {
        const relatedImpression = impressions.find(i => i.platform === c.platform)
        if (!relatedImpression || relatedImpression.count === 0) return false
        const ctr = (c.count / relatedImpression.count) * 100
        return ctr < 1.5
      })
      .map(c => {
        const ci = impressions.find(i => i.platform === c.platform)
        const ctr = ci ? (c.count / ci.count) * 100 : 0
        return {
          id: `insight-lowctr-${c.id}`,
          type: 'low_ctr' as const,
          entityType: 'platform',
          entityId: c.platform,
          message: `Low CTR on ${c.platform}: ${ctr.toFixed(2)}% (below 1.5% threshold)`,
          severity: 'warning' as const,
          metric: Math.round(ctr * 100) / 100,
          threshold: 1.5,
          timestamp: now,
        }
      })
  }

  detectHighAPICosts(): AnalyticsAgentInsight[] {
    const now = new Date().toISOString()
    const apiImpacts = impressions.filter(i => i.cost > 200)
    if (apiImpacts.length === 0) return []
    return apiImpacts.map(i => ({
      id: `insight-apicost-${i.id}`,
      type: 'high_api_cost' as const,
      entityType: 'platform',
      entityId: i.platform,
      message: `High API cost on ${i.platform}: $${i.cost} (above $200 threshold)`,
      severity: 'warning' as const,
      metric: i.cost,
      threshold: 200,
      timestamp: now,
    }))
  }

  getFilteredInsights(platform?: string, niche?: string, campaign?: string): AnalyticsAgentInsight[] {
    return analyticsInsights.filter(i => {
      if (platform && !i.entityId.toLowerCase().includes(platform.toLowerCase())) return false
      return true
    })
  }
}
