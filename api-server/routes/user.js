const Router = require('koa-router')

const User = require('../database/models/user')
const {
  encrypt,
  successResponse,
  failureResponse,
  createAvatar,
  comparePwd,
  createToken,
  verifyToken
} = require('../utils')

const router = new Router({
  prefix: '/api/user'
})

router.post('/register', async ctx => {
  try {
    const { username, password, email, role } = ctx.request.body
    console.log(ctx.request.body)
    const exist = await User.findOne({ email })
    if (exist) {
      failureResponse(ctx, 400, '邮箱重复,请重新输入或者去登录！')
      return
    }
    const newUser = new User({
      username,
      password: await encrypt(password),
      email,
      role,
      avatar: createAvatar(email)
    })
    const user = await newUser.save()
    successResponse(ctx, user)
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.post('/login', async ctx => {
  try {
    const { email, password } = ctx.request.body
    const user = await User.findOne({ email })
    if (!user) {
      failureResponse(ctx, 400, '用户不存在')
    } else {
      const isMatch = await comparePwd(password, user.password)
      if (isMatch) {
        const token = createToken({ id: user._id, name: user.username })
        successResponse(ctx, token)
      } else {
        failureResponse(ctx, 400, '密码不正确')
      }
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.get('/user_info', async ctx => {
  try {
    const { token } = ctx.headers
    const { id } = verifyToken(token)
    const user = await User.findOne({ _id: id })
    const { email, username, avatar, role } = user
    successResponse(ctx, { email, username, avatar, role })
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

module.exports = router
