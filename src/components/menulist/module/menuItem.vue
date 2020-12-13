<template>
    <div>
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
                <menu-item :menuData='item.children'></menu-item>
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
    </div>
</template>

<script>

import eventBus from '@/utils/eventBus'

export default {
    name: 'MenuItem',
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