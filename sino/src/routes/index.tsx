import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router';

import Home, { fetch as homeFetch } from '@/pages/Home';
import PageNotFound from '@/pages/404';
import PageLoading from '@/components/page-loading';
import PageError from '@/components/page-error';

interface PageLoaderProps<T> {
  Component: (props: T) => JSX.Element;
  fetch: () => Promise<T>;
}
enum PageStatus {
  success,
  error,
  loading,
}

function PageLoader({ Component, fetch }: PageLoaderProps<any>) {
  const [props, setProps] = useState(null);
  const [status, setStatus] = useState<PageStatus>(PageStatus.loading);

  useEffect(() => {
    fetch()
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
      return <Component {...props!} />;
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
  { path: '/', Component: Home, fetch: homeFetch },
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
