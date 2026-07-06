import { videoJobs, videoAssets, renderPresets } from '@/data/enterprise'
import type { VideoJob, VideoAsset, RenderPreset } from '@/data/enterprise'
import { getVideoProvider } from '@/lib/providers/video-providers'
import type { VideoProvider, VideoGenerationRequest } from '@/lib/providers/video-providers'

let jobCounter = videoJobs.length

export class VideoAgent {
  providers: Map<string, VideoProvider>

  constructor() {
    this.providers = new Map()
    const names = ['veo', 'kling', 'runway', 'fal-replicate', 'ffmpeg']
    for (const name of names) {
      this.providers.set(name, getVideoProvider(name))
    }
  }

  async renderWithProvider(providerName: string, scriptId: string, avatarId: string, voiceId: string, format: string): Promise<VideoJob> {
    const provider = this.providers.get(providerName)
    if (!provider) throw new Error(`Unknown video provider: ${providerName}`)
    jobCounter++
    const now = new Date().toISOString()
    const job: VideoJob = {
      id: `vjob-${jobCounter}`,
      title: `Job #${jobCounter} (${providerName})`,
      scriptId,
      avatarId,
      voiceId,
      platform: 'tiktok',
      format: format as VideoJob['format'],
      status: 'pending',
      progress: 0,
      outputUrl: null,
      error: null,
      createdAt: now,
      completedAt: null,
    }
    videoJobs.push(job)
    return job
  }

  getProviders(): string[] {
    return Array.from(this.providers.keys())
  }

  createJob(scriptId: string, avatarId: string, voiceId: string, platform: string, format: string): VideoJob {
    jobCounter++
    const now = new Date().toISOString()
    const job: VideoJob = {
      id: `vjob-${jobCounter}`,
      title: `Job #${jobCounter}`,
      scriptId,
      avatarId,
      voiceId,
      platform,
      format: format as VideoJob['format'],
      status: 'pending',
      progress: 0,
      outputUrl: null,
      error: null,
      createdAt: now,
      completedAt: null,
    }
    videoJobs.push(job)
    return job
  }

  getJobStatus(jobId: string): VideoJob {
    const found = videoJobs.find(j => j.id === jobId)
    if (!found) throw new Error(`VideoJob ${jobId} not found`)
    return found
  }

  getCompletedAssets(): VideoAsset[] {
    const completedIds = videoJobs.filter(j => j.status === 'completed').map(j => j.id)
    return videoAssets.filter(a => completedIds.includes(a.jobId))
  }

  getPresetsByPlatform(platform: string): RenderPreset[] {
    const formatMap: Record<string, RenderPreset['format']> = {
      tiktok: '9:16',
      instagram: '1:1',
      youtube: '16:9',
      facebook: '16:9',
    }
    const targetFormat = formatMap[platform]
    if (!targetFormat) return renderPresets
    return renderPresets.filter(p => p.format === targetFormat)
  }

  estimateRenderTime(format: string, duration: number): number {
    const complexityFactor: Record<string, number> = { '9:16': 1.2, '1:1': 1.0, '16:9': 0.8 }
    return Math.round(duration * (complexityFactor[format] ?? 1.0))
  }
}
