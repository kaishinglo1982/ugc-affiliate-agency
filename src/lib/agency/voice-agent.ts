import { voiceProfiles } from '@/data/enterprise'
import type { VoiceProfile } from '@/data/enterprise'
import { getVoiceProvider } from '@/lib/providers/voice-providers'

export class VoiceAgent {
  getProfilesByLanguage(lang: string): VoiceProfile[] {
    return voiceProfiles.filter(v => v.language === lang)
  }

  getProfile(id: string): VoiceProfile | undefined {
    return voiceProfiles.find(v => v.id === id)
  }

  async synthesize(voiceId: string, text: string): Promise<string> {
    return `/mock/audio/${voiceId}-${Date.now()}.mp3`
  }

  estimateCost(characters: number): number {
    const costPerChar = 0.00015
    return Math.round(characters * costPerChar * 100) / 100
  }

  async synthesizeWithProvider(providerName: string, text: string, voiceId: string): Promise<{ audioUrl: string; cost: number }> {
    // In production: const apiKey = await getVault().getSecret(`voice.${providerName}.apiKey`)
    const provider = getVoiceProvider(providerName)
    const result = await provider.synthesize({ text, voiceId, speed: 1.0, pitch: 1.0, language: 'en' })
    return { audioUrl: result.audioUrl, cost: result.cost }
  }

  estimateCostByProvider(providerName: string, characters: number): number {
    const provider = getVoiceProvider(providerName)
    return provider.estimateCost(characters)
  }
}
