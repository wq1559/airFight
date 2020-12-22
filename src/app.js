import Vue from 'vue';
import App from './App';

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


new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
  });
  