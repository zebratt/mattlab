import './style.less';
import React from 'react';
import { bootstrap } from '@/bootstrap';

const HomePage: React.FC = () => {
  return (
    <div className="page-home">
      <div className="page-home-nav">
        <div className="page-home-nav-item">home page</div>
      </div>
    </div>
  );
};

bootstrap(<HomePage />);
