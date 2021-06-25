<template>
  <div>
    <pwc-steps :active="active">
      <pwc-step title="步骤 1"></pwc-step>
      <pwc-step title="步骤 2"></pwc-step>
      <pwc-step title="步骤 3"></pwc-step>
    </pwc-steps>
    <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <router-link
      to="/test/menuTest/richTextTest"
    >跳转</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
