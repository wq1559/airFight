/**
*描述: 瀑布流组件
*@author <a href='mailto:gary.z.wu@cn.pwc.com'>Gray z Wu</a>
*@date 2019-03-29 13:16
*/
<template>
  <div class="waterfall-wrap" ref="waterfall">
    <div class="column" v-for="v, i in cNum" :style="{width: width+'px'}">
      <div :id="idPre + index" v-for="item, index in itemList" v-if="isCaculate ? i == heightList[index].index : true">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PwcWaterfall",
  props: {
    width: {
      default: 400
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      idPre: "column-item-",
      cNum: 1,
      heightList: [],
      isCaculate: false
    };
  },
  watch: {
    cNum(val) {
      this.calculateAutoColumn();
    },
    itemList(val) {
      this.isCaculate = false;
      this.$nextTick(() => {
        this.init();
        this.calculateAutoColumn();
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.cNum = Math.floor(this.$refs.waterfall.clientWidth / this.width);

      window.addEventListener("resize", this.caculateCnum, false);
      this.init();
    });
  },
  methods: {
    init() {
      this.initHeightList();
      this.iterationHeight();
    },
    /**
     * 计算列数
     */
    caculateCnum() {
      this.cNum = Math.floor(this.$refs.waterfall.clientWidth / this.width);
    },
    /**
     * 初始化高度数组
     */
    initHeightList() {
      this.heightList = [];
      for (let i = 0; i < this.itemList.length; i++) {
        this.heightList.push({ index: -999, height: 0 });
      }
    },
    getEle(index) {
      return document.getElementById(this.idPre + index);
    },
    /**
     * 元素offsetHeight赋值
     */
    iterationHeight() {
      for (let i = 0; i < this.itemList.length; i++) {
        let el = this.getEle(i);
        if (el) {
          let offsetHeight = el.offsetHeight;
          this.heightList[i].height = offsetHeight;
        }
      }
    },
    /**
     * 自动分配到高度最低那列
     */
    calculateAutoColumn() {
      let temp = new Array(this.cNum).fill(0);
      for (let i = 0; i < this.heightList.length; i++) {
        let index = 0;
        for (let j = 1; j < temp.length; j++) {
          if (temp[index] > temp[j]) {
            index = j;
          }
        }

        temp[index] += this.heightList[i].height;
        this.heightList[i].index = index;
        this.isCaculate = true;
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.caculateCnum, false);
  }
};
</script>

<style lang='scss' scoped>
.waterfall-wrap {
  display: flex;
  justify-content: space-around;
  height: 100%;
}
</style>