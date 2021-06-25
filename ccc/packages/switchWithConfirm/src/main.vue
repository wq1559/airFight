<template>
  <el-switch
    v-model="onOrOff"
    @click.native.stop.capture="handelConfirm()"
    :width="width"
    v-bind="[$props, $attrs]"
    ref="innerSwitch"
    v-if="fullscreen"
  ></el-switch>
  <el-popover
    placement="top"
    width="160"
    trigger="manual"
    v-model="confirmShow"
    v-else
  >
    <div>
      <p>{{ word }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancel" v-if="!noCancel"
          >No</el-button
        >
        <el-button size="mini" type="primary" @click="confirm">Yes</el-button>
      </div>
    </div>
    <el-switch
      v-model="onOrOff"
      v-bind="[$props, $attrs]"
      @click.native.stop.capture="handelConfirm()"
      :width="width"
      ref="innerSwitch"
      slot="reference"
    ></el-switch>
  </el-popover>
</template>

<script>
export default {
  name: 'PwcSwitchWithConfirm',
  inheritAttrs: false,
  data() {
    return {
      onOrOff: null,
      confirmShow: false,
      oldStatus: null,
    }
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {},
    word: {
      type: String,
      default: 'Are you sure to continue?',
    },
    noCancel: Boolean,
    synchronize: {
      // 把异步操作放到改变状态后执行（失败补偿）
      type: Boolean,
      default: false,
    },
    onConfirm: {
      type: Function,
    },
    onCancel: {
      type: Function,
    },
    fullscreen: {
      type: Boolean,
    },
    // 继承属性
    width: {
      type: Number,
      default: 40,
    },
  },
  watch: {
    value: {
      handler(val) {
        this.onOrOff = val
      },
      immediate: true,
    },
  },
  methods: {
    cancel() {
      this.confirmShow = false
    },
    getNextStatus() {
      if (this.onOrOff == this.$refs['innerSwitch'].inactiveValue) {
        return this.$refs['innerSwitch'].activeValue
      }
      if (this.onOrOff == this.$refs['innerSwitch'].activeValue) {
        return this.$refs['innerSwitch'].inactiveValue
      }
    },
    changeSwitch() {
      this.$emit('change', this.getNextStatus())
      this.confirmShow = false
    },
    abortChange() {
      this.$emit('change', this.oldStatus)
    },
    async confirm() {
      if (this.synchronize) {
        this.changeSwitch()
        if (this.onConfirm) {
          await this.onConfirm(() => {
            this.confirmShow = false
          }, this.abortChange)
        }
      } else {
        if (this.onConfirm) {
          await this.onConfirm(this.changeSwitch, () => {
            this.confirmShow = false
          })
        } else {
          this.changeSwitch()
        }
      }
    },
    handelConfirm() {
      if (this.$refs['innerSwitch'].disabled) {
        return
      }
      this.oldStatus = this.onOrOff

      if (this.onConfirm) {
        if (this.fullscreen) {
          this.fullscreenConfirm()
        } else {
          this.confirmShow = true
        }
      } else {
        this.changeSwitch()
      }
    },
    fullscreenConfirm() {
      this.$confirm(this.word, '提示', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
        closeOnClickModal: false,
      })
        .then(async () => {
          await this.confirm()
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-switch {
  outline: none;
}
</style>
