import Vue from 'vue';
import App from './App';
import router from '@/router/router'
import { axios, cacheAxios } from '@/request/request.js'

import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button
} from 'element-ui';


Vue.use(Menu);
Vue.use(Button);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.prototype.$cacheAxios = cacheAxios;

console.log(cacheAxios, '12312312321')

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
});
