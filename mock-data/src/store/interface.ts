import type { RawTreeItem, TreeItem } from '@/pages/Home/interface';

export interface CoreState {
  trees: TreeItem[];
  rawTrees: RawTreeItem[];
  branch: string;
}
