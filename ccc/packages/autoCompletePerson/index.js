import AutoCompletePerson from './src/main'

AutoCompletePerson.install = function(Vue) {
  Vue.component(AutoCompletePerson.name, AutoCompletePerson);
}

export default AutoCompletePerson;