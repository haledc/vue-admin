const Router = require("@koa/router");
const Profile = require("../database/models/profile");
const { successResponse, failureResponse } = require("../utils");

const router = new Router({
  prefix: "/api/profile",
});

router.post("/add", async (ctx) => {
  const { type, desc, income, expend, cash, remark } = ctx.request.body;
  const newProfile = new Profile({
    type,
    desc,
    income,
    expend,
    cash,
    remark,
  });
  const data = await newProfile.save();
  if (data) {
    const allProfile = await Profile.find();
    if (allProfile && allProfile.length > 0) {
      successResponse(ctx, allProfile);
    } else {
      successResponse(ctx, ["暂无内容"]);
    }
  }
});

router.get("/list", async (ctx) => {
  const allProfile = await Profile.find();
  if (allProfile && allProfile.length > 0) {
    successResponse(ctx, allProfile);
  } else {
    successResponse(ctx, ["暂无内容"]);
  }
});

router.get("/detail", async (ctx) => {
  const { id } = ctx.query;
  const profile = await Profile.findOne({ _id: id });
  if (profile) {
    successResponse(ctx, profile);
  } else {
    successResponse(ctx, ["暂无内容"]);
  }
});

router.post("/edit", async (ctx) => {
  const { _id } = ctx.request.body;
  const profile = await Profile.findOneAndUpdate(
    { _id },
    { $set: ctx.request.body },
    { new: true }
  );
  if (profile) {
    successResponse(ctx, profile);
  } else {
    failureResponse(ctx, 400, "修改失败！请重试");
  }
});

router.post("/delete", async (ctx) => {
  const { id } = ctx.request.body;
  const deleteProfile = await Profile.findOneAndRemove({ _id: id });
  if (deleteProfile) {
    const restProfile = await Profile.find();
    successResponse(ctx, restProfile);
  } else {
    failureResponse(ctx, 400, "删除失败，没有该数据");
  }
});

module.exports = router;
