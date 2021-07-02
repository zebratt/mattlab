import './style.less';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouteContainer } from '@/routes';

function Scaffold() {
  return (
    <div className="scaffold">
      <div className="scaffold-header">
        <div className="logo-text">Mock Data</div>
      </div>
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    </div>
  );
}

export default Scaffold;
