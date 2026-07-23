import type { ReactNode } from 'react'
import { AdminShell } from '@/components/admin-shell'
import { requireTenantContext } from '@/lib/tenant'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const tenant = await requireTenantContext(['owner', 'admin'])

  return <AdminShell tenantLabel={tenant.organizationId}>{children}</AdminShell>
}
