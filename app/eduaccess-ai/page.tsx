'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, CheckCircle, Zap, RefreshCw, Copy, Check } from 'lucide-react';

const API_BASE = 'https://eduaccess-ai.onrender.com';

export default function EduAccessAIPage() {
  const [activeTab, setActiveTab] = useState<'alt-text' | 'content'>('alt-text');

  // Alt Text State
  const [imageUrl, setImageUrl]       = useState('');
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [context, setContext]         = useState('');
  const [gradeLevel, setGradeLevel]   = useState('Grade 3-5');
  const [subject, setSubject]         = useState('');
  const [altResult, setAltResult]     = useState<any>(null);
  const [altLoading, setAltLoading]   = useState(false);
  const [altError, setAltError]       = useState('');

  // Content State
  const [topic, setTopic]             = useState('');
  const [contentGrade, setContentGrade] = useState('Grade 3-5');
  const [contentType, setContentType] = useState('blog_post');
  const [audience, setAudience]       = useState('students');
  const [tone, setTone]               = useState('friendly');
  const [wordCount, setWordCount]     = useState(300);
  const [contentResult, setContentResult] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError]     = useState('');

  const [copied, setCopied] = useState('');

  const gradeLevels = ['K-2', 'Grade 3-5', 'Grade 6-8', 'Grade 9-12', 'Higher Education', 'Professional'];

  // ── Convert file to base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  // ── Generate Alt Text
  const generateAltText = async () => {
    if (!imageUrl && !imageFile) { setAltError('Please provide an image URL or upload an image.'); return; }
    setAltLoading(true); setAltError(''); setAltResult(null);
    try {
      const body: any = { context, grade_level: gradeLevel, subject, num_variations: 2 };
      if (imageFile) { body.image_base64 = await fileToBase64(imageFile); }
      else { body.image_url = imageUrl; }

      const res = await fetch(`${API_BASE}/api/alt-text/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setAltResult(await res.json());
    } catch (e: any) {
      setAltError(e.message || 'Failed to generate alt text. Please try again.');
    } finally { setAltLoading(false); }
  };

  // ── Generate Content
  const generateContent = async () => {
    if (!topic) { setContentError('Please enter a topic.'); return; }
    setContentLoading(true); setContentError(''); setContentResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/content/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic, grade_level: contentGrade, content_type: contentType,
          audience, tone, word_count: wordCount, subject,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setContentResult(await res.json());
    } catch (e: any) {
      setContentError(e.message || 'Failed to generate content. Please try again.');
    } finally { setContentLoading(false); }
  };

  // ── Copy to clipboard
  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-20">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-white/5 pb-14 pt-12">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.15), transparent)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live — Free Beta
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            ♿ EduAccess <span className="gradient-text">AI</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            WCAG 2.1 & ADA compliant alt text generator and educational content writer — built for US schools, universities and edtech companies.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: 'Alt text under', value: '200 chars' },
              { label: 'Compliance', value: 'WCAG 2.1 AA' },
              { label: 'Powered by', value: 'Claude AI' },
              { label: 'Target', value: 'US Education' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-white font-bold text-base">{s.value}</span>
                <span className="text-gray-500 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DEMO SECTION ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl bg-white/5 border border-white/10 w-fit mx-auto">
          {(['alt-text', 'content'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'alt-text' ? '🖼️ Alt Text Generator' : '✍️ Content Writer'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── INPUT PANEL ── */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
            <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              {activeTab === 'alt-text' ? <><Upload className="w-5 h-5 text-blue-400" /> Image Input</> : <><FileText className="w-5 h-5 text-blue-400" /> Content Input</>}
            </h2>

            {activeTab === 'alt-text' ? (
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Upload Image</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-blue-500/40 transition-colors bg-white/2">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => { setImageFile(e.target.files?.[0] || null); setImageUrl(''); }} />
                    {imageFile
                      ? <span className="text-emerald-400 text-sm font-medium">{imageFile.name}</span>
                      : <><Upload className="w-6 h-6 text-gray-600 mb-1" /><span className="text-gray-500 text-xs">Click to upload PNG, JPG, WEBP</span></>
                    }
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-600 text-xs">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Image URL</label>
                  <input
                    type="url" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Educational Context <span className="text-gray-600">(optional)</span></label>
                  <input
                    type="text" value={context} onChange={(e) => setContext(e.target.value)}
                    placeholder="e.g. Grade 5 science lesson about photosynthesis"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Grade Level</label>
                    <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                      {gradeLevels.map((g) => <option key={g} value={g} className="bg-[#0c0f1a]">{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Subject</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Science"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                  </div>
                </div>

                {altError && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{altError}</p>}

                <button onClick={generateAltText} disabled={altLoading}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                  {altLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Alt Text</>}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Topic *</label>
                  <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. What is Photosynthesis?"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Grade Level</label>
                    <select value={contentGrade} onChange={(e) => setContentGrade(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                      {gradeLevels.map((g) => <option key={g} value={g} className="bg-[#0c0f1a]">{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Content Type</label>
                    <select value={contentType} onChange={(e) => setContentType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                      {['blog_post','course_material','lesson_plan','website_page','summary'].map((t) => (
                        <option key={t} value={t} className="bg-[#0c0f1a]">{t.replace('_',' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Audience</label>
                    <select value={audience} onChange={(e) => setAudience(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                      {['students','teachers','parents','general'].map((a) => (
                        <option key={a} value={a} className="bg-[#0c0f1a]">{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Tone</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                      {['friendly','formal','neutral'].map((t) => (
                        <option key={t} value={t} className="bg-[#0c0f1a]">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Word Count: {wordCount}</label>
                  <input type="range" min={100} max={1000} step={50} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))}
                    className="w-full accent-blue-500" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1"><span>100</span><span>1000</span></div>
                </div>

                {contentError && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{contentError}</p>}

                <button onClick={generateContent} disabled={contentLoading}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                  {contentLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Content</>}
                </button>
              </div>
            )}
          </div>

          {/* ── OUTPUT PANEL ── */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
            <h2 className="text-white font-bold text-lg mb-5">📄 Output</h2>

            {/* Alt Text Result */}
            {activeTab === 'alt-text' && (
              <>
                {!altResult && !altLoading && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-4xl mb-3">🖼️</div>
                    <p className="text-gray-500 text-sm">Upload an image or paste a URL<br />to generate WCAG-compliant alt text</p>
                  </div>
                )}
                {altLoading && (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                    <p className="text-gray-400 text-sm">Analyzing image with Claude AI...</p>
                  </div>
                )}
                {altResult && (
                  <div className="space-y-4">
                    {/* WCAG Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> WCAG {altResult.accessibility_level}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400">
                        {altResult.image_type}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-400">
                        {altResult.char_count} chars
                      </span>
                    </div>

                    {/* Short Alt */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Short Alt Text</span>
                        <button onClick={() => copyText(altResult.short_alt, 'short')} className="text-gray-500 hover:text-white transition-colors">
                          {copied === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-white text-sm leading-relaxed">"{altResult.short_alt}"</p>
                      <p className="text-gray-600 text-xs mt-2">{altResult.char_count}/200 characters</p>
                    </div>

                    {/* Long Description */}
                    {altResult.long_description && (
                      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Long Description</span>
                          <button onClick={() => copyText(altResult.long_description, 'long')} className="text-gray-500 hover:text-white transition-colors">
                            {copied === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{altResult.long_description}</p>
                      </div>
                    )}

                    {/* Variations */}
                    {altResult.variations?.length > 0 && (
                      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wide block mb-3">Variations</span>
                        <div className="space-y-2">
                          {altResult.variations.map((v: any, i: number) => (
                            <div key={i} className="flex items-start justify-between gap-2">
                              <p className="text-gray-300 text-xs leading-relaxed flex-1">"{v.short_alt}"</p>
                              <button onClick={() => copyText(v.short_alt, `var-${i}`)} className="text-gray-600 hover:text-white flex-shrink-0">
                                {copied === `var-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {altResult.accessibility_notes && (
                      <div className="rounded-xl bg-blue-500/5 border border-blue-500/15 p-3">
                        <p className="text-blue-300 text-xs leading-relaxed">💡 {altResult.accessibility_notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Content Result */}
            {activeTab === 'content' && (
              <>
                {!contentResult && !contentLoading && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-4xl mb-3">✍️</div>
                    <p className="text-gray-500 text-sm">Enter a topic to generate<br />WCAG-compliant educational content</p>
                  </div>
                )}
                {contentLoading && (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                    <p className="text-gray-400 text-sm">Writing content with Claude AI...</p>
                  </div>
                )}
                {contentResult && (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {/* Meta */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        {contentResult.accessibility_score} Compliant
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400">
                        {contentResult.reading_level}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-400">
                        {contentResult.word_count} words
                      </span>
                      {contentResult.flesch_kincaid && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/15 border border-yellow-500/30 text-yellow-400">
                          FK: {contentResult.flesch_kincaid}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Title</span>
                        <button onClick={() => copyText(contentResult.title, 'title')} className="text-gray-500 hover:text-white transition-colors">
                          {copied === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-white font-semibold text-sm">{contentResult.title}</p>
                    </div>

                    {/* Sections */}
                    {contentResult.sections?.map((section: any, i: number) => (
                      <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide block mb-2">{section.heading}</span>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                      </div>
                    ))}

                    {/* Key Takeaways */}
                    {contentResult.key_takeaways?.length > 0 && (
                      <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide block mb-2">Key Takeaways</span>
                        <ul className="space-y-1">
                          {contentResult.key_takeaways.map((t: string, i: number) => (
                            <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />{t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Copy All */}
                    <button
                      onClick={() => {
                        const full = `${contentResult.title}\n\n${contentResult.sections?.map((s:any) => `${s.heading}\n${s.content}`).join('\n\n')}`;
                        copyText(full, 'all');
                      }}
                      className="w-full py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      {copied === 'all' ? <><Check className="w-4 h-4 text-emerald-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Full Content</>}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Features strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '♿', title: 'WCAG 2.1 AA', desc: 'Fully compliant output' },
            { icon: '📏', title: 'Under 200 chars', desc: 'Short alt text limit' },
            { icon: '🎓', title: 'K-12 & Higher Ed', desc: 'US education standards' },
            { icon: '🤖', title: 'Claude AI', desc: 'Anthropic powered' },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-white text-sm font-semibold">{f.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
