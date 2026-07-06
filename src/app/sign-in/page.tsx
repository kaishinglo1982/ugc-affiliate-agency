import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getAuth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

export const dynamic = 'force-dynamic'

export default async function SignInPage() {
  const _auth = await getAuth()
  const headersList = await headers()
  const session = _auth ? await _auth.api.getSession({ headers: headersList }) : null
  if (session?.user) redirect('/')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <AuthForm mode="sign-in" />
        <p className="mt-4 text-center text-sm text-bone/60">
          Don&apos;t have an account?{' '}
          <a href="/sign-up" className="text-accent hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
