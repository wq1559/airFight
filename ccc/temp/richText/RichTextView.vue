<template>
  <div class="rich-text-view" :data-id="id" v-loading="pageLoading">
    <div class="ql-editor c-scroll--x" :style="styles" v-html="html"></div>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'

export default {
  props: {
    id: {
      type: String
    },
    content: {
      type: String
    },
    height: {
      type: String,
      default: '65vh'
    },
    maxHeight: {
      type: String
    },
    errorMessage: {
      type: String,
      default: '获取文本内容失败'
    }
  },
  data() {
    return {
      html: '',
      pageLoading: false
    }
  },
  computed: {
    styles() {
      return {
        height: this.height,
        maxHeight: this.maxHeight
      }
    }
  },
  mounted() {},
  watch: {
    content: {
      handler() {
        this.html = this.content
      },
      immediate: true
    },
    id: {
      handler(val) {
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    async init() {
      if (this.id && !this.content) {
        // this.pageLoading = true
        try {
          this.$fetch('get', this.$api.common.richTextGet, {
            id: this.id
          }).then((res) => {
            res.result = res.result || {}
            if (res.result.remark && res.result.remark.length) {
              this.html = res.result.remark
            }
          })
        } catch (error) {
          console.log(error)
        } finally {
          // this.pageLoading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/common/theme_var';

.rich-text-view {
  /deep/ .ql-editor {
    font-size: 14px;
    color: $t--color-text;
    padding: 0;
    overflow: auto;
    line-height: 40px;

    h2 {
      font-size: 16px;
      display: inline;
    }

    font[size="2"] {
      font-size: 12px;
    }

    table {
      width: auto;
      tr {
        th {
          background: #f5f5f5;
          height: 40px;
          padding: 0 20px;
        }

        td {
          padding: 20px;
          line-height: 24px;
        }

        th,
        td {
          border: 1px solid #e7e7e8;
          box-sizing: border-box;
        }
      }
    }
    // ul {
    //   li {
    //     list-style-type: disc;
    //   }
    // }
    // ol {
    //   li {
    //     list-style-type: decimal;
    //   }
    // }
  }
}
</style>
