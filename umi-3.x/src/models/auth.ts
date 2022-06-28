import { createModel } from '@rematch/core';

interface State {
  auth: boolean;
}

export default createModel()({
  state: {
    auth: false,
  } as State,
  reducers: {
    updateAuth(state, payload: { nextAuth: boolean }) {
      state.auth = payload.nextAuth;

      return state;
    },
  },
});
