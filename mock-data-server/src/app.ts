import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./router";
import { initControllers } from "./controller";

export async function createApp() {
  const app = new Koa();

  await initControllers();

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

async function start() {
  try {
    const app = await createApp();
    const port = Number(process.env.PORT) || 4000;

    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error)
    console.log("server start error!");
  }
}

start();
