import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { OrganizationOnboardingForm } from '@/components/organization-onboarding-form'

export const dynamic = 'force-dynamic'

export default async function OrganizationOnboardingPage() {
  const auth = await getAuth()
  const session = auth ? await auth.api.getSession({ headers: await headers() }) : null

  if (!session?.user) redirect('/sign-in?callbackUrl=/onboarding/organization')

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-md">
        <OrganizationOnboardingForm />
      </div>
    </main>
  )
}
