import axios from '@/utils/axios'

const actions = {
    async findAllNews({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'news'
        })
        return result.data
    },
    async createNews({ commit }, news, id_project) {
        const result = await axios({
            method: 'POST',
            url: `news/${id_project}`,
            data: news
        })
        return result.data
    },
    async updateNews({ commit }, dados) {
        const result = await axios({
            method: 'PATCH',
            url: `news/${dados.id}`,
            data: dados.news
        })
        return result.data
    },
    async deleteNews({ commit }, id) {
        const result = await axios({
            method: 'DELETE',
            url: `news/${id}`
        })
        return result.data
    }
}

export default {
    actions
}