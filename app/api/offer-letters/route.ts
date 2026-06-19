import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

function generateOfferId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'OL-';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

async function verifyBearer(req: NextRequest) {
  const header = req.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  try { return await adminAuth.verifyIdToken(header.slice(7)); }
  catch { return null; }
}

export async function GET(req: NextRequest) {
  if (!await verifyBearer(req)) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  const snap = await adminDb.collection('offer_letters').orderBy('created_at', 'desc').get();
  return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

export async function POST(req: NextRequest) {
  const decoded = await verifyBearer(req);
  if (!decoded) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

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
}
