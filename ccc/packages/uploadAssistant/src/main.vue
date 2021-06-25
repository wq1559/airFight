/**
*描述:
*@author <a href='mailto:awam.m.wang@cn.pwc.com'>Awam M Wang</a>
*@date 2019-04-15 10:51
*/
<template>
  <el-upload
    :action="url"
    :before-upload="_beforeUpload"
    :show-file-list="false"
    :on-success="onSuccess"
    :name="fileParamName"
    :on-error="_onError"
    :headers="{'X-Requested-With': 'XMLHttpRequest'}"
    style="display:none"
    v-bind="[$attrs, $props]"
    ref="upload"
  ></el-upload>
</template>

<script>
let getHookRes = (res, cb) => {
  if (res && res.then) {
    return res.then(() => {
      return cb()
    })
  } else if (res !== false) {
    return cb()
  } else {
    return false
  }
}

export default {
  name: 'PwcUploadAssistant',
  inheritAttrs: false,
  props: {
    url: {
      type: String,
      required: true
    },
    fileParamName: {
      type: String,
      default: 'file'
    },
    beforeUpload: {
      type: Function
    },
    availableFileTypes: {
      default() {
        return ['sheet', 'xls', 'xlsx', 'excel']
      }
    },
    availableFileTypeError: {
      default: '上传文件只能是 xls 或者 xlsx 格式!'
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    _beforeUpload(file) {
      if (this.beforeUpload) {
        const before = this.beforeUpload(file)

        return getHookRes(before, () => {
          return this.defaultBeforeUpload(file)
        })
      } else {
        return this.defaultBeforeUpload(file)
      }
    },
    defaultBeforeUpload(file) {
      if (this.availableFileTypes.some(e => file.type.includes(e))) {
        return true
      } else {
        this.$message.error(this.availableFileTypeError)
        return false
      }
    },
    _onError(err, file, fileList) {
      if (this.onError) {
        const error = this.onError(err, file, fileList)

        return getHookRes(error, () => {
          return this.defaultOnError(err, file, fileList)
        })
      } else {
        return this.defaultOnError(err, file, fileList)
      }
    },
    defaultOnError(err, file, fileList) {
      let realError
      try {
        realError = JSON.parse(err.message)
      } catch (error) {
        realError = err
      }

      this.$message({
        type: 'error',
        message: realError.message || realError.remark || 'Upload error!'
        // duration: 0,
        // showClose: true
      })
      // this.$message.error(err.message || 'Upload error!')
    },
    upload() {
      this.$refs['upload'].$el.childNodes[0].childNodes[0].click()
    }
  }
}
</script>