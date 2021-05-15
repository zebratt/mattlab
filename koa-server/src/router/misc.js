const Router = require('@koa/router')
const router = new Router()

router.get('/hot-update', async (ctx, next) => {
    ctx.body = 'hot update'
})

module.exports = router