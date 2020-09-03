const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const jwtSecret = "my_secret";

// 成功返回
const successResponse = (ctx, data) => {
  ctx.body = {
    success: true,
    data,
  };
};

// 失败返回
const failureResponse = (ctx, code, msg) => {
  ctx.status = code;
  ctx.body = {
    success: false,
    msg,
  };
};

// 密码加密
const encrypt = (pwd) => {
  const salt = 10;
  return bcrypt.hash(pwd, salt);
};

// 密码核对
const comparePwd = (pwd, hashPwd) => {
  return bcrypt.compare(pwd, hashPwd);
};

// 生成头像 url
const createAvatar = (email) =>
  gravatar.url(email, { s: "200", r: "pg", d: "mm" });

// 生成 token
const createToken = (data) => {
  return jwt.sign(data, jwtSecret, { expiresIn: "7 days" });
};

// 解密 token
const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  successResponse,
  failureResponse,
  encrypt,
  comparePwd,
  createAvatar,
  jwtSecret,
  createToken,
  verifyToken,
};
