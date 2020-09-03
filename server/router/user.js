const Router = require("@koa/router");

const User = require("../database/models/user");
const {
  encrypt,
  successResponse,
  failureResponse,
  createAvatar,
  comparePwd,
  createToken,
  verifyToken,
} = require("../utils");

const router = new Router({
  prefix: "/api/user",
});

router.post("/register", async (ctx) => {
  const { username, password, email, role } = ctx.request.body;
  const exist = await User.findOne({ email });
  if (exist) {
    failureResponse(ctx, 200, "邮箱重复,请重新输入或者去登录！");
    return;
  }
  const encryptPwd = await encrypt(password);

  const newUser = new User({
    username,
    password: encryptPwd,
    email,
    role,
    avatar: createAvatar(email),
  });
  const user = await newUser.save();
  successResponse(ctx, user);
});

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email });
  if (!user) {
    failureResponse(ctx, 200, "用户不存在");
  } else {
    const isMatch = await comparePwd(password, user.password);
    if (isMatch) {
      const token = createToken({ id: user._id, name: user.username });
      successResponse(ctx, token);
    } else {
      failureResponse(ctx, 200, "密码不正确，请重新输入！");
    }
  }
});

router.get("/user_info", async (ctx) => {
  const { authorization } = ctx.headers;
  const token = authorization.split(" ")[1]; // 解析 Bearer <token>
  const { id } = verifyToken(token);
  const user = await User.findOne({ _id: id });
  const { email, username, avatar, role } = user;
  successResponse(ctx, { email, username, avatar, role });
});

module.exports = router;
