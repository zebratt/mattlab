import { bootstrap } from '@/bootstrap';
import React, { useEffect, useState } from 'react';
import Foo from './foo';

function MiscPage() {
  const [a, setA] = useState(null);

  useEffect(() => {
    if (a && a.name) {
      console.log(a.name);
    }
  }, [a || null]);

  return (
    <div>
      <h1>misc page</h1>
      <button
        onClick={() => {
          setA({
            name: Date.now(),
          });
        }}
      >
        click me
      </button>
    </div>
  );
}

bootstrap(<MiscPage />);
