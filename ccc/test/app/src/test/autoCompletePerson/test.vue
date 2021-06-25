<template>
  <div>
    <PwcAutoCompletePerson></PwcAutoCompletePerson>
    <el-dialog title="提示" :visible.sync="selected" width="30%">
      <span>这是一段信息</span>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>