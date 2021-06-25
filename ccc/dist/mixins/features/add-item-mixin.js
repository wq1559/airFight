import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
function deepClone(obj) {
  return JSON.parse(_JSON$stringify(obj));
}

export default function getMixin(config) {
  // config.data
  var mode = config.mode,
      rules = config.rules,
      data = config.data,
      copy = config.copy,
      backupEdit = config.backupEdit;

  if (copy) {
    rules = deepClone(rules);
    data = deepClone(data);
  }

  var otherData = {},
      otherWatches = {},
      otherMethods = {};

  if (backupEdit) {
    otherData.formBackup = null;
    otherWatches.inEdit = function (val) {
      if (val) {
        this.formBackup = deepClone(this.form);
      }
    };
    otherMethods.cancelEdit = function () {
      this.$emit('change', this.formBackup);
    };
  }

  if (mode === 'model') {
    return {
      model: {
        prop: 'form',
        event: 'change'
      },
      props: {
        form: {
          type: Object
        }
      },
      data: function data() {
        return _extends({}, otherData, {
          rules: rules
        });
      },

      watch: _extends({}, otherWatches),
      created: function created() {
        this.initForm();
      },

      methods: _extends({}, otherMethods, {
        initForm: function initForm() {
          if (!this.form) {
            this.$emit('change', _Object$assign({}, data));
          }
        }
      })
    };
  } else {
    return {
      props: {
        form: {
          type: Object
        }
      },
      data: function data() {
        return {
          // ...otherData,
          rules: rules,
          myForm: null
        };
      },


      // watch: {
      //   ...otherWatches
      // },

      methods: {
        onOpen: function onOpen() {
          this.initForm();
        },
        initForm: function initForm() {
          this.myForm = deepClone(this.form ? this.form : data);
        }
      }
    };
  }
}