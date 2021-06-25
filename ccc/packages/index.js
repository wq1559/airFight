// import PwcModal from '../packages/modal'
import '../src/polyfill'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import PwcPagination from './pagination/index.js'
import PwcDragTable from './dragTable/index.js'
import PwcWaterfall from './waterfall/index.js'
import PwcStep from './step/index.js'
import PwcSteps from './steps/index.js'
import PwcRichText from './richText/index.js'
import PwcMenu from './menu/index.js'
import PwcUpload from './upload/index.js'
import PwcUploadAssistant from './uploadAssistant/index.js'
import PwcFilterItem from './filterItem/index.js'
import PwcFilter from './filter/index.js'
import PwcSettingList from './settingList/index.js'
import PwcAutoCompletePerson from '../packages/autoCompletePerson/index.js'
import PwcSwitchWithConfirm from '../packages/switchWithConfirm/index.js'
import Button from '../packages/button/index.js'
import PwcCard from '../packages/card/index.js'
// new_package

const components = {
  PwcPagination,
  PwcDragTable,
  PwcWaterfall,
  PwcStep,
  PwcSteps,
  PwcRichText,
  PwcMenu,
  PwcUpload,
  PwcUploadAssistant,
  PwcFilterItem,
  PwcFilter,
  PwcSettingList,
  PwcAutoCompletePerson,
  PwcSwitchWithConfirm,
  Button,
  PwcCard,
  // new_package_component
}
const install = function(Vue) {
  ElementUI.install(Vue, {
    locale
  });
  for (var component in components) {
    if (Object.prototype.hasOwnProperty.call(components, component)) {
      console.log( "components[component].name",components[component].name )
      Vue.component(components[component].name, components[component]);
    }
  }
  // Object.values(components).forEach(component => {
  //   Vue.component(component.name, component);
  // });
  // mountVue(Vue)
}

// 将组件挂在到vue的原型链下
// function mountVue(Vue) {
//   Vue.prototype.$pwcModal = PwcModal;
// }

export default Object.assign({}, ElementUI, {
  install
}, components)