import { createModel } from '@rematch/core';
import { RootModel } from 'umi';

interface State {
  loading: boolean;
}

export default createModel<RootModel>()({
  state: {
    loading: true,
  } as State,
  reducers: {
    updateLoading(state, payload: boolean) {
      state.loading = payload;

      return state;
    },
  },
  effects: (dispatch) => ({
    async stopLoading() {
      dispatch.app.updateLoading(false);
      dispatch.auth.startAuth();
    },
  }),
});
