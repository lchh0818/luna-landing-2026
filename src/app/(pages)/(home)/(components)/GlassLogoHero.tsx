'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function GlassLogoHero() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [shine, setShine] = useState({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 9;
    const rotateX = -((y - centerY) / centerY) * 9;

    setStyle({
      rotateX,
      rotateY,
      scale: 1.02,
    });

    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });

    setShine((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  const handleClick = () => {
    setStyle((prev) => ({
      ...prev,
      scale: 0.96,
    }));

    setTimeout(() => {
      setStyle({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      });
    }, 140);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* 배경 glow */}
      <div className="pointer-events-none absolute h-[340px] w-[340px] rounded-full bg-luna-bright/20 blur-[90px] md:h-[520px] md:w-[520px]" />
      <div className="pointer-events-none absolute right-[-10px] top-[10%] h-[140px] w-[140px] rounded-full bg-white/30 blur-[60px] md:h-[220px] md:w-[220px]" />
      <div className="pointer-events-none absolute bottom-[2%] left-[4%] h-[120px] w-[120px] rounded-full bg-luna-purple/20 blur-[70px] md:h-[180px] md:w-[180px]" />

      {/* float wrapper */}
      <div className="logo-float">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="glass-panel group relative flex h-[280px] w-[280px] cursor-pointer items-center justify-center rounded-[36px] md:h-[420px] md:w-[420px] md:rounded-[48px] xl:h-[480px] xl:w-[480px] xl:rounded-[52px]"
          style={{
            transform: `perspective(1200px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale(${style.scale})`,
            transition:
              'transform 140ms ease-out, box-shadow 280ms ease, border-color 280ms ease',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* shine 효과 핵심 */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[36px] md:rounded-[48px] xl:rounded-[52px]"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.35), transparent 40%)`,
              opacity: shine.opacity,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* 기본 glass gradient */}
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/26 via-white/10 to-white/4 md:rounded-[48px] xl:rounded-[52px]" />

          <div className="absolute inset-[1px] rounded-[35px] border border-white/20 md:rounded-[47px] xl:rounded-[51px]" />

          {/* 내부 glow */}
          <div className="absolute inset-0 overflow-hidden rounded-[36px] md:rounded-[48px] xl:rounded-[52px]">
            <div className="absolute left-[8%] top-[8%] h-24 w-24 rounded-full bg-white/35 blur-3xl md:h-32 md:w-32" />
            <div className="absolute bottom-[10%] right-[10%] h-20 w-20 rounded-full bg-luna-bright/30 blur-3xl md:h-28 md:w-28" />
          </div>

          {/* content */}
          <div
            className="relative z-10 flex flex-col items-center justify-center"
            style={{ transform: 'translateZ(60px)' }}
          >
            <div className="glass-outline mb-5 rounded-[28px] p-5 md:mb-7 md:rounded-[34px] md:p-8">
              <Image
                src="/logo/luna-logo.png"
                alt="LUNA logo"
                width={160}
                height={160}
                className="h-auto w-[96px] md:w-[140px] xl:w-[160px]"
                priority
              />
            </div>

            <p className="text-center text-[11px] font-medium uppercase tracking-[0.34em] text-luna-dark/65 md:text-sm">
              IT Social Venture Club
            </p>

            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.08em] text-luna-black md:text-6xl xl:text-7xl">
              LUNA
            </h2>
          </div>

          <div className="glass-soft absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-luna-dark/70 md:right-6 md:top-6 md:px-4 md:py-2 md:text-xs">
            Since 2018
          </div>
        </div>
      </div>
    </div>
  );
}