import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const results: Record<string, string> = {};

  try {
    const { adminDb } = await import('@/lib/firebase-admin');

    try {
      await adminDb.collection('_health').limit(1).get();
      results.firestore_read = 'ok';
    } catch (e) {
      results.firestore_read = 'FAIL: ' + (e instanceof Error ? e.message : String(e));
    }

    try {
      await adminDb.collection('_health').doc('ping').set({ ts: new Date().toISOString() });
      results.firestore_write = 'ok';
    } catch (e) {
      results.firestore_write = 'FAIL: ' + (e instanceof Error ? e.message : String(e));
    }
  } catch (e) {
    results.firebase_init = 'FAIL: ' + (e instanceof Error ? e.message : String(e));
  }

  return NextResponse.json(results);
}
