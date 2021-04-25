import './style.less';
import React, { useEffect, useRef } from 'react';
import { bootstrap } from '@/bootstrap';
import 'intersection-observer';

function IntersectionPage() {
  const eleC = useRef(null);
  const eleD = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      console.log(entries)
    }, options);

    eleC.current && observer.observe(eleC.current!);
    eleD.current && observer.observe(eleD.current!);
  }, []);

  return (
    <div className="intersection-page">
      <div className="block a"></div>
      <div className="block b"></div>
      <div ref={eleC} className="block c"></div>
      <div ref={eleD} className="block d"></div>
    </div>
  );
}

bootstrap(<IntersectionPage />);
