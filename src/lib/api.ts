import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function ok<T>(data: T) { return NextResponse.json({ ok: true, data }); }
export function fail(error: unknown, status = 400) {
  if (error instanceof ZodError) return NextResponse.json({ ok: false, issues: error.issues }, { status });
  return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status });
}
