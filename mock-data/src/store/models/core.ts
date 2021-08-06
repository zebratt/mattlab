import { createModel } from '@rematch/core';

import type { RootModel } from '.';
import type { CoreState } from '../interface';
import type { RawTreeItem, TreeItem } from '@/pages/Home/interface';
import { getFileTree } from '@/pages/Home/api';

export const core = createModel<RootModel>()({
  state: {
    rawTrees: [],
    trees: [],
    branch: 'master',
  } as CoreState,
  reducers: {
    updateFileTree(
      state,
      payload: {
        trees: TreeItem[];
        rawTrees: RawTreeItem[];
      },
    ) {
      state.rawTrees = payload.rawTrees;
      state.trees = payload.trees;

      return state;
    },
    updateBranch(state, payload: string) {
      state.branch = payload;

      return state;
    },
  },
  effects: (dispatch) => ({
    async initFileTree(payload: { callback?: VoidFunction }, rootState) {
      function createTreeData(
        root: RawTreeItem[],
        parentKey?: string,
      ): TreeItem[] {
        return root.map((el) => {
          const key = parentKey ? `${parentKey}-${el.path}` : el.path;

          return {
            title: el.path,
            key,
            children: createTreeData(el.children, key),
          };
        });
      }

      const rawTrees = await getFileTree(rootState.core.branch);
      const trees = createTreeData(rawTrees);

      dispatch.core.updateFileTree({
        trees,
        rawTrees,
      });
      payload?.callback?.();
    },
  }),
});
