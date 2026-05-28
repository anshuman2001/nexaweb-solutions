import { NextRequest, NextResponse } from 'next/server';

function extractFolderId(url: string): string | null {
  const m = url.match(/\/folders\/([a-zA-Z0-9_-]{10,})/);
  return m ? m[1] : null;
}

export async function POST(req: NextRequest) {
  const { driveUrl, appsScriptUrl, websiteCol = 'Website' } = await req.json();

  const folderId = extractFolderId(driveUrl);
  if (!folderId) {
    return NextResponse.json({ error: 'Invalid Drive folder URL' }, { status: 400 });
  }
  if (!appsScriptUrl) {
    return NextResponse.json({ error: 'Apps Script URL required' }, { status: 400 });
  }

  const url = `${appsScriptUrl}?folderId=${encodeURIComponent(folderId)}&col=${encodeURIComponent(websiteCol)}`;

  try {
    const res = await fetch(url, { redirect: 'follow' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to reach Apps Script. Check the URL.' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');
  const appsScriptUrl = searchParams.get('appsScriptUrl');

  if (!jobId || !appsScriptUrl) {
    return NextResponse.json({ error: 'Missing jobId or appsScriptUrl' }, { status: 400 });
  }

  const url = `${appsScriptUrl}?action=status&jobId=${encodeURIComponent(jobId)}`;

  try {
    const res = await fetch(url, { redirect: 'follow' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to reach Apps Script.' }, { status: 502 });
  }
}
