<template>
  <div>
    waterfal
    <pwc-waterfall :itemList="list">
      <div class="item" slot-scope="scope">
        <h1>{{scope.item}}</h1>
        <h1 v-if="scope.index % 3 == 0">3</h1>
        <h1 v-if="scope.index % 7 == 0">7</h1>
        <h1 v-if="scope.index % 8 == 0">8</h1>
        <h1 v-if="scope.index % 11 == 0">11</h1>
      </div>
    </pwc-waterfall>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5]
    }
  },
  mounted() {
    let n = 1;
    let timer = setInterval(() => {
      n++;
      let a = ~~Math.random() * 100 + 1;
      this.list.push(a)
      if (n === 20) {
        clearInterval(timer)
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .item {
    border: 1px solid #ccc;
    margin-top: 10px;
  }
</style>