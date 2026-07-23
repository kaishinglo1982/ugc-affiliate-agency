import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { getPool } from '@/lib/db'
import type { Pool } from 'pg'

type AuthInstance = ReturnType<typeof betterAuth>

let authInstance: AuthInstance | null = null

export async function getAuth(): Promise<AuthInstance | null> {
  if (authInstance) return authInstance

  const pool = (await getPool()) as Pool | null
  if (!pool) return null

  authInstance = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 10,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
    plugins: [
      organization({
        allowUserToCreateOrganization: true,
        organizationLimit: 25,
        membershipLimit: 100,
        creatorRole: 'owner',
      }),
    ],
  })

  return authInstance
}
