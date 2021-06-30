import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router';

// modules
import Home, { fetch as homeFetch } from '@/pages/Home';
import PageNotFound from '@/pages/404';
import PageLoading from '@/components/page-loading';

interface PageLoaderProps<T> {
  Component: (props: T) => JSX.Element;
  fetch: () => Promise<T>;
}

function PageLoader({ Component, fetch }: PageLoaderProps<any>) {
  const [props, setProps] = useState(null);

  useEffect(() => {
    fetch().then((data) => {
      setProps(data);
    });
  }, []);

  if (!props) {
    return <PageLoading />;
  } else {
    return <Component {...props!} />;
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
