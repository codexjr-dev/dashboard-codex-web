<template lang="pug">
div.modal-content
   div.col
      el-divider(
         content-position="left"
      ) Descrição
      el-input(
         v-model="news.description"
         type="textarea"
         placeholder="Descrição"
      )
      el-divider(
         content-position="left"
      ) URL
      el-input(
         placeholder="URL"
         v-model="news.updateLink"
      )
      // el-divider(
      //    content-position="left"
      // ) Imagem
      // input(
      //    type="file"
      //    ref="imageInput"
      //    accept="image/*"
      //    @change="onImageSelected"
      //    :disabled="isVisualizar"
      // )
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'AddNewsModal',

   props: {
      news: {
         type: Object,
         required: true
      }
   },

   data() {
      return {
         dados: [],
      }
   },

   methods: {
      ...mapActions({
         findById: 'findById'
      }),

      onImageSelected(e) {
         this.news.image = e.target.files[0]
         this.convertImageToBuffer();
      },

      async convertImageToBuffer() {
         if (!this.news.image) {
            return;
         }

         this.news.image = new Uint8Array(await this.news.image.arrayBuffer());
      }
   }
}
</script>

<style lang="scss" scoped>
.modal-content {
   display: flex;
   gap: 2%;
   justify-content: center;
}

.col {
   display: flex;
   flex-direction: column;
   gap: 2vh;
   flex: 1;
}
</style>