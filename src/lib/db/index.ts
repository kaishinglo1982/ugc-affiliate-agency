import * as schema from './schema'

type Db = { query: Record<string, unknown>; insert: (t: unknown) => unknown; delete: (t: unknown) => unknown }

let _db: Db | null = null

async function initDb(): Promise<Db | null> {
  if (!process.env.DATABASE_URL) return null
  try {
    const { Pool } = await import('pg')
    const { drizzle } = await import('drizzle-orm/node-postgres')
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 2000 })
    return drizzle(pool, { schema }) as unknown as Db
  } catch {
    return null
  }
}

export async function getDb(): Promise<Db | null> {
  if (!_db) _db = await initDb()
  return _db
}

export async function getPool() {
  if (!process.env.DATABASE_URL) return null
  try {
    const { Pool } = await import('pg')
    return new Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 2000 })
  } catch {
    return null
  }
}
