import type { ReactNode } from 'react'
import { UgcAgencyShell } from '@/components/ugc-agency-shell'
import { requireTenantContext } from '@/lib/tenant'

export const dynamic = 'force-dynamic'

export default async function UgcAgencyLayout({ children }: { children: ReactNode }) {
  const tenant = await requireTenantContext()

  return <UgcAgencyShell tenantLabel={tenant.organizationId}>{children}</UgcAgencyShell>
}
