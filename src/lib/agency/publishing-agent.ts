import { contentCalendar, publishingJobs, platformPosts, postingRules, platformConnectors } from '@/data/enterprise'
import type { ContentCalendarItem, PublishingJob, PlatformPost, PostingRule, PlatformConnector, ApprovalState } from '@/data/enterprise'

let calCounter = contentCalendar.length

export class PublishingAgent {
  schedule(item: Partial<ContentCalendarItem>): ContentCalendarItem {
    calCounter++
    const newItem: ContentCalendarItem = {
      id: `cal-${calCounter}`,
      title: item.title ?? 'Untitled',
      platform: item.platform ?? 'tiktok',
      accountId: item.accountId ?? '',
      scheduledAt: item.scheduledAt ?? new Date().toISOString(),
      status: 'draft',
      contentType: item.contentType ?? 'video',
      assetUrl: item.assetUrl ?? null,
      campaignId: item.campaignId ?? '',
      niche: item.niche ?? '',
      approvalStatus: 'pending',
      approvedBy: null,
    }
    contentCalendar.push(newItem)
    return newItem
  }

  getQueue(): PublishingJob[] {
    return publishingJobs
  }

  getPerformance(): PlatformPost[] {
    return platformPosts
  }

  getRules(platform: string): PostingRule[] {
    return postingRules.filter(r => r.platform === platform)
  }

  getConnectors(): PlatformConnector[] {
    return platformConnectors
  }

  canPublish(platform: string, accountId: string): { allowed: boolean; reason: string | null } {
    const connector = platformConnectors.find(c => c.platform === platform)
    if (!connector) return { allowed: false, reason: `No connector found for ${platform}` }
    if (!connector.connected) return { allowed: false, reason: `Connector for ${platform} is not connected` }
    if (connector.rateLimitRemaining <= 0) return { allowed: false, reason: `Rate limit exhausted for ${platform}` }
    const rules = postingRules.filter(r => r.platform === platform)
    for (const rule of rules) {
      if (rule.requireApproval) return { allowed: false, reason: `${platform} requires manual approval before publishing` }
    }
    const hour = new Date().getHours()
    const bestHours = rules.length > 0 ? rules[0].bestTimes.map(t => parseInt(t.split(':')[0], 10)) : []
    if (bestHours.length > 0 && !bestHours.includes(hour)) {
      return { allowed: true, reason: `Publishing allowed but current time (${hour}:00) may not be optimal; best times: ${rules[0].bestTimes.join(', ')}` }
    }
    return { allowed: true, reason: null }
  }

  getSchedule(platform: string, niche: string): ContentCalendarItem[] {
    return contentCalendar.filter(c => c.platform === platform && c.niche === niche)
  }

  getPostingRules(platform: string): PostingRule[] {
    return postingRules.filter(r => r.platform === platform)
  }

  approveItem(calendarItemId: string, reviewerId: string): ApprovalState {
    const item = contentCalendar.find(c => c.id === calendarItemId)
    if (item) {
      item.approvalStatus = 'approved'
      item.approvedBy = reviewerId
    }
    return {
      id: `approval-${calendarItemId}`,
      calendarItemId,
      status: 'approved',
      reviewerId,
      comment: null,
      reviewedAt: new Date().toISOString(),
    }
  }

  rejectItem(calendarItemId: string, reviewerId: string, comment: string): ApprovalState {
    const item = contentCalendar.find(c => c.id === calendarItemId)
    if (item) {
      item.approvalStatus = 'rejected'
      item.approvedBy = null
    }
    return {
      id: `approval-${calendarItemId}`,
      calendarItemId,
      status: 'rejected',
      reviewerId,
      comment,
      reviewedAt: new Date().toISOString(),
    }
  }
}
