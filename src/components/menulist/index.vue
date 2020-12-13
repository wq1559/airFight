<template>
    <el-menu 
        class="main-menu"
    >
        <menu-item :menuData='menuData'></menu-item>
    </el-menu>
</template>

<script>

import MenuItem from './module/menuItem';

export default {
    name: 'MenuList',
    props: {
        menuData:{
            type: Array ,
            default: () => []
        }
    },
    components: {
        MenuItem
    }
}
</script>

<style lang="less">
    .main-menu{
        border: none;
        color: #9E99A3;
        .el-submenu__title:hover{
            background-color: initial;
        }
        .el-menu-item:focus, .el-menu-item:hover{
            background-color: initial;
            color: #E0301E;
        }
        .el-submenu:hover .el-submenu__title{
            color: #E0301E;
        }
       .el-submenu.is-active .el-submenu__title{
           color: #E0301E;
           border-bottom-color: initial;
       }
        .el-menu-item{
            font-size: 14px;
            position: relative;
            &.el-menu-item.is-active{
              color: #E0301E;
            }
            &.is-active::before,&:hover::before{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 4px;
                height: 100%;
                max-height: 40px;
                border-radius: 2px;
                background-color: #E0301E;
            }
        }
        .el-submenu .el-menu-item{
            font-size: 12px;
        }
    }
</style>