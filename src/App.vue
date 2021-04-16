<template>
    <div class="wrapper">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import Home from '@/pages/Home';
import Login from '@/pages/Login';


export default {
   name: 'App',
   components: {
       Home,
       Login
   }
}
</script>

<style lang="less">
body,html{
    width: 100%;
    height: 100%;
    .wrapper{
       width: 100%;
       height: 100%;
       display: flex; 
       .content{
           flex: 1;
       }
    }
}
*{
    padding: 0;
    margin: 0;
}
</style>