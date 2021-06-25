<template>
  <div>
    <slot name="top"></slot>

    <div class="c-operation_box">
      <el-form
        :model="config.search.form"
        ref="form"
        label-width="80px"
        label-position="top"
        class="c-form c-flex_box"
        v-if="config.search"
      >
        <slot name="search" v-bind:form="config.search.form"></slot>
        <el-form-item
          label
          class="c-form-item"
          style="margin-left: 60px;"
          v-if="!config.search.noSearch"
        >
          <el-button type="primary" @click="searchList" class="c-button"
            >Search</el-button
          >
        </el-form-item>
        <el-form-item
          label
          class="c-form-item"
          style="margin-left: 20px;"
          v-if="!config.search.noReset"
        >
          <el-button @click="resetSearch" class="c-button">Reset</el-button>
        </el-form-item>
      </el-form>

      <div class="c-operation_box__right c-operation_button_box">
        <slot name="operate"></slot>
        <el-popover
          placement="top-end"
          trigger="hover"
          popper-class="operation_tips"
          offset="-20"
          v-if="config.log"
        >
          <div class="popover_content">Log</div>
          <el-button
            @click="showLog"
            :class="operationBtnClass"
            :loading="operationLoading"
            slot="reference"
          >
            <i class="iconfont icon-log"></i>
          </el-button>
        </el-popover>
        <el-popover
          placement="top-end"
          trigger="hover"
          popper-class="operation_tips"
          offset="-20"
          v-if="config.export"
        >
          <div class="popover_content">Export</div>
          <el-button
            @click="exportData"
            :class="operationBtnClass"
            :loading="operationLoading"
            slot="reference"
          >
            <i class="iconfont icon-daochu"></i>
          </el-button>
        </el-popover>
        <el-popover
          placement="top-end"
          trigger="hover"
          popper-class="operation_tips"
          offset="-20"
          v-if="config.import"
        >
          <div class="popover_content">Import</div>
          <el-button
            @click="importData"
            :class="operationBtnClass"
            :loading="operationLoading"
            slot="reference"
          >
            <i class="iconfont icon-daoru"></i>
          </el-button>
        </el-popover>
        <el-popover
          placement="top-end"
          trigger="hover"
          popper-class="operation_tips"
          offset="-20"
          v-if="config.template"
        >
          <div class="popover_content">Template</div>
          <el-button
            @click="downloadTemplate"
            :class="operationBtnClass"
            :loading="operationLoading"
            slot="reference"
          >
            <i class="iconfont icon-moban"></i>
          </el-button>
        </el-popover>
        <el-popover
          placement="top-end"
          trigger="hover"
          popper-class="operation_tips"
          offset="-20"
          v-if="config.add"
        >
          <div class="popover_content">Add</div>
          <el-button
            @click="add"
            :class="operationBtnClass"
            :loading="operationLoading"
            slot="reference"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </el-popover>
      </div>
      <PwcUploadAssistant
        :url="this.config.import.url"
        :onSuccess="importListSuccess"
        :on-error="operationEnd"
        :on-progress="startImport"
        :data="importParams"
        fileParamName="file"
        ref="uploadAssistant"
        v-if="config.import"
      ></PwcUploadAssistant>
    </div>

    <slot name="table-top" v-bind:list="tableData"></slot>

    <div>
      <div class="tableComponent">
        <el-table
          :data="tableData"
          style="width: 100%"
          :show-header="!config.list.noHeader"
          v-loading="loading"
        >
          <slot name="table"></slot>
          <el-table-column
            label="Action"
            :width="config.table.action.width || 80"
            v-if="config.table.action"
            :fixed="config.table.action.fixed"
            label-class-name="table__action-header"
          >
            <template slot-scope="scope">
              <template v-if="config.table.action.delete">
                <el-tooltip
                  effect="dark"
                  popper-class="popper-tip"
                  content="Delete"
                  placement="top"
                  v-if="config.table.action.delete.hasHint"
                >
                  <el-button
                    size="mini"
                    type="text"
                    icon="iconfont icon-shanchu"
                    class="c-icon-button--inline"
                    slot="reference"
                    @click="deleteRow(scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-button
                  size="mini"
                  type="text"
                  icon="iconfont icon-shanchu"
                  class="c-icon-button--inline"
                  slot="reference"
                  @click="deleteRow(scope.row)"
                  v-else
                ></el-button>
              </template>
              <template v-if="config.table.action.modify">
                <el-tooltip
                  effect="dark"
                  popper-class="popper-tip"
                  content="Click To Modifyt"
                  placement="top"
                  v-if="config.table.action.modify.hasHint"
                >
                  <el-button
                    size="mini"
                    type="text"
                    icon="iconfont icon-bianji"
                    class="c-icon-button--inline"
                    slot="reference"
                    @click="editRow(scope.row)"
                  ></el-button>
                </el-tooltip>

                <el-button
                  size="mini"
                  type="text"
                  icon="iconfont icon-bianji"
                  class="c-icon-button--inline"
                  slot="reference"
                  @click="editRow(scope.row)"
                  v-else
                ></el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="paging" class="paging">
        <el-pagination
          :current-page.sync="page.curr"
          :page-size="page.size"
          layout="prev, pager, next, total ,jumper"
          :total="page.total"
          @current-change="handlePageChange"
          v-if="page.total"
        ></el-pagination>
      </div>
    </div>

    <slot name="bottom"></slot>

    <AddModal
      :config="config.add"
      :show.sync="addShow"
      :form="currItemInfo"
      @success="addSuccess"
      v-if="config.add"
    >
      <template slot-scope="{ form }">
        <slot name="add" v-bind:form="form"></slot>
      </template>
    </AddModal>

    <LogModal :config="config.log" :show.sync="logShow" v-if="config.log">
      <template slot-scope="{ list }">
        <slot name="log" v-bind:list="list"></slot>
      </template>
    </LogModal>
  </div>
