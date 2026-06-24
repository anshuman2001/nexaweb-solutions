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

function refNo(id: string) {
  const year = new Date().getFullYear();
  return `DAI/INT/${year}/${id.replace('OL-', '')}`;
}

function printLetter() {
  const el = document.getElementById('offer-page');
  if (!el) return;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:794px;height:1123px;border:none;visibility:hidden;';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
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
  if (pending === 0) { setTimeout(doPrint, 400); return; }
  const timeout = setTimeout(doPrint, 3000);
  imgs.forEach(img => {
    img.onload = img.onerror = () => { if (--pending === 0) { clearTimeout(timeout); doPrint(); } };
  });
}

const B = '#1E3A8A';
const G = '#D4A017';
const GL = '#F0C040';

export default function OfferLetterPreviewPage() {
  const [offer, setOffer]             = useState<OfferData | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [sigFailed, setSigFailed]     = useState(false);
  const [sealFailed, setSealFailed]   = useState(false);
  const [msmeFailed, setMsmeFailed]   = useState(false);
  const [logoFailed, setLogoFailed]   = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { setError('No offer letter ID provided.'); setLoading(false); return; }
    fetch(`/api/offer-letters/${id.toUpperCase()}`)
      .then(r => r.ok ? r.json() : Promise.reject('not_found'))
      .then(data => { setOffer(data); setLoading(false); })
      .catch(() => { setError('Offer letter not found or server unavailable.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
      <p style={{ color: '#94a3b8', fontFamily: 'system-ui', fontSize: 15 }}>Loading offer letter…</p>
    </div>
  );

  if (error || !offer) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
      <p style={{ color: '#f87171', fontSize: 16, fontFamily: 'system-ui' }}>{error || 'Offer letter not found.'}</p>
    </div>
  );

  const details = [
    { label: 'Position',        value: offer.role },
    { label: 'Department',      value: offer.department || 'Computer Science & Technology' },
    { label: 'Mode',            value: offer.mode || 'Remote' },
    { label: 'Start Date',      value: fmtDate(offer.start_date) },
    { label: 'Duration',        value: offer.duration || '—' },
    { label: 'Working Hours',   value: offer.working_hours || '4–6 Hours/Day, Mon–Fri' },
    { label: 'Reporting To',    value: offer.reporting_to || 'Team Lead' },
    { label: 'Stipend',         value: offer.stipend || 'Nil (Unpaid Internship)' },
  ];

  const responsibilities = [
    'Assist in AI/ML model development, training, and testing.',
    'Conduct research on emerging AI technologies and frameworks.',
    'Participate in project discussions, code reviews, and documentation.',
    'Support automation workflows and data analysis tasks.',
    'Collaborate with team members on assigned deliverables.',
  ];

  const terms = [
    'Maintain strict confidentiality of all company information, data, and business processes during and after the internship period.',
    'Adhere to DigiAgentix\'s code of conduct, work ethics, and professional standards throughout the engagement.',
    'This offer is valid solely for the internship duration specified above and does not constitute an employment contract or guarantee of future employment.',
    'Upon successful completion, a Certificate of Internship will be issued by DigiAgentix.',
    'DigiAgentix reserves the right to modify or terminate this internship with prior written notice in case of policy violations.',
  ];

  return (
    <>
      {/* Toolbar */}
      <div className="print:hidden" style={{
        background: '#0f172a', padding: '14px 28px',
        display: 'flex', alignItems: 'center', gap: 14,
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: `2px solid ${G}`,
      }}>
        <span style={{ color: '#94a3b8', fontSize: 14, flex: 1, fontFamily: 'system-ui' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>{offer.candidate_name}</span>
          <span style={{ color: '#475569', marginLeft: 12, fontFamily: 'monospace', fontSize: 11 }}>{offer.id}</span>
        </span>
        <a href="/offer-letter/admin" style={{
          color: '#94a3b8', fontSize: 13, textDecoration: 'none',
          border: '1px solid #334155', padding: '9px 18px', borderRadius: 8,
          fontFamily: 'system-ui',
        }}>← Back</a>
        <button onClick={printLetter} style={{
          background: `linear-gradient(135deg, ${B}, #2563eb)`,
          color: '#fff', border: 'none', padding: '10px 28px',
          borderRadius: 10, fontWeight: 700, fontSize: 14,
          cursor: 'pointer', fontFamily: 'system-ui',
          boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
        }}>
          ⬇ Download / Print PDF
        </button>
      </div>

      {/* Page background */}
      <div style={{ background: '#1e293b', minHeight: 'calc(100vh - 57px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 16px' }}>

        {/* A4 card */}
        <div id="offer-page" style={{
          width: 794, height: 1123,
          background: '#fff',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          fontFamily: "'Poppins','Montserrat','Arial',sans-serif",
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* Watermark */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%) rotate(-30deg)',
            fontSize: 80, fontWeight: 900, color: `${B}08`,
            letterSpacing: 6, whiteSpace: 'nowrap',
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
            fontFamily: "'Montserrat','Arial',sans-serif",
          }}>
            DigiAgentix
          </div>

          {/* Left blue sidebar accent */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 5,
            background: `linear-gradient(to bottom, ${G}, ${B} 40%, ${B})`,
            zIndex: 1,
          }} />

          {/* ── HEADER ── */}
          <div style={{
            background: `linear-gradient(135deg, ${B} 0%, #1e40af 60%, #1d4ed8 100%)`,
            padding: '0 0 0 5px',
            flexShrink: 0, zIndex: 1,
          }}>
            <div style={{ padding: '18px 48px 18px 44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {!logoFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/logo.png" alt="DigiAgentix" style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: 8, background: '#fff', padding: 4 }} onError={() => setLogoFailed(true)} />
                ) : (
                  <div style={{ width: 48, height: 48, background: G, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: B, fontWeight: 900, fontSize: 18 }}>D</span>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.5, fontFamily: "'Montserrat','Arial',sans-serif" }}>
                    Digi<span style={{ color: GL }}>Agentix</span>
                  </div>
                  <div style={{ fontSize: 8.5, color: '#93c5fd', letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 2 }}>
                    AI Automation &amp; Digital Solutions
                  </div>
                </div>
              </div>

              {/* Doc title */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: '#fff',
                  letterSpacing: 2.5, textTransform: 'uppercase',
                  fontFamily: "'Montserrat','Arial',sans-serif",
                  borderBottom: `2px solid ${G}`, paddingBottom: 6, marginBottom: 6,
                }}>
                  Internship Offer Letter
                </div>
                <div style={{ fontSize: 10, color: '#bfdbfe', fontFamily: 'monospace', lineHeight: 1.7 }}>
                  <div>Ref No: {refNo(offer.id)}</div>
                  <div>Date: {fmtDate(offer.issued_date)}</div>
                </div>
              </div>
            </div>

            {/* Sub-header info bar */}
            <div style={{
              background: 'rgba(0,0,0,0.18)',
              padding: '7px 48px 7px 48px',
              display: 'flex', gap: 24, alignItems: 'center',
              fontSize: 8.5, color: '#93c5fd', borderTop: `1px solid rgba(255,255,255,0.1)`,
            }}>
              <span>🌐 www.digiagentix.com</span>
              <span>✉ hr@digiagentix.com</span>
              <span>📞 +91 73039 61522</span>
              <span style={{ marginLeft: 'auto' }}>GSTIN: 07ABCDE1234F1Z5 &nbsp;|&nbsp; MSME: UDYAM-XX-00-0000000</span>
            </div>
          </div>

          {/* Gold top rule */}
          <div style={{ height: 3, background: `linear-gradient(to right, ${B}, ${G} 30%, ${GL} 50%, ${G} 70%, ${B})`, flexShrink: 0, zIndex: 1 }} />

          {/* ── BODY ── */}
          <div style={{ flex: 1, padding: '20px 48px 14px 48px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>

            {/* To block */}
            <div style={{ marginBottom: 12, fontSize: 11.5, color: '#374151', lineHeight: 1.8 }}>
              <div style={{ fontWeight: 700, color: '#111' }}>To,</div>
              <div style={{ fontWeight: 700, color: B, fontSize: 13 }}>{offer.candidate_name}</div>
              {(offer.email || offer.phone) && (
                <div style={{ color: '#6b7280', fontSize: 10.5 }}>
                  {offer.email}{offer.email && offer.phone ? '  |  ' : ''}{offer.phone}
                </div>
              )}
            </div>

            {/* Subject */}
            <div style={{
              fontSize: 11.5, fontWeight: 700, color: '#111',
              marginBottom: 12,
              background: `linear-gradient(to right, ${B}15, transparent)`,
              borderLeft: `3px solid ${G}`,
              padding: '7px 14px',
              borderRadius: '0 6px 6px 0',
            }}>
              Subject: Offer of Internship — <span style={{ color: B }}>{offer.role}</span>
            </div>

            {/* Dear paragraph */}
            <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.75, marginBottom: 13 }}>
              Dear <strong style={{ color: B }}>{offer.candidate_name}</strong>,
              <br /><br />
              We are pleased to offer you the position of <strong style={{ color: B }}>{offer.role}</strong> at <strong>DigiAgentix</strong>. Based on your profile and evaluation, we are delighted to welcome you to our team. Please review the details of your internship engagement below:
            </div>

            {/* Details grid */}
            <div style={{
              background: '#f8faff', border: `1px solid ${B}22`,
              borderRadius: 8, padding: '12px 18px', marginBottom: 12,
              borderTop: `3px solid ${B}`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 9 }}>
                Internship Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 28px' }}>
                {details.map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 6, fontSize: 10.5, alignItems: 'flex-start', borderBottom: '1px dotted #e5e7eb', paddingBottom: 4 }}>
                    <span style={{ color: '#6b7280', fontWeight: 600, minWidth: 100, flexShrink: 0 }}>{label}:</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-column: Roles + Terms */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>

              {/* Roles & Responsibilities */}
              <div style={{ flex: 1, background: '#fffbeb', border: `1px solid ${G}44`, borderRadius: 8, padding: '10px 14px', borderTop: `3px solid ${G}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 7 }}>
                  Roles &amp; Responsibilities
                </div>
                {responsibilities.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, fontSize: 10, color: '#374151', marginBottom: 4, lineHeight: 1.5 }}>
                    <span style={{ color: G, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>▸</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div style={{ flex: 1, background: '#f0f9ff', border: `1px solid ${B}22`, borderRadius: 8, padding: '10px 14px', borderTop: `3px solid ${B}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 7 }}>
                  Terms &amp; Conditions
                </div>
                {terms.map((term, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, fontSize: 10, color: '#374151', marginBottom: 5, lineHeight: 1.5 }}>
                    <span style={{ color: B, fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate acceptance */}
            <div style={{
              background: '#f9fafb', border: '1px solid #e5e7eb',
              borderRadius: 8, padding: '10px 16px', marginBottom: 10,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>
                Candidate Acceptance
              </div>
              <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 10 }}>
                I hereby accept the internship offer and agree to comply with all terms and conditions stated above.
              </div>
              <div style={{ display: 'flex', gap: 32 }}>
                <div>
                  <div style={{ width: 160, borderBottom: '1.5px solid #374151', marginBottom: 4 }} />
                  <div style={{ fontSize: 9.5, color: '#6b7280' }}>Candidate Signature</div>
                </div>
                <div>
                  <div style={{ width: 120, borderBottom: '1.5px solid #374151', marginBottom: 4 }} />
                  <div style={{ fontSize: 9.5, color: '#6b7280' }}>Date</div>
                </div>
              </div>
            </div>

            {/* Gold rule */}
            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${G} 20%, ${G} 80%, transparent)`, marginBottom: 10 }} />

            {/* Signature row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                {sigFailed ? (
                  <div style={{ height: 44, width: 130, border: `1.5px dashed ${G}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffbeb', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: G, fontStyle: 'italic' }}>Digital Signature</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/signature.png" alt="Authorized Signature" style={{ height: 44, maxWidth: 130, objectFit: 'contain', display: 'block', marginBottom: 4, mixBlendMode: 'multiply' }} onError={() => setSigFailed(true)} />
                )}
                <div style={{ width: 155, height: 1, background: '#374151', marginBottom: 4 }} />
                <div style={{ fontSize: 10.5, fontWeight: 700, color: '#111' }}>HR Manager</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>DigiAgentix</div>
                <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1, fontStyle: 'italic' }}>Authorized Signatory</div>
              </div>

              {sealFailed ? (
                <div style={{ width: 78, height: 78, border: `2px solid ${B}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: B }}>
                  <span style={{ fontSize: 8, fontWeight: 700, textAlign: 'center' }}>OFFICIAL SEAL</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/Seal.png" alt="Official Seal" style={{ width: 78, height: 78, objectFit: 'contain' }} onError={() => setSealFailed(true)} />
              )}
            </div>
          </div>

          {/* Gold bottom rule */}
          <div style={{ height: 3, background: `linear-gradient(to right, ${B}, ${G} 30%, ${GL} 50%, ${G} 70%, ${B})`, flexShrink: 0, zIndex: 1 }} />

          {/* ── FOOTER ── */}
          <div style={{
            background: B,
            padding: '9px 48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0, zIndex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!msmeFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/msme-logo.png" alt="MSME" style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} onError={() => setMsmeFailed(true)} />
              )}
              <div>
                <div style={{ fontSize: 8.5, fontWeight: 700, color: GL }}>MSME Registered Enterprise</div>
                <div style={{ fontSize: 7.5, color: '#93c5fd' }}>Reg No: UDYAM-XX-00-0000000</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: 8.5, color: '#93c5fd' }}>
              <div style={{ color: GL, fontWeight: 600 }}>DigiAgentix</div>
              <div>GSTIN: 07ABCDE1234F1Z5</div>
            </div>

            <div style={{ textAlign: 'right', fontSize: 8.5, color: '#93c5fd', lineHeight: 1.7 }}>
              <div>www.digiagentix.com</div>
              <div>hr@digiagentix.com &nbsp;|&nbsp; +91 73039 61522</div>
              <div style={{ fontSize: 7.5, color: '#60a5fa', marginTop: 1 }}>This is an official document issued by DigiAgentix.</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
