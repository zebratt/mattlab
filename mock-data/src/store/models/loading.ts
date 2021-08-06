import { createModel } from '@rematch/core';
import type { RootModel } from '.';

interface LoadingModelState {
  isLoading: boolean;
  error: Error | null;
}

export const loading = createModel<RootModel>()({
  state: {
    isLoading: false,
    error: null,
  } as LoadingModelState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      return state;
    },
    endLoading(state) {
      state.isLoading = false;
      return state;
    },
    loadingError(state, payload: Error | null) {
      state.isLoading = false;
      state.error = payload;
      return state;
    },
  },
});
