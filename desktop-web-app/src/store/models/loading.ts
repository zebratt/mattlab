import { createModel } from '@rematch/core';
import type { RootModel } from '.';

interface LoadingModelState {
  globalLoading: boolean;
  error: Error | null;
}

export const loading = createModel<RootModel>()({
  state: {
    globalLoading: false,
    error: null,
  } as LoadingModelState,
  reducers: {
    startLoading(state) {
      state.globalLoading = true;
      return state;
    },
    endLoading(state) {
      state.globalLoading = false;
      return state;
    },
    loadingError(state, payload: Error | null) {
      state.globalLoading = false;
      state.error = payload;
      return state;
    },
  },
});
