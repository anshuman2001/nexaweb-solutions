'use client';
import { useEffect, useState } from 'react';

const API = 'https://brokernote-backend.onrender.com';

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

export default function CertificatePreviewPage() {
  const [cert, setCert]     = useState<CertData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { setError('No certificate ID in URL.'); setLoading(false); return; }
    const upper = id.toUpperCase();

    // Fetch certificate data
    fetch(`${API}/certs/verify/${upper}`)
      .then(r => r.ok ? r.json() : Promise.reject('not_found'))
      .then(data => {
        setCert(data);
        // Fetch QR code and convert to data URL so it prints reliably
        return fetch(`${API}/certs/qr/${upper}`);
      })
      .then(r => r.blob())
      .then(blob => new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      }))
      .then(dataUrl => { setQrDataUrl(dataUrl); setLoading(false); })
      .catch(() => { setError('Certificate not found or server error.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', fontFamily: 'system-ui' }}>
      <p style={{ color: '#6b7280', fontSize: 16 }}>Generating certificate…</p>
    </div>
  );

  if (error || !cert) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb' }}>
      <p style={{ color: '#ef4444', fontSize: 16 }}>{error || 'Certificate not found.'}</p>
    </div>
  );

  const issuedDate = new Date(cert.issued_date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      {/* ── Print / Download toolbar — hidden when printing ── */}
      <div className="print:hidden" style={{
        background: '#1e293b', padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10,
      }}>
        <span style={{ color: '#94a3b8', fontSize: 14, flex: 1 }}>
          Certificate: <span style={{ color: '#fff', fontWeight: 600 }}>{cert.student_name}</span>
          <span style={{ color: '#64748b', marginLeft: 8, fontFamily: 'monospace', fontSize: 12 }}>{cert.id}</span>
        </span>
        <a href={`/certificates`} style={{
          color: '#94a3b8', fontSize: 13, textDecoration: 'none',
          border: '1px solid #334155', padding: '8px 16px', borderRadius: 8,
        }}>← Back</a>
        <button
          onClick={() => window.print()}
          style={{
            background: '#2563eb', color: '#fff', border: 'none',
            padding: '10px 24px', borderRadius: 10, fontWeight: 700,
            fontSize: 14, cursor: 'pointer',
          }}
        >
          ⬇ Download / Print PDF
        </button>
      </div>

      {/* ── Certificate wrapper ── */}
      <div className="print:block" style={{
        background: '#d1d5db', minHeight: 'calc(100vh - 60px)',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        padding: '40px 16px',
      }}>

        {/* A4 certificate card */}
        <div id="cert-page" style={{
          width: 794, minHeight: 1123,
          background: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* ── Background watermark ── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 0,
          }}>
            <div style={{
              fontSize: 120, fontWeight: 900, color: 'rgba(37,99,235,0.03)',
              letterSpacing: 4, transform: 'rotate(-30deg)', whiteSpace: 'nowrap',
              fontFamily: 'system-ui',
            }}>
              DigiAgentix
            </div>
          </div>

          {/* ── Outer border ── */}
          <div style={{
            position: 'absolute', inset: 16,
            border: '3px solid #1e3a8a',
            zIndex: 1, pointerEvents: 'none',
          }} />

          {/* ── Inner gold border ── */}
          <div style={{
            position: 'absolute', inset: 22,
            border: '1.5px solid #b8860b',
            zIndex: 1, pointerEvents: 'none',
          }} />

          {/* ── Corner ornaments ── */}
          {[
            { top: 12, left: 12, borderTop: '3px solid #b8860b', borderLeft: '3px solid #b8860b' },
            { top: 12, right: 12, borderTop: '3px solid #b8860b', borderRight: '3px solid #b8860b' },
            { bottom: 12, left: 12, borderBottom: '3px solid #b8860b', borderLeft: '3px solid #b8860b' },
            { bottom: 12, right: 12, borderBottom: '3px solid #b8860b', borderRight: '3px solid #b8860b' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 36, height: 36, zIndex: 2, pointerEvents: 'none', ...s }} />
          ))}

          {/* ── Content area ── */}
          <div style={{ position: 'relative', zIndex: 2, padding: '56px 70px' }}>

            {/* Header row: logo left, cert no right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              {/* Logo */}
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 1, color: '#1e3a8a', fontFamily: 'system-ui' }}>
                  Digi<span style={{ color: '#2563eb' }}>Agentix</span>
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui', marginTop: 2 }}>
                  AI Automation & Digital Solutions
                </div>
              </div>
              {/* Cert No */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Certificate No.</div>
                <div style={{ fontSize: 11, color: '#374151', fontFamily: 'monospace', fontWeight: 700, marginTop: 2 }}>{cert.id}</div>
              </div>
            </div>

            {/* Top gold rule */}
            <div style={{ height: 2, background: 'linear-gradient(to right, transparent, #b8860b 20%, #b8860b 80%, transparent)', margin: '14px 0 28px' }} />

            {/* Certificate title block */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 7, color: '#9ca3af', textTransform: 'uppercase', fontFamily: 'system-ui', marginBottom: 10 }}>
                This is to certify that
              </div>
              <div style={{ fontSize: 44, fontWeight: 700, color: '#1e3a8a', letterSpacing: 6, textTransform: 'uppercase', lineHeight: 1 }}>
                Certificate
              </div>
              <div style={{ fontSize: 13, letterSpacing: 6, color: '#b8860b', textTransform: 'uppercase', fontFamily: 'system-ui', marginTop: 6 }}>
                of Internship
              </div>
            </div>

            {/* Divider with diamond */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 60px 28px' }}>
              <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
              <div style={{ width: 8, height: 8, background: '#b8860b', transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            </div>

            {/* Presented to */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: '#9ca3af', textTransform: 'uppercase', fontFamily: 'system-ui', marginBottom: 10 }}>
                Presented to
              </div>
              <div style={{ fontSize: 36, color: '#1e3a8a', fontWeight: 700, letterSpacing: 1, display: 'inline-block' }}>
                {cert.student_name}
              </div>
              {/* Underline */}
              <div style={{ height: 2, background: 'linear-gradient(to right, transparent, #b8860b, transparent)', margin: '8px auto 0', width: 320 }} />
            </div>

            {/* Body paragraph */}
            <div style={{ textAlign: 'center', fontSize: 14, color: '#374151', lineHeight: 1.9, margin: '22px 40px 18px', fontFamily: 'system-ui' }}>
              has successfully completed an internship as
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1e3a8a', margin: '4px 0', fontFamily: 'system-ui' }}>
                {cert.internship_role}
              </div>
              {cert.department && (
                <span>in the <strong style={{ color: '#1e3a8a' }}>{cert.department}</strong> department </span>
              )}
              at <strong style={{ color: '#1e3a8a' }}>DigiAgentix</strong> during the period of
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', marginTop: 6, fontFamily: 'system-ui' }}>
                {cert.duration}
              </div>
            </div>

            {/* Commendation */}
            <div style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', margin: '0 80px 32px', lineHeight: 1.8, fontStyle: 'italic' }}>
              We commend their dedication, professionalism, and contributions during this internship
              and wish them every success in their future endeavors.
            </div>

            {/* Mid gold rule */}
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #b8860b 20%, #b8860b 80%, transparent)', margin: '0 0 32px' }} />

            {/* Footer: Date | Seal | Signature | QR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 10px' }}>

              {/* Issue date */}
              <div style={{ textAlign: 'center', minWidth: 130 }}>
                <div style={{ fontSize: 14, color: '#1e3a8a', fontWeight: 600, fontFamily: 'system-ui', marginBottom: 6 }}>
                  {issuedDate}
                </div>
                <div style={{ width: 130, height: 1, background: '#374151', marginBottom: 5 }} />
                <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'system-ui' }}>
                  Date of Issue
                </div>
              </div>

              {/* Official seal */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  border: '2px solid #b8860b',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 6px',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#1e3a8a', lineHeight: 1, fontFamily: 'system-ui' }}>DA</div>
                  <div style={{ fontSize: 7, color: '#6b7280', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'system-ui', marginTop: 4 }}>DigiAgentix</div>
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Official Seal</div>
              </div>

              {/* Authorized signatory */}
              <div style={{ textAlign: 'center', minWidth: 130 }}>
                {/* Signature placeholder */}
                <div style={{ fontSize: 22, fontStyle: 'italic', color: '#1e3a8a', fontFamily: "'Dancing Script', cursive, Georgia, serif", letterSpacing: 1, marginBottom: 4 }}>
                  DigiAgentix
                </div>
                <div style={{ width: 130, height: 1, background: '#374151', marginBottom: 5, margin: '0 auto 5px' }} />
                <div style={{ fontSize: 10, color: '#374151', fontWeight: 700, fontFamily: 'system-ui', letterSpacing: 0.5 }}>
                  Authorized Signatory
                </div>
                <div style={{ fontSize: 9, color: '#6b7280', fontFamily: 'system-ui', marginTop: 2 }}>DigiAgentix</div>
              </div>
            </div>

            {/* QR code row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 20 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: 1, fontFamily: 'system-ui' }}>
                  Scan to verify authenticity
                </div>
                <div style={{ fontSize: 8, color: '#d1d5db', fontFamily: 'monospace', marginTop: 2 }}>
                  digiagentix.com/verify
                </div>
              </div>
              {qrDataUrl && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 4, background: '#fff' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="Verify QR" style={{ width: 72, height: 72, display: 'block' }} />
                </div>
              )}
            </div>

            {/* Bottom cert ID strip */}
            <div style={{
              marginTop: 16, padding: '8px 0', borderTop: '1px dashed #e5e7eb',
              textAlign: 'center', fontSize: 9, color: '#d1d5db',
              fontFamily: 'monospace', letterSpacing: 1,
            }}>
              {cert.id} · Issued by DigiAgentix · Verify at digiagentix.com/verify?id={cert.id}
            </div>

          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body * { visibility: hidden; }
          #cert-page, #cert-page * { visibility: visible; }
          #cert-page {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            min-height: 100vh !important;
            box-shadow: none !important;
            padding: 40px 60px !important;
          }
        }
      `}</style>
    </>
  );
}
