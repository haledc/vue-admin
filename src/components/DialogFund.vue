<template>
  <div class="add-fund">
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <div class="form-container">
        <el-form
          :model="profileForm"
          status-icon
          :rules="rules"
          ref="profileForm"
          label-width="80px"
          class="register-form"
        >
          <el-form-item label="收支类型">
            <el-select
              v-model="profileForm.type"
              placeholder="收支类型"
              prop="type"
            >
              <el-option
                v-for="type in typeList"
                :key="type"
                :label="type"
                :value="type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" prop="desc">
            <el-input v-model="profileForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="收入" prop="income">
            <el-input v-model="profileForm.income"></el-input>
          </el-form-item>
          <el-form-item label="支出" prop="expend">
            <el-input v-model="profileForm.expend"></el-input>
          </el-form-item>
          <el-form-item label="现金" prop="cash">
            <el-input v-model="profileForm.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="profileForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button
              type="primary"
              @click="submitForm('profileForm')"
              class="submit-btn"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogFund",
  props: {
    dialog: {
      type: Object,
      required: true,
    },
    profileForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        type: [
          { required: true, message: "收支类型不能为空", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "收支描述不能为空", trigger: "blur" },
        ],
        income: [{ required: true, message: "收入不能为空", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空", trigger: "blur" }],
        cash: [{ required: true, message: "现金不能为空", trigger: "blur" }],
      },
      typeList: ["提现", "提现手续费", "充值", "优惠券", "充值礼券", "转账"],
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialog.option === "add") {
            this.$axios
              .post("/api/profile/add", this.profileForm)
              .then((res) => {
                if (res.data.success === true) {
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.$emit("success");
                }
              });
          } else if (this.dialog.option === "edit") {
            this.$axios
              .post("/api/profile/edit", this.profileForm)
              .then((res) => {
                if (res.data.success === true) {
                  this.$message({
                    message: "修改成功！",
                    type: "success",
                  });
                  this.$emit("success");
                }
              });
          }
        }
      });
    },
  },
};
</script>
