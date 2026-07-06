import { hooks, scripts, captions, adCopies, ctaSuggestions, complianceResults, researchInsights, affiliateProducts } from '@/data/enterprise'
import type { Hook, Script, Caption, AdCopy, CTASuggestion, ComplianceResult, ResearchInsight, AffiliateProduct } from '@/data/enterprise'

export class ScriptAgent {
  generateHook(niche: string, platform: string, style?: string): Hook {
    let filtered = hooks.filter(h => h.niche === niche && h.platform === platform)
    if (style) filtered = filtered.filter(h => h.style === style)
    return filtered[0] ?? hooks[0]
  }

  generateScript(hookId: string, platform: string, niche: string): Script {
    const found = scripts.find(s => s.hookId === hookId && s.platform === platform && s.niche === niche)
    return found ?? scripts[0]
  }

  generateCaption(scriptId: string, platform: string): Caption {
    const found = captions.find(c => c.platform === platform)
    return found ?? captions[0]
  }

  generateAdCopy(product: string, platform: string, format: string): AdCopy {
    const found = adCopies.find(a => a.platform === platform && a.format === format)
    return found ?? adCopies[0]
  }

  suggestCTA(platform: string, goal: string): CTASuggestion {
    const filtered = ctaSuggestions.filter(c => c.platform === platform)
    return filtered.reduce((best, curr) => (curr.effectiveness > best.effectiveness ? curr : best), filtered[0])
  }

  checkCompliance(text: string, platform: string): ComplianceResult {
    return complianceResults[0] ?? { passed: true, checks: [] }
  }

  getByNiche(niche: string): { hooks: Hook[]; scripts: Script[] } {
    return {
      hooks: hooks.filter(h => h.niche === niche),
      scripts: scripts.filter(s => s.niche === niche),
    }
  }

  generateFromResearch(insightId: string, productId: string): { hook: Hook; script: Script; caption: Caption } {
    const insight = researchInsights.find(ri => ri.id === insightId) ?? researchInsights[0]
    const product = affiliateProducts.find(ap => ap.id === productId) ?? affiliateProducts[0]
    const hook: Hook = {
      id: `hook-${insightId}-${productId}`,
      text: `${product.name} Review: ${insight.suggestedAngle}`,
      style: 'story',
      platform: insight.platform,
      niche: insight.niche,
      score: 85,
      status: 'draft',
      createdAt: new Date().toISOString(),
    }
    const script: Script = {
      id: `script-${insightId}-${productId}`,
      title: `${product.name} - ${insight.keyword}`,
      hookId: hook.id,
      body: `In diesem Video zeige ich dir ${product.name} von ${product.brand}. ${product.description}`,
      platform: insight.platform,
      niche: insight.niche,
      tone: 'casual',
      duration: 60,
      status: 'draft',
      score: 80,
      tenantId: '',
      campaignId: '',
      accountId: '',
      createdAt: new Date().toISOString(),
    }
    const caption: Caption = {
      id: `caption-${insightId}-${productId}`,
      text: `${product.name} - ${insight.suggestedAngle}`,
      platform: insight.platform,
      hashtags: [insight.niche, ...insight.relatedTopics.slice(0, 3)],
      mentions: [],
      tone: 'casual',
      ctaText: 'Link in bio',
      status: 'draft',
      score: 80,
    }
    return { hook, script, caption }
  }

  getResearchInsights(niche: string): ResearchInsight[] {
    return researchInsights.filter(ri => ri.niche === niche)
  }

  getAffiliateProducts(niche: string): AffiliateProduct[] {
    return affiliateProducts.filter(ap => ap.category === niche)
  }
}
