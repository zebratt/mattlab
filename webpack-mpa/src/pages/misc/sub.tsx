import React, { useState } from 'react'

function Sub() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>sub page</h3>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>add 1</button>
    </div>
  );
}

if(module.hot){
  console.log(2)
  module.hot.accept()
}

export default Sub