//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useEffect } from 'react';

function MiscPage() {
  return (
    <div>
      <h1>misc page</h1>
      <button
        onClick={async () => {
          const { default: Page2 } = await import('./slave');
          bootstrap(<Page2 />);
        }}
      >
        click me
      </button>
    </div>
  );
}

bootstrap(<MiscPage />);
