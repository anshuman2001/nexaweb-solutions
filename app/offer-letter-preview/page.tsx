'use client';
import { useEffect, useState } from 'react';

interface OfferData {
  id: string;
  candidate_name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  duration: string;
  start_date: string;
  end_date: string;
  stipend: string;
  mode: string;
  working_hours: string;
  reporting_to: string;
  issued_date: string;
  status: string;
}

function fmtDate(d: string) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return d; }
}

function printLetter() {
  const el = document.getElementById('offer-page');
  if (!el) return;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:794px;height:1123px;border:none;visibility:hidden;';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>
    @page { size: A4 portrait; margin: 0; }
    html, body { margin: 0; padding: 0; width: 210mm; height: 297mm; overflow: hidden; background: #fff; }
    body > div { width: 210mm !important; min-height: 0 !important; height: 297mm !important; overflow: hidden !important; box-shadow: none !important; }
  </style></head><body>${el.outerHTML}</body></html>`);
  doc.close();
  const imgs = Array.from(doc.querySelectorAll('img'));
  let pending = imgs.length;
  const doPrint = () => {
    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();
    setTimeout(() => { if (document.body.contains(iframe)) document.body.removeChild(iframe); }, 2000);
  };
  if (pending === 0) { setTimeout(doPrint, 80); return; }
  const timeout = setTimeout(doPrint, 2500);
  imgs.forEach(img => {
    img.onload = img.onerror = () => { if (--pending === 0) { clearTimeout(timeout); doPrint(); } };
  });
}

export default function OfferLetterPreviewPage() {
  const [offer, setOffer]       = useState<OfferData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [sigFailed, setSigFailed]   = useState(false);
  const [msmeFailed, setMsmeFailed] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { setError('No offer letter ID provided.'); setLoading(false); return; }
    fetch(`/api/offer-letters/${id.toUpperCase()}`)
      .then(r => r.ok ? r.json() : Promise.reject('not_found'))
      .then(data => { setOffer(data); setLoading(false); })
      .catch(() => { setError('Offer letter not found or server unavailable.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb' }}>
      <p style={{ color: '#6b7280', fontFamily: 'system-ui' }}>Loading offer letter…</p>
    </div>
  );

  if (error || !offer) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb' }}>
      <p style={{ color: '#ef4444', fontSize: 16, fontFamily: 'system-ui' }}>{error || 'Offer letter not found.'}</p>
    </div>
  );

  const details: { label: string; value: string }[] = [
    { label: 'Position',      value: offer.role },
    { label: 'Department',    value: offer.department || '—' },
    { label: 'Mode',          value: offer.mode || 'Remote' },
    { label: 'Start Date',    value: fmtDate(offer.start_date) },
    { label: 'End Date',      value: offer.end_date ? fmtDate(offer.end_date) : '—' },
    { label: 'Duration',      value: offer.duration || '—' },
    { label: 'Working Hours', value: offer.working_hours || '4–6 hours/day, Mon–Fri' },
    { label: 'Reporting To',  value: offer.reporting_to || 'Team Lead' },
    { label: 'Stipend',       value: offer.stipend || 'Unpaid Internship' },
  ];

  return (
    <>
      {/* Toolbar (hidden on print) */}
      <div className="print:hidden" style={{
        background: '#1e293b', padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <span style={{ color: '#94a3b8', fontSize: 14, flex: 1 }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>{offer.candidate_name}</span>
          <span style={{ color: '#475569', marginLeft: 10, fontFamily: 'monospace', fontSize: 12 }}>{offer.id}</span>
        </span>
        <a href="/offer-letters" style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none', border: '1px solid #334155', padding: '8px 16px', borderRadius: 8 }}>← Back</a>
        <button
          onClick={printLetter}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 26px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
        >
          ⬇ Download / Print PDF
        </button>
      </div>

      {/* Page wrapper */}
      <div style={{ background: '#d1d5db', minHeight: 'calc(100vh - 56px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '36px 16px' }}>

        {/* A4 card */}
        <div id="offer-page" style={{
          width: 794, height: 1123,
          background: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          fontFamily: "'Arial','Helvetica',sans-serif",
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>

          {/* Navy header */}
          <div style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)', padding: '20px 52px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: 0.5 }}>
                Digi<span style={{ color: '#93c5fd' }}>Agentix</span>
              </div>
              <div style={{ fontSize: 9, color: '#93c5fd', letterSpacing: 3, textTransform: 'uppercase', marginTop: 3 }}>
                AI Automation &amp; Digital Solutions
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: 2, textTransform: 'uppercase' }}>
                Internship Offer Letter
              </div>
              <div style={{ fontSize: 10, color: '#93c5fd', marginTop: 5, fontFamily: 'monospace' }}>
                Ref: {offer.id}&nbsp;&nbsp;|&nbsp;&nbsp;Date: {fmtDate(offer.issued_date)}
              </div>
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ height: 3, background: 'linear-gradient(to right,#b8860b,#f59e0b,#b8860b)', flexShrink: 0 }} />

          {/* Letter body */}
          <div style={{ flex: 1, padding: '28px 52px 20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* To block */}
            <div style={{ marginBottom: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>
              <div style={{ fontWeight: 700 }}>To,</div>
              <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: 13 }}>{offer.candidate_name}</div>
              {(offer.email || offer.phone) && (
                <div style={{ color: '#6b7280', fontSize: 11 }}>
                  {offer.email}{offer.email && offer.phone ? ' | ' : ''}{offer.phone}
                </div>
              )}
            </div>

            {/* Subject line */}
            <div style={{ fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 16, borderLeft: '3px solid #b8860b', paddingLeft: 10 }}>
              Subject: Offer of Internship — {offer.role}
            </div>

            {/* Dear */}
            <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.75, marginBottom: 16 }}>
              Dear <strong style={{ color: '#1e3a8a' }}>{offer.candidate_name}</strong>,
              <br /><br />
              We are pleased to extend this Internship Offer at <strong>DigiAgentix</strong>. After careful evaluation, we are delighted to invite you to join our team. Please review the details of your internship engagement below:
            </div>

            {/* Details grid */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 20px', marginBottom: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 32px' }}>
                {details.map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 6, fontSize: 11, alignItems: 'flex-start' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600, minWidth: 96, flexShrink: 0 }}>{label}:</span>
                    <span style={{ color: '#111827', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1e3a8a', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                Terms &amp; Conditions
              </div>
              {[
                'Maintain strict confidentiality of all company information, data, and business processes during and after the internship period.',
                'Adhere to DigiAgentix\'s code of conduct, work ethics, and professional standards throughout the internship.',
                'This offer is valid solely for the internship duration specified above and does not constitute an employment contract.',
                'Upon successful completion of the internship, a Certificate of Internship will be awarded by DigiAgentix.',
                'DigiAgentix reserves the right to modify or terminate this internship engagement with prior written notice.',
              ].map((term, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11, color: '#374151', marginBottom: 5, lineHeight: 1.55 }}>
                  <span style={{ color: '#b8860b', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{term}</span>
                </div>
              ))}
            </div>

            {/* Acceptance note */}
            <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 18 }}>
              By joining DigiAgentix as an intern, you confirm your acceptance of all terms and conditions stated above. We warmly welcome you to our team.
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(to right,transparent,#b8860b 20%,#b8860b 80%,transparent)', marginBottom: 18 }} />

            {/* Signature row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                {sigFailed ? (
                  <div style={{ height: 50, width: 140, border: '1.5px dashed #b8860b', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffbeb', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: '#b8860b', fontStyle: 'italic' }}>Signature</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/signature.png" alt="Signature" style={{ height: 50, maxWidth: 140, objectFit: 'contain', display: 'block', marginBottom: 4, mixBlendMode: 'multiply' }} onError={() => setSigFailed(true)} />
                )}
                <div style={{ width: 160, height: 1, background: '#374151', marginBottom: 5 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>Authorized Signatory</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>DigiAgentix</div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Seal.png" alt="Official Seal" style={{ width: 90, height: 90, objectFit: 'contain' }} />
            </div>
          </div>

          {/* Gold bottom rule */}
          <div style={{ height: 3, background: 'linear-gradient(to right,#b8860b,#f59e0b,#b8860b)', flexShrink: 0 }} />

          {/* MSME footer */}
          <div style={{ background: '#f8fafc', padding: '10px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!msmeFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/msme-logo.png" alt="MSME" style={{ height: 36, objectFit: 'contain' }} onError={() => setMsmeFailed(true)} />
              )}
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#374151' }}>MSME Registered</div>
                <div style={{ fontSize: 8, color: '#9ca3af' }}>Micro, Small &amp; Medium Enterprises</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 9, color: '#9ca3af' }}>
              <div>This is an official document issued by DigiAgentix.</div>
              <div style={{ fontFamily: 'monospace', marginTop: 1 }}>digiagentix.com</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
