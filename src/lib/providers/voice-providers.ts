export interface VoiceSynthesisRequest {
  text: string
  voiceId: string
  speed: number
  pitch: number
  language: string
}

export interface VoiceSynthesisResponse {
  audioUrl: string
  duration: number
  cost: number
  error: string | null
}

export interface VoiceProvider {
  name: string
  synthesize(req: VoiceSynthesisRequest): Promise<VoiceSynthesisResponse>
  estimateCost(characters: number): number
}

export class ElevenLabsProvider implements VoiceProvider {
  name = 'elevenlabs'
  async synthesize(req: VoiceSynthesisRequest): Promise<VoiceSynthesisResponse> {
    return { audioUrl: '/mock/audio-elevenlabs.mp3', duration: req.text.length * 0.06, cost: this.estimateCost(req.text.length), error: null }
  }
  estimateCost(characters: number): number { return characters * 0.0003 }
}

export class OpenAITTSProvider implements VoiceProvider {
  name = 'openai-tts'
  async synthesize(req: VoiceSynthesisRequest): Promise<VoiceSynthesisResponse> {
    return { audioUrl: '/mock/audio-openai.mp3', duration: req.text.length * 0.06, cost: this.estimateCost(req.text.length), error: null }
  }
  estimateCost(characters: number): number { return characters * 0.00015 }
}

export class GoogleTTSProvider implements VoiceProvider {
  name = 'google-tts'
  async synthesize(req: VoiceSynthesisRequest): Promise<VoiceSynthesisResponse> {
    return { audioUrl: '/mock/audio-google.mp3', duration: req.text.length * 0.06, cost: this.estimateCost(req.text.length), error: null }
  }
  estimateCost(characters: number): number { return characters * 0.00004 }
}

export function getVoiceProvider(name: string): VoiceProvider {
  const providers: Record<string, VoiceProvider> = { elevenlabs: new ElevenLabsProvider(), 'openai-tts': new OpenAITTSProvider(), 'google-tts': new GoogleTTSProvider() }
  return providers[name] || providers.elevenlabs
}
