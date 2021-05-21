import { bootstrap } from '@/bootstrap';
import React from 'react';
import Foo from './foo';

function MiscPage() {
  return (
    <div>
      <h1>misc page</h1>
      <Foo />
    </div>
  );
}

bootstrap(<MiscPage />);
