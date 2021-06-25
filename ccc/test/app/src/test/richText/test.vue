<template>
  <div>
    <PwcRichText v-model="text" upLoadUrl="test" upLoadImageUrl="test" :uploadImage="uploadImage"
      placeholder="placeholder" :options="options" @change="onChange"></PwcRichText>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      options: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'image'] // toggled buttons
          ]
        }
      }
    }
  },
  methods: {
    onChange(res) {
      console.log(res)
    },
    uploadImage() {
      return Promise.then(() => {
        return 'xxxx'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
