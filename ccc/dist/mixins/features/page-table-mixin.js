import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
export default function (withPage, filterJson) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 10 : _ref$limit,
      handleListRes = _ref.handleListRes,
      useGetToGet = _ref.useGetToGet;

  var _data = {
    list: [],
    pageLoading: false
  };

  var res = {
    methods: {
      getList: function getList() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var hanldeRes;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  hanldeRes = function hanldeRes(res) {
                    if (typeof handleListRes === 'function') {
                      _this.list = handleListRes(res);
                    } else {
                      _this.list = res.result && res.result.results || [];
                      _this.page.total = res.result && res.result.total;
                    }
                  };

                  _this.pageLoading = true;

                  _context.prev = 2;

                  if (!useGetToGet) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 6;
                  return _this.$fetch('get', _this.listUrl, _this.listParams).then(hanldeRes);

                case 6:
                  _context.next = 10;
                  break;

                case 8:
                  _context.next = 10;
                  return _this.$fetch('post', _this.listUrl, _this.filterParams, null, null, {
                    params: _this.listParams
                  }).then(hanldeRes);

                case 10:
                  _context.prev = 10;

                  _this.pageLoading = false;
                  return _context.finish(10);

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[2,, 10, 13]]);
        }))();
      },
      filterChange: function filterChange(val) {
        !val && this.search();
      }
    }
  };

  if (withPage) {
    _data.page = {
      curr: 1,
      size: limit,
      total: 0
    };
    res.methods.pageChange = function () {
      this.getList();
    };
  }
  if (filterJson) {
    _data.filterJson = _extends({
      loading: false
    }, filterJson);
    res.methods.search = function () {
      this.page.curr = 0;
      this.getList();
    };
  }

  return _extends({}, res, {
    data: function data() {
      return JSON.parse(_JSON$stringify(_data));
    },

    computed: {
      listParams: function listParams() {
        return {
          start: (this.page.curr - 1) * this.page.size,
          limit: limit
        };
      },
      filterParams: function filterParams() {
        var res = _Object$assign({}, this.filterJson);
        _Object$keys(res).forEach(function (key) {
          if (res[key] === '') {
            delete res[key];
          }
        });
        delete res.loading;
        return res;
      }
    }
  });
}