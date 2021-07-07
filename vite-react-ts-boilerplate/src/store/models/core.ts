import { createModel } from '@rematch/core';

import type { RootModel } from '.';
import type { CoreState } from '../interface';

export const core = createModel<RootModel>()({
  state: {} as CoreState,
  reducers: {
    updateStructures(state, payload) {
      return state;
    },
  },
  effects: (dispatch) => ({
    async init() {
      dispatch.loading.startLoading();

      // init state

      dispatch.loading.endLoading();
    },
  }),
});
