var NAME = 't-Hint';

function getText(binding) {
  var value = binding.value,
      expression = binding.expression;

  if (typeof value === 'undefined' && typeof expression === 'string') {
    return expression;
  } else if (typeof value === 'string') {
    return value;
  } else if (Object.prototype.toString.call(value) === '[object Array]') {
    return value[0];
  } else if (value === null) {
    return '';
  } else {
    console.warn('[' + NAME + '] ' + binding.expression + ': ' + value + ' can not be parser to string');
  }
}

function setElement(el, text) {
  el.setAttribute('title', text);
  el.innerHTML = text;
}

export default {
  bind: function bind(el, binding, vnode) {
    setElement(el, getText(binding));
  },
  update: function update(el, binding, vnode) {
    if (binding.value !== binding.oldValue) {
      setElement(el, getText(binding));
    }
  }
};