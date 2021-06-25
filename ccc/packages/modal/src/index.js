import Vue from 'vue';
import MessageBoxCom from './messageModal.vue'
let MessageBox = Vue.extend(MessageBoxCom);


let instance;
var message = (msg = "内容", title = "提示", options = {}) => {
  return new Promise((resolve, reject) => {
    options.resolve = resolve
    options.reject = reject
    options.title = title
    options.messgae = msg
    //组件需要挂载在dom元素上
    if (!instance) {
      instance = new MessageBox({
        data: options
      })
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
    } else {
      instance.show = true
      instance.resolve = resolve
      instance.reject = reject
      instance.title = title
      instance.messgae = msg
      instance.questContent = options.questContent
      instance.isShowQuest = options.isShowQuest
    }
    // return instance.vm;
  })
}


export default message;
