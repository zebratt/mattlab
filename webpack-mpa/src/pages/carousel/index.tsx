//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import 'intersection-observer'

import './style.less';

const images = [
  'https://cdn.llscdn.com/misc/banner4-0ed59d5782546dfbf6b014afcfbdb574.png',
  'https://cdn.llscdn.com/misc/banner3-cf86ac4fa7d78e124314b20fb89e6678.png',
  'https://cdn.llscdn.com/misc/banner2-01d09ca8a63ed19d160c3f78c10cbbf9.png',
  'https://sprout.llscdn.com/fbcb9911666f4e3ff112b90146f940e5.jpg',
];

function MiscPage() {
  const [offset, setOffset] = useState(0);

  function move() {
    setOffset((offset + 1) % 4);
  }

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.slide-item'));
    const observer = new IntersectionObserver(
      (entries) => {
        const map = entries.map((ele) => ({
          id: ele.target.getAttribute('data-id'),
          visible: ele.isIntersecting,
        }));

        console.log(map)
      },
      { threshold: 1 }
    );

    for (const ele of targets) {
      observer.observe(ele);
    }
  }, []);

  return (
    <div className="misc-page">
      <h1>carousel</h1>
      <button onClick={move}>move</button>
      <div
        className="slides-wrapper"
        style={{ transform: `translate3d(-${offset * 414}px, 0, 0)` }}
      >
        {images.map((ele, idx) => (
          <img
            data-id={`image-${idx + 1}`}
            className="slide-item"
            key={idx}
            src={ele}
          />
        ))}
      </div>
    </div>
  );
}

bootstrap(<MiscPage />);
