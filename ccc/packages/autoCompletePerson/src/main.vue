<template>
  <div class="auto_complete_person">
    <el-autocomplete v-model="searchKey" :fetch-suggestions="searchAsync" :trigger-on-focus="false" @blur="onBlur" @select="onSelect" class="atuo_complete_person" v-bind="[$attrs, $props]" v-if="!readonly"></el-autocomplete>
    <el-input v-model="searchKey" :size="size" :placeholder="placeholder" :disabled="disabled" v-else class="atuo_complete_person" readonly></el-input>
  </div>
</template>

<script>
  export default {
    name: 'PwcAutoCompletePerson',
    inheritAttrs: false,
    props: {
      value: {
        type: String
      },
      placeholder: String,
      searchUrl: {
        type: String,
        default: ''
      },
      canSearchId: {},
      size: {
        default: 'medium'
      },
      minSearchLength: {
        type: Number,
        default: 3
      },
      noAutoClean: {
        // 在选择后不自动清除
        type: Boolean,
        default: false
      },
      readonly: Boolean,
      disabled: Boolean
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        searchKey: '',
        selected: true
      }
    },
    mounted() {},
    watch: {
      value: {
        handler() {
          this.searchKey = this.value
        },
        immediate: true
      },
      searchKey(val) {
        this.selected = false
        if (val === '') {
          this.clearRes()
        }
      }
    },
    methods: {
      clearRes() {
        this.searchKey = ''
        this.$emit('change', this.searchKey)
        this.$emit('staffid', '', null)
      },
      onBlur(event) {
        setTimeout(() => {
          if (!this.selected) {
            this.clearRes()
          }
        }, 200)
        this.$emit('blur', event)
      },
      searchAsync(queryString, cb) {
        this.$emit('staffid', '', null)

        if (queryString.length >= this.minSearchLength) {
          // 查询字符串至少为3才开始查询
          this.$fetch('get', this.searchUrl || this.$api.common.getUserLike, {
            staffid: queryString
          }).then(succ => {
            for (let i in succ) {
              // 为数组添加value属性 为弹窗下拉框做准备
              succ[i].value = succ[i].staffname
            }
            var results = queryString ?
              succ.filter(this.createStateFilter(queryString)) :
              succ
            cb(results)
          })
        }
      },
      createStateFilter(queryString) {
        return state => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 ||
            (this.canSearchId && state.staffid.includes(queryString))
          )
        }
      },
      onSelect(data) {
        this.searchKey = this.searchKey.replace(/\s?\(.*\)/, '')
        this.$emit('change', this.searchKey)
        this.$emit('staffid', data.staffid, data)
        if (!this.noAutoClean) {
          this.clearRes()
        }
        this.$nextTick(() => {
          // HACK 让selected设置晚于searchKey的watch
          this.selected = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auto_complete_person {
    /deep/ .el-autocomplete {
      width: 100%;
    }
  }
</style>