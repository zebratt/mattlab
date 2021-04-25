//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useEffect } from 'react';

const MiscPage: React.FC = () => {
  return (
    <div>
      <h1>misc page</h1>
      <button
        onClick={() => {
          console.log('asdf');
        }}
      >
        click me
      </button>
    </div>
  );
};

bootstrap(<MiscPage />);
