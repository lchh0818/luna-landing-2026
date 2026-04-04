import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';
import { getPublicImageUrl } from '@/lib/storage';

export const dynamic = 'force-dynamic';
// export const revalidate = 86400;(하루 주기)

type AwardRow = {
  id: number;
  year: string | null;
  image_path: string | null;
  name: string;
  prize: string | null;
  team: string | null;
  members: string[] | null;
  date_start: string | null;
  date_end: string | null;
  date_time_zone: string | null;
  prizemoney: number | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .order('date_start', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase awards query error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = ((data as AwardRow[]) ?? []).map((award) => ({
    id: award.id,
    year: award.year,
    image: getPublicImageUrl(award.image_path),
    name: award.name,
    prize: award.prize,
    team: award.team,
    members: award.members ?? [],
    date: {
      start: award.date_start,
      end: award.date_end,
      time_zone: award.date_time_zone,
    },
    prizemoney: award.prizemoney,
  }));

  return NextResponse.json(result);
}