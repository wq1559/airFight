import _typeof from 'babel-runtime/helpers/typeof';
var NAME = 'easy-search';

function parseConfig(binding, vnode) {
  var config = binding.expression;
  var searchMethod, iconSearch, // 搜索图标的点击是否触发搜索
  iconClass, // 非默认的搜索图标
  blur; // blur是否触发搜索

  if (typeof config !== 'string' && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
    console.error(NAME + ' expression must be a string method name or object');
  }

  iconSearch = binding.modifiers.icon;
  if (typeof config === 'string') {
    searchMethod = vnode.context[config];
  } else {
    searchMethod = vnode.context[config].method || 'search';
    iconClass = config.iconClass;
    if (iconClass) {
      iconSearch = true;
    }
  }
  iconClass = iconClass || 'search';
  if (!searchMethod || typeof searchMethod !== 'function') {
    console.error(NAME + ' vm[' + binding.expression + '] not a method');
  }

  blur = binding.modifiers.blur;

  return {
    searchMethod: searchMethod,
    iconSearch: iconSearch,
    iconClass: iconClass,
    blur: blur
  };
}

function getInputElement(el) {
  if (el.tagName === 'INPUT') {
    return el;
  } else {
    return el.getElementsByTagName('input')[0];
  }
}

function preventEnterChange(e) {
  if (e.keyCode == 13) {
    // 要想办法处理多个监听的情况
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }
}

function handleChange(e, callback) {
  // console.log('change', e)
  callback();
}

function handleEnter(e, callback) {
  if (e.keyCode == 13) {
    // console.log('enter')
    callback();
  }
}

function handleIconClick(e, callback) {
  // console.log('iconClick')
  callback();
}

function getIconElement(el, iconClass) {
  var icons = el.getElementsByTagName('I');
  for (var i = 0, len = icons.length; i < len; i++) {
    if (icons[i].className.includes(iconClass)) {
      return icons[i];
    }
  }
  return null;
}

export default {
  bind: function bind(el, binding, vnode) {
    var _parseConfig = parseConfig(binding, vnode),
        searchMethod = _parseConfig.searchMethod,
        iconSearch = _parseConfig.iconSearch,
        iconClass = _parseConfig.iconClass,
        blur = _parseConfig.blur;

    var oldInput;
    searchMethod = searchMethod.bind(vnode.context);

    var input = getInputElement(el);
    input.addEventListener('keydown', preventEnterChange);
    input.addEventListener('keyup', function (e) {
      handleEnter(e, searchMethod);
    });

    if (blur) {
      input.addEventListener('change', function (e) {
        handleChange(e, searchMethod);
      });
    }
    if (iconSearch) {
      var icon = getIconElement(el, iconClass);
      icon && icon.addEventListener('click', function (e) {
        handleIconClick(e, searchMethod);
      });
    }
  }
};