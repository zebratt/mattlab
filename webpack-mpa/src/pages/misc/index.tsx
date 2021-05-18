//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useState } from 'react';
import { Sub, Sub2 } from './sub';

function MiscPage() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h1>misc page</h1>
      {toggle ? <Sub /> : <Sub2 />}
      <button onClick={() => setToggle(!toggle)}>toggle</button>
    </div>
  );
}

bootstrap(React.createElement(MiscPage, null, null));
