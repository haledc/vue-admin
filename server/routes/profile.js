const Router = require('koa-router')

const Profile = require('../database/models/profile')
const { successResponse, failureResponse, checkToken } = require('../utils')

const router = new Router({
  prefix: '/api/profile'
})

router.post('/add', async ctx => {
  try {
    const { type, desc, income, expend, cash, remark } = ctx.request.body
    const newProfile = new Profile({
      type,
      desc,
      income,
      expend,
      cash,
      remark
    })
    const data = await newProfile.save()
    if (data) {
      const allProfile = await Profile.find()
      if (allProfile && allProfile.length > 0) {
        successResponse(ctx, allProfile)
      } else {
        successResponse(ctx, ['暂无内容'])
      }
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.get('/', async ctx => {
  try {
    const isCheck = checkToken(ctx)
    if (isCheck) {
      const allProfile = await Profile.find()
      if (allProfile && allProfile.length > 0) {
        successResponse(ctx, allProfile)
      } else {
        successResponse(ctx, ['暂无内容'])
      }
    } else {
      failureResponse(ctx, 401, 'token失效，请重新登录！')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.get('/detail', async ctx => {
  try {
    const isCheck = checkToken(ctx)
    const { id } = ctx.query
    if (isCheck) {
      const profile = await Profile.findOne({ _id: id })
      if (profile) {
        successResponse(ctx, profile)
      } else {
        successResponse(ctx, ['暂无内容'])
      }
    } else {
      failureResponse(ctx, 401, 'token失效，请重新登录！')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.post('/edit', async ctx => {
  try {
    const isCheck = checkToken(ctx)
    const { _id } = ctx.request.body
    if (isCheck) {
      const profile = await Profile.findOneAndUpdate(
        { _id },
        { $set: ctx.request.body },
        { new: true }
      )
      if (profile) {
        successResponse(ctx, profile)
      } else {
        failureResponse(ctx, 400, '修改失败！请重试')
      }
    } else {
      failureResponse(ctx, 401, 'token失效，请重新登录！')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.post('/delete', async ctx => {
  try {
    const isCheck = checkToken(ctx)
    const { id } = ctx.request.body
    if (isCheck) {
      const deleteProfile = await Profile.findOneAndRemove(
        { _id: id }
      )
      console.log(deleteProfile)
      if (deleteProfile) {
        const restProfile = await Profile.find()
        successResponse(ctx, restProfile)
      } else {
        failureResponse(ctx, 400, '删除失败，没有该数据')
      }
    } else {
      failureResponse(ctx, 401, 'token失效，请重新登录！')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

module.exports = router
