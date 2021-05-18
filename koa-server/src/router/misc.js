const Router = require("@koa/router");
const router = new Router();
const fs = require("fs");
const path = require("path");

router.get("/hot-update", async (ctx) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../../assets/chunk.js")
  );

  ctx.set('Content-type', 'text/javascript')
  ctx.body = content.toString();
});

module.exports = router;
