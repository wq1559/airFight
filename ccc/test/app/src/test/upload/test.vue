<template>
  <div>
    <PwcUpload uploadUrl="/wf-web/attachment/save" :uploadData="uploadData"></PwcUpload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadData: {
        wrId: '4aba61fb55574945b8f267558916ae85',
        prefence: '1', // 1-SUBACTIVITY; 2-CATEGORY; 3-ITEM
        deleted: 1,
        columnId: 'AWUcn1',
        columnDetail: ''
        // attachmentType: null,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
