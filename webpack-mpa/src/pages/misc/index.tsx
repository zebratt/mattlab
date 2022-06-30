import { bootstrap } from '@/bootstrap';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UseModelDemo from './useModel';

function App() {
  return (
    <div>
      <UseModelDemo />
    </div>
  );
}

bootstrap(<App />);
