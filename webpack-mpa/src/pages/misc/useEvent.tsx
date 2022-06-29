import React, { useEffect, useRef, useState } from 'react';

export function UseEventDemo() {
  // 对于useCallback原理核心理解，就是当deps未发生变化时，callback函数不会被更新。
  // 函数内部的作用域链关联着其引用变量的闭包，如果函数未更新，那么它关联的那些闭包就存储着旧的值。
  function useCallback(callback, deps = null) {
    const ref = useRef<any>();
    const hasInit = useRef(false);
    const depsRef = useRef(null);

    if (!hasInit.current || depsRef.current !== deps) {
      ref.current = () => {
        callback.call(null);
      };

      hasInit.current = true;
      depsRef.current = deps;
    }

    return ref.current;
  }

  // 如何实现函数引用保持不变，并且也不会访问到比包内存储到的旧值？
  // 1. 外层函数依然使用useCallback
  // 2. 利用一个ref，将函数内部需要执行的函数，每次通过ref更新，那么就不会访问到旧值了
  function useEvent(callback) {
    const callbackRef = useRef<any>(null);

    callbackRef.current = callback;

    const event = useCallback((...args) => {
      if (callbackRef.current) {
        callbackRef.current.apply(null, args);
      }
    });

    return event;
  }

  function MiscPage() {
    const [counter, setCounter] = useState(0);

    const handleClick = useEvent(() => {
      console.log(counter);
      setCounter((c) => c + 1);
    });

    useEffect(() => {
      console.log('changed!', handleClick);
    }, [handleClick]);

    return (
      <div>
        click to add counter counter: {counter}
        <div>
          <button onClick={handleClick}>click</button>
        </div>
      </div>
    );
  }
}
