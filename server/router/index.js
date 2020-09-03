const Router = require("@koa/router");

const userRouter = require("./user");
const profileRouter = require("./profile");

const router = new Router();

router.use(userRouter.routes()).use(userRouter.allowedMethods());
router.use(profileRouter.routes()).use(profileRouter.allowedMethods());

module.exports = router;
