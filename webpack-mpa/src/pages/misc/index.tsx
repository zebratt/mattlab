//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';

function useExpand(obj) {
  const atom = useRef(obj.num * obj.num)

  const abc = useCallback(() => {
    console.log('use callback execute')
  }, [atom])

  const bbc = useMemo(() => {
    console.log('use memo execute')
  }, [abc])

  return atom.current;
}

function MiscPage() {
  const [count, setCount] = useState(0);
  const number = useExpand({num: 10});

  return (
    <div>
      <p>count: {count}</p>
      <p>number: {number}</p>
      <button
        onClick={async () => {
          setCount(() => count + 1);
        }}
      >
        increase
      </button>
    </div>
  );
}

bootstrap(<MiscPage />);
