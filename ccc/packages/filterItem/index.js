import filterItem from '../filter/src/filterItem'

filterItem.install = function (Vue) {
  Vue.component(filterItem.name, filterItem);
}

export default filterItem;