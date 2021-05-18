//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useState } from 'react';
import Sub from './sub';

function MiscPage() {
  return (
    <div>
      <h1>misc page</h1>
      <Sub />
    </div>
  );
}

bootstrap(React.createElement(MiscPage, null, null));
