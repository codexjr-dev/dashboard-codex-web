import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'
import AddNewsModal from '@/components/modals/AddNewsModal.vue'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
    name: 'Project',

    async mounted() {
        this.configHeader();
    },

    methods: {
        configHeader() {
            this.$store.commit('SHOW_SIDEBAR', false);
        }
    }
}