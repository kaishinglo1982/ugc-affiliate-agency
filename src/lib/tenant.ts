import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { getPool } from '@/lib/db'

export type TenantRole = 'owner' | 'admin' | 'member'

export interface TenantContext {
  userId: string
  userEmail: string
  organizationId: string
  role: TenantRole
}

interface SessionPayload {
  user?: {
    id?: string
    email?: string
  }
  session?: {
    activeOrganizationId?: string | null
  }
}

function normalizeRole(role: string): TenantRole {
  if (role === 'owner' || role === 'admin') return role
  return 'member'
}

export async function getTenantContext(requestHeaders?: Headers): Promise<TenantContext | null> {
  const auth = await getAuth()
  if (!auth) return null

  const incomingHeaders = requestHeaders ?? await headers()
  const rawSession: unknown = await auth.api.getSession({ headers: incomingHeaders })
  const session = rawSession as SessionPayload | null

  const userId = session?.user?.id
  const userEmail = session?.user?.email
  const organizationId = session?.session?.activeOrganizationId

  if (!userId || !userEmail || !organizationId) return null

  const pool = await getPool()
  if (!pool) return null

  const membership = await pool.query<{ role: string }>(
    'SELECT role FROM member WHERE "organizationId" = $1 AND "userId" = $2 LIMIT 1',
    [organizationId, userId],
  )

  const role = membership.rows[0]?.role
  if (!role) return null

  return {
    userId,
    userEmail,
    organizationId,
    role: normalizeRole(role),
  }
}

export async function requireTenantContext(
  allowedRoles: readonly TenantRole[] = ['owner', 'admin', 'member'],
): Promise<TenantContext> {
  const context = await getTenantContext()

  if (!context) redirect('/onboarding/organization')
  if (!allowedRoles.includes(context.role)) redirect('/unauthorized')

  return context
}

export function assertTenantResource(resourceTenantId: string, context: TenantContext): void {
  if (resourceTenantId !== context.organizationId) {
    throw new Error('TENANT_ACCESS_DENIED')
  }
}
