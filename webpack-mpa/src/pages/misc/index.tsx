//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React, { useEffect, useState, useMemo } from 'react';

function useExpand(num){
  const atom = useMemo(() => {
    console.log('use memo execute...')
    return num * num
  }, [num])

  return atom
}

function MiscPage() {
  const [count, setCount] = useState(0);
  const number = useExpand(count)

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
