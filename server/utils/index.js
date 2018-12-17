const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

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
const encrypt = async pwd => {
  const salt = 10
  return await bcrypt.hash(pwd, salt)
}

/**
 * 密码核对
 * @param pwd
 * @param hashPwd
 * @returns {Promise<void>}
 */
const comparePwd = async (pwd, hashPwd) => {
  return await bcrypt.compare(pwd, hashPwd)
}

/**
 * 生成头像url
 * @param email
 * @returns {*}
 */
const createAvatar = email => gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

// secret
const secret = 'secret'

/**
 * 生成token
 * @param data
 * @returns {*}
 */
const createToken = data => {
  return jwt.sign(data, secret, { expiresIn: 3600 })
}

/**
 * 验证token
 * @param token
 * @returns {*}
 */
const verifyToken = token => {
  return jwt.verify(token, secret)
}

const checkToken = ctx => {
  const { token } = ctx.headers
  const { id } = verifyToken(token)
  return id !== undefined
}

module.exports = {
  successResponse,
  failureResponse,
  encrypt,
  createAvatar,
  comparePwd,
  createToken,
  verifyToken,
  checkToken
}
