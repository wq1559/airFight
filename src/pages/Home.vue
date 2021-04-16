<template>
    <div class="wrapper">
        <header class="head"></header>
        <div class="main">
            <SideMenu />
            <div class="content">

            </div>
        </div>
    </div>
</template>

<script>

import SideMenu from '@/components/sideMenu';

const d = 0;

export default {
    name: 'Home',
    data: '',
    components: {
        SideMenu
    }
}
</script>

<style lang="less">
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .head{
            width: 100%;
            height: 80px;
            border-bottom: 1px solid #ddd;;
        }
        .main {
            flex: 1;
            width: 100%;
            height: 100%;
            display: flex;
            .content{
                flex: 1;
                background-color: #ddd;
            }
        }
    }
</style>