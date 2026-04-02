import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';

export const dynamic = 'force-dynamic';

type QnaRow = {
  id: number;
  question: string;
  answer: string;
  display_order: number | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from('qna')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase qna query error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = ((data as QnaRow[]) ?? []).map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    order: item.display_order,
  }));

  return NextResponse.json(result);
}