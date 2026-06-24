'use client';
import { useEffect, useState } from 'react';

interface CertData {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  internship_role: string;
  department: string;
  duration: string;
  start_date: string;
  end_date: string;
  issued_date: string;
  status: string;
  verified: boolean;
  issued_by: string;
}

const B  = '#1E3A8A';
const G  = '#D4A017';
const GL = '#F0C040';

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return d; }
}

function printCertificate() {
  const el = document.getElementById('cert-page');
  if (!el) return;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:794px;height:1123px;border:none;visibility:hidden;';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
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

export default function CertificatePreviewPage() {
  const [cert, setCert]             = useState<CertData | null>(null);
  const [qrDataUrl, setQrDataUrl]   = useState('');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [sigFailed, setSigFailed]   = useState(false);
  const [sealFailed, setSealFailed] = useState(false);
  const [msmeFailed, setMsmeFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { setError('No certificate ID provided.'); setLoading(false); return; }
    const upper = id.toUpperCase();
    fetch(`/api/certs/verify/${upper}`)
      .then(r => r.ok ? r.json() : Promise.reject('not_found'))
      .then(data => {
        setCert(data);
        return fetch(`/api/certs/qr/${upper}`);
      })
      .then(r => r.blob())
      .then(blob => new Promise<string>(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.readAsDataURL(blob);
      }))
      .then(url => { setQrDataUrl(url); setLoading(false); })
      .catch(() => { setError('Certificate not found or server unavailable.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
      <p style={{ color: '#94a3b8', fontFamily: 'system-ui', fontSize: 15 }}>Generating certificate…</p>
    </div>
  );

  if (error || !cert) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
      <p style={{ color: '#f87171', fontSize: 16, fontFamily: 'system-ui' }}>{error || 'Certificate not found.'}</p>
    </div>
  );

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
          <span style={{ color: '#fff', fontWeight: 700 }}>{cert.student_name}</span>
          <span style={{ color: '#475569', marginLeft: 12, fontFamily: 'monospace', fontSize: 11 }}>{cert.id}</span>
        </span>
        <a href="/cert/admin" style={{
          color: '#94a3b8', fontSize: 13, textDecoration: 'none',
          border: '1px solid #334155', padding: '9px 18px', borderRadius: 8,
          fontFamily: 'system-ui',
        }}>← Back</a>
        <button onClick={printCertificate} style={{
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
        <div id="cert-page" style={{
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
            transform: 'translate(-50%,-50%) rotate(-28deg)',
            fontSize: 90, fontWeight: 900, color: `${B}07`,
            letterSpacing: 6, whiteSpace: 'nowrap',
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
            fontFamily: "'Montserrat','Arial',sans-serif",
          }}>
            DigiAgentix
          </div>

          {/* Outer border */}
          <div style={{ position: 'absolute', inset: 12, border: `3px solid ${B}`, zIndex: 1, pointerEvents: 'none' }} />
          {/* Inner gold border */}
          <div style={{ position: 'absolute', inset: 18, border: `1.5px solid ${G}`, zIndex: 1, pointerEvents: 'none' }} />

          {/* Corner ornaments */}
          {[
            { top: 8, left: 8,     borderTop: `4px solid ${G}`, borderLeft: `4px solid ${G}` },
            { top: 8, right: 8,    borderTop: `4px solid ${G}`, borderRight: `4px solid ${G}` },
            { bottom: 8, left: 8,  borderBottom: `4px solid ${G}`, borderLeft: `4px solid ${G}` },
            { bottom: 8, right: 8, borderBottom: `4px solid ${G}`, borderRight: `4px solid ${G}` },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 42, height: 42, zIndex: 2, pointerEvents: 'none', ...s }} />
          ))}

          {/* ── HEADER ── */}
          <div style={{
            background: `linear-gradient(135deg, ${B} 0%, #1e40af 60%, #1d4ed8 100%)`,
            flexShrink: 0, zIndex: 2,
          }}>
            <div style={{ padding: '16px 52px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {!logoFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/logo.png" alt="DigiAgentix" style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: 8, background: '#fff', padding: 4 }} onError={() => setLogoFailed(true)} />
                ) : (
                  <div style={{ width: 44, height: 44, background: G, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: B, fontWeight: 900, fontSize: 18 }}>D</span>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: 0.5, fontFamily: "'Montserrat','Arial',sans-serif" }}>
                    Digi<span style={{ color: GL }}>Agentix</span>
                  </div>
                  <div style={{ fontSize: 8, color: '#93c5fd', letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 2 }}>
                    AI Automation &amp; Digital Solutions
                  </div>
                </div>
              </div>

              {/* Cert number */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 8.5, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Certificate Number</div>
                <div style={{ fontSize: 13, color: GL, fontFamily: 'monospace', fontWeight: 800, letterSpacing: 1 }}>{cert.id}</div>
                <div style={{ fontSize: 9, color: '#bfdbfe', marginTop: 4, fontFamily: 'monospace' }}>Issued: {fmtDate(cert.issued_date)}</div>
              </div>
            </div>

            {/* Sub-header info bar */}
            <div style={{
              background: 'rgba(0,0,0,0.18)',
              padding: '6px 52px',
              display: 'flex', gap: 24, alignItems: 'center',
              fontSize: 8.5, color: '#93c5fd', borderTop: `1px solid rgba(255,255,255,0.1)`,
            }}>
              <span>🌐 www.digiagentix.com</span>
              <span>✉ hr@digiagentix.com</span>
              <span>📞 +91 73039 61522</span>
              <span style={{ marginLeft: 'auto' }}>GSTIN: 07ABCDE1234F1Z5 &nbsp;|&nbsp; MSME: UDYAM-XX-00-0000000</span>
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ height: 3, background: `linear-gradient(to right, ${B}, ${G} 30%, ${GL} 50%, ${G} 70%, ${B})`, flexShrink: 0, zIndex: 2 }} />

          {/* ── BODY ── */}
          <div style={{ flex: 1, position: 'relative', zIndex: 2, padding: '32px 64px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* "This is to certify that" */}
            <div style={{ fontSize: 10, letterSpacing: 6, color: '#9ca3af', textTransform: 'uppercase', fontFamily: "'Montserrat','Arial',sans-serif", marginBottom: 10 }}>
              This is to certify that
            </div>

            {/* CERTIFICATE title */}
            <div style={{ textAlign: 'center', marginBottom: 6 }}>
              <div style={{
                fontSize: 46, fontWeight: 900, color: B,
                letterSpacing: 8, textTransform: 'uppercase', lineHeight: 1,
                fontFamily: "'Montserrat','Arial',sans-serif",
                textShadow: `2px 2px 0 ${B}22`,
              }}>
                Certificate
              </div>
              <div style={{ fontSize: 13, letterSpacing: 6, color: G, textTransform: 'uppercase', fontFamily: "'Montserrat','Arial',sans-serif", marginTop: 6, fontWeight: 600 }}>
                of Internship
              </div>
            </div>

            {/* Diamond divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '70%', margin: '14px 0' }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${G})` }} />
              <div style={{ width: 10, height: 10, background: G, transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${G})` }} />
            </div>

            {/* "Presented to" */}
            <div style={{ fontSize: 10, letterSpacing: 4, color: '#9ca3af', textTransform: 'uppercase', fontFamily: "'Montserrat','Arial',sans-serif", marginBottom: 10 }}>
              Presented to
            </div>

            {/* Student name */}
            <div style={{ textAlign: 'center', marginBottom: 4 }}>
              <div style={{
                fontSize: 38, fontWeight: 700, color: B,
                letterSpacing: 1, lineHeight: 1.15,
                fontFamily: "'Cormorant Garamond','Georgia',serif",
                fontStyle: 'italic',
              }}>
                {cert.student_name}
              </div>
              <div style={{ height: 2, background: `linear-gradient(to right, transparent, ${G}, transparent)`, margin: '8px auto 0', width: 320 }} />
            </div>

            {/* Body paragraph */}
            <div style={{ textAlign: 'center', fontSize: 13, color: '#374151', lineHeight: 1.9, margin: '18px 24px 6px', fontFamily: "'Poppins','Arial',sans-serif" }}>
              has successfully completed the internship programme as
              <div style={{ fontSize: 20, fontWeight: 800, color: B, margin: '6px 0', fontFamily: "'Montserrat','Arial',sans-serif", letterSpacing: 0.5 }}>
                {cert.internship_role}
              </div>
              {cert.department && (
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                  Department of <strong style={{ color: B }}>{cert.department}</strong>
                </div>
              )}
              at <strong style={{ color: B }}>DigiAgentix</strong> during the period of
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', marginTop: 6, fontFamily: "'Montserrat','Arial',sans-serif" }}>
                {cert.duration}
              </div>
            </div>

            {/* Commendation */}
            <div style={{ textAlign: 'center', fontSize: 11.5, color: '#6b7280', margin: '12px 60px 0', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond','Georgia',serif" }}>
              We commend their dedication, professionalism, and contributions during this internship
              and wish them every success in their future endeavors.
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${G} 20%, ${G} 80%, transparent)`, margin: '20px 0 18px', width: '100%' }} />

            {/* Footer row: Date | Seal | Signature */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', padding: '0 8px' }}>

              {/* Issue date */}
              <div style={{ textAlign: 'center', minWidth: 150 }}>
                <div style={{ fontSize: 14, color: B, fontWeight: 700, fontFamily: "'Montserrat','Arial',sans-serif", marginBottom: 6 }}>{fmtDate(cert.issued_date)}</div>
                <div style={{ width: 150, height: 1.5, background: '#374151', marginBottom: 5 }} />
                <div style={{ fontSize: 9.5, color: '#6b7280', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Montserrat','Arial',sans-serif" }}>Date of Issue</div>
              </div>

              {/* Seal */}
              <div style={{ textAlign: 'center' }}>
                {sealFailed ? (
                  <div style={{ width: 100, height: 100, border: `2px solid ${B}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: B }}>
                    <span style={{ fontSize: 8, fontWeight: 700, textAlign: 'center', fontFamily: 'system-ui' }}>OFFICIAL SEAL</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/Seal.png" alt="Official Seal" style={{ width: 100, height: 100, objectFit: 'contain', display: 'block', margin: '0 auto' }} onError={() => setSealFailed(true)} />
                )}
              </div>

              {/* Signature */}
              <div style={{ textAlign: 'center', minWidth: 160 }}>
                {sigFailed ? (
                  <div style={{ height: 52, width: 150, border: `1.5px dashed ${G}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffbeb', margin: '0 auto 4px' }}>
                    <span style={{ fontSize: 9, color: G, fontStyle: 'italic', fontFamily: 'system-ui' }}>Digital Signature</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/signature.png" alt="Authorized Signature" style={{ height: 52, maxWidth: 150, objectFit: 'contain', display: 'block', margin: '0 auto 4px', mixBlendMode: 'multiply' }} onError={() => setSigFailed(true)} />
                )}
                <div style={{ width: 160, height: 1.5, background: '#374151', margin: '0 auto 5px' }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: '#111', fontFamily: "'Montserrat','Arial',sans-serif" }}>Authorized Signatory</div>
                <div style={{ fontSize: 9.5, color: '#6b7280', marginTop: 2, fontFamily: 'system-ui' }}>DigiAgentix</div>
              </div>
            </div>

            {/* QR + verify row */}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'system-ui', lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, color: '#6b7280' }}>Verify this certificate online:</div>
                <div style={{ fontFamily: 'monospace' }}>digiagentix.com/verify?id={cert.id}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right', fontSize: 9, color: '#9ca3af', fontFamily: 'system-ui' }}>
                  <div>Scan QR to verify</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 8 }}>authenticity</div>
                </div>
                {qrDataUrl && (
                  <div style={{ border: `2px solid ${B}22`, borderRadius: 8, padding: 4, background: '#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrDataUrl} alt="QR" style={{ width: 64, height: 64, display: 'block' }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gold bottom rule */}
          <div style={{ height: 3, background: `linear-gradient(to right, ${B}, ${G} 30%, ${GL} 50%, ${G} 70%, ${B})`, flexShrink: 0, zIndex: 2 }} />

          {/* ── FOOTER ── */}
          <div style={{
            background: B,
            padding: '9px 52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0, zIndex: 2,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!msmeFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/msme-logo.png" alt="MSME" style={{ height: 26, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} onError={() => setMsmeFailed(true)} />
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
