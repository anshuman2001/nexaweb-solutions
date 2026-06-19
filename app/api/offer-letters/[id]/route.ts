import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id.toUpperCase();
  const doc = await adminDb.collection('offer_letters').doc(id).get();
  if (!doc.exists) return NextResponse.json({ detail: 'Offer letter not found' }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}
