import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';
import { getPublicImageUrl } from '@/lib/storage';

export const dynamic = 'force-dynamic';

type ProjectRow = {
  id: number;
  public_url: string | null;
  year: string | null;
  image_path: string | null;
  name: string;
  description: string | null;
  display_order: number | null;
};

type ProjectAwardRow = {
  project_id: number;
  award_id: number;
  award_name: string | null;
};

export async function GET() {
  const [
    { data: projects, error: projectsError },
    { data: projectAwards, error: projectAwardsError },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('id', { ascending: true }),
    supabase
      .from('project_awards')
      .select('project_id, award_id, award_name')
      .order('project_id', { ascending: true })
      .order('award_id', { ascending: true }),
  ]);

  if (projectsError) {
    console.error('Supabase projects query error:', projectsError);
    return NextResponse.json({ error: projectsError.message }, { status: 500 });
  }

  if (projectAwardsError) {
    console.error('Supabase project_awards query error:', projectAwardsError);
    return NextResponse.json({ error: projectAwardsError.message }, { status: 500 });
  }

  const awardsMap = new Map<number, { id: number; name: string | null }[]>();

  for (const row of (projectAwards as ProjectAwardRow[]) ?? []) {
    const current = awardsMap.get(row.project_id) ?? [];
    current.push({
      id: row.award_id,
      name: row.award_name,
    });
    awardsMap.set(row.project_id, current);
  }

  const result = ((projects as ProjectRow[]) ?? []).map((project) => ({
    id: project.id,
    public_url: project.public_url,
    year: project.year,
    image: getPublicImageUrl(project.image_path),
    name: project.name,
    description: project.description,
    displayOrder: project.display_order,
    awards: awardsMap.get(project.id) ?? [],
  }));

  return NextResponse.json(result);
}