import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./router";

export function createApp() {
  const app = new Koa();

  return app
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
      switch (ctx.method.toLowerCase()) {
        case "get":
          ctx.body = "file not found!";
          break;
        case "post":
          ctx.body = { code: -1, message: "404" };
          break;
      }
    });
}

try {
  const app = createApp();
  const port = Number(process.env.PORT) || 4000;

  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
} catch (error) {
  console.log('server start error!')
}
