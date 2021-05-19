import './style.less';
import React, { useEffect, useRef, useState } from 'react';
import { bootstrap } from '@/bootstrap';
import 'intersection-observer';

function report(params: any) {
  console.log('---report:', params);
}

function useIntersectionObserver() {
  const [visibleEls, setVisibleEls] = useState<any>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const timestamp = useRef(0);

  function init() {
    let hasInit = false;
    const targets = Array.from(document.querySelectorAll('[data-clip-id]'));
    const map: any = {};
    observer.current = new IntersectionObserver(
      (entries) => {
        if (!hasInit) {
          entries.reduce((acc: Record<string, any>, cur) => {
            const id = cur.target.getAttribute('data-clip-id');
            id &&
              (acc[id] = {
                id,
                time: cur.time,
                isIntersecting: cur.isIntersecting,
              });

            return acc;
          }, map);
          hasInit = true;
        } else {
          entries.forEach((current) => {
            const id = current.target.getAttribute('data-clip-id') || '';

            if (map[id].isIntersecting && !current.isIntersecting) {
              report({
                id,
                duration: current.time - map[id].time,
                type: 'disappear',
              });
            } else if (!map[id].isIntersecting && current.isIntersecting) {
              report({
                id,
                type: 'appear',
              });
            }

            map[id!] = {
              id,
              isIntersecting: current.isIntersecting,
              time: current.time,
            };
          });
        }

        const vis = Object.keys(map)
          .filter((key) => map[key].isIntersecting)
          .map((key) => map[key]);

        setVisibleEls(vis);
      },
      {
        threshold: 1,
      }
    );

    for (const i of targets) {
      observer.current.observe(i);
    }
  }

  useEffect(() => {
    timestamp.current = Date.now();
    init();
  }, []);

  return {
    update: () => {
      observer.current && observer.current.disconnect();
      setTimeout(() => {
        init();
      }, 0);
    },
    getVisibleEls: () =>
      visibleEls.map((ele: any) => ({
        ...ele,
        duration: Date.now() - timestamp.current - ele.time,
      })),
  };
}

function IntersectionPage() {
  const [visibleE, setVisibleE] = useState(false);
  const { update, getVisibleEls } = useIntersectionObserver();

  return (
    <div className="intersection-page">
      <div className="blank"></div>
      <div data-clip-id="clip1" className="block a"></div>
      <div data-clip-id="clip2" className="block b"></div>
      <div data-clip-id="clip3" className="block c"></div>
      <div data-clip-id="clip4" className="block d"></div>
      {visibleE && <div data-clip-id="clip5" className="block e"></div>}
      <button
        className="button-1"
        onClick={() => {
          setVisibleE(true);
          update();
        }}
      >
        add block
      </button>
      <button
        className="button-2"
        onClick={() => {
          report({
            type: 'pay',
            targets: getVisibleEls(),
          });
        }}
      >
        pay
      </button>
    </div>
  );
}

bootstrap(<IntersectionPage />);
