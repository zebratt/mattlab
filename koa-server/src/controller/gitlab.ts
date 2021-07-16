import { Context } from "koa";
import { Method, Route } from "../components/route-decorator";

export default class {
  @Route(Method.GET, "/gitlab/read")
  read(ctx: Context) {
    ctx.body = "this is gitlab read method";
  }

  @Route(Method.GET, "/gitlab/write")
  write(ctx: Context) {
    ctx.body = "this is gitlab wirte method";
  }
}
