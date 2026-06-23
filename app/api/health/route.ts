import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    await adminDb.collection('_health').limit(1).get();
    return NextResponse.json({ status: 'ok', firebase: 'connected' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: 'error', error: msg }, { status: 500 });
  }
}
