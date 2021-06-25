<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PwcEditGroup',
  props: {
    disabled: {
      type: Boolean
    },
    plain: {
      type: Boolean
    }
  },
  provide () {
    return {
      editGroup: this
    }
  },
  mounted () {
    // console.log(this.$slots, this)
    // this.$slots.default && this.$slots.default.forEach((vnode) => {
    //   vnode.componentInstance.plain = true
    // })
    // this.$children && this.$children.forEach((vnode) => {
    //   vnode.plain = true
    // })
  }
}
</script>