<template>
    <div><Home /></div>
</template>

<script>

import  Home from '@/pages/Home'

export default {
   name: 'App',
   components: {
       Home
   }
}
</script>

<style lang="less">
body,html{
    width: 100%;
    height: 100%;
    >div{
       width: 100%;
       height: 100%;  
    }
}
*{
    padding: 0;
    margin: 0;
}
</style>