</template>

<script>
import AddModal from './addModal.vue'
import LogModal from './logModal.vue'
import PwcUploadAssistant from '../../uploadAssistant'
import httpDownloadMixin from '../../../dist/mixins/http-download-mixin'

export default {
  name: 'PwcSettingList',
  mixins: [httpDownloadMixin],
  components: {
    AddModal,
    LogModal,
    PwcUploadAssistant
  },
  props: {
    config: Object // 这个config必须是父组件中已经响应的
  },
  data() {
    return {
      searchLoading: false,
      inOperation: false,

      // list
      tableData: [],
      loading: false,
      page: {
        curr: 1,
        size: 10,
        total: 0
      },

      // add/edit
      addShow: false,
      currItemInfo: undefined, // 当列数据

      logShow: false
    }
  },
  computed: {
    operationBtnClass() {
      return this.config.style.operateBtnClass
        ? ['c-operate_btn', ...this.config.style.operateBtnClass]
        : 'c-operate_btn'
    },

    operationLoading() {
      return this.inOperation && !this.config.noOperationLoading
    },

    searchParams() {
      let res = {}
      if (this.config.search.getSearchParam) {
        res = Object.assign(
          res,
          this.config.search.getSearchParam.bind(this)(this.config.search.form)
        )
      }
      return res
    },
    listParams() {
      let res = {}
      if (this.config.list && this.config.list.getParam) {
        res = Object.assign(
          res,
          this.config.list.getParam.bind(this)(this.config)
        )
      }
      return res
    },
    importParams() {
      let res = {}
      if (this.config.import && this.config.import.getParam) {
        res = Object.assign(
          res,
          this.config.list.getParam.bind(this)(this.config)
        )
        return res
      }
      return this.listParams
    },
    deleteParams() {
      let res = {}
      if (
        this.config.table.action &&
        this.config.table.action.delete &&
        this.config.table.action.delete.getParam
      ) {
        res = Object.assign(
          res,
          this.config.table.action.delete.getParam.bind(this)(
            this.currItemInfo,
            this.config
          )
        )
      }
      return res
    }
  },
  watch: {
    currItemInfo(val) {
      this.$emit('item-change', val)
    },
    tableData(val) {
      if (this.config.listRef !== undefined) {
        this.config.listRef = this.tableData
      }
    }
  },
  created() {
    this.config.search = this.config.search || {}
    this.config.list = this.config.list || {}
    this.config.table = this.config.table || {}
    this.config.style = this.config.style || {}
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      if (!this.config.noNeedFetchList) {
        await Promise.all([this.getList()])
      }
    },
    getList() {
      let start = this.page.size * (this.page.curr - 1)
      this.loading = true
      this.searchLoading = true

      return this.$fetch(
        this.config.list.method || 'post',
        `${this.config.list.url}?start=${start}&limit=${this.page.size}`,
        {
          ...this.listParams,
          ...this.searchParams
        }
      )
        .then(res => {
          if (this.config.list.handler) {
            this.config.list.handler(res)
          } else {
            if (res.code < 300) {
              if (this.config.list.resultsHandler) {
                this.config.list.resultsHandler.bind(this)(
                  res,
                  this,
                  this.config
                )
              } else {
                res.result = res.result || {}
                const { results = [], total } = res.result

                this.config.list.itemHandler &&
                  results.forEach(this.config.list.itemHandler)

                this.tableData = results
                this.page.total = total
              }
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

    // 操作
    add() {
      // this.currItemInfo = Object.assign({}, this.config.add.form)
      this.currItemInfo = JSON.parse(JSON.stringify(this.config.add.form))
      this.addShow = true
    },
    addSuccess() {
      this.searchList()
    },
    importData() {
      // this.inOperation = true
      this.$refs['uploadAssistant'].upload()
    },
    startImport() {
      this.inOperation = true
    },
    reImport() {
      this.$refs['uploadAssistant'].upload()
    },
    async importListSuccess(res, file, fileList) {
      console.log(res)
      if (res.code < 300) {
        this.inOperation = false
        if (this.config.import.resultsHandler) {
          return this.config.import.resultsHandler.bind(this)(
            res,
            file,
            fileList,
            this.tableData,
            this.config
          )
        }
        if (this.config.import.noRes) {
          return this.getList()
        }

        this.$messageModal(`<span>${res.remark}</span>`, 'Comfirmation', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Reimport',
          type: 'warning',
          useLoading: false
        })
          .then(vm => {
            this.resetSearch()
          })
          .catch(vm => {
            this.reImport()
          })
      } else {
        this.$message.error(res.remark)
        this.inOperation = false
      }
    },
    exportData() {
      this.inOperation = true

      this.httpDownload(
        this.config.export.url,
        this.config.export.method || 'post',
        this.config.export.all
          ? { ...this.listParams }
          : {
              ...this.listParams,
              ...this.searchParams
            },
        this.config.export.filename || 'Export.xlsx'
      ).then(() => {
        this.inOperation = false
      })
    },
    downloadTemplate() {
      window.open(this.config.template.url)
      // if (template.byApi) {
      // } else {
      // }
    },
    showLog() {
      this.logShow = true
    },
    operationEnd() {
      this.inOperation = false
    },

    // list
    handlePageChange(val) {
      this.getList()
    },
    editRow(row) {
      // this.currItemInfo = Object.assign({}, row)
      this.currItemInfo = JSON.parse(JSON.stringify(row))
      this.addShow = true
    },
    removeRow(row) {
      var index = this.tableData.indexOf(row)
      console.log(row, index)
      this.tableData.splice(index, 1)
    },
    deleteRow(row) {
      this.currItemInfo = Object.assign({}, row)

      if (JSON.stringify(this.deleteParams) === '{}') {
        this.removeRow(row)
        return
      }

      return this.$fetch(
        'get',
        this.config.table.action.delete.url,
        this.deleteParams
      )
        .then(res => {
          // this.$message.success('Delete success!')
          this.getList()
        })
        .catch(() => {})
    },

    initSearchData() {
      this.page.size = 10
      this.page.curr = 1
      this.page.total = 0
    },
    searchList() {
      this.initSearchData()
      this.searchLoading = true
      this.getList()
    },
    resetSearch() {
      this.config.search.reset(this.config.search.form)
      this.searchList()
    }
  }
}
</script>

<style lang="scss" scoped>

/deep/ .table__action-header {
  background-color: #f0f0f2 !important;
}

.tableComponent {
  /deep/ .el-table {
    &::before {
      background: transparent;
      height: 0;
    }

    .icon-shanchu,
    .icon-bianji {
      &:hover {
        color: #e0301e;
      }
    }
  }
}
</style>