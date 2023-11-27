<template lang="pug">
div.modal-content
  div.col
    el-row
      el-divider(
        content-position="left"
      ) Nome
      el-input(
		  	placeholder="Nome"
		  	v-model="projeto.name"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Descrição
      el-input(
		  	placeholder="Descrição"
		  	v-model="projeto.description"
		  	:disabled="isVisualizar"
		  )
    div.date-pickers
      el-row
        el-divider(
          content-position="left"
        ) Data de início
        el-date-picker(
			  	placeholder="Data de início"
			  	format="DD/MM/YYYY"
			  	value-format="YYYY-MM-DD"
			  	style="width: 100%"
			  	v-model="projeto.startDate"
          :disabled="isVisualizar"
			  )
      el-row
        el-divider(
          content-position="left"
        ) Data de término
        el-date-picker(
			  	placeholder="Data de finalização"
			  	format="DD/MM/YYYY"
			  	value-format="YYYY-MM-DD"
			  	style="width: 100%"
			  	v-model="projeto.finishDate"
          :disabled="isVisualizar"
			  )
    el-row
      el-divider(
        content-position="left"
      ) Tags
      el-select(
		  	multiple
        v-model="projeto.tags"
        placeholder="Selecione tags"
        value-key="id"
        :disabled="isVisualizar"
      )
        el-option(
		  		v-for="tag in tags",
		  		:key="tag.id",
		  		:label="tag.value",
		  		:value="tag.value"
        )

    el-row
      el-divider(
        content-position="left"
      ) Time
      el-select(
		  	multiple
        v-model="projeto.team"
        placeholder="Selecione o time"
        value-key="id"
        :disabled="isVisualizar"
        :fit-input-width="true"
      )
        el-option(
		  		v-for="member in members",
		  		:key="member._id",
		  		:label="member.name",
		  		:value="member._id"
        )
  div.col
    
    el-row
      el-divider(
        content-position="left"
      ) Link do contrato
      el-input(
		  	placeholder="Link do contrato"
		  	v-model="projeto.contractLink"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Contato do cliente
      el-input(
		  	placeholder="Contato do cliente"
		  	v-model="projeto.customer.contact"
		  	v-mask="['(##)#####-####']"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Email do cliente
      el-input(
		  	placeholder="Email do cliente"
		  	v-model="projeto.customer.email"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Nome do cliente
      el-input(
		  	v-model="projeto.customer.name"
		  	type="textarea"
		  	placeholder="Nome do cliente"
        :disabled="isVisualizar"
		  )
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'AdicionarProjeto',

  props: {
    projeto: {
      type: Object,
      required: true,
    },
    isVisualizar: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  
  data() {
    return {
      dados: [],
      tags: [
        {
          id: 1,
          value: 'Backend',
        },
        {
          id: 2,
          value: 'Frontend',
        },
        {
          id: 3,
          value: 'Mobile',
        },
        {
          id: 4,
          value: 'Wordpress',
        },
        {
          id: 5,
          value: 'Assessoria',
        },
        {
          id: 6,
          value: 'Treinamento',
        }
      ],
      members: []
    }
  },

	async mounted () {
		const res = await this.findAllMembers() 
		this.members = res.members
	},

  methods: {
    ...mapActions({
			findAllMembers: 'findAllMembers',
      findById: 'findById',
    }),
  },
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

.date-pickers {
  display: flex;
  gap: 2%;
  margin-bottom: 1vh;
}
</style>
