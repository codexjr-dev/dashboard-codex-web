import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
    name: 'Project',

    async mounted() {
        this.configHeader();

        this.sendNotification({
            title: 'Aguarde...',
            message: 'A coleta das informações do projeto pode levar alguns instantes',
            type: 'warning',
         });

        const project = await this.getProject();

        if(project) {
            this.project = project;
            this.title = this.getTitle();
            this.description = this.getDescription();

            this.sendNotification({
                title: 'Sucesso!',
                message: 'Informações do projeto coletadas',
                type: 'success',
             });
        } else {
            this.sendNotification({
               title: 'O projeto informado não existe',
               message: 'Você será redirecionado(a) para a Página de Projetos',
               type: 'warning',
            });
            
            setTimeout(() => {
               this.$router.push({ name: 'ProjectList' });
            }, "3000");
        }

    },

    data() {
        return {
            title: '',
            description: '',
        }
    },

    methods: {
        ...mapActions ({
            findAllProjects: 'findAllProjects'
        }),

        configHeader() {
            this.$store.commit('SHOW_SIDEBAR', false);
        },

        handleClosePage() {
            this.$router.push({ name: 'ProjectList' });
         },

        async getProject() {
            const res = await this.findAllProjects();

            const query = this.$route.params;
            const projectId = query.projectId ? JSON.parse(query.projectId) : null;
            
            const project = res.projects.find(function(project) {
                return project._id === projectId;
            });

            return project;
        },

        getTitle() {
            return this.project.name;
        },

        getDescription() {
            return this.project.description;
        },

        sendNotification(notification) {
            ElNotification.closeAll();
            ElNotification(notification);
        }
    }
}