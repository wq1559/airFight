<!--
 * @Description: In User Settings Edit
 * @Author: yulinge
 * @Date: 2019-01-17 15:18:31
 * @LastEditTime: 2019-03-29 16:34:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="message_modal">
    <el-dialog
      :visible.sync="show"
      :width="width"
      top="30vh"
      :modal="modal"
      :fullscreen="fullscreen"
      :modal-append-to-body="modalAppendToBody"
      :append-to-body="appendToBody"
      :lock-scroll="lockScroll"
      :custom-class="customClass"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :before-close="beforeClose"
      :center="center"
    >
      <div class="message_title" slot="title">
        <i class="el-icon-question icon_warning" v-if="modalType === 'warning'"></i>
        <i class="el-icon-warning icon_error" v-if="modalType === 'error'"></i>
        <i class="el-icon-info icon_success" v-if="modalType === 'success'"></i>
        <span>{{title}}</span>
      </div>
      <div class="message_cont">
        <div class="message_quest" v-if="questContent.length>0">{{questContent}}</div>
        <div class="message_ask">{{messgae}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="btns">
          <div class="btn btn_cancel" @click="close">{{cancelButtonText}}</div>
          <div class="btn btn_sub" @click="submit">{{confirmButtonText}}</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  mounted() {},
  data() {
    return {
      show: true,
      width: '450px',
      fullscreen: false,
      fullscreen: false,
      top: '15vh',
      modal: true,
      modalAppendToBody: true,
      appendToBody: false,
      lockScroll: true,
      customClass: '',
      closeOnClickModal: true,
      closeOnPressEscape: true,
      showClose: true,
      showCancelButton: true,
      beforeClose: () => {
        this.show = false
      },
      center: false,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      questContent: '', //modal 问题栏
      messgae: '', //modal 内容栏
      modalType: 'warning' //modal的类型  warning error success
    }
  },
  watch: {
    show(val) {
      if (!val) {
        document.body.removeChild(this.$el)
      }
    }
  },
  methods: {
    //确定
    submit() {
      this.resolve()
      this.show = false
    },
    //关闭
    close(e) {
      console.log(this)
      this.reject()
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.message_modal {
  .message_title {
    color: #404041;
    font-size: 20px;
    height: 63px;
    line-height: 63px;
    padding-left: 30px;
    padding-top: 15px;
    i {
      color: #ffb600;
      font-size: 32px;
      margin-right: 6px;
      vertical-align: sub;
    }
    .icon_warning {
      color: #ffb600;
    }
    .icon_error {
      color: #e0301e;
    }
    .success {
      color: #66bb6a;
    }
  }
  .message_cont {
    padding-left: 72px;
    padding-right: 30px;
    .message_quest {
      line-height: 18px;
      color: #6d6e71;
      padding-bottom: 19px;
    }
    .message_ask {
      color: #404041;
      line-height: 18px;
      min-height: 78px;
    }
  }
  /deep/ .el-dialog__header {
    padding: 0;
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  /deep/ .el-dialog__footer {
    padding: 30px;
    padding-top: 20px;
  }
}
.dialog-footer {
  .btns {
    display: flex;
    justify-content: flex-end;
    .btn {
      min-width: 100px;
      padding: 0 20px;
      box-sizing: border-box;
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      font-family: Arial;
      cursor: pointer;
      font-weight: 600;
      user-select: none;
    }
    .btn_sub {
      background: #e0301e;
      color: #fff;
      &:hover {
        background: #e05343;
      }
    }
    .btn_cancel {
      background: #fff;
      color: #2d2d2d;
      margin-right: 20px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
