//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useState } from 'react';
// import { Sub, Sub2 } from './sub';
import { Foo, Foo2 } from './foo';
import { createProxy, getForceUpdate } from 'react-proxy';

const proxy = createProxy(Foo);
const ProxyFoo = proxy.get();

function MiscPage() {
  const [toggle, setToggle] = useState(true);
  return (
    <div>
      {/* {toggle ? <Sub /> : <Sub2 />} */}
      <ProxyFoo />
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      <button
        onClick={() => {
          const mounted = proxy.update(Foo2);

          // const forceUpdate = getForceUpdate(React);
          // mounted.forEach(forceUpdate);

          for(const i of mounted){
            i.forceUpdate()
          }
        }}
      >
        update Foo
      </button>
    </div>
  );
}

bootstrap(React.createElement(MiscPage, null, null));