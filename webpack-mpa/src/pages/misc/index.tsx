//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useState } from 'react';
import Sub from './sub';

function MiscPage() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h1>misc page</h1>
      {toggle ? <Sub num={10} /> : <Sub num={100} />}
      <button onClick={() => setToggle(!toggle)}>toggle</button>
    </div>
  );
}

bootstrap(React.createElement(MiscPage, null, null));
