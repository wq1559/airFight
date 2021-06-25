<template>
  <div class="pwc-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="pwc-card__header" v-if="headerLeft || headerRight || $slots.headerLeft ||  $slots.headerRight">
      <div class="headerLeft">
        <slot name="headerLeft">{{ headerLeft }}</slot>
      </div>
      <div class="headerRight">
        <slot name="headerRight">{{ headerRight }}</slot>
      </div>
    </div>
    <div class="pwc-card__body" :style="bodyStyle">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PwcCard',
    props: {
      header: {},
      headerLeft: {},
      headerRight: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    },
    mounted() {
      console.log('this', this)
    },
  }
</script>

<style lang="scss" scoped>
  .pwc-card {
    background-color: #fff;
    overflow: hidden;
    transition: 0.3s;
  }

  .pwc-card__header {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;

    .headerLeft {
      font-size: 18px;
      display: flex;
      align-items: center;
      color: $font-active;
    }

    .headerRight {
      font-size: 14px;
      display: flex;
      align-items: center;
      color: $font-active;
    }
  }

  .pwc-card__body {
    padding: 20px;
  }
</style>