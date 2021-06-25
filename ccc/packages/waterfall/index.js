import Waterfall from './src/main'

Waterfall.install = function(Vue) {
  Vue.component(Waterfall.name, Waterfall);
}

export default Waterfall;