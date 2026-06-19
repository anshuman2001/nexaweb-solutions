import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id.toUpperCase();
  const url = `https://digiagentix.com/verify?id=${id}`;

  const buffer = await QRCode.toBuffer(url, {
    type: 'png', width: 300, margin: 2,
    color: { dark: '#1e3a8a', light: '#ffffff' },
  });

  return new NextResponse(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
}
