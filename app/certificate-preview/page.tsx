'use client';
import { useEffect, useState } from 'react';

const API = '';

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

/* Signature image with fallback placeholder */
function SignatureImg() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div style={{
      height:60, width:160, margin:'0 auto 2px',
      border:'1.5px dashed #b8860b', borderRadius:6,
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'#fffbeb',
    }}>
      <span style={{ fontSize:10, color:'#b8860b', fontStyle:'italic', fontFamily:'system-ui' }}>Signature</span>
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/signature.png"
      alt="Authorized Signature"
      style={{ height:60, maxWidth:160, objectFit:'contain', display:'block', margin:'0 auto 2px', mixBlendMode:'screen' }}
      onError={() => setFailed(true)}
    />
  );
}

/* MSME logo with fallback */
function MsmeLogo() {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/msme-logo.png"
          alt="MSME"
          style={{ height:44, width:'auto', objectFit:'contain', display:'block' }}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div style={{
          height:44, width:44,
          border:'1.5px dashed #9ca3af', borderRadius:6,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'#f9fafb',
        }}>
          <span style={{ fontSize:8, color:'#9ca3af', fontFamily:'system-ui', textAlign:'center' }}>MSME<br/>Logo</span>
        </div>
      )}
      <div>
        <div style={{ fontSize:9, color:'#374151', fontWeight:700, fontFamily:'system-ui', letterSpacing:0.5 }}>MSME Registered</div>
        <div style={{ fontSize:8, color:'#9ca3af', fontFamily:'system-ui', marginTop:1 }}>Micro, Small & Medium Enterprises</div>
      </div>
    </div>
  );
}

