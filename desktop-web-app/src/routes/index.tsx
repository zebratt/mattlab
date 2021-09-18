import React, { FC } from 'react';
import { useRoutes } from 'react-router';

import HomePage from '@/pages/Home';
import PageNotFound from '@/pages/404';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export interface DefaultPageProps {
  globalLoading: boolean;
}

interface PageLoaderProps<T> {
  Component: FC<T>
}

function PageLoader({ Component }: PageLoaderProps<DefaultPageProps>) {
  const { globalLoading } = useSelector((state: RootState) => state.loading);

  return <Component globalLoading={globalLoading} />;
}

interface RouteConfigItem<T> {
  path: string;
  Component: FC<T>
}

export const routeConfig: RouteConfigItem<DefaultPageProps>[] = [
  { path: '/', Component: HomePage },
  {
    // 404
    path: '*',
    Component: PageNotFound,
  },
];

export function RouteContainer() {
  return useRoutes(
    routeConfig.map(({ path, Component }) => {
      return {
        path,
        element: <PageLoader Component={Component} />,
      };
    }),
  );
}
