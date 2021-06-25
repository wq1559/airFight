// import ApiMixin from './features/api-mixin'

export default {
  // mixins: [ApiMixin],
  methods: {
    goBack() {
      this.$router.back()
    },
    handleHttpError(error, { data }) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
        data && console.log(JSON.stringify(data))
      }
    },
    messageHold(options) {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: `<div class="c-message_box"><p class="c-message_box_title">${options.title}</p></br>
        <span>${options.remark}</span></div>`,
        duration: 0,
        showClose: true,
        ...options
      })
    }
  }
}
