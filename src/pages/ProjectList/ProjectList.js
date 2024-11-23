import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarProjeto from '@/components/modals/AdicionarProjeto.vue'
import AddNewsModal from '@/components/modals/AddNewsModal.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'ProjectList',

   components: {
      AdicionarProjeto,
      AddNewsModal
   },

   async mounted() {
      this.sendNotification({
         title: 'Aguarde...',
         message: 'A coleta de projetos pode levar alguns instantes',
         type: 'warning',
      });

      this.configHeader();

      this.userInfo = await this.getUserInfo();
      this.getProjects();

      this.sendNotification({
         title: 'Sucesso!',
         message: 'Lista de projetos coletada.',
         type: 'success',
      });
   },

   data() {
      return {
         dados: [],
         novoProjeto: cloneDeep(models.emptyProject),
         newsToBeCreated: cloneDeep(models.emptyNews),
         titleModal: 'Adicionar Projeto',
         isEditar: false,
         isVisualizar: false,
         userInfo: {},
         invalid: false,
         validFields: {
            projectName: false,
            projectContractLink: false,
            projectDescription: false,
            projectStartDate: false,
            projectFinishDate: false,
            projectTags: false,
            projectTeam: false,
            customerName: false,
            customerPhone: false,
         },
      };
   },

   computed: {
      showAddProjectModal() {
         return this.$store.state.page.modalContext === 'ADD_OR_EDIT_PROJECT';
      },
      showAddNewsModal() {
         return this.$store.state.page.modalContext === 'ADD_NEWS';
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"));
      }
   },

   methods: {
      ...mapActions({
         findAllProjects: 'findAllProjects',
         createProject: 'createProject',
         updateProject: 'updateProject',
         deleteProject: 'deleteProject',
         createNews: 'createNews',
         getUserInfo: 'userInfo'
      }),

      configHeader() {
         this.$store.commit('SET_PAGE_CONTEXT', 'project');
         this.$store.commit('SET_HEADER_TITLE', 'Projetos');
         this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', true);
         this.$store.commit('SHOW_SIDEBAR', true);
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop);
      },

      formatList(row, column, prop) {
         return Utils.formatListToCard(row, column, prop);
      },

      async getProjects() {
         const res = await this.findAllProjects();
         this.dados = res.projects;
      },

      isOnTeam(row) {
         return this.getTeamMembersId(row).includes(this.userInfo.sub._id);
      },

      getTeamMembersId(row) {
         return row.team[0] && row.team[0].name ? row.team.map((member) => member._id) : row.team;
      },

      async handleViewProject(index, row) {
         this.$router.push({
            name: 'Project',
            params: { projectId: row._id }
         });
      },

      handleEditProject(index, row) {
         this.isVisualizar = false;
         this.isEditar = true;
         this.titleModal = 'Editar projeto'
         row.team = this.getTeamMembersId(row);
         this.openModal(index, row, 'ADD_OR_EDIT_PROJECT');
      },

      handleDeleteProject(index, row) {
         ElMessageBox.confirm(
            `Excluir projeto ${row.name} do sistema?`,
            'Atenção',
            {
               confirmButtonText: 'Excluir',
               cancelButtonText: 'Cancelar',
               type: 'warning',
            }
         ).then(async () => {
            await this.deleteAndGetAllProjects(index, row)
         });
      },

      async handleViewNews(index, row) {
         this.$router.push({
            name: 'ViewNews',
            params: { projectId: JSON.stringify(row._id) }
         });
      },

      handleAddNews(index, row) {
         this.novoProjeto = row;
         this.titleModal = 'Adicionar atualização'
         this.openModal(index, row, 'ADD_NEWS');
      },

      async saveProject() {
         try {
            if (this.isValid()) {
               const res = await this.createProject(this.novoProjeto)

               this.sendNotification({
                  title: 'Tudo certo!',
                  message: `Projeto ${res.project.name} foi cadastrado com sucesso`,
                  type: 'success',
               });

               this.closeModal();
            };
         } catch (error) { };
      },

      async editProject() {
         try {
            const res = await this.updateProject({ project: this.novoProjeto, id: this.novoProjeto._id });

            this.sendNotification({
               title: 'Tudo certo!',
               message: `${res.project.name} foi editado com sucesso`,
               type: 'success',
            });

            this.closeModal();
         } catch (error) { }
      },

      async saveNews() {
         try {
            await this.createNews({ news: this.newsToBeCreated, projectId: this.novoProjeto._id });

            this.sendNotification({
               title: 'Tudo certo!',
               message: `Atualização criada com sucesso!`,
               type: 'success',
            });

            this.closeModal();
         } catch (error) { }
      },

      async deleteAndGetAllProjects(index, row) {
         try {
            await this.deleteProject(row._id);

            this.sendNotification({
               title: 'Tudo certo!',
               message: 'Projeto removido com sucesso',
               type: 'success',
            });

            await this.getProjects();
         } catch (error) { }
      },

      openModal(index, row, modal) {
         this.novoProjeto = row;
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', modal);
      },

      async closeModal() {
         this.closeModalWithoutRequest();
         await this.getProjects();
      },

      closeModalWithoutRequest() {
         this.isVisualizar = false;
         this.isEditar = false;
         this.invalid = false;
         this.resetValidFields();
         this.novoProjeto = cloneDeep(models.emptyProject);
         this.newsToBeCreated = cloneDeep(models.emptyNews);
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      resetValidFields() {
         Object.keys(this.validFields).forEach(key => {
            this.setValidField(key, false);
         });
      },

      sendNotification(notification) {
         ElNotification.closeAll();
         ElNotification(notification);
      },

      setValidField(fieldName, value) {
         this.validFields[fieldName] = value;
      },

      isValid() {
         let isValid = true;
         Object.values(this.validFields).forEach(value => {
            if (!value) isValid = false;
         })
         this.invalid = !isValid;
         return isValid;
      },
   },
}