import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

function generateCertId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'DAGI-';
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
    // AUTH TEMPORARILY DISABLED FOR TESTING
    const { adminDb } = await import('@/lib/firebase-admin');
    const snap = await adminDb.collection('certificates').orderBy('created_at', 'desc').get();
    return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ detail: `Server error: ${msg}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let step = 'start';
  try {
    step = 'auth';
    // AUTH TEMPORARILY DISABLED FOR TESTING — re-enable verifyBearer before production
    const decoded = { email: 'admin@digiagentix.com' };

    step = 'parse';
    const body = await req.json();
    const { student_name, email, phone, internship_role, department, duration, start_date, end_date, issued_date, custom_id } = body;

    step = 'validate';
    if (!student_name || !internship_role || !duration)
      return NextResponse.json({ detail: 'student_name, internship_role and duration are required' }, { status: 400 });

    step = 'firebase-init';
    const { adminDb } = await import('@/lib/firebase-admin');

    step = 'gen-id';
    let certId = custom_id ? (custom_id as string).toUpperCase().trim() : generateCertId();

    step = 'check-id';
    if (custom_id) {
      if ((await adminDb.collection('certificates').doc(certId).get()).exists)
        return NextResponse.json({ detail: `Certificate ID ${certId} already exists` }, { status: 409 });
    } else {
      while ((await adminDb.collection('certificates').doc(certId).get()).exists)
        certId = generateCertId();
    }

    step = 'write';
    const certData = {
      student_name, email: email || '', phone: phone || '',
      internship_role, department: department || '', duration,
      start_date: start_date || '', end_date: end_date || '',
      issued_date: issued_date || new Date().toISOString().split('T')[0],
      status: 'Active', verified: true,
      issued_by: decoded.email || 'DigiAgentix',
      created_at: new Date().toISOString(),
    };

    await adminDb.collection('certificates').doc(certId).set(certData);
    return NextResponse.json({ id: certId, ...certData });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ detail: `Error at [${step}]: ${msg}` }, { status: 500 });
  }
}
