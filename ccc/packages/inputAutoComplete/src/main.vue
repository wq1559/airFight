<!--
 * @Description: In User Settings Edit
 * @Author: yulinge
 * @Date: 2019-01-17 15:18:31
 * @LastEditTime: 2019-04-01 17:26:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="input_auto_complete">
    <el-autocomplete
      :trigger-on-focus="triggerOnFocus"
      v-model="staffInfo"
      :fetch-suggestions="fetchSuggestions"
      :placeholder="placeholder"
      :disabled="disabled"
      :debounce="debounce"
      :popper-class="popperClass"
      :select-when-unmatched="selectWhenUnmatched"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :hide-loading="hideLoading"
      :popper-append-to-body="popperAppendToBody"
      :highlight-first-item="highlightFirstItem"
      @select="handleSelect()"
      @blur="isHaveStaffName()"
    ></el-autocomplete>
  </div>
</template>
<script>
import ajax from '@/utils/ajax.js'
export default {
  name: 'inputAutoComplete',
  props: {
    // 必填的字符串
    verificatField: {
      type: String
    },
    fileterFiled: {
      type: String,
      required: true
    }, //筛选数据所要的字段
    resFileds: {
      type: Object,
      required: true
    }, //获取数据请求的info   url:请求地址  method：请求方法  data: 请求传参
    staffInfo: Object,
    triggerOnFocus: Boolean,
    placeholder: String,
    disabled: Boolean,
    debounce: Number,
    placement: String,
    fetchSuggestions: Function,
    popperClass: String,
    selectWhenUnmatched: Boolean,
    label: String,
    prefixIcon: String,
    suffixIcon: String,
    hideLoading: Boolean,
    popperAppendToBody: Boolean,
    highlightFirstItem: Boolean
  },
  mounted() {},
  data() {
    return {}
  },
  watch: {},
  methods: {
    //判断是有staffName
    isHaveStaffName() {
      if (this.verificatField.length > 0) {
        setTimeout(() => {
          if (
            this.staffInfo[this.verificatField] &&
            this.staffInfo[this.verificatField].length > 0
          ) {
            if (!this.staffInfo[this.verificatField]) {
              this.$message.error('请选择列表中的人名!')
              this.staffInfo[this.verificatField] = ''
            }
          }
        }, 300)
      }
    },
    //选择
    handleSelect(val) {
      this.$emit('select', val)
    },
    //筛选
    createStateFilter(queryString) {
      return state => {
        state.value = ''
        return (state.value = state[this.fileterFiled])
      }
    },
    //查询员工信息
    getUserInfo(query, cb) {
      const { url, method, data } = this.resFileds
      const _this = this
      if (query && query.length && query.length >= 3) {
        ajax(url, {
          type: method,
          data,
          success(res) {
            var results = query
              ? res.result.filter(_this.createStateFilter(query))
              : res.result
            cb(results)
          },
          fail() {}
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
