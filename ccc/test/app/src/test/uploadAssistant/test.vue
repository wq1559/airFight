<template>
  <div>
    <PwcUploadAssistant url="/wf-web/attachment/save" :onSuccess="importListSuccess" fileParamName="file" ref="uploadAssistant"></PwcUploadAssistant>
    <el-button @click="upload">Upload</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    upload() {
      this.$refs['uploadAssistant'].upload()
    },
    importListSuccess() {
      console.log('import success')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
