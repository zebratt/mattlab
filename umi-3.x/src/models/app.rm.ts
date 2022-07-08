import { createModel } from '@rematch/core';
import { RootModel } from 'umi';

interface State {
  loading: boolean;
  count: number;
}

export default createModel<RootModel>()({
  state: {
    loading: true,
    count: 1,
  } as State,
  reducers: {
    updateLoading(state, payload: boolean) {
      state.loading = payload;

      return state;
    },
  },
  effects: (dispatch) => ({
    async stopLoading(payload: { next: boolean }) {
      console.log(payload.next);

      dispatch.app.updateLoading(false);
    },
  }),
});
