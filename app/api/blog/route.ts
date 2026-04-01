import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { blogPostsData } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  try {
    let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (category && category !== 'All') query = query.eq('category', category);
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const posts = slug ? data.filter((p: any) => p.slug === slug) : data;
      return NextResponse.json({ posts });
    }
  } catch {
    // fall through
  }

  // Fallback to static data
  let posts = blogPostsData;
  if (category && category !== 'All') posts = posts.filter(p => p.category === category);
  if (slug) posts = posts.filter(p => p.slug === slug);
  return NextResponse.json({ posts });
}
