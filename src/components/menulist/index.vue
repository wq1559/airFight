<template>
    <el-menu 
        class="main-menu"
    >
        <div
            v-for="item in menuInfo" 
            :key='item.resourceId'
        >
            <el-submenu 
                v-if="item.children && item.children.length > 0 && item.children[0].resourceType < 2" 
                :index='String(item.resourceId)'
                class="sub-menu"
            >
                <template slot="title">
                    <i :class="item.resourceIconPath"></i>
                    <span slot="title">{{item.resourceName}}</span>
                </template>
                <menu-list :menuData='item.children'></menu-list>
            </el-submenu>
            <el-menu-item 
                v-else
                @click="userClick(item.resourcePath)"
                :index='String(item.resourceId)'
            >
                <i :class="item.resourceIconPath"></i>
                <span slot="title">{{item.resourceName}}</span>
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script>

import eventBus from '@/utils/eventBus'

export default {
    name: 'MenuList',
    props: {
        menuData:{
            type: Array ,
            default: () => []
        }
    },
    data() {
        return {
            url: ''
        }
    },
    computed: {
        menuInfo() {
            return this.menuData;
        },
    },
    methods: {
        userClick(url) {
            eventBus.$emit('getUrl', url);
        }
        
    },
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
        .el-menu-item{
            font-size: 14px;
            position: relative;
            &.el-menu-item.is-active{
              color: #E0301E;
            }
            &.is-active::before{
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