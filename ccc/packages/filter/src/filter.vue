<template>
  <div class="mars-filter">

    <el-popover
      placement="bottom"
      trigger="click"
    >
      <div class="filter_cc">
        <ul>
          <slot></slot>
        </ul>
        <div class="bottom_btns">
          <div class="filtercc_btn">Reset</div>
          <div class="filtercc_btn">Save</div>
        </div>
      </div>
      <div
        slot="reference"
        class="filter_btn"
      >
        <span>Filter</span>
        <img src="./filter.svg" />
      </div>
    </el-popover>

  </div>
</template>

<script>
export default {
  name: 'PwcFilter',
  props: {
    space: [Number, String],
    active: Number,
    direction: {
      //暂时没用
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean, //暂时没用
    simple: Boolean, //暂时没用
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: 'center is removed.'
        }
      }
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal)
    },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$red: #e0301e;
$border: #e7e7e8;
$font-active: #404041;
$font-unactive: #c4c6cc;

.mars-filter {
  .filter_btn {
    cursor: pointer;
    width: 70px;
    height: 38px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(64, 64, 65, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: $red;
    span {
      margin-right: 2px;
    }
    img {
      margin-left: 2px;
      color: $red;
      width: 15px;
    }
  }
}

.filter_cc {
  background: #fff;
  .bottom_btns {
    display: flex;
    padding-top: 18px;
    border-top: 1px solid $border;
    justify-content: flex-end;
    .filtercc_btn {
      cursor: pointer;
      &:first-of-type {
        margin-right: 31px;
      }
      &:hover {
        color: $red;
      }
    }
  }
}
</style>
