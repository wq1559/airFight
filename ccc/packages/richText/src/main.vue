/**
*描述:
*@author <a href='mailto:awam.m.wang@cn.pwc.com'>Awam M Wang</a>
*@date 2019-03-29 13:23
*/
<template>
  <div class="pwc-richtext">
    <quill-editor :ref="rtId" :id="rtId" v-model="editorContent" :options="editorOption" :disabled="disabled"
      @change="contentChange"></quill-editor>
    <img :id="rtImageNodeId" style="display:none">
    <!-- 文件上传input 将它隐藏-->
    <el-upload style="display:none" :action="upLoadUrl" :show-file-list="false" :before-upload='newEditorbeforeupload'
      :on-success='newEditorSuccess' :id="rtId+'_rt-up'">
    </el-upload>
  </div>
</template>

<script>
import * as Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getBase64Image } from '../../../src/utils/dom.js'

let innerId = 1

const defaultEditorOption = {
  readOnly: true,
  modules: {
    toolbar: [
      ['bold', 'italic', 'image'] // toggled buttons
    ]
  }
}

export default {
  name: 'PwcRichText',
  props: {
    rtId: {
      type: String,
      default: 'rt' + innerId++
    },
    value: String,
    upLoadUrl: String,
    upLoadImageUrl: String,
    uploadImage: {
      type: Function,
      required: true
    },
    options: {
      type: Object,
      default() {
        return Object.create(null)
      }
    },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean
  },
  model: {
    prop: 'value',
    event: 'change-html'
  },
  components: {
    quillEditor
  },
  data() {
    return {
      editorContent: ''
    }
  },
  computed: {
    rtImageNodeId() {
      return this.rtId + '_rt-img'
    },
    editorOption() {
      let moduleOpiton = Object.assign(
        Object.create(null),
        defaultEditorOption.modules,
        this.options.moduls
      )

      let exposedOptions = {}
      if (this.placeholder && this.placeholder.length) {
        exposedOptions.placeholder = this.placeholder
      }
      if (this.readonly) {
        exposedOptions.readOnly = this.readonly
      }

      return Object.assign(
        Object.create(null),
        defaultEditorOption,
        this.options,
        exposedOptions
      )
    }
  },
  watch: {},
  mounted() {
    this.editorContent = this.value
    var imgHandler = async state => {
      if (state) {
        let selector = '#' + this.rtId + '_rt-up input'
        var fileInput = document.querySelector(selector) //隐藏的file元素
        fileInput.click() //触发事件
      }
    }
    this.$refs[this.rtId].quill
      .getModule('toolbar')
      .addHandler('image', imgHandler)
    //========

    // 粘贴图片
    var pasteEle = document.querySelector('#' + this.rtId + ' .ql-container')

    pasteEle.addEventListener('paste', async event => {
      var isChrome = false
      if (event.clipboardData || event.originalEvent) {
        //某些chrome版本使用的是event.originalEvent
        var clipboardData =
          event.clipboardData || event.originalEvent.clipboardData
        if (clipboardData.items) {
          // for chrome
          var items = clipboardData.items,
            len = items.length,
            blob = null
          isChrome = true
          for (var i = 0; i < len; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              //getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile()
            }
          }
          if (blob !== null) {
            var blobUrl = URL.createObjectURL(blob) //图片本地路径
            // blobUrl =
            //blob对象显示
            let image = document.getElementById(this.rtImageNodeId)
            image.src = blobUrl
            image.onload = () => {
              var imgBase64Str = getBase64Image(image)
              this.uploadImage(imgBase64Str).then(this.insertImage)
              // this.$fetch(
              //   'post',
              //   this.upLoadImageUrl,
              //   { data: imgBase64Str },
              //   res => {
              //     if (res.code === 200) {
              //       let addImgRange = this.$refs[
              //         this.rtId
              //       ].quill.getSelection(1) //光标选中的索引位置
              //       this.$refs[this.rtId].quill.insertEmbed(
              //         addImgRange != null ? addImgRange.index : 0,
              //         'image',
              //         res.result,
              //         Quill.sources.USER
              //       )
              //     }
              //   }
              // )
            }
          }
        }
      } else {
        this.$message.error('由于IE浏览器设计缺陷，强烈建议使用Chrome浏览器！')
        setTimeout(() => {
          let img = document.querySelectorAll('.ql-editor img')
          for (var i = 0; i < img.length; i++) {
            let srcInfo = img[i].getAttribute('src')
            if (srcInfo.indexOf('data:image/pngbase64') !== -1) {
              img[i].setAttribute('src', '')
            }
          }
        }, 600)
      }
    })
  },
  methods: {
    contentChange({ editor, html, text }) {
      this.$emit('change-html', html)
      this.$emit('change', { editor, html, text })
    },
    insertImage(data) {
      let addImgRange = this.$refs[this.rtId].quill.getSelection(1) //光标选中的索引位置
      this.$refs[this.rtId].quill.insertEmbed(
        addImgRange != null ? addImgRange.index : 0,
        'image',
        data,
        Quill.sources.USER
      )
    },
    //编辑器编辑图片
    newEditorbeforeupload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传图片大小不能超过 4MB!')
      }
      if (isJPG && isLt4M) return isJPG && isLt4M
    },
    //上传图片回调
    newEditorSuccess(response, file, fileList) {
      // // if(response.status===1){
      // //   this.addImgRange = this.$refs.newEditor.quill.getSelection()
      // //   this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image',response.datas, Quill.sources.USER)
      // // }
      // this.imageLoading = false
      if (response.code == 200) {
        let imgUrl = response && response.result && response.result.fileUrl
        this.insertImage(imgUrl)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pwc-richtext {
  .quill-editor {
    strong {
      font-weight: bold !important;
    }
    em {
      font-style: italic;
    }
  }
}
</style>
