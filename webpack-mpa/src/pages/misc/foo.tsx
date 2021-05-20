import React, { useState } from 'react'

function Foo() {
  const [num, setNum] = useState(0);

  return (
    <div>
      <h1>foo page</h1>
      <div>num: {num}</div>
      <button onClick={() => setNum(num + 1)}>increase</button>
    </div>
  );
}

export default Foo