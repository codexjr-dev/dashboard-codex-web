<template>
   <div>
      <el-card>
         <el-table :data="dados" stripe>
            <el-table-column prop="name" label="Nome" :width="150"></el-table-column>
            <el-table-column prop="description" label="Descrição"></el-table-column>
            <el-table-column prop="team" label="Time" :formatter="formatList" :width="210">
               <template v-slot="scope">
                  <div v-for="(member, index) in scope.row.team" :key="index">
                     <div>{{ index + 1 }}) {{ member.name }}</div>
                  </div>
               </template>
            </el-table-column>
            <el-table-column prop="startDate" label="Data de início" :formatter="formatDate"
               :width="150"></el-table-column>
            <el-table-column label="Ações" align="right">
               <template v-slot="scope">
                  <div class="actions">
                     <div class="actions-button" v-if="isLeadership || onTeam(scope.row)"
                        @click="handleAddNews(scope.$index, scope.row)" :style="'background: #A8CDE8'">
                        <el-icon>
                           <Plus />
                        </el-icon>
                     </div>
                     <div class="actions-button" @click="handleViewNews(scope.$index, scope.row)"
                        :style="'background: #E8A8CE'">
                        <el-icon>
                           <List />
                        </el-icon>
                     </div>
                     <div class="actions-button" v-if="isLeadership" @click="handleEditProject(scope.$index, scope.row)"
                        :style="'background: #4b53c6'">
                        <el-icon>
                           <Edit />
                        </el-icon>
                     </div>
                     <div class="actions-button" @click="handleViewProject(scope.$index, scope.row)"
                        :style="'background: #67c23a'">
                        <el-icon>
                           <View />
                        </el-icon>
                     </div>
                     <div class="actions-button" v-if="isLeadership" @click="handleDeleteProject(scope.$index, scope.row)"
                        :style="'background: #e07c72'">
                        <el-icon>
                           <DeleteFilled />
                        </el-icon>
                     </div>
                  </div>
               </template>
            </el-table-column>
         </el-table>
      </el-card>

      <el-dialog center :before-close="handleClose" :title="titleModal" @close="closeModal" v-model="showAddProjectModal"
         fullscreen="true">
         <adicionar-projeto :titleModal="titleModal" :isVisualizar="isVisualizar"
            :projeto="novoProjeto"></adicionar-projeto>
         <template v-slot:footer>
            <span class="dialog-footer">
               <el-button v-if="!isVisualizar" @click="isEditar ? editar() : salvar()" type="primary" color="#4b53c6">
                  Salvar
               </el-button>
            </span>
         </template>
      </el-dialog>

      <el-dialog center :before-close="handleClose" :title="titleModal" @close="closeModal" v-model="showAddNewsModal">
         <add-news-modal :titleModal="titleModal" :news="newsToBeCreated"></add-news-modal>
         <template v-slot:footer>
            <span class="dialog-footer">
               <el-button @click="saveNews()" type="primary" color="#4b53c6">
                  Salvar
               </el-button>
            </span>
         </template>
      </el-dialog>
   </div>
</template>
 

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarProjeto from '@/components/modals/AdicionarProjeto.vue'
import AddNewsModal from '@/components/modals/AddNewsModal.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'Project',

   components: {
      AdicionarProjeto,
      AddNewsModal
   },

   async mounted() {
      ElNotification.closeAll()
      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de projetos pode levar alguns instantes',
         type: 'warning',
      });

      this.configHeader();

      this.userInfo = await this.getUserInfo();
      const res = await this.findAllProjects()
      this.dados = res.projects
      ElNotification.closeAll();
      ElNotification({
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
         userInfo: {}
      }
   },

   computed: {
      showAddProjectModal() {
         return this.$store.state.page.modalContext === 'ADD_PROJECT';
      },
      showAddNewsModal() {
         return this.$store.state.page.modalContext === 'ADD_NEWS';
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
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

      onTeam(row) {
         return this.getTeamMembersId(row).includes(this.userInfo.sub._id);
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop);
      },

      formatList(row, column, prop) {
         let listFormated = '';
         prop.forEach((item, index) => {
            if (index !== prop.length - 1)
               listFormated += item.name + ', ';
            else
               listFormated += item.name;
         });
         return listFormated;
      },

      async closeModal() {
         this.isVisualizar = false
         this.isEditar = false
         this.novoProjeto = cloneDeep(models.emptyProject)
         await this.getProjetos()
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      handleClose() {
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      getTeamMembersId(row) {
         return row.team[0] && row.team[0].name ? row.team.map((member) => member._id) : row.team;
      },

      async getProjetos() {
         const res = await this.findAllProjects()
         this.dados = res.projects
      },

      handleViewProject(index, row) {
         this.isVisualizar = true
         row.team = this.getTeamMembersId(row);
         this.novoProjeto = row
         this.titleModal = row.name
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_PROJECT');
      },

      handleEditProject(index, row) {
         this.isVisualizar = false
         this.isEditar = true
         row.team = this.getTeamMembersId(row);
         this.novoProjeto = row
         this.titleModal = 'Editar projeto'
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_PROJECT');
      },

      async salvar() {
         try {
            const res = await this.createProject(this.novoProjeto)
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: `Projeto ${res.project.name} foi cadastrado com sucesso`,
               type: 'success',
            })
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
            await this.getProjetos()
            this.novoProjeto = cloneDeep(models.emptyProject)
         } catch (error) { }
      },

      async editar() {
         try {
            const res = await this.updateProject({ project: this.novoProjeto, id: this.novoProjeto._id })
            this.isEditar = false
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: `${res.project.name} foi editado com sucesso`,
               type: 'success',
            })
            await this.getProjetos()
            this.novoProjeto = cloneDeep(models.emptyProject)
         } catch (error) { }
      },

      handleAddNews(index, row) {
         this.novoProjeto = row;
         this.titleModal = 'Adicionar atualização'
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_NEWS')
      },

      async saveNews() {
         try {
            await this.createNews({ news: this.newsToBeCreated, projectId: this.novoProjeto._id })
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: `Atualização criada com sucesso!`,
               type: 'success',
            });
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
            this.novoProjeto = cloneDeep(models.emptyProject);
            this.newsToBeCreated = cloneDeep(models.emptyNews);
         } catch (error) { }
      },

      async handleViewNews(index, row) {
         this.$router.push({
            name: 'ViewNews',
            params: { projectId: JSON.stringify(row._id) }
         });
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
            await this.excluir(index, row)
         })
      },

      async excluir(index, row) {
         try {
            await this.deleteProject(row._id)
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: 'Projeto removido com sucesso',
               type: 'success',
            })
            await this.getProjetos()
         } catch (error) { }
      },
   }
}
</script>

<style lang="scss" scoped>
.el-card {
   margin-left: 2%;
   margin-right: 2%;
   margin-top: 2%
}

.actions {
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: row;
}

.actions-button {
   width: 45px;
   height: 35px;
   background: #e6e6e6;
   font-size: 70%;
   border-radius: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   margin: 4px;
   padding: auto;
}

.actions-button:hover {
   cursor: pointer;
}

.el-icon {
   width: 35%;
   height: 30%;

   svg {
      height: 5em;
      width: 5em;
      color: white;
      margin: 0;
   }
}

span {
   color: #808080;
   margin: 0;
}
</style>
