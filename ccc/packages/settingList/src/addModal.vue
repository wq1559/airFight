<template>
  <el-dialog :title="title" :visible.sync="visible" :width="config.style.width || '500px'" @close="close" class="c-dialog">
    <el-form
      :model="form"
      :rules="config.formRules"
      ref="form"
      :label-width="config.style.labelWidth || '120px'"
      label-position="left"
      class="c-form"
      v-if="visible"
    >
      <slot v-bind:form="form"></slot>
      <el-form-item class="c-form-item--small c-dialog__footer-btn">
        <el-button class="c-button" @click="cancel" :loading="submitLoading">Cancel</el-button>
        <el-button type="primary" class="c-button" @click="submit" :loading="submitLoading">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    config: Object,
    show: {
      type: Boolean,
      required: true
    },
    form: {
      type: Object,
      default() {
        return Object.assign({}, this.config.form)
      }
    }
  },
  data() {
    return {
      visible: false,
      submitLoading: false
      //
    }
  },
  computed: {
    title() {
      let str = this.form._isEdit ? 'Edit' : 'Add'
      if (this.config.title) {
        str += ' ' + this.config.title
      }
      return str
    }
  },
  watch: {
    show(val) {
      if (this.visible !== this.show) {
        this.visible = this.show
      }
    },
    visible(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('update:show', val)
      }
      if (val) {
        this.init()
      }
    },
    form(val) {
      this.form._isEdit = !!val.id
    }
  },
  created() {
    this.config.style = this.config.style || {}
  },
  methods: {
    init() {},
    submit() {
      this.submitLoading = true
      let form = this.$refs['form']
      let url = this.config.addUrl
      if (this.form._isEdit && this.config.editUrl) {
        url = this.config.editUrl
      }

      form
        .validate()
        .then(() => {
          return this.$fetch('post', url, this.form)
            .then(res => {
              this.$message.success('Save success!')
              this.visible = false
              this.$emit('success')
              this.submitLoading = false
            })
            .catch(() => {
              this.submitLoading = false
            })
        })
        .catch(() => {
          this.$message({
            message: this.$globalConfig.message.formNotCompleted,
            type: 'warning'
          })
          this.submitLoading = false
        })
    },
    cancel() {
      this.visible = false
    },
    close() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
