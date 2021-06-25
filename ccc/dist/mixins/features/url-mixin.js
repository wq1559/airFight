import _extends from 'babel-runtime/helpers/extends';
import { mapGetters } from 'vuex';

export default {
  data: function data() {
    return {};
  },

  computed: _extends({}, mapGetters(['currentRoleCode', 'currentStaffId'])),
  methods: {
    getUtilisateur: function getUtilisateur(fullPath) {
      return this.currentStaffId + '|' + this.currentRoleCode + '|' + fullPath;
    },
    getEncodedUrlFullPath: function getEncodedUrlFullPath(fullPath) {
      // let
      return fullPath + ('&Utilisateur=' + btoa(this.getUtilisateur(fullPath)));
    }
  }
};