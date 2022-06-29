import { bootstrap } from '@/bootstrap';
import React, { useCallback, useEffect, useRef, useState } from 'react';

function useEvent(callback) {
  const callbackRef = useRef<any>(null);

  callbackRef.current = callback;

  const event = useCallback((...args) => {
    if (callbackRef.current) {
      callbackRef.current.apply(null, args);
    }
  }, []);

  return event;
}

export default function App() {
  const [count, setCount] = useState(0);

  const onLeave = useEvent(() => {
    console.log('onleave:', count);
  });

  const onEnter = useEvent(() => {
    console.log('onenter:', count);
  });

  const onClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    onEnter();

    return () => {
      onLeave();
    };
  });

  return <div onClick={onClick}>click to add counter counter: {count}</div>;
}

bootstrap(<App />);
