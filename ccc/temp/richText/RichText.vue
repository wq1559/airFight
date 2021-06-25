<template>
  <div>
    <WangEditor
      v-model="content"
      :options="options"
      :disabled-menus="['video', 'image']"
      :other-extended-menus="true"
      :disabled="false"
      :fontSizes="{
        'x-small': { name: '10px', value: '1' },
        small: { name: '12px', value: '2' },
        normal: { name: '16px', value: '3' },
        large: { name: '18px', value: '4' },
        'x-large': { name: '24px', value: '5' },
        'xx-large': { name: '32px', value: '6' },
        'xxx-large': { name: '48px', value: '7' }
      }"
      split-layout
      @change="onEditorChange"
      class="editor c-scroll--x"
      ref="myEditor"
    >
    </WangEditor>

    <!-- <div class="output code">
      <code class="hljs" v-html="contentCode"></code>
    </div> -->
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import 'quill/dist/quill.snow.css'
import { vueEditor } from 'vue-wangeditor-awesome'
// import { vueEditor, Editor } from 'vue-wangeditor-awesome/src/index'
// const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = Editor

const editorOption = {
  indentation: '1em'
}

export default {
  inheritAttrs: false,
  components: { WangEditor: vueEditor },
  props: {
    value: {
      type: String
    },
    options: {
      type: Object,
      default() {
        return editorOption
      }
    }
  },
  data() {
    return {
      content: '',
      contentCode: ''
    }
  },
  computed: {
    myEditor() {
      return this.$refs['myEditor'] && this.$refs['myEditor'].quill
    }
  },
  mounted() {
    window.addEventListener('resize', () => {})
  },
  watch: {
    value() {
      this.content = this.value
    },
    options: {
      handler() {
        // this.myEditor.initialize()
      }
    },
    deep: true
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.content = value.html
      this.$emit('input', this.content)
      this.$emit('value:change', this.content) // 也可以在上面用sync绑定
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  overflow: hidden;

  /deep/ .w-e-toolbar {
    flex-wrap: wrap;
    font-size: 14px;
  }
  /deep/ .w-e-text-container {
    font-size: 14px;
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
