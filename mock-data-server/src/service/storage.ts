import { Gitlab } from '@gitbeaker/node';
import { Base64 } from 'js-base64';
import type { CommitAction } from '@gitbeaker/core/dist/types/resources/Commits';

export enum WritingMode {
  CREATE,
  UPDATE,
  CREATE_AND_UPDATE,
  DELETE,
}

const api = new Gitlab({
  token: 'DYNC1YsPyvAcpV_3cLV2',
  host: 'https://git.llsapp.com',
});
const PROJECT_ID = '9228';

export async function read(filePath: string, branch: string) {
  const res = await api.RepositoryFiles.show(
    PROJECT_ID,
    filePath,
    branch ?? 'master',
  );

  return Base64.decode(res.content);
}

export async function write(
  data: unknown,
  filePath: string,
  mode: WritingMode,
  branch: string,
) {
  let actions: CommitAction[] = [];

  switch (mode) {
    case WritingMode.CREATE:
      actions = [
        {
          action: 'create',
          filePath,
          content: JSON.stringify(data, null, 2),
        },
      ];
      break;
    case WritingMode.UPDATE:
      actions = [
        {
          action: 'update',
          filePath,
          content: JSON.stringify(data, null, 2),
        },
      ];
      break;
    case WritingMode.CREATE_AND_UPDATE:
      actions = [
        {
          action: 'create',
          filePath,
          content: JSON.stringify(data, null, 2),
        },
        {
          action: 'update',
          filePath,
          content: JSON.stringify(data, null, 2),
        },
      ];
      break;
    case WritingMode.DELETE:
      actions = [
        {
          action: 'delete',
          filePath,
        },
      ];
      break;

    default:
      break;
  }

  await api.Commits.create(
    PROJECT_ID,
    branch ?? 'master',
    `${filePath} updated`,
    actions,
  );
}

export async function readDir(path, branch = 'master') {
  const tree = await api.Repositories.tree(PROJECT_ID, {
    path,
    ref: branch,
  });

  return tree;
}

export async function readBranches() {
  const branches = await api.Branches.all(PROJECT_ID);

  return branches;
}

export async function createBranch(branch: string) {
  const res = await api.Branches.create(PROJECT_ID, branch, 'master');

  return res;
}
