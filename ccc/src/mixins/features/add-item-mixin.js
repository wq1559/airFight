function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default function getMixin(config) {
  // config.data
  let { mode, rules, data, copy, backupEdit } = config
  if (copy) {
    rules = deepClone(rules)
    data = deepClone(data)
  }

  let otherData = {},
    otherWatches = {},
    otherMethods = {}

  if (backupEdit) {
    otherData.formBackup = null
    otherWatches.inEdit = function(val) {
      if (val) {
        this.formBackup = deepClone(this.form)
      }
    }
    otherMethods.cancelEdit = function() {
      this.$emit('change', this.formBackup)
    }
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
      data() {
        return {
          ...otherData,
          rules
        }
      },
      watch: {
        ...otherWatches
      },
      created() {
        this.initForm()
      },
      methods: {
        ...otherMethods,
        initForm() {
          if (!this.form) {
            this.$emit('change', Object.assign({}, data))
          }
        }
      }
    }
  } else {
    return {
      props: {
        form: {
          type: Object
        }
      },
      data() {
        return {
          // ...otherData,
          rules,
          myForm: null
        }
      },

      // watch: {
      //   ...otherWatches
      // },

      methods: {
        onOpen() {
          this.initForm()
        },
        initForm() {
          this.myForm = deepClone(this.form ? this.form : data)
        }
      }
    }
  }
}
