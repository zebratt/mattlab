import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import path from "path";
import router from "./router";
import { initControllers } from "./controller";

export async function createApp() {
  const app = new Koa();

  await initControllers();

  return app
    .use(
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: path.join(__dirname, "upload"), // 设置文件上传目录
          keepExtensions: true, // 保持文件的后缀
        },
      })
    )
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
      const date = new Date().toLocaleString();
      const body =
        ctx.method.toLowerCase() === "get"
          ? ctx.querystring
          : JSON.stringify(ctx.request.body);

      console.log(`[${date}]:::${ctx.method}:::${ctx.url}:::${body}`);

      await next();
    })
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
    console.log("server start error!");
  }
}

start();
