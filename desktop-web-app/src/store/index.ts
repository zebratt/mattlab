import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import { models } from '@/store/models'

import type { RootModel } from '@/store/models';
import type { RematchDispatch, RematchRootState } from '@rematch/core'

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
