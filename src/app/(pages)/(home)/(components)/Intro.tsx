'use client';

import Link from 'next/link';
import { Skeleton, SkeletonText } from '@/shared/components/ui';
import type { Information } from '@/shared/types';
import GlassLogoHero from './GlassLogoHero';

interface IntroProps {
  information: Information[];
  isLoading?: boolean;
}

const Intro = ({ information, isLoading = false }: IntroProps) => {
  if (isLoading) {
    return (
      <section className="hero-shell relative w-full overflow-hidden px-4 pt-[120px] pb-6 md:px-8 md:pt-[144px] md:pb-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col gap-8 pt-6 md:pt-8 lg:min-h-[calc(100svh-88px)] lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="order-1 flex w-full max-w-[540px] flex-col items-start self-start">
              <div className="flex w-full flex-col items-start gap-4">
                <Skeleton className="h-10 w-48 md:h-12 md:w-64" />
                <Skeleton className="h-16 w-40 md:h-24 md:w-64" />

                <SkeletonText
                  className="w-full max-w-[500px]"
                  lines={3}
                  lineHeight="h-5 md:h-6"
                  lastLineWidth="w-[76%]"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>

            <div className="order-2 flex w-full justify-center lg:justify-end">
              <Skeleton className="h-[280px] w-[280px] rounded-[36px] md:h-[420px] md:w-[420px] md:rounded-[48px] xl:h-[480px] xl:w-[480px] xl:rounded-[52px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!information || information.length === 0) {
    return null;
  }

  const info = information[0];

  return (
    <section className="hero-shell relative w-full overflow-hidden px-4 pt-[120px] pb-6 md:px-8 md:pt-[144px] md:pb-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col gap-8 pt-6 md:pt-8 lg:min-h-[calc(100svh-88px)] lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="order-1 flex w-full max-w-[540px] flex-col items-start self-start">
            <div className="flex w-full flex-col items-start gap-4">
              <p className="text-40 font-medium text-luna-bright">
                {info.moto},
              </p>

              <p className="text-96 font-extrabold text-luna-purple">LUNA</p>

              <p className="max-w-[500px] text-20 leading-relaxed text-luna-black">
                <strong>LUNA</strong>는 한국디지털미디어고등학교의{' '}
                <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한 사회적
                문제들을 해결하고{' '}
                <strong>
                  모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.
                </strong>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-luna-black px-6 py-3 text-sm font-medium text-white shadow-[0_14px_32px_rgba(43,39,75,0.2)] transition-all duration-200 hover:-translate-y-0.5"
              >
                프로젝트 보기
              </Link>

              <Link
                href="/members"
                className="glass-soft rounded-full px-6 py-3 text-sm font-medium text-luna-black transition-all duration-200 hover:bg-white/24"
              >
                동아리 소개
              </Link>
            </div>
          </div>

          <div className="order-2 flex w-full justify-center lg:justify-end">
            <GlassLogoHero />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;