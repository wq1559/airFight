// import Modal from './src/main'

// Modal.install = function(Vue) {
//   Vue.component(Modal.name, Modal);
// }
// export default Modal;


import Vue from 'vue';
import MessageBoxCom from './src/main.vue'
let MessageBox = Vue.extend(MessageBoxCom);


let instance;
var Modal = (messgae = "内容", title = "提示", options = {}) => {
  return new Promise((resolve, reject) => {
    options.resolve = resolve
    options.reject = reject
    options.title = title
    options.messgae = messgae
    //组件需要挂载在dom元素上
    // instance = null
    instance = new MessageBox({
      data: options
    })
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    // return instance.vm;
  })
}


export default Modal;