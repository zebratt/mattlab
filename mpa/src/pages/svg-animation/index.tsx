import React from 'react';
import { bootstrap } from '@/bootstrap';
import Windmill from './windmill';
import gasp from 'gsap';

function SvgAnimation() {
  return (
    <div>
      <Windmill />
      <div>
        <button
          onClick={() => {
            run();
          }}
        >
          rotate
        </button>
      </div>
    </div>
  );
}

let tween: gsap.core.Tween;

function run() {
  if (!tween) {
    const center = '155px 155px';

    tween = gasp.to(
      '#Capa_1 > g > g:nth-child(25), #Capa_1 > g > path:nth-child(8), #Capa_1 > g > path:nth-child(9),#Capa_1 > g > path:nth-child(18)',
      {
        duration: 2,
        rotate: 360,
        transformOrigin: center,
      }
    );
  } else {
    tween.restart();
  }
}

bootstrap(<SvgAnimation />);
