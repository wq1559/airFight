import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentRoleCode', 'currentStaffId'])
  },
  methods: {
    getUtilisateur(fullPath) {
      return `${this.currentStaffId}|${this.currentRoleCode}|${fullPath}`
    },
    getEncodedUrlFullPath(fullPath) {
      // let
      return fullPath + `&Utilisateur=${btoa(this.getUtilisateur(fullPath))}`
    }
  }
}
