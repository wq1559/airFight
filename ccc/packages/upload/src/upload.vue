<script>
import txtImgUrl from "./file-icons/txt.png";
import docImgUrl from "./file-icons/doc.png";
import pptImgUrl from "./file-icons/ppt.png";
import pdfImgUrl from "./file-icons/pdf.png";
import xlsImgUrl from "./file-icons/xls.png";
import zipImgUrl from "./file-icons/zip.png";
import fileImgUrl from "./file-icons/file.png";

export default {
  name: "PwcUpload",
  props: {
    uploadUrl: {
      type: String,
      required: true,
    },
    single: {
      type: Boolean,
      default: true,
    },
    noAdd: {
      type: Boolean,
    },
    name: {
      type: String,
      default: "files",
    },
    getFileList: {
      type: Function,
      default() {
        return Promise.resolve([]);
      },
    },
    onRemove: {
      type: Function,
      default() {
        return Promise.resolve();
      },
    },
    headers: {
      default() {
        return {
          enctype: "multipart/form-data",
        };
      },
    },
    uploadData: {
      default() {
        return {};
      },
    },
    accept: {
      type: String,
    },
    multiple: {
      type: Boolean,
    },
    drag: {
      type: Boolean,
    },
    onPreview: {
      type: Function,
    },
    beforeRemove: {
      type: Function,
    },
    onError: {
      type: Function,
    },
    minFileSize: {
      default: 0,
    },
    maxFileSize: {
      default: 100 * 1024 * 1024,
    },
    disabled: {
      type: Boolean,
    },
  },
  userRequest: {
    type: Function,
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
      fileImgUrl: fileImgUrl,
    };
  },
  methods: {
    //点击上传文件时的钩子
    uploadClick(index, inputFormTitle) {},
    // 文件上传前的钩子, 添加一些公共的校验方式
    beforeUpload(file) {
      // const { accept } = this;
      // if (accept) {
      //   const acceptFile = accept.split(",");
      //   if (acceptFile.indexOf(file.type) < 0) {
      //     this.$message(`仅支持${acceptFile.join("/")}类型文件的上传`);
      //   }
      // }
    },
    getFileTypeImage(type) {
      const map = {
        'txt': this.txtImgUrl,
        'docx': this.docImgUrl,
        'doc': this.docImgUrl,
        'pptx': this.pptImgUrl,
        'ppt': this.pptImgUrl,
        'pdf': this.pdfImgUrl,
        'xls': this.xlsImgUrl,
        'xlsx': this.xlsImgUrl,
        'zip': this.zipImgUrl
      }
      return map[type] ? map[type] : this.fileImgUrl;
      // if (type === 'txt') {
      //   return this.txtImgUrl
      // } else if (type === 'docx' || type === 'doc') {
      //   return this.docImgUrl
      // } else if (type === 'pptx' || type === 'ppt') {
      //   return this.pptImgUrl
      // } else if (type === 'pdf') {
      //   return this.pdfImgUrl
      // } else if (type === 'xls' || type === 'xlsx') {
      //   return this.xlsImgUr
      // } else if (type === 'zip') {
      //   return this.zipImgUrl
      // } else {
      //   return this.fileImgUrl
      // }
    },
    // 给所有文件分配文件类型
    // handleFileList(data) {
    //   if (!data || !data.length) {
    //     this.$emit('no-files')
    //   }
    //   this.fileList = data

    //   data.map(item => {
    //     item.name = item.fileName
    //     item.url = this.getFileTypeImage(item.fileType)
    //   })
    // },
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
    fileRemove(file, fileList) {
      this.fileList = [];
    },
    handleChange(file, fileList) {
      const { accept } = this;
      if (accept) {
        const acceptFile = accept.split(",");
        if (acceptFile.indexOf(file.type) < 0) {
          this.$message(`仅支持${acceptFile.join("/")}类型文件的上传`);
          return false;
        }
        this.fileList.push(file);
      } else {
        this.fileList.push(file);
      }
    },
  },
  render(h) {
    let {
      uploadUrl,
      listType,
      fileList,
      headers,
      name,
      drag,
      beforeUpload,
      uploadSuccess,
      beforeRemove,
      beforeRemoveSucc,
      onPreview,
      onError,
      multiple,
      disabled,
      uploadClick,
      userRequest,
      single,
      handleChange,
      fileRemove,
    } = this;

    const event = {
      props: {
        "on-change": handleChange,
        "on-remove": fileRemove,
        "on-success": uploadSuccess
      },
    };
    return (
      <div class="pwc-upload">
        <div class="add_file_body">
          <div on-click={uploadClick}>
            <el-upload
              action={uploadUrl || "#"}
              list-type={listType || "picture"}
              file-list={fileList}
              headers={headers}
              name={name}
              drag={drag}
              before-upload={beforeUpload}
              //   on-success={uploadSuccess}
              //   before-remove={beforeRemove}
              //   on-remove={beforeRemoveSucc}
              //   on-preview={onPreview}
              //   on-error={onError}
              multiple={multiple}
              disabled={disabled}
              http-request={userRequest}
              auto-upload={false}
              {...event}
            >
              {!single || (single && fileList.length < 1) ? (
                <div class="add_file">
                  <i class="el-icon-plus"></i>
                  <span>Select File</span>
                </div>
              ) : (
                ""
              )}
            </el-upload>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style lang='scss' scoped>
.pwc-upload {
  .add_file_body {
    text-align: center;
    width: 210px;
    /deep/ .el-upload {
      width: 100%;
    }
    .add_file {
      font-size: 18px;
      border: 1px dashed #e7e7e7;
      .el-icon-plus {
        margin: 10px;
      }
    }
  }
}
</style>