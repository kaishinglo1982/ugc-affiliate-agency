import { avatarProfiles } from '@/data/enterprise'
import type { AvatarProfile } from '@/data/enterprise'

/**
 * Agent for managing avatar selection, brand safety, and identity ethics.
 * All avatars must be used ethically — never to impersonate real people
 * or mislead audiences about the nature of AI-generated content.
 */
export class AvatarAgent {
  selectForNiche(niche: string, platform: string): AvatarProfile[] {
    return avatarProfiles.filter(
      a => a.niche.includes(niche) && a.platform.includes(platform)
    )
  }

  getById(id: string): AvatarProfile | undefined {
    return avatarProfiles.find(a => a.id === id)
  }

  isBrandSafe(avatarId: string, niche: string): boolean {
    const avatar = avatarProfiles.find(a => a.id === avatarId)
    if (!avatar) return false
    return avatar.niche.includes(niche)
  }

  isBrandSafeForNiche(avatarId: string, niche: string): { safe: boolean; reasons: string[] } {
    const avatar = avatarProfiles.find(a => a.id === avatarId)
    if (!avatar) return { safe: false, reasons: ['Avatar not found'] }
    const reasons: string[] = []
    const nicheMatch = avatar.niche.includes(niche)
    if (nicheMatch) reasons.push(`Avatar niche includes "${niche}"`)
    else reasons.push(`Avatar niche (${avatar.niche.join(', ')}) does not match "${niche}"`)
    if (avatar.status === 'active') reasons.push('Avatar is active')
    else reasons.push('Avatar is not active')
    return { safe: nicheMatch && avatar.status === 'active', reasons }
  }

  checkMisleadingIdentity(avatarId: string): { isMisleading: boolean; warning: string | null } {
    const avatar = avatarProfiles.find(a => a.id === avatarId)
    if (!avatar) return { isMisleading: false, warning: null }
    if (avatar.style === 'realistic') {
      return {
        isMisleading: true,
        warning: `Avatar "${avatar.name}" uses a realistic style — ensure viewers know this is AI-generated and not a real person.`,
      }
    }
    return { isMisleading: false, warning: null }
  }
}
