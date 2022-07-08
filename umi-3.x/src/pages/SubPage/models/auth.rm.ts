import { createModel } from '@rematch/core';
import { RootModel } from 'umi';

interface State {
  auth: boolean;
  num: number;
}

export default createModel<RootModel>()({
  state: {
    auth: false,
    num: 100,
  } as State,
  reducers: {
    updateAuth(state, payload: { nextAuth: boolean }) {
      state.auth = payload.nextAuth;

      return state;
    },
    updateNum(state, payload: number) {
      state.num = payload;

      return state;
    },
  },
});
