import $ from './index.less';
import { ReactComponent as IconBasicInfo } from '@/assets/BasicInfoFilled.svg';
import React from 'react';
const Mf1Button = React.lazy(() => import("mf1/Button"));

export default function HomePage() {
  return (
    <div className={$.home}>
      <h3>master app home</h3>
      <IconBasicInfo className={$.icon} />
      <React.Suspense fallback='loading'>
        <Mf1Button />
      </React.Suspense>
    </div>
  );
}
