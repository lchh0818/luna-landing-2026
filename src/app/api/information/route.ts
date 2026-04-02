import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';

export const dynamic = 'force-dynamic';

type InformationRow = {
  id: number;
  moto: string | null;
  projects?: number | null;
  awards?: number | null;
  members?: number | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from('information')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase information query error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = ((data as InformationRow[]) ?? []).map((item) => ({
    id: item.id,
    moto: item.moto,
    projects: item.projects ?? 0,
    awards: item.awards ?? 0,
    members: item.members ?? 0,
  }));

  return NextResponse.json(result);
}