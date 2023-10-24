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
            prop="email",
            label="Email",
         )
         el-table-column(
            prop="role",
            label="Função",
         )
         el-table-column(
            prop="birthDate",
            label="Data de nascimento",
            :formatter="formatDate"
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
                     @click="handleVisualizar(scope.$index, scope.row)"
                     :style="'background: #67c23a'"
                  )
                     el-icon
                        View()
                  div.actions-button(
                     v-if="isLeadership || isThisMemberLoged(scope.row)"
                     @click="handleEditar(scope.$index, scope.row)"
                     :style="'background: #4b53c6'"
                  )
                     el-icon
                        Edit()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleExcluir(scope.$index, scope.row)"
                     :style="'background: #e07c72'"
                  )
                     el-icon
                        DeleteFilled()
   el-dialog(
      fullscreen=true
      center
      :before-close="handleClose"
      :title="titleModal"
      @close="closeModal"
      v-model="showModal"
   )
      adicionar-membro(
         :titleModal='titleModal'
         :isVisualizar="isVisualizar"
         :membro="novoMembro"
         :errorEmailInUse="errorEmailInUse"
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
import AdicionarMembro from '@/components/modals/AdicionarMembro.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'Member',

   components: {
      AdicionarMembro,
   },

   async mounted() {
      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de membros pode levar alguns instantes',
         type: 'warning',
      });
      this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
      await this.getMembros()
      ElNotification({
         title: 'Sucesso!',
         message: 'Lista de membros coletada.',
         type: 'success',
      });
   },

   data() {
      return {
         valid: true,
         dados: [],
         novoMembro: cloneDeep(models.emptyMember),
         isEditar: false,
         isVisualizar: false,
         titleModal: 'Adicionar Membro',
         errorEmailInUse: "",
      }
   },

   setValid(value) {
      this.valid = value;
   },

   computed: {
      showModal() {
         return this.$store.state.header.modal === 'membro'
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      }
   },

   methods: {
      ...mapActions({
         findAllMembers: 'findAllMembers',
         createMember: 'createMember',
         updateMember: 'updateMember',
         deleteMember: 'deleteMember'
      }),

      async getMembros() {
         const res = await this.findAllMembers()
         res.status === 404 ?
            localStorage.clear() || this.$router.push({ name: 'Home' })
            : this.dados = res.members
      },

      isThisMemberLoged(member) {
         return member.loged;
      },

      formatDate(row, column, prop) {
         return prop ? Utils.formatDate(prop) : '-'
      },

      closeModal() {
         this.isVisualizar = false
         this.isEditar = false
         this.novoMembro = cloneDeep(models.emptyMember)
         this.$store.commit('SET_MODAL', '')
      },

      async salvar() {
         try {
            if (this.valid) {
               const res = await this.createMember(this.novoMembro)
               ElNotification({
                  title: 'Tudo certo!',
                  message: `${res.member.name} foi cadastrado com sucesso`,
                  type: 'success',
               })
               this.$store.commit('SET_MODAL', '')
               await this.getMembros()
               this.novoMembro = cloneDeep(models.emptyMember);
            }
         } catch (error) {
            if (error.response.data.error === 'EMAIL_ALREADY_IN_USE') {
               this.errorEmailInUse = 'Já existe um membro cadastrado com esse email!';
            } else {
               this.errorMessage = 'Ocorreu um erro ao processar a solicitação.';
            }
         }
      },

      async excluir(index, row) {
         try {
            await this.deleteMember(row._id)
            ElNotification({
               title: 'Tudo certo!',
               message: 'Membro removido com sucesso',
               type: 'success',
            })
            await this.getMembros()
         } catch (error) {
            ElNotification({
               title: 'Falha ao remover membro!',
               message: 'A presença de ao menos uma liderança na EJ é obrigatória.',
               type: 'error',
            })
            await this.getMembros()
         }
      },

      handleExcluir(index, row) {
         ElMessageBox.confirm(
            `Excluir membro ${row.name} do sistema?`,
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

      async editar() {
         try {
            const res = await this.updateMember({ membro: this.novoMembro, id: this.novoMembro._id })
            this.isEditar = false
            this.$store.commit('SET_MODAL', '')
            ElNotification({
               title: 'Tudo certo!',
               message: `${res.member.name} foi editado com sucesso`,
               type: 'success',
            })
            await this.getMembros()
            this.novoMembro = cloneDeep(models.emptyMember)
         } catch (error) { }
      },

      handleEditar(index, row) {
         this.isEditar = true
         this.novoMembro = row
         this.titleModal = 'Editar Membro'
         this.$store.commit('SET_MODAL', 'membro')
      },

      handleVisualizar(index, row) {
         this.isVisualizar = true
         this.novoMembro = row
         this.titleModal = row.name
         this.$store.commit('SET_MODAL', 'membro')
      },

      handleClose() {
         this.$store.commit('SET_MODAL', '')
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
