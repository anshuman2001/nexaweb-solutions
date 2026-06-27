import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // AUTH TEMPORARILY DISABLED FOR TESTING — re-enable verifyBearer before production
  const { adminDb } = await import('@/lib/firebase-admin');

  const id = params.id.toUpperCase();
  const doc = await adminDb.collection('offer_letters').doc(id).get();
  if (!doc.exists) return NextResponse.json({ detail: 'Not found' }, { status: 404 });

  await adminDb.collection('offer_letters').doc(id).update({ status: 'Revoked' });
  return NextResponse.json({ success: true });
}
