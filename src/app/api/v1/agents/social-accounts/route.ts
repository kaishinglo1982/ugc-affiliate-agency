import { NextRequest, NextResponse } from 'next/server'
import {
  createSocialAccount,
  updateSocialAccount,
  getSocialAccount,
  getAccountsByAgent,
  getAccountsByPlatform,
  socialAccounts,
} from '@/lib/social-accounts'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const accountId = searchParams.get('id')
  const agentId = searchParams.get('agentId')
  const platform = searchParams.get('platform') as any

  try {
    if (accountId) {
      const account = getSocialAccount(accountId)
      return NextResponse.json(account || { error: 'Account not found' }, { status: account ? 200 : 404 })
    }

    if (agentId) {
      const accounts = getAccountsByAgent(agentId)
      return NextResponse.json(accounts)
    }

    if (platform) {
      const accounts = getAccountsByPlatform(platform)
      return NextResponse.json(accounts)
    }

    return NextResponse.json(socialAccounts)
  } catch (error) {
    console.error('[v0] Social accounts GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform, username, email, agentId, agentName } = body

    if (!platform || !username || !email || !agentId || !agentName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newAccount = createSocialAccount(platform, username, email, agentId, agentName)
    return NextResponse.json(newAccount, { status: 201 })
  } catch (error) {
    console.error('[v0] Social accounts POST error:', error)
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId, updates } = body

    if (!accountId || !updates) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const updated = updateSocialAccount(accountId, updates)
    if (!updated) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('[v0] Social accounts PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 })
  }
}
