import './style.less';

import React from 'react';
import { Result } from 'antd';

function PageError() {
  return (
    <div className="page-error">
      <Result status="500" subTitle="Sorry, something went wrong..." />
    </div>
  );
}

export default PageError;
