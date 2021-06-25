/**
*描述: pagination components
*@author <a href='mailto:gary.z.wu@cn.pwc.com'>Gray z Wu</a>
*@date 2019-03-28 09:55
*/
<template>
  <div class="block flex">
    <el-pagination
      :current-page.sync="gridPage"
      :page-size="gridPageSize"
      layout="slot,prev, pager, next"
      :total="gridDataTotal"
      :pager-count='5'
      @current-change="onChangeClient"
    >
      <span
        @click="toPage('first')"
        class="mypager go_first"
      >
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-left"></i>
      </span>
    </el-pagination>
    <el-pagination
      :current-page.sync="gridPage"
      :page-size="gridPageSize"
      layout="slot, total ,jumper"
      :total="gridDataTotal"
      :pager-count='5'
      @current-change="onChangeClient"
    >
      <span
        @click="toPage('last')"
        class="mypager go_last"
      >
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PwcPagination",
  props: ["curPage", "total", "pageSize"],
  data() {
    return {
      gridPage: "",
      gridPageSize: "",
      gridDataTotal: "",
      gridPageTotal: ""
    };
  },
  watch: {
    total(val) {
      this.gridPage = this.curPage;
      this.gridPageSize = this.pageSize;
      this.gridDataTotal = this.total;
      this.gridPageTotal = Math.ceil(this.gridDataTotal / this.gridPageSize);
    }
  },
  created() {
    this.gridPage = this.curPage;
    this.gridPageSize = this.pageSize;
    this.gridDataTotal = this.total;
    this.gridPageTotal = Math.ceil(this.gridDataTotal / this.gridPageSize);
  },
  methods: {
    toPage(flag) {
      if (flag == "first") {
        if (this.gridPage == 1) return;
        this.gridPage = 1;
        this.$emit("changePage", 1);
      } else if (flag == "last") {
        if (this.gridPage == this.gridPageTotal) return;
        this.gridPage = this.gridPageTotal;
        this.$emit("changePage", this.gridPage);
      }
    },
    onChangeClient() {
      this.$emit("changePage", this.gridPage);
    }
  }
};
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  justify-content: center;
}
.block {
  /deep/ .el-pagination {
    margin: 20px 0 0;
    padding: 0;
  }
  .mypager {
    display: inline-block;
    cursor: pointer;
    color: #606266;
    font-weight: normal;
    font-size: 13px;
    i {
      width: 6px;
    }
  }
  .go_first {
    padding-right: 10px;
  }
  .go_last {
    padding-right: 20px;
  }
  .myactive {
    color: #e0301e;
  }
}
</style>