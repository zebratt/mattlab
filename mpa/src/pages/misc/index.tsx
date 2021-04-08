//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useEffect } from 'react';
// require('aaatest/index.js')
import 'aaatest/index.js'

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
