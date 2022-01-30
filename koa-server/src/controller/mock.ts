import { delay } from "../utils/common";
import { Context } from "koa";
import { Method, Route } from "../components/route-decorator";

export default class {
  @Route(Method.GET, "/mock/list")
  async read(ctx: Context) {
    await delay(1000);

    ctx.body = "abc";
  }
}
