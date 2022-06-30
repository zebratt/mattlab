import { useState } from 'react';
import { createContext } from 'react';

interface ContextValue {
  name: string;
}

// default value only used when a component doesn't matching a Provider above in the tree
const ctx = createContext<ContextValue>({
  name: 'default',
});

const Parent = () => {
  const [name, setName] = useState('alice');

  return (
    <div>
      <h1>parent</h1>
      <ctx.Provider value={{ name: name }}>
        <Child />
        <button
          onClick={() => {
            setName('peter');
          }}
        >
          change name
        </button>
      </ctx.Provider>
    </div>
  );
};

const Child = () => {
  return (
    <div>
      <h1>child</h1>
      <ctx.Consumer>
        {(value) => {
          return <div>name: {value.name}</div>;
        }}
      </ctx.Consumer>
    </div>
  );
};

export default Parent;
