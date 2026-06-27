import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

function generateOfferId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'OL-';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

async function verifyBearer(req: NextRequest): Promise<{ email: string } | null> {
  const header = req.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  const idToken = header.slice(7);
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const user = data?.users?.[0];
    return user ? { email: user.email || '' } : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // AUTH TEMPORARILY DISABLED FOR TESTING — re-enable verifyBearer before production
    const { adminDb } = await import('@/lib/firebase-admin');
    const snap = await adminDb.collection('offer_letters').orderBy('created_at', 'desc').get();
    return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err: unknown) {
    return NextResponse.json({ detail: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // AUTH TEMPORARILY DISABLED FOR TESTING — re-enable verifyBearer before production
    const decoded = { email: 'admin@digiagentix.com' };

    const { adminDb } = await import('@/lib/firebase-admin');

    const {
      candidate_name, email, phone, role, department,
      duration, start_date, end_date, stipend, mode,
      working_hours, reporting_to, issued_date,
    } = await req.json();

    if (!candidate_name || !role || !start_date)
      return NextResponse.json({ detail: 'candidate_name, role and start_date are required' }, { status: 400 });

    let offerId = generateOfferId();
    while ((await adminDb.collection('offer_letters').doc(offerId).get()).exists)
      offerId = generateOfferId();

    const offerData = {
      candidate_name, email: email || '', phone: phone || '',
      role, department: department || '', duration: duration || '',
      start_date, end_date: end_date || '',
      stipend: stipend || '',
      mode: mode || 'Remote',
      working_hours: working_hours || '4–6 hours/day, Monday to Friday',
      reporting_to: reporting_to || 'Team Lead',
      issued_date: issued_date || new Date().toISOString().split('T')[0],
      status: 'Active',
      issued_by: decoded.email || 'DigiAgentix',
      created_at: new Date().toISOString(),
    };

    await adminDb.collection('offer_letters').doc(offerId).set(offerData);
    return NextResponse.json({ id: offerId, ...offerData });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ detail: `Server error: ${msg}` }, { status: 500 });
  }
}
