const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const router = require('./routes')
require('./database')

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})
