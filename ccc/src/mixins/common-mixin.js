import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      wrId: '',
      taskId: '',

      // currRoleId: null,
      // currRoleName: '',

      wrStatus: '',
      taskStatus: '',

      listLoading: false,
      submitLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'currentRoleCode',
      'currentRoleName',
      'currentStaffId',
      'currentStaffName'
    ])
  }
}
