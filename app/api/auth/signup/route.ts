import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { email, password, name, firm } = await req.json();

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ detail: data.error?.message || 'Signup failed' }, { status: 400 });
  }

  await adminDb.collection('users').doc(data.localId).set({
    email, name: name || '', firm: firm || '',
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ token: data.idToken });
}
