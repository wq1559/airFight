import Filter from './src/filter'

Filter.install = function (Vue) {
  Vue.component(Filter.name, Filter);
}

export default Filter;