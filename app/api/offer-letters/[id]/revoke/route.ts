import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const header = req.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  try { await adminAuth.verifyIdToken(header.slice(7)); }
  catch { return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 }); }

  const id = params.id.toUpperCase();
  const doc = await adminDb.collection('offer_letters').doc(id).get();
  if (!doc.exists) return NextResponse.json({ detail: 'Not found' }, { status: 404 });

  await adminDb.collection('offer_letters').doc(id).update({ status: 'Revoked' });
  return NextResponse.json({ success: true });
}
