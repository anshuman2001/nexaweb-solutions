'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { blogPostsData } from '@/lib/utils';

const categories = ['All', 'AI Agents', 'Web Design', 'Business Tips', 'Case Studies'];

const NAVY = '#1e3a8a';
const BLUE = '#2563eb';
const SLATE = '#334155';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPostsData.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8efff 100%)' }}>
      {/* Hero */}
      <section style={{ paddingTop: 108, paddingBottom: 64, padding: '108px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 100, background: '#e0e7ff', border: '1px solid #c7d2fe', color: NAVY, fontSize: 13, fontWeight: 600, marginBottom: 20 }}
          >
            DigiAgentix Blog
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.15 }}
          >
            Insights on{' '}
            <span style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI &amp; Business
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: MUTED, fontSize: 17, marginBottom: 32, lineHeight: 1.6 }}
          >
            Practical guides on AI agents, web design, and growing your Indian business
          </motion.p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>
            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#fff', border: `1.5px solid ${BORDER}`,
                borderRadius: 12, paddingLeft: 48, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                fontSize: 14, color: SLATE, outline: 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section style={{ padding: '0 24px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                background: activeCategory === cat ? NAVY : '#fff',
                color: activeCategory === cat ? '#fff' : SLATE,
                border: `1.5px solid ${activeCategory === cat ? NAVY : BORDER}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '0 24px 96px', maxWidth: 1280, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: MUTED }}>
            <p style={{ fontSize: 20, marginBottom: 8 }}>No articles found</p>
            <p style={{ fontSize: 14 }}>Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: '#fff', borderRadius: 16, border: `1px solid ${BORDER}`,
                  overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(30,58,138,0.12)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ position: 'relative', height: 192, overflow: 'hidden' }}>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 100, background: NAVY, color: '#fff', fontSize: 11, fontWeight: 700 }}>
                    {post.category}
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: MUTED, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock style={{ width: 12, height: 12 }} />
                      {post.readTime} min read
                    </span>
                    <span>·</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 style={{ color: '#0f172a', fontWeight: 700, fontSize: 17, marginBottom: 8, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: MUTED, fontSize: 14, marginBottom: 16, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: BLUE, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  >
                    Read More
                    <ArrowRight style={{ width: 15, height: 15 }} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
