import { subtitleAssets, brollAssets, renderPresets } from '@/data/enterprise'
import type { SubtitleAsset, BrollAsset, RenderPreset } from '@/data/enterprise'

export class EditingAgent {
  generateSubtitles(videoId: string, language: string): SubtitleAsset {
    const found = subtitleAssets.find(s => s.videoId === videoId && s.language === language)
    return found ?? subtitleAssets[0]
  }

  suggestBroll(scriptId: string): BrollAsset[] {
    return brollAssets
  }

  suggestMusic(scriptId: string): { genre: string; mood: string; duration: number }[] {
    return [
      { genre: 'electronic', mood: 'upbeat', duration: 30 },
      { genre: 'lo-fi', mood: 'calm', duration: 60 },
      { genre: 'cinematic', mood: 'inspiring', duration: 45 },
    ]
  }

  createCTAEcard(ctaText: string, format: string): { overlayText: string; position: string; duration: number } {
    const positionMap: Record<string, string> = { '9:16': 'bottom-third', '1:1': 'bottom-center', '16:9': 'lower-third' }
    return {
      overlayText: ctaText,
      position: positionMap[format] ?? 'bottom-third',
      duration: 5,
    }
  }

  getFormatVariants(): RenderPreset[] {
    return renderPresets
  }

  getFormat(ratio: string): RenderPreset | undefined {
    return renderPresets.find(p => p.format === ratio)
  }
}
