// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from 'mockjs'
// import packagesInstall from './packages-install'
import pwcComponents from '../../../packages/index'
import '../../../src/assets/style/common.scss'
import 'element-ui/lib/theme-chalk/index.css'

window.Mock = Mock

// packagesInstall(Vue)
Vue.use(pwcComponents)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})