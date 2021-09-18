import './style.less';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouteContainer } from '@/routes';

function Scaffold() {
  return (
    <div className="scaffold">
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    </div>
  );
}

export default Scaffold;
