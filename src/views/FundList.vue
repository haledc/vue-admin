<template>
  <div class="fund-list">
    <div>
      <el-form :inline="true">
        <el-form-item label="时间筛选：">
          <el-date-picker
            v-model="searchTime.startTime"
            align="right"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker
          >-
          <el-date-picker
            v-model="searchTime.endTime"
            align="right"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus"
            @click="handleSearch"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="add-btn">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus"
            @click="handleAdd"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="filterTableData"
        max-height="450"
        border
        style="width: 100%"
        class="table"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="创建时间"
          width="250"
          sortable
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="收支类型"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="desc"
          align="center"
          label="收支描述"
          width="180"
        ></el-table-column>
        <el-table-column prop="income" align="center" label="收入" width="120">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" align="center" label="支出" width="120">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" align="center" label="现金" width="120">
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
          width="180"
        ></el-table-column>
        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-row>
      <el-col :span="24">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :layout="pagination.layout"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-row>
    <dialog-fund
      :dialog="dialog"
      :profileForm="profileForm"
      @success="handleSubmit"
      @cancel="dialog.visible = false"
    />
  </div>
</template>

<script>
import DialogFund from "../components/DialogFund";

export default {
  name: "FundList",
  data() {
    return {
      tableData: [],
      filterTableData: [],
      dialog: {
        title: "",
        visible: false,
        option: "",
      },
      profileForm: {},
      pagination: {
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
      },
      searchTime: {},
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    handleEdit(index, value) {
      this.dialog = {
        visible: true,
        title: "修改资金管理",
        option: "edit",
      };
      this.profileForm = value;
    },
    handleDelete(index, value) {
      const { _id } = value;
      this.$axios.post("/api/profile/delete", { id: _id }).then((res) => {
        if (res.data.success === true) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getProfile();
        }
      });
    },
    getProfile() {
      this.$axios.get("/api/profile/list").then((res) => {
        if (res.data.success === true) {
          this.tableData = res.data.data;
          this.setPagination();
        }
      });
    },
    setPagination() {
      this.pagination.total = this.tableData.length;
      this.pagination.currentPage = 1;
      this.pagination.pageSize = 5;
      this.filterTableData = this.tableData.filter(
        (item, index) => index < this.pagination.pageSize
      );
    },
    handleSearch() {
      const { startTime, endTime } = this.searchTime;
      if (!startTime || !endTime) {
        this.$message({
          message: "请选择时间区间",
          type: "warning",
        });
        return;
      }
      this.filterTableData = this.tableData.filter((item) => {
        const time = new Date(item.date).getTime();
        const sTime = startTime.getTime();
        const eTime = endTime.getTime();
        return time >= sTime && time <= eTime;
      });
    },
    handleAdd() {
      this.dialog = {
        visible: true,
        title: "添加资金管理",
        option: "add",
      };
    },
    handleSubmit() {
      this.dialog.visible = false;
      this.getProfile();
    },
    handleSizeChange(val) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = val;
      this.filterTableData = this.tableData.filter(
        (item, index) => index < val
      );
    },
    handleCurrentChange(pageIndex) {
      const startNum = this.pagination.pageSize * (pageIndex - 1);
      const restTableData = this.tableData.filter(
        (item, index) => index >= startNum
      );
      this.filterTableData = restTableData.filter(
        (item, index) => index < this.pagination.pageSize
      );
    },
  },
  components: {
    DialogFund,
  },
};
</script>

<style scoped lang="scss">
.fund-list {
  padding: 20px;
}

.add-btn {
  float: right;
}

.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
