import axios from '@/utils/axios'

const actions = {
    async findAllProjects({ commit }) {
        const result = await axios({
            method: 'GET',
            url: 'project'
        })
        return result.data
    },
    async findProject({ commit }, id) {
        const result = await axios({
            method: 'GET',
            url: `project/${id}`
        })
        return result.data
    },
    async createProject({ commit }, project) {
        const result = await axios({
            method: 'POST',
            url: 'project',
            data: project
        })
        return result.data
    },
    async updateProject({ commit }, dados) {
        const result = await axios({
            method: 'PATCH',
            url: `project/${dados.id}`,
            data: dados.project
        })
        return result.data
    },
    async deleteProject({ commit }, id) {
        const result = await axios({
            method: 'DELETE',
            url: `project/${id}`
        })
        return result.data
    }
}

export default {
    actions
}