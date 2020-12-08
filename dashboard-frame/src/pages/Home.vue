<template>
    <div class="wrapper">
        <SideMenu />
        <iframe src="" frameborder="0" class="content"></iframe>
    </div>
</template>

<script>

import SideMenu from '@/components/sideMenu';

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
        .content {
            width: 100%;
            height: 100%;
        }
    }
</style>