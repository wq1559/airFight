import RichText from './src/main'

RichText.install = function(Vue) {
  Vue.component(RichText.name, RichText);
}

export default RichText;