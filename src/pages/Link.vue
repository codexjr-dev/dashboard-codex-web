<template lang="pug">
div
   el-card
      el-table(
         :data="dados"
         stripe
      )
         el-table-column(
            prop="name",
            label="Nome",
         )
         el-table-column(
            prop="url",
            label="URL",
         )
         el-table-column(
            prop="departments",
            label="Departamentos",
            :formatter="formatList"
         )
         el-table-column(
            prop="tags",
            label="Tags",
            :formatter="formatList"
         )
         el-table-column(
            label="Ações"
            align="right"
         )
            template(
               #default="scope"
            )
               div.actions()
                  div.actions-button(
                     @click="copyNick(scope.row)"
                     :style="'background: #409eff'"
                  )
                     el-icon
                        CopyDocument()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleEditar(scope.$index, scope.row)"
                     :style="'background: #4b53c6'"
                  )
                     el-icon
                        Edit()
                  div.actions-button(
                     @click="handleVisualizar(scope.$index, scope.row)"
                     :style="'background: #67c23a'"
                  )
                     el-icon
                        View()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleExcluir(scope.$index, scope.row)"
                     :style="'background: #e07c72'"
                  )
                     el-icon
                        DeleteFilled()
   el-dialog(
      :before-close="handleClose"
      :title="titleModal"
      @close="closeModal"
      v-model="showAddLinkModal"
   )
      adicionar-link(
         :titleModal='titleModal'
         :isVisualizar="isVisualizar"
         :link="novoLink"
      )
      template(
         #footer
      )
         span.dialog-footer
            el-button(
               v-if="!isVisualizar"
               @click="isEditar ? editar() : salvar()"
               type="primary"
               color="#4b53c6"
            ) Salvar
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarLink from '@/components/modals/AdicionarLink.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'Link',

   components: {
      AdicionarLink,
   },

   async mounted() {
      ElNotification.closeAll();
      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de membros pode levar alguns instantes',
         type: 'warning',
      });

      this.configHeader();

      const res = await this.findAllLinks()
      this.dados = res.links
      ElNotification.closeAll();
      ElNotification({
         title: 'Sucesso!',
         message: 'Lista de links coletada.',
         type: 'success',
      });
   },

   data() {
      return {
         dados: [],
         novoLink: cloneDeep(models.emptyLink),
         titleModal: 'Adicionar Link',
         isEditar: false,
         isVisualizar: false,
      }
   },

   computed: {
      showAddLinkModal() {
         return this.$store.state.page.modalContext === 'ADD_LINK';
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      }
   },

   methods: {
      ...mapActions({
         findAllLinks: 'findAllLinks',
         createLink: 'createLink',
         deleteLink: 'deleteLink',
         updateLink: 'updateLink'
      }),

      configHeader() {
         this.$store.commit('SET_PAGE_CONTEXT', 'link');
         this.$store.commit('SET_HEADER_TITLE', 'Links');
         this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', true);
         this.$store.commit('SHOW_SIDEBAR', true);
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop)
      },

      async getLinks() {
         const res = await this.findAllLinks()
         this.dados = res.links
      },

      async salvar() {
         try {
            const res = await this.createLink(this.novoLink)
            ElNotification.closeAll();
            ElNotification({
               title: 'Tudo certo!',
               message: `Link ${res.link.name} foi cadastrado com sucesso`,
               type: 'success',
            })
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
            await this.getLinks()
            this.novoLink = cloneDeep(models.emptyLink)
         } catch (error) { }
      },

      async editar() {
         try {
            const res = await this.updateLink({
               link: this.novoLink,
               id: this.novoLink._id,
            })
            this.isEditar = false
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
            ElNotification.closeAll();
            ElNotification({
               title: 'Tudo certo!',
               message: `${res.link.name} foi editado com sucesso`,
               type: 'success',
            })
            await this.getLinks()
            this.novoLink = cloneDeep(models.emptyLink)
         } catch (error) { }
      },

      handleEditar(index, row) {
         this.isEditar = true
         this.novoLink = row
         this.titleModal = 'Editar link'
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_LINK');
      },

      handleVisualizar(index, row) {
         this.isVisualizar = true
         this.novoLink = row
         this.titleModal = row.name
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_LINK');
      },

      async excluir(index, row) {
         try {
            await this.deleteLink(row._id)
            ElNotification.closeAll();
            ElNotification({
               title: 'Tudo certo!',
               message: 'Link removido com sucesso',
               type: 'success',
            })
            await this.getLinks()
         } catch (error) { }
      },

      handleExcluir(index, row) {
         ElMessageBox.confirm(
            `Excluir link ${row.name} do sistema?`,
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

      handleClose() {
         this.isVisualizar = false
         this.isEditar = false
         this.novoLink = cloneDeep(models.emptyLink)
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      formatList(row, column, prop) {
         let listFormated = ''
         prop.forEach((item, index) => {
            if (index !== prop.length - 1) {
               listFormated += item + ', '
            } else {
               listFormated += item
            }
         })
         return listFormated
      },

      copyNick(row) {
         let input = document.createElement("input");
         input.value = `${row.url}`;
         document.body.appendChild(input);
         input.select();

         document.execCommand('copy');
         document.body.removeChild(input);

         ElNotification.closeAll();
         ElNotification({
            title: 'Tudo certo!',
            message: `Link copiado para a área de tranferência`,
            type: 'success',
         })
      }
   }
}
</script>

<style lang="scss" scoped>
.el-card {
   margin-left: 2%;
   margin-right: 2%;
   margin-top: 2%;
}

.actions {
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: row;
}

.actions-button {
   width: 45px;
   height: 40px;
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
      height: 3em;
      width: 3em;
      color: white;
      margin: 0;
   }
}

span {
   color: #808080;
   margin: 0;
}
</style>
