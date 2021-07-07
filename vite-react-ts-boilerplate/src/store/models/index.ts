import type { Models } from '@rematch/core';
import { loading } from './loading';
import { core } from './core';

export interface RootModel extends Models<RootModel> {
  loading: typeof loading;
  core: typeof core;
}

export const models: RootModel = { loading, core };
