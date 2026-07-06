export interface TrackingLink {
  id: string
  originalUrl: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  utmTerm: string | null
  accountId: string
  campaignId: string
  assetId: string | null
  productId: string | null
  createdAt: string
}

export interface Touchpoint {
  source: string
  medium: string
  campaign: string
  content: string
  timestamp: string
  value: number
}

export interface AttributionResult {
  touchpoints: Touchpoint[]
  model: 'last-click' | 'first-click' | 'linear' | 'time-decay'
  attributedRevenue: number
  conversions: number
}

export class AttributionService {
  createTrackingLink(url: string, params: { source: string; medium: string; campaign: string; content: string; accountId: string; campaignId: string }): TrackingLink {
    return { id: `tl-${Date.now()}`, originalUrl: url, utmSource: params.source, utmMedium: params.medium, utmCampaign: params.campaign, utmContent: params.content, utmTerm: null, accountId: params.accountId, campaignId: params.campaignId, assetId: null, productId: null, createdAt: new Date().toISOString() }
  }

  lastClick(touchpoints: Touchpoint[]): AttributionResult {
    const sorted = [...touchpoints].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    return { touchpoints: sorted, model: 'last-click', attributedRevenue: sorted[0]?.value || 0, conversions: sorted.length > 0 ? 1 : 0 }
  }

  firstClick(touchpoints: Touchpoint[]): AttributionResult {
    const sorted = [...touchpoints].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    return { touchpoints: sorted, model: 'first-click', attributedRevenue: sorted[0]?.value || 0, conversions: sorted.length > 0 ? 1 : 0 }
  }

  linear(touchpoints: Touchpoint[]): AttributionResult {
    const valuePerTouch = touchpoints.reduce((sum, t) => sum + t.value, 0) / (touchpoints.length || 1)
    return { touchpoints, model: 'linear', attributedRevenue: valuePerTouch * touchpoints.length, conversions: touchpoints.length }
  }

  timeDecay(touchpoints: Touchpoint[], decayFactor: number = 0.5): AttributionResult {
    const now = new Date().getTime()
    const weighted = touchpoints.map(t => ({ ...t, weight: Math.exp(-decayFactor * (now - new Date(t.timestamp).getTime()) / 86400000) }))
    const totalWeight = weighted.reduce((s, w) => s + w.weight, 0)
    const attributedRevenue = weighted.reduce((s, w) => s + (w.value * w.weight / totalWeight), 0)
    return { touchpoints: weighted, model: 'time-decay', attributedRevenue, conversions: touchpoints.length }
  }
}
