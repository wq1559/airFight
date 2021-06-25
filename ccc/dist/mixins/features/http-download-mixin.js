import _extends from 'babel-runtime/helpers/extends';
/**
 *描述:
 *@author <a href='mailto:awam.m.wang@cn.pwc.com'>Awam M Wang</a>
 *@date 2019-04-17 10:54
 */
// 这个是基于vue-resource的，和使用的http方法强相关（暂不修改）
export default {
  methods: {
    httpDownload: function httpDownload(url) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

      var _this = this;

      var data = arguments[2];
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (['get', 'head', 'delete', 'jsonp'].includes(method)) {
        return this.$http[method](url, _extends({
          params: data,
          responseType: 'blob'
        }, config)).then(function (data) {
          return _this.blobDownload(data, config.defaultFilename);
        });
      } else {
        return this.$http.post(url, data, _extends({
          responseType: 'blob'
        }, config)).then(function (data) {
          return _this.blobDownload(data, config.defaultFilename);
        });
      }
    },

    // 下载文件
    blobDownload: function blobDownload(data) {
      var defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      // console.log(data)
      if (!data || !data.body) {
        return;
      }

      var name = getFilename(data) || defaultFilename;
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(data.body, name);
      } else {
        // for Non-IE (chrome, firefox etc.)
        var url = URL.createObjectURL(data.body);
        var link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  }
};

function getFilename(data) {
  if (!data.headers) {
    return;
  }
  var regex = /^attachment;\s?filename="?([^"]*)"?$/;
  var contentDisposition = data.headers.get('content-disposition');

  if (!contentDisposition) {
    return;
  }

  var match = contentDisposition.match(regex);
  return match && match[1];
}