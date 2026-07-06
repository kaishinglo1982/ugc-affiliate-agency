import { leads, contacts, deals, tasks, followUpTemplates } from '@/data/enterprise'
import type { Lead, Contact, Deal, Task, FollowUpTemplate } from '@/data/enterprise'

export class LeadAgent {
  getLeadsByStatus(status: string): Lead[] {
    return leads.filter(l => l.status === status)
  }

  getHighScoreLeads(minScore: number): Lead[] {
    return leads.filter(l => l.score >= minScore)
  }

  getContacts(): Contact[] {
    return contacts
  }

  getDealsByStage(stage: string): Deal[] {
    return deals.filter(d => d.stage === stage)
  }

  getOpenTasks(): Task[] {
    return tasks.filter(t => t.status === 'open' || t.status === 'in-progress')
  }

  getFollowUpTemplates(trigger: string): FollowUpTemplate[] {
    return followUpTemplates.filter(t => t.trigger === trigger)
  }

  emitMockEvents(): { type: string; data: Record<string, string> }[] {
    return [
      { type: 'comment_lead', data: { source: 'tiktok', username: '@user123', comment: 'Interested in affiliate program', niche: 'fitness', score: '72' } },
      { type: 'dm_lead', data: { source: 'instagram', username: '@influencer_anna', message: 'Partnership inquiry', niche: 'beauty', score: '88' } },
      { type: 'form_submission', data: { source: 'website', name: 'John Doe', email: 'john@example.com', niche: 'finance', score: '65' } },
      { type: 'affiliate_request', data: { source: 'email', name: 'Sarah Marketing', email: 'sarah@agency.com', niche: 'tech', score: '91' } },
    ]
  }

  processFollowUps(): { templateName: string; leadName: string; scheduledAction: string; requiresManualApproval: boolean }[] {
    return leads.map(lead => {
      const template = followUpTemplates.find(t => t.trigger === 'new-lead')
      return {
        templateName: template?.name ?? 'Default Follow-up',
        leadName: lead.name,
        scheduledAction: template ? `Send ${template.channel} in ${template.delayDays} days` : 'Manual follow-up required',
        requiresManualApproval: this.shouldManualApprove(lead.source, lead.score),
      }
    })
  }

  shouldManualApprove(leadSource: string, leadScore: number): boolean {
    const highValueSources = ['affiliate-request', 'referral']
    if (highValueSources.includes(leadSource)) return true
    if (leadScore >= 85) return true
    return false
  }
}