function printCertificate() {
  const certEl = document.getElementById('cert-page');
  if (!certEl) return;

  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:794px;height:1123px;border:none;visibility:hidden;';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>
    @page { size: A4 portrait; margin: 0; }
    html, body { margin: 0; padding: 0; width: 210mm; height: 297mm; overflow: hidden; background: #fff; }
    body > div { width: 210mm !important; min-height: 0 !important; height: 297mm !important; overflow: hidden !important; box-shadow: none !important; font-family: Georgia, 'Times New Roman', serif; }
  </style></head><body>${certEl.outerHTML}</body></html>`);
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

export default function CertificatePreviewPage() {
  const [cert, setCert]         = useState<CertData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

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
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#e5e7eb', fontFamily:'system-ui' }}>
      <p style={{ color:'#6b7280' }}>Generating certificate…</p>
    </div>
  );

  if (error || !cert) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#e5e7eb' }}>
      <p style={{ color:'#ef4444', fontSize:16 }}>{error || 'Certificate not found.'}</p>
    </div>
  );

  const issuedDate = (() => {
    try {
      return new Date(cert.issued_date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    } catch { return cert.issued_date; }
  })();

  return (
    <>
      {/* Toolbar */}
      <div className="print:hidden" style={{
        background:'#1e293b', padding:'14px 24px',
        display:'flex', alignItems:'center', gap:12,
        position:'sticky', top:0, zIndex:10,
      }}>
        <span style={{ color:'#94a3b8', fontSize:14, flex:1 }}>
          <span style={{ color:'#fff', fontWeight:600 }}>{cert.student_name}</span>
          <span style={{ color:'#475569', marginLeft:10, fontFamily:'monospace', fontSize:12 }}>{cert.id}</span>
        </span>
        <a href="/certificates" style={{ color:'#94a3b8', fontSize:13, textDecoration:'none', border:'1px solid #334155', padding:'8px 16px', borderRadius:8 }}>← Back</a>
        <button
          onClick={printCertificate}
          style={{ background:'#2563eb', color:'#fff', border:'none', padding:'10px 26px', borderRadius:10, fontWeight:700, fontSize:14, cursor:'pointer' }}
        >
          ⬇ Download / Print PDF
        </button>
      </div>

      {/* Certificate wrapper */}
      <div className="print:block" style={{ background:'#d1d5db', minHeight:'calc(100vh - 56px)', display:'flex', justifyContent:'center', alignItems:'flex-start', padding:'36px 16px' }}>

        {/* A4 card */}
        <div id="cert-page" style={{
          width:794, minHeight:1123,
          background:'#fff',
          boxShadow:'0 20px 60px rgba(0,0,0,0.25)',
          fontFamily:"'Georgia','Times New Roman',serif",
          position:'relative', overflow:'hidden',
        }}>

          {/* Watermark */}
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', zIndex:0 }}>
            <div style={{ fontSize:110, fontWeight:900, color:'rgba(37,99,235,0.03)', transform:'rotate(-28deg)', whiteSpace:'nowrap', fontFamily:'system-ui', letterSpacing:4 }}>DigiAgentix</div>
          </div>

          {/* Borders */}
          <div style={{ position:'absolute', inset:14, border:'3px solid #1e3a8a', zIndex:1, pointerEvents:'none' }} />
          <div style={{ position:'absolute', inset:20, border:'1.5px solid #b8860b', zIndex:1, pointerEvents:'none' }} />

          {/* Corner ornaments */}
          {[
            { top:10, left:10,    borderTop:'3px solid #b8860b', borderLeft:'3px solid #b8860b' },
            { top:10, right:10,   borderTop:'3px solid #b8860b', borderRight:'3px solid #b8860b' },
            { bottom:10, left:10, borderBottom:'3px solid #b8860b', borderLeft:'3px solid #b8860b' },
            { bottom:10, right:10,borderBottom:'3px solid #b8860b', borderRight:'3px solid #b8860b' },
          ].map((s,i) => (
            <div key={i} style={{ position:'absolute', width:38, height:38, zIndex:2, pointerEvents:'none', ...s }} />
          ))}

          {/* Content */}
          <div style={{ position:'relative', zIndex:2, padding:'52px 68px 36px' }}>

            {/* ── Header: Logo + Cert No ── */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
              <div>
                <div style={{ fontSize:26, fontWeight:900, color:'#1e3a8a', fontFamily:'system-ui', letterSpacing:0.5 }}>
                  Digi<span style={{ color:'#2563eb' }}>Agentix</span>
                </div>
                <div style={{ fontSize:9, color:'#9ca3af', letterSpacing:3, textTransform:'uppercase', fontFamily:'system-ui', marginTop:2 }}>
                  AI Automation & Digital Solutions
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:9, color:'#9ca3af', letterSpacing:2, textTransform:'uppercase', fontFamily:'system-ui' }}>Certificate No.</div>
                <div style={{ fontSize:11, color:'#374151', fontFamily:'monospace', fontWeight:700, marginTop:2 }}>{cert.id}</div>
              </div>
            </div>

            {/* Top gold rule */}
            <div style={{ height:2, background:'linear-gradient(to right,transparent,#b8860b 20%,#b8860b 80%,transparent)', margin:'12px 0 24px' }} />

            {/* ── Certificate title ── */}
            <div style={{ textAlign:'center', marginBottom:22 }}>
              <div style={{ fontSize:10, letterSpacing:7, color:'#9ca3af', textTransform:'uppercase', fontFamily:'system-ui', marginBottom:8 }}>
                This is to certify that
              </div>
              <div style={{ fontSize:42, fontWeight:700, color:'#1e3a8a', letterSpacing:6, textTransform:'uppercase', lineHeight:1 }}>
                Certificate
              </div>
              <div style={{ fontSize:13, letterSpacing:6, color:'#b8860b', textTransform:'uppercase', fontFamily:'system-ui', marginTop:5 }}>
                of Internship
              </div>
            </div>

            {/* Divider diamond */}
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'0 60px 22px' }}>
              <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
              <div style={{ width:8, height:8, background:'#b8860b', transform:'rotate(45deg)' }} />
              <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
            </div>

            {/* ── Student name ── */}
            <div style={{ textAlign:'center', marginBottom:18 }}>
              <div style={{ fontSize:10, letterSpacing:4, color:'#9ca3af', textTransform:'uppercase', fontFamily:'system-ui', marginBottom:8 }}>Presented to</div>
              <div style={{ fontSize:34, color:'#1e3a8a', fontWeight:700, letterSpacing:1, display:'inline-block' }}>
                {cert.student_name}
              </div>
              <div style={{ height:2, background:'linear-gradient(to right,transparent,#b8860b,transparent)', margin:'6px auto 0', width:300 }} />
            </div>

            {/* ── Body text ── */}
            <div style={{ textAlign:'center', fontSize:14, color:'#374151', lineHeight:1.9, margin:'18px 40px 14px', fontFamily:'system-ui' }}>
              has successfully completed an internship as
              <div style={{ fontSize:18, fontWeight:800, color:'#1e3a8a', margin:'4px 0', fontFamily:'system-ui' }}>
                {cert.internship_role}
              </div>
              {cert.department && (
                <span>in the <strong style={{ color:'#1e3a8a' }}>{cert.department}</strong> department </span>
              )}
              at <strong style={{ color:'#1e3a8a' }}>DigiAgentix</strong> during the period of
              <div style={{ fontSize:16, fontWeight:700, color:'#2563eb', marginTop:5, fontFamily:'system-ui' }}>
                {cert.duration}
              </div>
            </div>

            {/* Commendation */}
            <div style={{ textAlign:'center', fontSize:12, color:'#6b7280', margin:'0 80px 26px', lineHeight:1.8, fontStyle:'italic' }}>
              We commend their dedication, professionalism, and contributions during this internship
              and wish them every success in their future endeavors.
            </div>

            {/* Mid rule */}
            <div style={{ height:1, background:'linear-gradient(to right,transparent,#b8860b 20%,#b8860b 80%,transparent)', margin:'0 0 28px' }} />

            {/* ── Footer row: Date | Seal | Signature+QR ── */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', padding:'0 8px' }}>

              {/* Issue date */}
              <div style={{ textAlign:'center', minWidth:150 }}>
                <div style={{ fontSize:14, color:'#1e3a8a', fontWeight:700, fontFamily:'system-ui', marginBottom:4 }}>{issuedDate}</div>
                <div style={{ width:150, height:1, background:'#374151', marginBottom:5 }} />
                <div style={{ fontSize:10, color:'#6b7280', letterSpacing:1, textTransform:'uppercase', fontFamily:'system-ui' }}>Date of Issue</div>
              </div>

              {/* Official seal */}
              <div style={{ textAlign:'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Seal.png"
                  alt="Official Seal"
                  style={{ width:110, height:110, objectFit:'contain', display:'block', margin:'0 auto' }}
                />
              </div>

              {/* Signature block */}
              <div style={{ textAlign:'center', minWidth:160 }}>
                <SignatureImg />
                <div style={{ width:160, height:1, background:'#374151', margin:'4px auto 5px' }} />
                <div style={{ fontSize:11, color:'#374151', fontWeight:700, fontFamily:'system-ui' }}>Authorized Signatory</div>
                <div style={{ fontSize:10, color:'#6b7280', fontFamily:'system-ui', marginTop:1 }}>DigiAgentix</div>
              </div>
            </div>

            {/* ── MSME (left) + QR code (right) — same row ── */}
            <div style={{ marginTop:18, paddingTop:12, borderTop:'1px dashed #e5e7eb', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <MsmeLogo />
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:9, color:'#9ca3af', letterSpacing:0.5, fontFamily:'system-ui' }}>Scan to verify authenticity</div>
                  <div style={{ fontSize:8, color:'#d1d5db', fontFamily:'monospace', marginTop:1 }}>digiagentix.com/verify</div>
                </div>
                {qrDataUrl && (
                  <div style={{ border:'1px solid #e5e7eb', borderRadius:6, padding:3, background:'#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrDataUrl} alt="QR" style={{ width:68, height:68, display:'block' }} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
