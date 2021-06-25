/**
*描述:新正方形按钮组件
*@author kris.y.chen (mailto:kris.y.chen@cn.pwc.com)
*@date 2021-06-22 11:06
*/
<template>
  <div>
    <el-tooltip effect="light" popper-class="popper-tip-white" :content="content" placement="top">
      <div :class="['square_btn',buttonSize ? 'square_btn--'+ buttonSize : '',buttonType ? 'square_btn--' + buttonType : '']" @click="clickbtn" v-loading="loading">
        <i :class="icon"></i>
      </div>
    </el-tooltip>
    <!-- 传入字符串的按钮暂时废弃 -->
    <!-- <div v-else class="word_btn" @click="clickbtn" v-loading="loading">
      <span>{{word}}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['content', 'icon', 'word','size','type'],
  name: 'PwcButton',
  data() {
      return {
        loading: false,
      }
    },
    //载入组件
    components: {

    },
    //computed计算，数据
    computed: {
      buttonSize() {
        return this.size
      },
      buttonType() {
        return this.type
      }
    },
    created() {

    },
    //mounted 安装，类型function，默认执行 钩子，
    mounted() {

    },

    watch: {

    },
    //方法 数据
    methods: {
      clickbtn() {
        if (this.loading) {
          return
        };
        this.$emit("click", this)
      }
    },
    //再次进入钩子
    activated() {},
}
</script>

<style lang="scss" scoped>
  
  .square_btn {
    width: $nomalWidth;
    height: $nomalHeight;
    background: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $nomalFontSize;
    color: $red;
    border:1px solid #fff;
    box-sizing:border-box;
     &:hover{
      background-color: $red;
      border:1px solid $red;
      color: #fff ;
     }
  }
  .square_btn--small {
    width: $smallWidth !important;
    height: $smallHeight !important;
    font-size: $smallFontSize !important;
  }
  .square_btn--border {
    border:1px solid $red;
  }
  /* 传入字符串的按钮暂时废弃 */
  /* .word_btn {
    padding: 0 10px;
    height: 40px;
    background: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: $red;
  } */
</style>
