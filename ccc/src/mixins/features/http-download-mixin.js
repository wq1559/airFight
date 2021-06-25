/**
 *描述:
 *@author <a href='mailto:awam.m.wang@cn.pwc.com'>Awam M Wang</a>
 *@date 2019-04-17 10:54
 */
// 这个是基于vue-resource的，和使用的http方法强相关（暂不修改）
export default {
  methods: {
    httpDownload(url, method = 'get', data, config = {}) {
      if (['get', 'head', 'delete', 'jsonp'].includes(method)) {
        return this
          .$http[method](url, {
            params: data,
            responseType: 'blob',
            ...config,
          })
          .then(data => {
            return this.blobDownload(data, config.defaultFilename)
          })
      } else {
        return this.$http
          .post(url, data, {
            responseType: 'blob',
            ...config,
          })
          .then(data => {
            return this.blobDownload(data, config.defaultFilename)
          })
      }
    },
    // 下载文件
    blobDownload(data, defaultFilename = '') {
      // console.log(data)
      if (!data || !data.body) {
        return
      }

      let name = getFilename(data) || defaultFilename
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(data.body, name)
      } else {
        // for Non-IE (chrome, firefox etc.)
        let url = URL.createObjectURL(data.body)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
      }
    },
  },
}

function getFilename(data) {
  if (!data.headers) {
    return
  }
  let regex = /^attachment;\s?filename="?([^"]*)"?$/
  let contentDisposition =
    data.headers.get('content-disposition')

  if (!contentDisposition) {
    return
  }

  let match = contentDisposition.match(regex)
  return match && match[1]
}
