import type { Models } from '@rematch/core';
import { core } from './core';
import { loading } from './loading';

export interface RootModel extends Models<RootModel> {
  core: typeof core;
  loading: typeof loading;
}

export const models: RootModel = { core, loading };
