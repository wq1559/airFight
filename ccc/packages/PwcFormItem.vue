<template>
  <FormItem v-bind="[$attrs, $props]" ref="item" :show-message="showMessage" :class="{'el-form-item__plain': finalPlain}">
    <template slot="label">
      <slot name="label" v-bind:item="{prop, name}">
        <span v-html="labelHtml" v-if="labelHtml"></span>
      </slot>
    </template>

    <template slot="default">
      <slot v-bind:item="{prop, name}" v-if="showEdit"></slot>
      <template v-else-if="finalPlain">
        <span style="display: none">
          <slot v-bind:item="{prop, name}"></slot>
        </span>
        <template v-if="finalPlain">
          <!-- <StaffInfo :staffId="config.staffInfo.id" style="display:inline-block;" v-if="config.staffInfo">
            <span slot="staffname">
              <span>{{config.staffInfo.name || inputText}}</span>
            </span>
          </StaffInfo>-->
          <template v-if="staffInfos.length">
            <StaffInfo :staffId="staffInfo.id" style="display:inline-block;" :key="staffInfo.id" v-for="(staffInfo, index) in staffInfos">
              <span slot="staffname">
                <span>{{staffInfo.name}}</span>
                <span>{{(index < (staffInfos.length - 1)) ? staffInfoDelimiter : ''}}</span>
              </span>
            </StaffInfo>
          </template>

          <template v-else>
            <slot name="plain" v-bind:item="{prop, name, plainText}">
              <span class="el-form-item__content__plain">
                {{ plainText }}
                <slot name="plain-suff" v-bind:item="{prop, name, plainText}"></slot>
              </span>
            </slot>
          </template>
        </template>
      </template>
    </template>
  </FormItem>
</template>

<script>
import { FormItem } from 'element-ui'

const getChildInputElement = ele => {
  if (!ele) {
    return
  }
  // console.log('lee', ele)
  let inputs = ele.getElementsByTagName('input')
  let textareas = ele.getElementsByTagName('textarea')
  let radioGroups = ele.getElementsByClassName('el-radio-group')
  let radios = ele.getElementsByClassName('el-radio is-checked')
  // console.log(radios, radioGroups)

  // console.log(inputs, textareas)
  if (radioGroups.length || radios.length) {
    if (!radios.length) {
      return
    } else {
      let labels = radios[0].getElementsByClassName('el-radio__label')
      // console.log('labels', labels)
      return labels[0]
    }
  } else if (inputs.length) {
    return inputs[0]
  } else if (textareas.length) {
    return textareas[0]
  }
}
const getInputValue = input => {
  if (!input) {
    return ''
  }

  // console.log(input)
  if (input.tagName === 'TEXTAREA') {
    return input.value || ''
  }

  return input.value || input.innerText || ''
}

export default {
  name: 'PwcFormItem',
  inheritAttrs: false,
  components: { FormItem },
  props: {
    name: {},
    prop: {},

    labelHtml: {
      type: String,
      default: ''
    },
    plain: {
      type: [Boolean, String],
      default: false
    },
    plainPreffix: {
      type: String,
      default: ''
    },
    plainSuffix: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modify: {
      // 用于控制单独修改，优先级高
      type: Boolean,
      default: false
    },
    noEdit: {
      // 不能编辑，只用来展示
      type: Boolean,
      default: false
    },

    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      inputText: ''
    }
  },
  inject: {
    editGroup: { default: {} }
  },
  mounted() {
    this.getInputText()
  },
  computed: {
    showEdit() {
      return !this.finalPlain && !this.noEdit
    },
    finalPlain() {
      if (this.modify) {
        return false
      }

      return this.plain || this.editGroup.plain || this.noEdit // 目前不是Edit就是plain
    },
    plainText() {
      let text
      if (typeof this.plain === 'string') {
        return this.plain
      }
      text = this.inputText.length ? this.inputText + this.plainSuffix : ''

      return text
    },

    staffInfos() {
      let res = []
      if (this.config.staffInfos) {
        res = this.config.staffInfos
      }
      if (this.config.staffInfo) {
        res.unshift(this.config.staffInfo)
      }
      return res
    },
    staffInfoDelimiter() {
      if (this.config.staffInfoDelimiter !== undefined) {
        return this.config.staffInfoDelimiter
      }
      return ','
    },

    showMessage() {
      return this.showEdit
    },

    finalDisabled() {
      if (this.modify) {
        return false
      }

      return this.disabled || this.editGroup.disabled
    }
  },
  watch: {
    finalPlain: 'getInputText'
  },
  methods: {
    getInputText() {
      if (!this.finalPlain) {
        return
      }
      if (typeof this.plain === 'string') {
        // 直接通过plain传入了文本，不需要再去获取
        return
      }

      let i = 1
      let loop = () => {
        let slotSpan =
          this.$children[0] &&
          this.$children[0].$slots.default &&
          this.$children[0].$slots.default[0]

        if (!slotSpan) return

        this.inputText = getInputValue(getChildInputElement(slotSpan.elm))

        i++
        if (!this.inputText && i <= 40) {
          setTimeout(loop, 100)
        }
      }
      loop()
    }
  }
}
</script>