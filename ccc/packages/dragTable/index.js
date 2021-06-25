import DragTable from './src/main'

DragTable.install = function(Vue) {
  Vue.component(DragTable.name, DragTable);
}

export default DragTable;