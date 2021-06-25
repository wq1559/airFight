import SettingList from './src/main'

SettingList.install = function(Vue) {
  Vue.component(SettingList.name, SettingList);
}

export default SettingList;