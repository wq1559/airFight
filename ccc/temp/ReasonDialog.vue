<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    @open="onOpen"
    @close="onClose"
    width="480px"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Reason" required>
        <el-select v-model="form.reason" placeholder="reason">
          <el-option
            v-for="item in reasonOptions"
            :key="item.id"
            :label="item.remark"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Comments" required class="remark_input">
        <el-input
          maxlength="500"
          :autosize="{ minRows: 5 }"
          type="textarea"
          v-model="form.comments"
        ></el-input>
        <div class="number">{{ form.comments.length }}/500</div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
      <el-button type="primary" @click="confirm" :loading="submit.loading"
        >Submit</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReasonDialog',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      // required: true
    },
    title: {
      default: 'Modfiy Reason'
    },
    options: {
      type: Array
    },
    handleOptions: Function,
    handleSubmitData: Function
  },
  data() {
    return {
      optionUrl: '',
      submitUrl: '',
      reasonOptions: [],
      submit: {
        loading: false
      },
      form: {
        reason: '',
        comments: ''
      }
    }
  },
  mounted() {
    if (this.type === 'spt') {
      this.optionUrl = this.$api.spt.reasonGet
    }

    this.getOptions()
  },
  methods: {
    async getOptions() {
      if (this.options && this.options.length) {
        return this.reasonOptions = this.handleOptions ? this.handleOptions(this.options) : this.options
      }
      if (this.reasonOptions && this.reasonOptions.length) return
      if (!this.optionUrl) return

      try {
        await this.$fetch('get', this.optionUrl, {}).then((res) => {
          if (this.handleOptions) {
            this.reasonOptions = this.handleOptions(res)
          } else {
            this.reasonOptions = res.result || []
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    onOpen() {
      this.form.reason = ''
      this.form.comments = ''
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    checkData() {
      if (!this.form.reason) {
        this.$message.error('Please Choose Reason!')
        return false
      } else if (!this.form.comments) {
        this.$message.error('Please Enter Comments!')
        return false
      }
      return true
    },
    confirm() {
      if (!this.checkData()) return false

      let data = Object.assign({}, this.form)

      if (this.submitUrl) {
        if (this.handleSubmitData) {
          data = this.handleSubmitData(data)
        }
        this.$fetch('post', this.submitUrl, data).then((res) => {})
      }
      if (data.reason && this.reasonOptions.length) {
        data.reasonRemark = this.reasonOptions.find((o) => o.id).remark
      }

      this.$emit('confirm', data)
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
  .el-dialog__header {
    background: #f2f2f2;
    font-size: 12px;
    padding: 20px;
  }

  .el-form-item__label {
    padding-right: 25px;
  }

  .el-dialog__body {
    padding: 30px 20px 0 20px;
  }
}

.remark_input {
  position: relative;

  .number {
    position: absolute;
    color: #dcdfe6;
    bottom: -12px;
    right: 15px;
    font-size: 12px;
  }
}
</style>