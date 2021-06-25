import _extends from 'babel-runtime/helpers/extends';
import { mapGetters } from 'vuex';

export default {
  data: function data() {
    return {
      wrId: '',
      taskId: '',

      // currRoleId: null,
      // currRoleName: '',

      wrStatus: '',
      taskStatus: '',

      listLoading: false,
      submitLoading: false
    };
  },

  computed: _extends({}, mapGetters(['currentRoleCode', 'currentRoleName', 'currentStaffId', 'currentStaffName']))
};