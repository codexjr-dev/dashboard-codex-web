<template lang="pug">
div.header
   span.title-header {{ title }}
   el-button(
      v-if="isLeadership && isToShow"
      @click="openModal"
   )
      span {{ textButton }}
      div
         el-icon
         plus
</template>

<script>
export default {
   name: 'Header',

   props: {},

   computed: {
      isMember() {
         return this.$store.state.page.context === 'member'
      },
      isProject() {
         return this.$store.state.page.context === 'project'
      },
      isLink() {
         return this.$store.state.page.context === 'link'
      },
      isAllNews() {
         return this.$store.state.page.context === 'allnews'
      },
      isLeadership() {
         return ["Presidente", "Diretor(a)"].includes(
            localStorage.getItem("@role")
         );
      },
      isToShow() {
         return this.$store.state.page.header.buttonVisibility;
      },

      title() {
         return this.$store.state.page.header.title;
      },

      textButton() {
         if (this.isMember) {
            return 'Adicionar membro'
         } else if (this.isProject) {
            return 'Adicionar projeto'
         } else if (this.isLink) {
            return 'Adicionar link'
         }
      },
   },

   methods: {
      openModal() {
         if (this.isMember) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_MEMBER')
         } else if (this.isProject) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_PROJECT')
         } else if (this.isLink) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_LINK')
         }
      }
   },
}
</script>

<style lang="scss" scoped>
.header {
   height: 15vh;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 90vw;
   margin-left: 10vw;

   .title-header {
      font-weight: bold;
      font-size: 2rem;
      color: #808080;
      margin-left: 5%;
   }

   .el-button {
      margin-right: 5%;
      width: 15%;
   }

   .logoffSize {
      position: absolute;
      left: 65%;
   }

}
</style>
