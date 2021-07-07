import './style.less';

import React from 'react';
import { Spin } from 'antd';

interface PageLoadingProps {
  loading?: boolean;
  children?: unknown;
}

function PageLoading(props: PageLoadingProps) {
  if (!props.children) {
    return (
      <div className="page-loading">
        <Spin size="large" />
      </div>
    );
  } else {
    return (
      <>
        {props.loading && (
          <div className="page-loading-mask">
            <Spin size="large" />
          </div>
        )}
        {props.children}
      </>
    );
  }
}

export default PageLoading;
