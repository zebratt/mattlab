import { Context } from 'koa';
import {
  createBranch,
  read,
  readBranches,
  readDir,
  write,
  WritingMode,
} from '../../service/storage';
import { Method, Route } from '../../components/route-decorator';
import { createTree } from './utils';

export default class {
  @Route(Method.GET, '/_admin/read/:branch/:filename')
  async read(ctx: Context) {
    const { filename, branch } = ctx.params;

    try {
      const res = await read(`json/${filename}.json`, branch);

      ctx.body = res;
    } catch (error) {
      ctx.body = { success: false, message: 'file not found!' };
    }
  }

  @Route(Method.POST, '/_admin/write/:branch/:filename')
  async write(ctx: Context) {
    const { branch, filename } = ctx.params;

    try {
      const { content } = ctx.request.body as Record<string, any>;
      const tree = await readDir('json', branch);
      const existFilenames = tree.map((ele) => ele.name);
      let mode = WritingMode.UPDATE;

      if (!existFilenames.includes(`${filename}.json`)) {
        mode = WritingMode.CREATE_AND_UPDATE;
      }

      await write(content, `json/${filename}.json`, mode, branch);

      ctx.body = { success: true };
    } catch (error) {
      ctx.body = { success: false, message: error.description };
    }
  }

  @Route(Method.GET, '/_admin/tree/:branch')
  async tree(ctx: Context) {
    const { branch } = ctx.params;
    const tree = await readDir('json', branch);
    const existFilenames = tree.map((ele) => ele.name.split('.')[0]);

    ctx.body = createTree(existFilenames);
  }

  @Route(Method.GET, '/_admin/tree/add/:branch/:filename')
  async treeAdd(ctx: Context) {
    const { filename, branch } = ctx.params;

    try {
      const template = {
        middleware: `// @params mocks
// @params ctx
// @params next

ctx.body = mocks`,
        mocks: {},
      };

      await write(
        template,
        `json/${filename}.json`,
        WritingMode.CREATE,
        branch,
      );

      ctx.body = { success: true };
    } catch (error) {
      ctx.body = { success: false, message: error.description };
    }
  }

  @Route(Method.GET, '/_admin/tree/delete/:branch/:filename')
  async treeDelete(ctx: Context) {
    const { filename, branch } = ctx.params;

    try {
      await write(null, `json/${filename}.json`, WritingMode.DELETE, branch);

      ctx.body = { success: true };
    } catch (error) {
      ctx.body = { success: false, message: error.description };
    }
  }

  @Route(Method.GET, '/_admin/branches')
  async branches(ctx: Context) {
    try {
      const branches = await readBranches();
      const branchNames = branches.map((ele) => ele.name);

      ctx.body = branchNames;
    } catch (error) {
      ctx.body = { success: false, message: error.description };
    }
  }

  @Route(Method.GET, '/_admin/branches/create/:branch')
  async addBranch(ctx: Context) {
    try {
      const { branch } = ctx.params;

      await createBranch(branch);

      ctx.body = { success: true };
    } catch (error) {
      ctx.body = { success: false, message: error.description };
    }
  }
}
