import _extends from 'babel-runtime/helpers/extends';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
// import ApiMixin from './features/api-mixin'

export default {
  // mixins: [ApiMixin],
  methods: {
    goBack: function goBack() {
      this.$router.back();
    },
    handleHttpError: function handleHttpError(error, _ref) {
      var data = _ref.data;

      if (process.env.NODE_ENV === 'development') {
        console.log(error);
        data && console.log(_JSON$stringify(data));
      }
    },
    messageHold: function messageHold(options) {
      this.$message(_extends({
        dangerouslyUseHTMLString: true,
        message: '<div class="c-message_box"><p class="c-message_box_title">' + options.title + '</p></br>\n        <span>' + options.remark + '</span></div>',
        duration: 0,
        showClose: true
      }, options));
    }
  }
};