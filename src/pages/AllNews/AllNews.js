import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'
import AddNewsModal from '@/components/modals/AddNewsModal.vue'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'AllNews',

   components: {
      AddNewsModal
   },

   async mounted() {
      this.configHeader();

      this.userInfo = await this.getUserInfo();

      ElNotification.closeAll();
      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de atualizações pode levar alguns instantes',
         type: 'warning',
      });


      const data = await this.getAllNews();

      if (data && data.status !== 500) {
         this.newsData = data.news;
         this.title = this.getTitle();

         ElNotification.closeAll();
         ElNotification({
            title: 'Sucesso!',
            message: 'Atualizações do Projeto coletadas.',
            type: 'success',
         });
      } else {
         ElNotification.closeAll();
         ElNotification({
            title: 'O projeto informado não existe',
            message: 'Você será redirecionado(a) para a Página de Projetos',
            type: 'warning',
         })
         setTimeout(() => {
            this.$router.push({ name: 'Project' });
         }, "3000");
      }
   },

   data() {
      return {
         newsData: [],
         userInfo: {},
         title: '',
         editableNews: cloneDeep(models.emptyNews)
      }
   },

   computed: {
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      },
      showModalAddNews() {
         return this.$store.state.page.modalContext === 'ADD_NEWS'
      },
   },

   methods: {
      ...mapActions({
         getUserInfo: 'userInfo',
         getAllNewsByEj: 'getAllNewsByEj',
         updateNews: 'updateNews',
         deleteNews: 'deleteNews',
      }),

      configHeader() {
         this.$store.commit('SET_PAGE_CONTEXT', 'allnews');
         this.$store.commit('SET_HEADER_TITLE', 'Atualizações dos Projetos');
         this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', false);
         this.$store.commit('SHOW_SIDEBAR', true);
      },

      isNewsOwner(row) {
         return this.userInfo.sub._id === row.member._id;
      },

      async getAllNews() {
         return await this.getAllNewsByEj() || null;
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop);
      },

      getTitle() {
         return `Atualizações da EJ: ${this.userInfo.sub.ej.name}`
      },

      handleCopyLink(index, row) {
         if (row.updateLink) {
            let input = document.createElement("input");
            input.value = `${row.updateLink}`;
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
         } else {
            ElNotification.closeAll();
            ElNotification({
               title: 'Operação não realizada.',
               message: `A atualização não possui um URL adicional.`,
               type: 'warning',
            })
         }
      },

      async handleDownloadImage(index, row) {
         ElNotification.closeAll();
         ElNotification({
            title: 'Operação não realizada.',
            message: `Essa funcionalidade está em desenvolvimento.`,
            type: 'info',
         })
      },

      handleEditNews(index, row) {
         this.editableNews = {
            _id: row._id,
            description: row.description,
            image: row.image,
            updateLink: row.updateLink
         };
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_NEWS');
      },

      async editNews() {
         try {
            const data = await this.updateNews(this.editableNews);

            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');

            ElNotification.closeAll();
            ElNotification({
               title: 'Tudo certo!',
               message: `Atualização editada com sucesso.`,
               type: 'success',
            });

            if (data && data.status !== 500) {
               this.newsData = data.news
            };

            this.editableNews = cloneDeep(models.emptyNews);
         } catch (error) { }
      },

      async closeModal() {
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');

         this.editableNews = cloneDeep({ news: models.emptyNews });

         const data = await this.getAllNews();
         if (data && data.status !== 500) {
            this.newsData = data.news
         }
      },

      handleClose() {
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      handleDeleteNews(index, row) {
         ElMessageBox.confirm(
            `<b>Excluir atualização do sistema?</b><br><br>
            <b>Autor(a):</b> ${row.member.name}<br>
            <b>Última atualização:</b> ${Utils.formatDate(row.updatedAt)}<br>
            <b>Descrição:</b> ${row.description}<br>
            <b>Link de Referência:</b> ${row.updateLink ? row.updateLink : 'Sem link.'}<br>
            <b>Imagem de Referência:</b> ${row.image ? 'Com imagem.' : 'Sem imagem.'}`,
            'Atenção!',
            {
               dangerouslyUseHTMLString: true,
               confirmButtonText: 'Excluir',
               cancelButtonText: 'Cancelar',
               type: 'warning',
            }
         ).then(async () => {
            await this.deleteThisNews(index, row)
         })
      },

      async deleteThisNews(index, row) {
         try {
            const data = await this.deleteNews({ projectId: row.project, newsId: row._id });

            ElNotification.closeAll();
            ElNotification({
               title: 'Tudo certo!',
               message: 'Atualização removida com sucesso',
               type: 'success',
            });

            if (data && data.status !== 500) {
               this.newsData = data.news
            }
         } catch (error) {
            ElNotification.closeAll();
            ElNotification({
               title: 'Operação não realizada.',
               message: 'Ocorreu algum erro ao deletar a atualização.',
               type: 'error',
            })
         }
      },

      handleClosePage() {
         this.$router.push({ name: 'Project' });
      },
   }
}