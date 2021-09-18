import type { Models } from '@rematch/core';
import { loading } from './loading';

export interface RootModel extends Models<RootModel> {
  loading: typeof loading;
}

export const models: RootModel = { loading };
