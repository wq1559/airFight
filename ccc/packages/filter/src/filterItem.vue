<template>
  <li class="filter-row">
    <div class="lable">
      <span>{{label}}</span>
    </div>
    <div class="value">
      <slot></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'PwcFilterItem',
  props: {
    label: [Number, String]
  },
  data() {
    return {}
  },
  methods: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
$red: #e0301e;
$border: #e7e7e8;
$font-unactive: #c4c6cc;

.filter-row {
  display: flex;
  margin-bottom: 22px;
  .lable {
    width: 145px;
    line-height: 1;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
  }
  .value {
    width: 100%;
    max-height: 40vh;
    overflow: auto;
    .inputfanwei {
      height: 30px;
      width: 95px;
      border: 1px solid $border;
      border-radius: 2px;
      .line {
        color: $font-unactive;
        font-weight: bold;
      }
      input {
        width: 40px;
        text-align: center;
        border: none;
        outline: none;
        box-sizing: border-box;
        height: 30px;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
    .zhedie_title {
      display: flex;
      line-height: 20px;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      color: #606266;
      .select_num {
        background: $red;
        height: 20px;
        padding: 0 10px;
        color: #fff;
        margin-right: 4px;
        border-radius: 10px;
      }
    }
    .el-collapse {
      margin-bottom: 20px;
    }
    .checklist {
      padding-top: 10px;
      .check_item {
        height: 26px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
