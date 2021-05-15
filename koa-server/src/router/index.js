const Router = require('@koa/router')
const router = new Router()
const miscRouter = require('./misc')

router.all('/', async (ctx, next) => {
    if (ctx.app.env === 'dev') {
        ctx.response.set('Access-Control-Allow-Origin', '*')
        ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }

    await next()
})

router.use('/misc', miscRouter.routes())

module.exports = router