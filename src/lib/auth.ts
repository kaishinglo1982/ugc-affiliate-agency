import { betterAuth } from 'better-auth'
import { getPool } from '@/lib/db'
import type { Pool } from 'pg'

let _auth: ReturnType<typeof betterAuth> | null = null

export async function getAuth(): Promise<ReturnType<typeof betterAuth> | null> {
  if (!_auth) {
    const pool = await getPool() as Pool | null
    if (!pool) return null
    _auth = betterAuth({
      database: pool,
      baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
      emailAndPassword: { enabled: true, autoSignIn: true },
      session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    } as any)
  }
  return _auth
}
