export interface VideoProviderConfig {
  apiKey?: string
  baseUrl: string
  timeout: number
}

export interface VideoGenerationRequest {
  script: string
  avatarId?: string
  voiceId?: string
  format: '9:16' | '1:1' | '16:9'
  duration: number
  resolution: '720p' | '1080p' | '4k'
}

export interface VideoGenerationResponse {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  outputUrl: string | null
  estimatedTime: number
  error: string | null
}

export interface VideoProvider {
  name: string
  generate(req: VideoGenerationRequest): Promise<VideoGenerationResponse>
  getStatus(jobId: string): Promise<VideoGenerationResponse>
}

// Mock implementations
export class VeoProvider implements VideoProvider { name = 'veo'; async generate(req: VideoGenerationRequest) { return mockResponse(req) }; async getStatus(jobId: string) { return mockStatus(jobId) } }
export class KlingProvider implements VideoProvider { name = 'kling'; async generate(req: VideoGenerationRequest) { return mockResponse(req) }; async getStatus(jobId: string) { return mockStatus(jobId) } }
export class RunwayProvider implements VideoProvider { name = 'runway'; async generate(req: VideoGenerationRequest) { return mockResponse(req) }; async getStatus(jobId: string) { return mockStatus(jobId) } }
export class FalReplicateProvider implements VideoProvider { name = 'fal-replicate'; async generate(req: VideoGenerationRequest) { return mockResponse(req) }; async getStatus(jobId: string) { return mockStatus(jobId) } }
export class FFmpegProvider implements VideoProvider { name = 'ffmpeg'; async generate(req: VideoGenerationRequest) { return mockResponse(req) }; async getStatus(jobId: string) { return mockStatus(jobId) } }

function mockResponse(req: VideoGenerationRequest): VideoGenerationResponse {
  return { jobId: `mock-${Date.now()}`, status: 'completed', outputUrl: '/mock/video-output.mp4', estimatedTime: 30, error: null }
}
function mockStatus(jobId: string): VideoGenerationResponse {
  return { jobId, status: 'completed', outputUrl: '/mock/video-output.mp4', estimatedTime: 30, error: null }
}

export function getVideoProvider(name: string): VideoProvider {
  const providers: Record<string, VideoProvider> = { veo: new VeoProvider(), kling: new KlingProvider(), runway: new RunwayProvider(), 'fal-replicate': new FalReplicateProvider(), ffmpeg: new FFmpegProvider() }
  return providers[name] || providers.ffmpeg
}
