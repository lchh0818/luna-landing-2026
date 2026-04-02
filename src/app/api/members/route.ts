import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';
import { getPublicImageUrl } from '@/lib/storage';

export const dynamic = 'force-dynamic';

type MemberRow = {
  id: number;
  position: string | null;
  image_path: string | null;
  name: string;
  generation: number | null;
  class: string | null;
  description: string | null;
  luna_generation: number | null;
  display_order: number | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase members query error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = ((data as MemberRow[]) ?? []).map((member) => ({
    id: member.id,
    position: member.position,
    image: getPublicImageUrl(member.image_path),
    name: member.name,
    generation: member.generation ? `${member.generation}기` : null,
    class: member.class,
    description: member.description,
    lunaGeneration: member.luna_generation
      ? `LUNA ${member.luna_generation}기`
      : null,
    displayOrder: member.display_order,
  }));

  return NextResponse.json(result);
}