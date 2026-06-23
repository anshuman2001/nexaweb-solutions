import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

function generateCertId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'DAGI-';
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

  const snap = await adminDb.collection('certificates').orderBy('created_at', 'desc').get();
  return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

export async function POST(req: NextRequest) {
  const decoded = await verifyBearer(req);
  if (!decoded) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

  const { student_name, email, phone, internship_role, department, duration, start_date, end_date, issued_date, custom_id } = await req.json();
  if (!student_name || !internship_role || !duration)
    return NextResponse.json({ detail: 'student_name, internship_role and duration are required' }, { status: 400 });

  let certId = custom_id ? custom_id.toUpperCase().trim() : generateCertId();
  if (!custom_id) {
    while ((await adminDb.collection('certificates').doc(certId).get()).exists)
      certId = generateCertId();
  } else if ((await adminDb.collection('certificates').doc(certId).get()).exists) {
    return NextResponse.json({ detail: `Certificate ID ${certId} already exists` }, { status: 409 });
  }

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
}
