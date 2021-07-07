import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router';

import Home, { fetch as HomeFetch } from '@/pages/Home';
import PageNotFound from '@/pages/404';
import PageLoading from '@/components/page-loading';
import PageError from '@/components/page-error';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface PageLoaderProps<T> {
  Component: (props: T) => JSX.Element;
  fetch?: () => Promise<T>;
}
enum PageStatus {
  success,
  error,
  loading,
}

const voidPromise = () => Promise.resolve();

function PageLoader({ Component, fetch }: PageLoaderProps<any>) {
  const [props, setProps] = useState(null);
  const [status, setStatus] = useState<PageStatus>(PageStatus.loading);
  const { isLoading } = useSelector((state: RootState) => state.loading);
  const fetchFunc = fetch ?? voidPromise;

  useEffect(() => {
    fetchFunc()
      .then((data) => {
        setProps(data);
        setStatus(PageStatus.success);
      })
      .catch(() => {
        setStatus(PageStatus.error);
      });
  }, []);

  switch (status) {
    case PageStatus.success:
      <PageLoading loading={isLoading}>
        <Component {...props!} />;
      </PageLoading>;
    case PageStatus.error:
      return <PageError />;
    default:
      return <PageLoading />;
  }
}

interface RouteConfigItem<T> {
  path: string;
  Component: (props: T) => JSX.Element;
  fetch?: () => Promise<T>;
}

export const routeConfig: RouteConfigItem<any>[] = [
  { path: '/', Component: Home, fetch: HomeFetch },
  {
    // 404
    path: '*',
    Component: PageNotFound,
  },
];

export function RouteContainer() {
  return useRoutes(
    routeConfig.map(({ path, Component, fetch }) => {
      return {
        path,
        element: fetch ? (
          <PageLoader Component={Component} fetch={fetch} />
        ) : (
          <Component />
        ),
      };
    }),
  );
}
