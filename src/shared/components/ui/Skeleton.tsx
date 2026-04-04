'use client';

interface SkeletonProps {
  className?: string;
}

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  lineHeight?: string;
  lastLineWidth?: string;
  gapClassName?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-lg bg-luna-dark/10 ${className}`} />
  );
}

export function SkeletonText({
  className = '',
  lines = 1,
  lineHeight = 'h-4',
  lastLineWidth = 'w-[80%]',
  gapClassName = 'space-y-2',
}: SkeletonTextProps) {
  return (
    <div className={`${gapClassName} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;

        return (
          <Skeleton
            key={index}
            className={`${lineHeight} ${isLast ? lastLineWidth : 'w-full'}`}
          />
        );
      })}
    </div>
  );
}

export function SkeletonHeading({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-8 ${className}`} />;
}

export function SkeletonButton({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-10 rounded-full ${className}`} />;
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-[20px] ${className}`} />;
}

export function SkeletonImage({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-3xl ${className}`} />;
}

export function SkeletonAvatar({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-full ${className}`} />;
}