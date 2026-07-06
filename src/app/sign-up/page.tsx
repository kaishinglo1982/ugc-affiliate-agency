import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getAuth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

export const dynamic = 'force-dynamic'

export default async function SignUpPage() {
  const auth = await getAuth()
  const session = auth ? await auth.api.getSession({ headers: await headers() }) : null
  if (session?.user) redirect('/')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <AuthForm mode="sign-up" />
        <p className="mt-4 text-center text-sm text-bone/60">
          Already have an account?{' '}
          <a href="/sign-in" className="text-accent hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
