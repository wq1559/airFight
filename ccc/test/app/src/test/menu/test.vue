<template>
  <div>
    <div style="width:300px;">
      <pwc-menu :menuList="menuList"></pwc-menu>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          title: '菜单1',
          icon: 'el-icon-search',
          index: '/test/menuTest/dragTableTest',
          subs: [
            {
              title: 'dragTableTest',
              icon: 'el-icon-info',
              index: '/test/menuTest/dragTableTest'
            }
          ]
        },
        {
          title: 'stepsTest',
          icon: 'el-icon-info',
          index: '/test/menuTest/stepsTest'
        },
        {
          title: 'waterfallTest',
          icon: 'el-icon-info',
          index: '/test/menuTest/waterfallTest'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
