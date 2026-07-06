export type SocialAccount = {
  id: string
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Facebook'
  username: string
  email: string
  password: string
  accessToken?: string
  refreshToken?: string
  followers: number
  status: 'active' | 'pending' | 'suspended'
  createdAt: Date
  lastPostAt?: Date
  agentId: string
  agentName: string
  bioDescription: string
  profileImage?: string
}

export const socialAccounts: SocialAccount[] = [
  {
    id: 'sa-tiktok-001',
    platform: 'TikTok',
    username: 'whoknowsmystery',
    email: 'tiktok@whoknows.brand',
    password: 'encrypted_password_hash',
    followers: 487000,
    status: 'active',
    createdAt: new Date('2026-03-15'),
    lastPostAt: new Date('2026-07-04'),
    agentId: 'TikTokAgent',
    agentName: 'TikTok Agent',
    bioDescription: 'Dark mystery. Luxury streetwear. Limited drops. Who Knows?',
    profileImage: '/images/tiktok-avatar.png',
  },
  {
    id: 'sa-instagram-001',
    platform: 'Instagram',
    username: 'whoknows.brand',
    email: 'instagram@whoknows.brand',
    password: 'encrypted_password_hash',
    followers: 142000,
    status: 'active',
    createdAt: new Date('2026-03-20'),
    lastPostAt: new Date('2026-07-04'),
    agentId: 'InstagramAgent',
    agentName: 'Instagram Agent',
    bioDescription: 'Luxury streetwear. Vintage mystery. Est 2024 🎭',
    profileImage: '/images/instagram-avatar.png',
  },
  {
    id: 'sa-youtube-001',
    platform: 'YouTube',
    username: 'Who Knows Official',
    email: 'youtube@whoknows.brand',
    password: 'encrypted_password_hash',
    followers: 89000,
    status: 'active',
    createdAt: new Date('2026-04-01'),
    lastPostAt: new Date('2026-07-02'),
    agentId: 'YouTubeAgent',
    agentName: 'YouTube Agent',
    bioDescription: 'Behind the mystery. Making luxury. Unboxing the unknown.',
    profileImage: '/images/youtube-avatar.png',
  },
  {
    id: 'sa-facebook-001',
    platform: 'Facebook',
    username: 'Who Knows Community',
    email: 'facebook@whoknows.brand',
    password: 'encrypted_password_hash',
    followers: 45000,
    status: 'active',
    createdAt: new Date('2026-04-10'),
    lastPostAt: new Date('2026-07-03'),
    agentId: 'FacebookAgent',
    agentName: 'Facebook Agent',
    bioDescription: 'Community-driven. Exclusive drops. Join the mystery.',
    profileImage: '/images/facebook-avatar.png',
  },
]

export function createSocialAccount(
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Facebook',
  username: string,
  email: string,
  agentId: string,
  agentName: string,
): SocialAccount {
  const newAccount: SocialAccount = {
    id: `sa-${platform.toLowerCase()}-${Date.now()}`,
    platform,
    username,
    email,
    password: 'encrypted_password_hash',
    followers: 0,
    status: 'pending',
    createdAt: new Date(),
    agentId,
    agentName,
    bioDescription: `Managed by ${agentName} | Who Knows - Luxury Streetwear`,
  }
  socialAccounts.push(newAccount)
  return newAccount
}

export function updateSocialAccount(
  accountId: string,
  updates: Partial<SocialAccount>,
): SocialAccount | null {
  const account = socialAccounts.find((a) => a.id === accountId)
  if (!account) return null
  
  Object.assign(account, updates)
  return account
}

export function getSocialAccount(accountId: string): SocialAccount | null {
  return socialAccounts.find((a) => a.id === accountId) || null
}

export function getAccountsByAgent(agentId: string): SocialAccount[] {
  return socialAccounts.filter((a) => a.agentId === agentId)
}

export function getAccountsByPlatform(
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Facebook',
): SocialAccount[] {
  return socialAccounts.filter((a) => a.platform === platform)
}
