import axios from '@/utils/axios'

const actions = {

    async findAllNews({ commit }) {
      try {
         const result = await axios({
            method: 'GET',
            url: 'news'
        })
        return result.data
       } catch (err) {
         const errorMessage = err.response.data.error;
   
         isBadToken(errorMessage)
           ? console.log(err.response.data.error) || localStorage.clear()
           : null; // To inspect, you can change null by console.log(res)
   
         return err.response;
       }
    },

    async getNewsByProject({ commit }, data) {
      try {
         const result = await axios({
            method: 'GET',
            url: `news/${data.projectId}`
         })
         return result.data
       } catch (err) {
         const errorMessage = err.response.data.error;
   
         isBadToken(errorMessage)
           ? console.log(err.response.data.error) || localStorage.clear()
           : null; // To inspect, you can change null by console.log(res)
   
         return err.response;
       }
    },

    async createNews({ commit }, dados) {
      try {
         const result = await axios({
            method: 'POST',
            url: `news/${dados.projectId}`,
            data: dados.news
         })
         return result.data
       } catch (err) {
         const errorMessage = err.response.data.error;
   
         isBadToken(errorMessage)
           ? console.log(err.response.data.error) || localStorage.clear()
           : null; // To inspect, you can change null by console.log(res)
   
         return err.response;
       }
    },

    async updateNews({ commit }, dados) {
      try {
         const result = await axios({
            method: 'PATCH',
            url: `news`,
            data: { news: dados, newsId: dados._id }
         });
         return result.data;
       } catch (err) {
         const errorMessage = err.response.data.error;
   
         isBadToken(errorMessage)
           ? console.log(err.response.data.error) || localStorage.clear()
           : null; // To inspect, you can change null by console.log(res)
   
         return err.response;
       }
    },

    async deleteNews({ commit }, dados) {
      try {
         const result = await axios({
            method: 'DELETE',
            url: `news/${dados.projectId}`,
            data: { newsId: dados.newsId }
         });
         return result.data;
       } catch (err) {
         const errorMessage = err.response.data.error;
   
         isBadToken(errorMessage)
           ? console.log(err.response.data.error) || localStorage.clear()
           : null; // To inspect, you can change null by console.log(res)
   
         return err.response;
       }
    }
}

function isBadToken(errorMessage) {
   return [
     "Token inválido.",
     "Usuário não existe.",
     "Token mal formatado.",
   ].includes(errorMessage);
 }

export default {
    actions
}