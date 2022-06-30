import { Context, createContext, useContext, useState } from 'react';

function useAuth() {
  const [auth, setAuth] = useState('empty');

  return {
    auth,
    setAuth,
  };
}

const models = {
  auth: useAuth,
};

function Parent() {
  return (
    <div>
      <h1>Parent</h1>
      <SubA />
      <SubB />
    </div>
  );
}

function SubA() {
  const { auth } = useModel('auth');

  return (
    <div>
      <h2>SubA</h2>
      auth data: {auth}
    </div>
  );
}

function SubB() {
  const { setAuth } = useModel('auth');
  return (
    <div>
      <h2>SubB</h2>
      <button
        onClick={() => {
          setAuth('i am matt');
        }}
      >
        set auth
      </button>
    </div>
  );
}

let ctx: Context<any>;

const values = {};

// 核心就是利用这个组件，把内部的state通过Provider传递给所有的子组件，并且可以触发子组件的重绘
function UseModelProvider(props) {
  ctx = createContext({});

  for (let key of Object.keys(models)) {
    values[key] = models[key].call();
  }

  return <ctx.Provider value={values}>{props.children}</ctx.Provider>;
}

function useModel(key: string) {
  const values = useContext(ctx);

  return values[key];
}

export default () => (
  <UseModelProvider>
    <Parent />
  </UseModelProvider>
);
