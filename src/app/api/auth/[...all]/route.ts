import { getAuth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

let handler: ReturnType<typeof toNextJsHandler> | null = null

async function getHandler() {
  if (!handler) {
    const auth = await getAuth()
    if (auth) handler = toNextJsHandler(auth.handler)
  }
  return handler
}

export async function GET(req: Request) {
  const h = await getHandler()
  if (!h) return new Response('Auth not configured', { status: 500 })
  return h.GET(req)
}

export async function POST(req: Request) {
  const h = await getHandler()
  if (!h) return new Response('Auth not configured', { status: 500 })
  return h.POST(req)
}
