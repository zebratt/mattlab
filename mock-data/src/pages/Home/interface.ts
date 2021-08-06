export interface TreeItem {
  title: string;
  key: string;
  children: TreeItem[];
}

export interface RawTreeItem {
  path: string;
  children: RawTreeItem[];
}