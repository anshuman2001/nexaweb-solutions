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

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`text-white text-sm font-medium ${mono ? 'font-mono tracking-wide' : ''}`}>{value}</p>
    </div>
  );
}

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [cert, setCert]   = useState<CertData | null>(null);
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
        setError('Certificate not found. The ID may be incorrect or the certificate may not exist.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center px-4 py-12">

      {/* Logo */}
      <div className="text-center mb-10">
        <a href="/" className="inline-block">
          <div className="text-3xl font-black text-white tracking-tight">
            Digi<span className="text-blue-400">Agentix</span>
          </div>
        </a>
        <p className="text-slate-400 text-sm mt-1 tracking-wide">Certificate Verification Portal</p>
        <div className="mt-3 h-px w-16 bg-blue-500/40 mx-auto" />
      </div>

      {/* Search card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6 shadow-xl">
        <p className="text-slate-300 text-sm font-medium mb-3">
          Enter the Certificate ID printed on the internship certificate
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={certId}
            onChange={e => setCertId(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && doVerify()}
            placeholder="DAGI-XXXXXXXX"
            className="flex-1 bg-white/10 text-white placeholder-slate-600 border border-white/20 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-blue-400 transition"
          />
          <button
            onClick={() => doVerify()}
            disabled={loading || !certId}
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Checking
              </span>
            ) : 'Verify'}
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-2">
          Certificate IDs begin with <span className="font-mono text-slate-500">DAGI-</span> followed by 8 characters
        </p>
      </div>

      {/* Not found */}
      {!loading && searched && error && (
        <div className="w-full max-w-md bg-red-950/40 border border-red-500/25 rounded-2xl p-6 text-center shadow-xl">
          <div className="text-5xl mb-3">❌</div>
          <h2 className="text-lg font-bold text-red-400 mb-2">Not Verified</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
        </div>
      )}

      {/* Verified / Revoked result */}
      {!loading && cert && (
        <div className="w-full max-w-lg space-y-4">

          {/* Status banner */}
          <div className={`rounded-2xl p-6 text-center shadow-xl border ${
            isValid
              ? 'bg-green-950/50 border-green-500/30'
              : 'bg-red-950/50 border-red-500/30'
          }`}>
            <div className="text-6xl mb-3">{isValid ? '✅' : '⛔'}</div>
            <h2 className={`text-3xl font-black tracking-wide ${isValid ? 'text-green-400' : 'text-red-400'}`}>
              {isValid ? 'VERIFIED' : cert.status === 'Revoked' ? 'REVOKED' : 'INVALID'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isValid
                ? 'This is an authentic certificate issued by DigiAgentix'
                : cert.status === 'Revoked'
                ? 'This certificate has been revoked and is no longer valid'
                : 'This certificate could not be verified'}
            </p>
          </div>

          {/* Details card */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
            {/* Student header */}
            <div className="flex items-center gap-4 pb-5 border-b border-white/10 mb-5">
              <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                🎓
              </div>
              <div>
                <h3 className="text-white text-xl font-bold leading-tight">{cert.student_name}</h3>
                <p className="text-blue-400 text-sm font-medium">{cert.internship_role}</p>
                {cert.email && <p className="text-slate-500 text-xs mt-0.5">{cert.email}</p>}
              </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {cert.department && <Detail label="Department" value={cert.department} />}
              <Detail label="Duration" value={cert.duration} />
              {cert.start_date && <Detail label="Start Date" value={cert.start_date} />}
              {cert.end_date   && <Detail label="End Date"   value={cert.end_date} />}
              <Detail
                label="Issued On"
                value={new Date(cert.issued_date).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              />
              <Detail label="Issued By" value={cert.issued_by} />
              <div className="col-span-2">
                <Detail label="Certificate ID" value={cert.id} mono />
              </div>
            </div>

            {/* Footer */}
            {isValid && (
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  Certificate is authentic and active
                </div>
                <div className="text-xs text-slate-600">
                  Checked on {new Date().toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}
                </div>
              </div>
            )}
          </div>

          {/* Official seal note */}
          {isValid && (
            <div className="bg-blue-950/30 border border-blue-500/15 rounded-xl p-4 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔏</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                This internship certificate is officially issued by <strong className="text-white">DigiAgentix</strong>.
                The verification above is live and fetched directly from our database.
                For any queries, contact us at{' '}
                <span className="text-blue-400">info@digiagentix.com</span>.
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-slate-700 text-xs mt-12">
        © {new Date().getFullYear()} DigiAgentix · Certificate Verification System
      </p>
    </div>
  );
}
