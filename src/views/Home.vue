<template>
    <div class="wrapper">
        <header class="header">
            <div class='head-left'>
                <div class="icon">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <span class='sys-name'>
                    Dashboard
                </span>
            </div>
            <div class="head-right">
                <div class="user-info">
                    <span>{{userInfo.staffName}}</span>
                    <span></span>
                </div>
                <div class="avatar">
                    <img :src='userInfo.headImage' alt="">
                </div>
            </div>
        </header>
        <div class="main">
            <div class="menu">
                <menu-list 
                    :menuData='userInfo.resourceList'
                ></menu-list>
            </div>
            <iframe :src="pageUrl" frameborder="0" class="content"></iframe>
        </div>
    </div>
</template>

<script>
import MenuList from '@/components/menulist'
import eventBus from '@/utils/eventBus.js'

export default {
    name: 'Home',
    data() {
        return {
            userInfo: {
                headImage: '',
                los: '',
                staffName: '',
            },
            pageUrl: '',
        }
    },
    components:{
        MenuList
    },
    created() {
        this.userInfo = this.$userData.result;
    },
    mounted() {
        eventBus.$on('getUrl',(res) => {
            if (res === this.pageUrl) return;
            this.pageUrl = res;
        })
    },
}
</script>

<style lang="less">
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-width: 1440px;
    .header{
        width: 100%;
        height: 80px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.05);
        flex-shrink: 0;
        .head-left{
            margin-left: 66px;
            display: flex;
            align-items: flex-end;
            .icon{
                width: 64px;
                height: 49px;
                >img{
                    width: 100%;
                }
            }
            .sys-name{
                color: #2D2D2D;
                font-size: 14px;
                padding-left: 18px;
                position: relative;
                &::before{
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 1px;
                    height: 14px;
                    background-color: #6c6c6d;
                }
            }
        }
        .head-right{
            margin-right: 30px;
            display: flex;
            align-items: center;
            .user-info{
                margin-right: 24px;
                span:first-of-type(1){
                    font-size: 14px;
                    color: #404041;
                }
            }
            .avatar{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #ddd;
                overflow: hidden;
                >img{
                    width: 100%;
                }
            }
        }
    }
}
.main{
    display: flex;
    flex: 1;
    .menu{
        width: 200px;
        background-color: #fff;
        box-shadow: 2px 0px 1px 0px rgba(0, 0, 0, 0.05);
        margin-top: 2px;
        font-size: 14px;
    }
    .content{
        flex: 1;
        min-width: 640px;
        // background: brown;
    }
}
</style>