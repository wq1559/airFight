/**
*描述:
*@author <a href='mailto:awam.m.wang@cn.pwc.com'>Awam M Wang</a>
*@date 2019-04-01 14:13
*/
// 考虑到为内部组件，接口返回值和某些要求应该是统一的，这里把一些参数和流程写死
<template>
  <div class="pwc-upload">
    <div class="add_file_body" :class="{'hide-upload--picture': noAdd}">
      <div class="add_file" @click.stop="uploadClick">
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :file-list="fileList"
          :headers="headers"
          :name="name"
          :data="uploadData"
          :drag="drag"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :before-remove="beforeRemove"
          :on-remove="beforeRemoveSucc"
          :on-preview="onPreview"
          :on-error="onError"
          :multiple="multiple"
          :disabled="disabled"
        >
          <i class="el-icon-plus"></i>
          <span>Select File</span>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import txtImgUrl from './file-icons/txt.png'
import docImgUrl from './file-icons/doc.png'
import pptImgUrl from './file-icons/ppt.png'
import pdfImgUrl from './file-icons/pdf.png'
import xlsImgUrl from './file-icons/xls.png'
import zipImgUrl from './file-icons/zip.png'
import fileImgUrl from './file-icons/file.png'

export default {
  name: 'PwcUpload',
  props: {
    uploadUrl: {
      type: String,
      required: true
    },
    noAdd: {
      type: Boolean
    },
    name: {
      type: String,
      default: 'files'
    },
    getFileList: {
      type: Function,
      default() {
        return Promise.resolve([])
      }
    },
    onRemove: {
      type: Function,
      default() {
        return Promise.resolve()
      }
    },
    headers: {
      default() {
        return {
          enctype: 'multipart/form-data'
        }
      }
    },
    uploadData: {
      default() {
        return {}
      }
    },
    multiple: {
      type: Boolean
    },
    drag: {
      type: Boolean
    },
    onPreview: {
      type: Function
    },
    beforeRemove: {
      type: Function
    },
    onError: {
      type: Function
    },
    minFileSize: {
      default: 0
    },
    maxFileSize: {
      default: 100 * 1024 * 1024
    },
    disabled: {
      type: Boolean
    },
  },
  data() {
    return {
      fileList: [],
      txtImgUrl: txtImgUrl,
      docImgUrl: docImgUrl,
      pptImgUrl: pptImgUrl,
      pdfImgUrl: pdfImgUrl,
      xlsImgUr: xlsImgUrl,
      zipImgUrl: zipImgUrl,
      fileImgUrl: fileImgUrl
    }
  },
  watch: {
    $route: {
      handler() {
        this.getFileList().then(this.handleFileList)
      },
      immediate: true
    }
  },
  methods: {
    getFileTypeImage(type) {
      if (type === 'txt') {
        return this.txtImgUrl
      } else if (type === 'docx' || type === 'doc') {
        return this.docImgUrl
      } else if (type === 'pptx' || type === 'ppt') {
        return this.pptImgUrl
      } else if (type === 'pdf') {
        return this.pdfImgUrl
      } else if (type === 'xls' || type === 'xlsx') {
        return this.xlsImgUr
      } else if (type === 'zip') {
        return this.zipImgUrl
      } else {
        return this.fileImgUrl
      }
    },
    // 给所有文件分配文件类型
    handleFileList(data) {
      if (!data || !data.length) {
        this.$emit('no-files')
      }
      this.fileList = data

      data.map(item => {
        item.name = item.fileName
        item.url = this.getFileTypeImage(item.fileType)
      })
    },
    //点击上传文件时的钩子
    uploadClick(index, inputFormTitle) {},
    //文件上传前检查
    beforeUpload(file) {
      if (file.size < this.minFileSize) {
        this.$message.error('该文件无内容！')
        return false
      }
      if (file.size > this.maxFileSize) {
        this.$message.error('超过文件大小限制！')
        return false
      }
    },
    //上传成功的钩子
    uploadSuccess(response, file, fileList) {
      if (!response.result) {
        this.$message({
          message: response.remark,
          type: 'warning'
        })
      }

      file.url = this.getFileTypeImage(response.result.fileType)
      this.addToFileList(response)
    },
    addToFileList(response) {
      let data = response.result
      data.name = data.fileName
      data.url = this.getFileTypeImage(data.fileType)

      this.fileList[this.fileList.length] = data
    },
    //文件删除的钩子
    beforeRemoveSucc(file, fileList) {
      if (
        (file.size < this.minFileSize || file.size > this.maxFileSize) &&
        file.status == 'ready'
      ) {
        // 在上传过程中删除不合法文件
        return false
      }

      this.onRemove(file, fileList).then(() => {
        this.deleteFileListItem(file)
      })
    },
    deleteFileListItem(file) {
      this.fileList = this.fileList.filter((e, index) => {
        return e.id != file.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pwc-upload {
  .add_file_body {
    padding: 20px 0;

    .add_file {
      margin-right: 40px;
    }

    & > div {
      display: inline-block;
    }

    /deep/ .el-upload--picture-card,
    /deep/ .el-upload--picture {
      width: 200px;
      height: 68px;
      line-height: 68px;
      font-size: 22px;
      border: 1px dashed #e7e7e7;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 10px;
      margin-right: 50px;
      position: relative;

      i {
        color: #e7e7e7;
        font-size: 26px;
        position: absolute;
        left: 32px;
        top: 20px;
      }

      span {
        color: #e7e7e7;
        position: absolute;
        top: 0px;
        left: 64px;
      }
    }

    /deep/ .el-upload-list {
      display: inline-block;

      .el-upload-list__item {
        display: inline-block;
        width: 200px;
        height: 70px;
        margin-top: 0;
        margin: 0 20px 10px 0;
        border: 1px solid #e7e7e7;
        padding-left: 50px;
        box-shadow: 2px 2px 4px rgba(64, 64, 65, 0.1);
        position: relative;
        font-size: 12px;

        .el-upload-list__item-name {
          margin: 0;

          // 三行名字
          display: -webkit-box;
          /* autoprefixer: ignore next */
          -webkit-line-clamp: 3;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: ellipsis;
          line-height: 1.5;
          max-height: 4.5;
          font-size: 12px;
          white-space: normal;
          word-break: break-all;
          i {
            color: #e7e7e7;
            font-size: 40px;
            position: absolute;
            left: 5px;
            top: 14px;
          }
        }

        .el-upload-list__item-thumbnail {
          width: 40px;
          height: 48px;
          margin-left: -43px;
        }
      }
    }
  }

  .hide-upload--picture {
    /deep/ & .el-upload--picture {
      display: none;
    }
  }
}
</style>
