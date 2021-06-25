<template>
  <div class="wrap">
    <div id="tableWrap">
      <pwc-drag-table :data="data" :header="header"></pwc-drag-table>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      data: [{
        name1: 'test name1',
        name2: 'test name2',
        name3: 'test name3',
        name4: 'test name4',
        name5: 'test name5',
        name6: 'test name6',
      }, {
        name1: 'test name11',
        name2: 'test name22',
        name3: 'test name33',
        name4: 'test name44',
        name5: 'test name55',
        name6: 'test name66',
      }, {
        name1: 'test name11',
        name2: 'test name22',
        name3: 'test name33',
        name4: 'test name44',
        name5: 'test name55',
        name6: 'test name66',
      }, {
        name1: 'test name11',
        name2: 'test name22',
        name3: 'test name33',
        name4: 'test name44',
        name5: 'test name55',
        name6: 'test name66',
      }, {
        name1: 'test name11',
        name2: 'test name22',
        name3: 'test name33',
        name4: 'test name44',
        name5: 'test name55',
        name6: 'test name66',
      }],
      header: [{
        prop: 'name1',
        label: 'name1'
      }, {
        prop: 'name2',
        label: 'name2'
      }, {
        prop: 'name3',
        label: 'name3'
      }, {
        prop: 'name4',
        label: 'name4'
      }, {
        prop: 'name5',
        label: 'name5'
      }, {
        prop: 'name6',
        label: 'name6'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 100px 0 0;
  height: 80vh;
  width:100%;
  background: #f2f2f2;
}
</style>