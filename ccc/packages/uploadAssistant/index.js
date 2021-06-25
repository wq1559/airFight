import UploadAssistant from './src/main'

UploadAssistant.install = function(Vue) {
  Vue.component(UploadAssistant.name, UploadAssistant);
}

export default UploadAssistant;