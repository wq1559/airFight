<template>
  <el-dialog :title="title" :visible.sync="visible" :width="config.style.width || '1000px'" @close="close" class="c-dialog">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <slot v-bind:table="tableData"></slot>
    </el-table>

    <div id="paging" class="paging">
      <div class="block">
        <el-pagination
          :current-page.sync="page.curr"
          :page-size="page.size"
          layout="prev, pager, next, total ,jumper"
          :total="page.total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    config: Object,
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      loading: false,

      tableData: [],
      //
      page: {
        curr: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    title() {
      return this.config.title || 'Modify Record'
    }
  },
  watch: {
    show(val) {
      if (this.visible !== this.show) {
        this.visible = this.show
      }
    },
    visible(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('update:show', val)
      }
      if (val) {
        this.init()
      }
    },
    form(val) {
      this.form._isEdit = !!val.id
    }
  },
  created() {
    this.config.style = this.config.style || {}
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      let start = this.page.size * (this.page.curr - 1)
      this.loading = true

      return this.$fetch(
        'post',
        `${this.config.url}?start=${start}&limit=${this.page.size}`
      )
        .then(res => {
          if (this.config.list.handler) {
            this.config.list.handler(res)
          } else {
            if (res.code < 300) {
              const { results = [], total } = res.result

              this.config.list.itemHandler &&
                results.forEach(this.config.list.itemHandler)

              this.tableData = results
              this.page.total = total
            }
          }

          this.loading = false
          this.searchLoading = false
        })
        .catch(() => {
          this.loading = false
          this.searchLoading = false
        })
    },

    handlePageChange(val) {
      this.getList()
    },

    cancel() {
      this.visible = false
    },
    close() {}
  }
}
</script>

<style lang="scss" scoped>
div.c-dialog {
  /deep/ .el-dialog__header {
    border-bottom: none;
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }
}
</style>
