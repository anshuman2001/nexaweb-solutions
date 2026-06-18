'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ShieldX, Search, CheckCircle2, XCircle, AlertCircle, Calendar, Clock, Building2, User, Hash, Mail, ExternalLink } from 'lucide-react';

const API = 'https://brokernote-backend.onrender.com';

const NAVY = '#1e3a8a';
const BLUE = '#2563eb';
const SLATE = '#334155';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';

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

function DetailRow({ icon: Icon, label, value, mono }: { icon: React.ElementType; label: string; value: string; mono?: boolean }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0f4ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <Icon style={{ width: 16, height: 16, color: NAVY }} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3, fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: 14, color: SLATE, fontWeight: 600, fontFamily: mono ? 'monospace' : undefined, letterSpacing: mono ? 1 : undefined }}>{value}</p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [cert, setCert] = useState<CertData | null>(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      const upper = id.toUpperCase();
      setCertId(upper);
      doVerify(upper);
    }
  }, []);

  async function doVerify(id?: string) {
    const sid = (id ?? certId).trim().toUpperCase();
    if (!sid) return;
    setLoading(true);
    setCert(null);
    setError('');
    setSearched(true);
    try {
      const res = await fetch(`${API}/certs/verify/${sid}`);
      if (res.ok) {
        setCert(await res.json());
      } else if (res.status === 404) {
        setError('No certificate found with this ID. Please check the ID and try again.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch {
      setError('Unable to reach the verification server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const isValid = cert && cert.verified && cert.status === 'Active';
  const isRevoked = cert && cert.status === 'Revoked';

  const verifiedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const verifiedTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #e8efff 100%)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: `1px solid ${BORDER}`, padding: '0 24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}`, flexShrink: 0 }}>
              <Image src="/logo.png" alt="DigiAgentix" fill className="object-contain" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', letterSpacing: 0.2 }}>DigiAgentix</div>
              <div style={{ fontSize: 9, color: MUTED, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Technology Solutions</div>
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, background: '#f0f4ff', border: '1px solid #c7d2fe' }}>
            <ShieldCheck style={{ width: 14, height: 14, color: NAVY }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>Certificate Verification</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px 24px', maxWidth: 720, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Hero text */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: 10, lineHeight: 1.2 }}>
            Verify Certificate Authenticity
          </h1>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
            Enter the Certificate ID to instantly verify if it was issued by DigiAgentix and confirm its current status.
          </p>
        </div>

        {/* Search box */}
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: SLATE, marginBottom: 10 }}>
            Certificate ID
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                type="text"
                value={certId}
                onChange={e => setCertId(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && doVerify()}
                placeholder="DAGI-XXXXXXXX"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#f8fafc', border: `1.5px solid ${BORDER}`,
                  borderRadius: 10, paddingLeft: 42, paddingRight: 16, paddingTop: 13, paddingBottom: 13,
                  fontSize: 15, color: SLATE, outline: 'none', fontFamily: 'monospace', letterSpacing: 1,
                }}
              />
            </div>
            <button
              onClick={() => doVerify()}
              disabled={loading || !certId}
              style={{
                padding: '0 28px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                background: NAVY, color: '#fff', border: 'none', cursor: loading || !certId ? 'not-allowed' : 'pointer',
                opacity: loading || !certId ? 0.6 : 1, transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(30,58,138,0.25)',
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  Verifying
                </>
              ) : (
                <>
                  <ShieldCheck style={{ width: 15, height: 15 }} />
                  Verify
                </>
              )}
            </button>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
            Certificate IDs start with <span style={{ fontFamily: 'monospace', color: MUTED, fontWeight: 600 }}>DAGI-</span> followed by 8 characters (e.g. DAGI-AB12CD34)
          </p>
        </div>

        {/* Error state */}
        {!loading && searched && error && (
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #fecaca', padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldX style={{ width: 36, height: 36, color: '#dc2626' }} />
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#dc2626', marginBottom: 6 }}>Certificate Not Found</h2>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{error}</p>
              </div>
              <div style={{ marginTop: 8, padding: '10px 20px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 500 }}>If you believe this is an error, contact <strong>info@digiagentix.com</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* Result card */}
        {!loading && cert && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Status banner */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              border: `2px solid ${isValid ? '#bbf7d0' : '#fecaca'}`,
              padding: 28,
              boxShadow: `0 4px 24px ${isValid ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 20, flexShrink: 0,
                  background: isValid ? '#dcfce7' : '#fef2f2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isValid
                    ? <ShieldCheck style={{ width: 42, height: 42, color: '#059669' }} />
                    : <ShieldX style={{ width: 42, height: 42, color: '#dc2626' }} />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: 26, fontWeight: 900, color: isValid ? '#059669' : '#dc2626', letterSpacing: 1 }}>
                      {isValid ? 'VERIFIED' : isRevoked ? 'REVOKED' : 'INVALID'}
                    </h2>
                    <span style={{
                      padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                      background: isValid ? '#dcfce7' : '#fef2f2',
                      color: isValid ? '#059669' : '#dc2626',
                      border: `1px solid ${isValid ? '#bbf7d0' : '#fecaca'}`,
                    }}>
                      {isValid ? 'Active' : cert.status}
                    </span>
                  </div>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.5 }}>
                    {isValid
                      ? 'This certificate is authentic and was officially issued by DigiAgentix.'
                      : isRevoked
                      ? 'This certificate has been revoked and is no longer valid.'
                      : 'This certificate could not be verified.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Details card */}
            <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>

              {/* Student header */}
              <div style={{ padding: '24px 28px', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User style={{ width: 28, height: 28, color: '#fff' }} />
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>{cert.student_name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}>{cert.internship_role}</p>
                  {cert.email && <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>{cert.email}</p>}
                </div>
              </div>

              {/* Detail rows */}
              <div style={{ padding: '8px 28px 4px' }}>
                {cert.department && <DetailRow icon={Building2} label="Department" value={cert.department} />}
                <DetailRow icon={Calendar} label="Internship Duration" value={cert.duration} />
                <DetailRow icon={Calendar} label="Date of Issue" value={new Date(cert.issued_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
                <DetailRow icon={User} label="Issued By" value={cert.issued_by || 'DigiAgentix'} />
                <DetailRow icon={Hash} label="Certificate ID" value={cert.id} mono />
              </div>

              {/* Verification timestamp footer */}
              <div style={{ padding: '14px 28px', background: '#f8fafc', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isValid
                    ? <CheckCircle2 style={{ width: 14, height: 14, color: '#059669' }} />
                    : <XCircle style={{ width: 14, height: 14, color: '#dc2626' }} />
                  }
                  <span style={{ fontSize: 12, color: isValid ? '#059669' : '#dc2626', fontWeight: 600 }}>
                    {isValid ? 'Certificate is authentic and active' : 'Certificate is not valid'}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Verified on {verifiedDate} at {verifiedTime}</span>
              </div>
            </div>

            {/* Official note */}
            <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${BORDER}`, padding: '18px 22px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#f0f4ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle style={{ width: 18, height: 18, color: NAVY }} />
              </div>
              <div>
                <p style={{ fontSize: 13, color: SLATE, lineHeight: 1.7 }}>
                  This verification is fetched live from the <strong style={{ color: '#0f172a' }}>DigiAgentix</strong> certificate database.
                  For any queries or disputes, contact{' '}
                  <a href="mailto:info@digiagentix.com" style={{ color: BLUE, fontWeight: 600, textDecoration: 'none' }}>info@digiagentix.com</a>{' '}
                  with the Certificate ID.
                </p>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#fff', padding: '18px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>© {new Date().getFullYear()} DigiAgentix · Certificate Verification System</p>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: BLUE, textDecoration: 'none', fontWeight: 600 }}>
            <ExternalLink style={{ width: 12, height: 12 }} />
            Visit DigiAgentix.com
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
      `}</style>
    </div>
  );
}
