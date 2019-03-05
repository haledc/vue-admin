const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const jwtSecret = 'my_secret'

/**
 * 成功返回
 * @param ctx
 * @param data
 */
const successResponse = (ctx, data) => {
  ctx.body = {
    success: true,
    data
  }
}

/**
 * 失败返回
 * @param ctx
 * @param code
 * @param msg
 */
const failureResponse = (ctx, code, msg) => {
  ctx.status = code
  ctx.body = {
    success: false,
    msg
  }
}

/**
 * 密码加密
 * @param pwd
 * @returns {Promise<void>}
 */
const encrypt = pwd => {
  const salt = 10
  return bcrypt.hash(pwd, salt)
}

/**
 * 密码核对
 * @param pwd
 * @param hashPwd
 * @returns {Promise<void>}
 */
const comparePwd = (pwd, hashPwd) => {
  return bcrypt.compare(pwd, hashPwd)
}

/**
 * 生成头像 url
 * @param email
 * @returns {*}
 */
const createAvatar = email =>
  gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

/**
 * 生成token
 * @param data
 * @returns {*}
 */
const createToken = data => {
  return jwt.sign(data, jwtSecret, { expiresIn: '7 days' })
}

/**
 * 解密 token
 * @param token
 * @returns {*}
 */
const verifyToken = token => {
  return jwt.verify(token, jwtSecret)
}

module.exports = {
  successResponse,
  failureResponse,
  encrypt,
  comparePwd,
  createAvatar,
  jwtSecret,
  createToken,
  verifyToken
}
