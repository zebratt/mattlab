import Router from "@koa/router";

const router = new Router();

router.all("(.*)", async (ctx, next) => {
  console.log("path: ", ctx.path);

  await next();
});

export default router;
