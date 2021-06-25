//这里写 公共指令

// import Vue from 'vue';
import titleHint from './title-hint';

export default (Vue) => {
  //input框只保留正整数
  Vue.directive('gteZerointeger', {
    inserted: function(el, binding, vnode, oldVnode) {
      const { name, len, maxNum = 99999999, minNum = 0, isCanEmpty = false } = binding.value // name:绑定的字段 leng:要保留几位小数

      let keyArr = []
      if (name.indexOf('.') !== -1) {
        keyArr = binding.value.name.split(".");
      } else {
        keyArr = [name]
      }
      el.integerListenerKeyup = function(e) {
        let value = e.target.value;
        handlerChangeNum(binding, value, maxNum, minNum, len, keyArr, 'keyup', isCanEmpty)
      }
      el.addEventListener("keyup", el.integerListenerKeyup, false);
      let input = null;
      if (el.tagName == "INPUT") {
        input = el
      } else {
        input = el.children[0];
      }
      el.integerListenerBlur = function(e) {
        let value = e.target.value;
        handlerChangeNum(binding, value, maxNum, minNum, len, keyArr, 'blur', isCanEmpty)
      }
      input.addEventListener("blur", el.integerListenerBlur, false)
    },
    update: function(el, binding, vnode, oldVnode) {
      const { name, len, maxNum = 99999999, minNum = 0, isCanEmpty = false } = binding.value // name:绑定的字段 leng:要保留几位小数

      let keyArr = []
      if (name.indexOf('.') !== -1) {
        keyArr = binding.value.name.split(".");
      } else {
        keyArr = [name]
      }
      el.integerListenerKeyup = function(e) {
        let value = e.target.value;
        handlerChangeNum(binding, value, maxNum, minNum, len, keyArr, 'keyup', isCanEmpty)
      }
      el.addEventListener("keyup", el.integerListenerKeyup, false);
      let input = null;
      if (el.tagName == "INPUT") {
        input = el
      } else {
        input = el.children[0];
      }
      el.integerListenerBlur = function(e) {
        let value = e.target.value;
        handlerChangeNum(binding, value, maxNum, minNum, len, keyArr, 'blur', isCanEmpty)
      }
      input.addEventListener("blur", el.integerListenerBlur, false)
    },
    unbind(el, binding, vnode, oldVnode) {
      el.removeEventListener("keyup", el.integerListenerKeyup)
      let input = null;
      if (el.tagName == "INPUT") {
        input = el
      } else {
        input = el.children[0];
      }
      input.removeEventListener("blur", el.integerListenerBlur)
    }
  })
  // 获取数字  str 传入的字符串数字  保留几位小数
  function getNum(str, num) {
    const index = str.indexOf('.')
    if (index === -1) {
      return str
    } else {
      if (str.length > index + num + 1) {
        str = str.substring(0, index + num + 1)
      }
      return str
    }
  }
  // 验证数字的句柄
  function handlerChangeNum(binding, value, maxNum, minNum, len, keyArr, type, isCanEmpty) {
    if (isNaN(value)) {
      value = "";
    }
    if (value < 0) {
      value = ''
    };
    const maxNumLength = (maxNum + '').length
    if (!len) {
      value = parseInt(value);
    } else {
      value = getNum(value, len)
    }

    if (value > maxNum) {
      value = maxNum
    }
    if (value < minNum) {
      value = minNum
    }

    let reg = new RegExp(`^([0-9]|[1-9][0-9]{0,${maxNumLength}})(\.{0,1})?(\.[0-9]{0,${len}})?$`)
    if (!reg.test(value)) {
      value = ''
    }

    let obj = binding.value.set;
    for (let i = 0; i < keyArr.length - 1; i++) {
      let key = keyArr[i];
      obj = obj[key];
    };
    if (type === 'keyup') {
      obj[keyArr[keyArr.length - 1]] = value;
    } else {
      setTimeout(() => {
        if (isCanEmpty) {
          if (value === '') {
            value = minNum
          }
        }
        obj[keyArr[keyArr.length - 1]] = value;
      })
    }
  }

  Vue.directive('tHint', titleHint)
}