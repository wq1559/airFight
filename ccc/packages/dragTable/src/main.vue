/**
*描述: 
*@author <a href='mailto:gary.z.wu@cn.pwc.com'>Gray z Wu</a>
*@date 2019-03-28 10:56
*/
<template>
    <div id="drag_table" class="w-table" :class="{'drag_table_moving': baseData.isDraging}">
        <el-table :data="data" 
        style="width:100%" 
        :cell-class-name="cellClassName" 
        :header-cell-class-name="headerCellClassName">
            <el-table-column v-for="item, index in tableHeader" 
            :key="index" 
            :prop="item.prop" 
            :label="item.label" 
            :min-width="item.minWidth"
            :column-key="index+''" 
            :render-header="renderHeader">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "PwcDragTable",
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    header: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    header(val) {
      this.tableHeader = val;
    }
  },
  data() {
    return {
      tableHeader: this.header,
      baseData: {
        start: 666, 
        end: 666, 
        isDraging: false, 
        flag: '' 
      }
    };
  },
  methods: {
    renderHeader(h, { column } ){
      return h(
        "div",
        {
          class: ["thead-cell"],
          on: {
            mousedown: $event => {
              this.mouseDown($event, column);
            },
            mousemove: $event => {
              this.mouseMove($event, column);
            }
          }
        },
        [
          h("span", column.label),
          h("span", {
            class: ["box"],
            on: {
              click: $event => {
                $event.stopPropagation()
              }
            }
          })
        ]
      );
    },
    isIE() {
    },
    mouseUp() {
      this.changeColumnIndex(this.baseData);
      this.baseData.isDraging = false;
      this.baseData.start = 666;
      this.baseData.end = 666;
      document.removeEventListener("mouseup", this.mouseUp);
    },
    mouseDown(e, column) {
      this.isIE();
      this.baseData.isDraging = true;
      this.baseData.start = column.columnKey - 0;

      let dragTable = document.getElementById("drag_table");
      let box = document.querySelectorAll(".box");
      for (let item of box) {
        item.style.height = dragTable.clientHeight + "px";
        item.style.width = item.parentElement.parentElement.clientWidth + "px";
      }

      document.addEventListener("mouseup", this.mouseUp);
    },
    mouseMove(e, column) {
      if (this.baseData.isDraging) {
        let index = column.columnKey;
        if (index - this.baseData.start !== 0) {
          this.baseData.flag =
            index - this.baseData.start < 0 ? "left" : "right"; 
          this.baseData.end = column.columnKey - 0;
        } else {
          this.baseData.flag = '';
        }
      }
    },
    changeColumnIndex(obj) {
        if (obj.start == obj.end || obj.end == 666) return;

        let temp = {}, tempArr = [];
        let flag = obj.flag == 'right' ? true : false;
        temp = this.tableHeader.splice(obj.start, 1)[0];
        this.tableHeader.splice(obj.end, 0, temp);
    },
    headerCellClassName({column, columnIndex}) {
      let active =
        columnIndex === this.baseData.end
          ? `darg_active_${this.baseData.flag}`
          : "";
      let start = columnIndex === this.baseData.start ? `darg_start` : "";
      return `${active} ${start}`;
    },
    cellClassName({column, columnIndex}) {
      return columnIndex === this.baseData.start ? `darg_start` : "";
    }
  }
};
</script>

<style lang='scss' scoped>

#drag_table {
  /deep/ .el-table  {
    .darg_start{
      background-color: #f3f3f3;
    }
  th {
    padding: 0;
    .box {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      background: none;
      border: none;
      z-index: 666;
    }
    .thead-cell {
        padding: 0;
        display: inline-flex;
    }
    &.darg_active_left {
      .box {
        border-left: 2px dotted #e0301e;
        z-index: 9999;
      }
    }
    &.darg_active_right {
      .box {
        border-right: 2px dotted #e0301e;
        z-index: 9999;
      }
    }
  }
  }
  &.drag_table_moving {
    /deep/ .el-table th .thead-cell {
      cursor: move;
    }
    /deep/ .el-table__fixed {
      cursor: not-allowed;
    }
  }
}
</style>