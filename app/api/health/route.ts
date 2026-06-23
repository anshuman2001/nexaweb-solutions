import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function GET() {
  const results: Record<string, string> = {};

  // Test Firestore read
  try {
    await adminDb.collection('_health').limit(1).get();
    results.firestore_read = 'ok';
  } catch (e) {
    results.firestore_read = 'FAIL: ' + (e instanceof Error ? e.message : String(e));
  }

  // Test Firestore write
  try {
    await adminDb.collection('_health').doc('ping').set({ ts: new Date().toISOString() });
    results.firestore_write = 'ok';
  } catch (e) {
    results.firestore_write = 'FAIL: ' + (e instanceof Error ? e.message : String(e));
  }

  // Test Auth module (invalid token should give a specific auth error, not a crash)
  try {
    await adminAuth.verifyIdToken('bad-token');
    results.auth_module = 'unexpected_ok';
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    results.auth_module = msg.toLowerCase().includes('token') || msg.toLowerCase().includes('jwt') || msg.toLowerCase().includes('firebase')
      ? 'ok (rejects correctly)'
      : 'FAIL: ' + msg;
  }

  return NextResponse.json(results);
}
