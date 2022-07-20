import { useState } from 'react';

function Button() {
  // const [count, setCount] = useState(10);

  return (
    <div>
      {/* <div>count: {count}</div> */}
      <button
        onClick={() => {
          // setCount((c) => c + 1);
        }}
      >
        button from umi3
      </button>
    </div>
  );
}

export default Button;
