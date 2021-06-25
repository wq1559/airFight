/**
 *描述:
 *@author yuhan.zhang (mailto:yuhan.y.zhang@cn.pwc.com) 
 *@date 2019-03-28 13:26
 */
<template>
  <div class='pwc_steps'>
    <div
      class="step_item "
      :class="className(0)"
      v-if="isIgnore(0)"
    >
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <p>Request information</p>
      <div class="line"></div>
    </div>
    <div
      class="step_item "
      :class="className(1)"
      v-if="isIgnore(1)"
    >
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <p>Input Form</p>
      <div class="line"></div>
    </div>
    <div
      class="step_item  "
      :class="className(2)"
      v-if="isIgnore(2)"
    >
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <p>Upload</p>
      <div class="line"></div>
    </div>
    <div
      class="step_item "
      :class="className(3)"
      v-if="isIgnore(3)"
    >
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <p>Submit</p>
      <div class="line"></div>
    </div>
  </div>
  <!--步骤条 end-->
</template>

<script>
export default {
  name: "Steps",
  props: ["stepsData"],
  data() {
    return {};
  },
  //载入组件
  components: {},
  //computed计算，数据
  computed: {},
  //mounted 安装，类型function，默认执行 钩子，
  mounted() {},
  //方法 数据
  methods: {
    isIgnore(idx) {
      return !this.stepsData.ignore || !this.stepsData.ignore[idx];
    },
    className(index) {
      if (index == this.stepsData.index) {
        return "step_item_ing";
      } else if (index > this.stepsData.index) {
        return "step_item_un";
      } else if (index < this.stepsData.index) {
        return "step_item_finish";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$red: #e0301e;
.pwc_steps {
  margin-top: 10px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(64, 64, 65, 0.1);
  padding: 21px 0;
  display: flex;
  width: 100%;
  .step_item {
    display: flex;
    align-items: center;
    margin-left: 12px;
    &:last-of-type {
      .line {
        display: none;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
      border-radius: 100%;
      border: 2px solid;
      display: flex;
      align-content: center;
      justify-content: center;
      i {
        color: #fff;
        text-align: center;
        line-height: 16px;
        font-weight: bold;
        display: none;
      }
    }
    p {
      line-height: 20px;
      color: #404041;
      font-size: 12px;
      padding: 0 10px;
    }
    .line {
      width: 100px;
      height: 1px;
      background: url("./bar.png");
    }
  }
  .step_item_finish {
    .icon {
      border-color: $red;
      background: $red;
      i {
        display: block;
      }
    }
  }
  .step_item_ing {
    .icon {
      border-color: $red;
      background: #fceae8;
    }
  }
  .step_item_un {
    .icon {
      border-color: #c4c6cc;
    }
    p {
      color: #c4c6cc;
    }
  }
}
</style>
