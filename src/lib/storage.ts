import { supabase } from '@/lib/superbase';

const BUCKET = process.env.SUPABASE_BUCKET || 'site-assets';

export function getPublicImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const normalizedPath = path.trim();
  if (!normalizedPath) return null;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(normalizedPath);
  return data.publicUrl;
}