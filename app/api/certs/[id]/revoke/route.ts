import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

async function verifyBearer(req: NextRequest): Promise<boolean> {
  const header = req.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return false;
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: header.slice(7) }) }
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await verifyBearer(req)) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

  const id = params.id.toUpperCase();
  const doc = await adminDb.collection('certificates').doc(id).get();
  if (!doc.exists) return NextResponse.json({ detail: 'Not found' }, { status: 404 });

  await adminDb.collection('certificates').doc(id).update({ status: 'Revoked', verified: false });
  return NextResponse.json({ success: true });
}
