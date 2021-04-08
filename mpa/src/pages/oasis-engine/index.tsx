import React, { useEffect } from 'react';
import { bootstrap } from '@/bootstrap';
import { draw } from './draw';

function OasisEngine() {
  useEffect(() => {
    draw();
  }, []);

  return <canvas id="canvas"></canvas>;
}

bootstrap(<OasisEngine />);
