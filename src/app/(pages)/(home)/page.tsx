'use client';

import { useAwards, useInformation, useProjects } from '@/shared/hooks/useApi';
import { enrichInformationWithStats } from '@/shared/lib/format';
import { useMemo } from 'react';
import { Intro } from './(components)';

export default function Home() {
  const { data: information = [], isLoading: informationLoading } =
    useInformation();
  const { data: awards = [], isLoading: awardsLoading } = useAwards();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();

  const enrichedInformation = useMemo(
    () => enrichInformationWithStats(information, awards, projects),
    [information, awards, projects],
  );

  const isLoading = informationLoading || awardsLoading || projectsLoading;

  return <Intro information={enrichedInformation} isLoading={isLoading} />;
}