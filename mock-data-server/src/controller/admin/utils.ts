interface TreeItem {
  path: string;
  children: TreeItem[];
}

export function createTree(filenames: string[]) {
  const delimiter = '-';
  const result: TreeItem[] = [];

  function parse(pathArr: string[], tree: TreeItem[]) {
    if (!pathArr.length) return;

    const path = pathArr.shift();
    const matched = tree.find((ele) => ele.path === path);

    if (matched) {
      parse(pathArr, matched.children);
    } else {
      const next = {
        path: path!,
        children: [],
      };
      tree.push(next);
      parse(pathArr, next.children);
    }
  }

  filenames.forEach((ele) => parse(ele.split(delimiter), result));

  return result;
}
