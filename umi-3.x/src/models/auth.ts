import { createModel } from '@rematch/core';

interface State {
  auth: boolean;
}

export default createModel()({
  state: {
    auth: false,
  } as State,
  reducers: {
    startAuth(state) {
      state.auth = true;

      return state;
    },
  },
});
