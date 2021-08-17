// @ts-ignore
import Router from '@koa/router';
import { read } from '../service/storage';

const router = new Router();
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

router.get('/stat', async (ctx) => {
  ctx.body = 'ok';
});

router.all('(.*)', async (ctx, next) => {
  const path = ctx.request.path;

  if (path.startsWith('/_admin')) {
    await next();
  } else {
    let res;

    try {
      const { _br } = ctx.request.query;
      const targetName = path.slice(1).split('/').join('-');
      res = await read(`json/${targetName}.json`, (_br as string) ?? 'master');
    } catch (error) {
      res = null;
      ctx.body = 'file not found!';
    }

    try {
      if (res) {
        const { mocks, middleware } = JSON.parse(res);
        const middlewareFun = new AsyncFunction('mocks', 'ctx', 'next', 'require', middleware);
        await middlewareFun(mocks, ctx, next, require);
      }
    } catch (error) {
      ctx.body = error.toString()
    }
  }
});

export default router;
