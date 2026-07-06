import type { PlatformPost } from '@/data/enterprise'

export interface PostContent {
  text: string
  mediaUrls: string[]
  hashtags: string[]
  mentions: string[]
  link?: string
}

export interface PublishResponse {
  success: boolean
  platformPostId: string | null
  url: string | null
  error: string | null
}

export interface PlatformConnector {
  platform: string
  publish(content: PostContent, accountId: string): Promise<PublishResponse>
  deletePost(postId: string): Promise<boolean>
  getPerformance(postId: string): Promise<{ views: number; likes: number; comments: number; shares: number }>
}

class MockConnector implements PlatformConnector {
  constructor(public platform: string) {}
  async publish(content: PostContent, accountId: string): Promise<PublishResponse> {
    return { success: true, platformPostId: `mock-${this.platform}-${Date.now()}`, url: `https://${this.platform}.com/post/mock-${Date.now()}`, error: null }
  }
  async deletePost(postId: string): Promise<boolean> { return true }
  async getPerformance(postId: string): Promise<{ views: number; likes: number; comments: number; shares: number }> {
    return { views: Math.floor(Math.random() * 10000), likes: Math.floor(Math.random() * 1000), comments: Math.floor(Math.random() * 100), shares: Math.floor(Math.random() * 200) }
  }
}

const connectors: Record<string, MockConnector> = {
  meta: new MockConnector('meta'),
  instagram: new MockConnector('instagram'),
  tiktok: new MockConnector('tiktok'),
  youtube: new MockConnector('youtube'),
  reddit: new MockConnector('reddit'),
  pinterest: new MockConnector('pinterest'),
  linkedin: new MockConnector('linkedin'),
  x: new MockConnector('x'),
}

export function getPlatformConnector(platform: string): PlatformConnector {
  return connectors[platform] || new MockConnector(platform)
}

export function getAllConnectors(): { platform: string; connector: PlatformConnector }[] {
  return Object.entries(connectors).map(([platform, connector]) => ({ platform, connector }))
}
