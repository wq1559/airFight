export default function(
  withPage,
  filterJson,
  { limit = 10, handleListRes, useGetToGet } = {}
) {
  let data = {
    list: [],
    pageLoading: false
  }

  let res = {
    methods: {
      async getList() {
        const hanldeRes = res => {
          if (typeof handleListRes === 'function') {
            this.list = handleListRes(res)
          } else {
            this.list = (res.result && res.result.results) || []
            this.page.total = res.result && res.result.total
          }
        }

        this.pageLoading = true

        try {
          if (useGetToGet) {
            await this.$fetch('get', this.listUrl, this.listParams).then(
              hanldeRes
            )
          } else {
            await this.$fetch(
              'post',
              this.listUrl,
              this.filterParams,
              null,
              null,
              {
                params: this.listParams
              }
            ).then(hanldeRes)
          }
        } finally {
          this.pageLoading = false
        }
      },
      filterChange(val) {
        !val && this.search()
      }
    }
  }

  if (withPage) {
    data.page = {
      curr: 1,
      size: limit,
      total: 0
    }
    res.methods.pageChange = function() {
      this.getList()
    }
  }
  if (filterJson) {
    data.filterJson = {
      loading: false,
      ...filterJson
    }
    res.methods.search = function() {
      this.page.curr = 0
      this.getList()
    }
  }

  return {
    ...res,
    data() {
      return JSON.parse(JSON.stringify(data))
    },
    computed: {
      listParams() {
        return {
          start: (this.page.curr - 1) * this.page.size,
          limit
        }
      },
      filterParams() {
        let res = Object.assign({}, this.filterJson)
        Object.keys(res).forEach(key => {
          if (res[key] === '') {
            delete res[key]
          }
        })
        delete res.loading
        return res
      }
    }
  }
}
