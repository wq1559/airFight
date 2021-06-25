<template>
  <el-menu
    :default-active="onRoutes"
    class="mars-menu"
    theme="dark"
    unique-opened
    router
  >
    <template v-for="item in menuList">
      <template v-if="item.subs">
        <el-submenu :index="item.index">
          <template slot="title">
            <i :class="'icon '+item.icon"></i>{{ item.title }}
          </template>
          <el-menu-item
            v-for="(subItem,i) in item.subs"
            :key="i"
            :index="subItem.index"
          >{{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index">
          <i :class="'icon '+item.icon"></i>{{ item.title }}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'PwcMenu',
  props: {
    menuList: Array
  },
  data() {
    return {
      lastPath: '' //记录上一次路由的地址
    }
  },
  computed: {
    onRoutes() {
      let path = this.$route.meta.onRoutes
        ? this.$route.meta.onRoutes
        : this.$route.path
      //查找菜单里面有没有这个path
      let pathArr = this.menuList.map(item => {
        return item.index
      })

      if (pathArr.indexOf(path) >= 0) {
        this.lastPath = path
        return path
      } else {
        return this.lastPath
      }
    }
  },
  methods: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
$red: #e0301e;
$font-unactive: #c4c6cc;
$font-active: #404041;

.mars-menu {
  .icon {
    display: inline-block;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}

html body .mars-menu {
  height: 100%;
  position: relative;
  overflow: visible;
  /deep/ ul {
    border-right: none;
  }
  /deep/ li {
    line-height: 40px;
    margin-top: 15px;
    font-size: 14px;
    color: $font-unactive;
    cursor: pointer;
    //有子菜单
    .el-submenu__title {
      font-size: 14px;
      color: $font-unactive;
      cursor: pointer;
      &:focus,
      &:hover {
        background: none;
      }
    }

    span,
    a {
      color: $font-unactive;
    }
  }
  .el-menu-item:hover::after {
    content: '';
    width: 3px;
    height: 40px;
    background: $red;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 2px 2px 12px rgba(224, 48, 30, 0.8);
  }

  .el-menu-item {
    border-color: $red;
    &:focus,
    &:hover {
      background: none;
    }
    &.is-active {
      color: $font-active;
      i {
        color: $red;
      }
    }
    &.is-active::after {
      content: '';
      width: 3px;
      height: 40px;
      background: $red;
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 2px 2px 12px rgba(224, 48, 30, 0.8);
    }
  }
}
</style>
