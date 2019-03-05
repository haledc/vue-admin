const Koa = require('koa')
const serve = require('koa-static')
const history = require('koa2-history-api-fallback')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const path = require('path')
const { failureResponse, jwtSecret } = require('./utils')

const isProd = process.env.NODE_ENV === 'production'

const router = require('./routes')
require('./database')

const app = new Koa()

app.use((ctx, next) => {
  return next().catch(err => {
    console.log('error:', err.message)
    if (err.status === 401) {
      failureResponse(ctx, 401, err.message)
    } else {
      isProd
        ? failureResponse(ctx, 500, '服务器内部错误')
        : failureResponse(ctx, 500, err.message)
    }
  })
})

app.use(history())
app.use(
  koaJwt({ secret: jwtSecret }).unless({
    path: /(^\/api\/user)|(^\/$)|(^\/(js|css|fonts|img|favicon\.ico|login|register|index))/
  })
)

app.use(logger())
app.use(bodyParser())
app.use(serve(path.join(__dirname, '../dist')))
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 9098

app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})
