import dragTable from '../packages/dragTable'
import pagination from '../packages/pagination'
import step from '../packages/step'
import steps from '../packages/steps'
import richText from '../packages/richText'
import waterfall from '../packages/waterfall'
import menu from '../packages/menu'
import modal from '../packages/modal'
import upload from '../packages/upload'
import settingList from '../packages/settingList'
import autoCompletePerson from '../../../packages/autoCompletePerson'
import button from '../../../packages/button'
import inputAutoComplete from '../../../packages/inputAutoComplete'
import switchWithConfirm from '../../../packages/switchWithConfirm'
import card from '../../../packages/card'
// new_package

function install(Vue) {
  Vue.use(dragTable, {})
  Vue.use(pagination, {})
  Vue.use(step, {})
  Vue.use(steps, {})
  Vue.use(richText, {})
  Vue.use(waterfall, {})
  Vue.use(menu, {})
  Vue.use(modal, {})
  Vue.use(upload, {})
  Vue.use(settingList, {})
  Vue.use(autoCompletePerson, {})
  Vue.use(button, {})
  Vue.use(inputAutoComplete, {})
  Vue.use(switchWithConfirm, {})
  Vue.use(card, {})
  // new_package_use
}

export default install
