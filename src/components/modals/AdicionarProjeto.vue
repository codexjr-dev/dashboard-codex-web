<template lang="pug">
div.modal-content
  div.col
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Nome </label>
      el-input(
		  	placeholder="Nome"
		  	v-model="projeto.name"
        @blur="validateName"
        :class="errorMessageName ? 'required-field': ''"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Descrição </label>
      el-input(
		  	placeholder="Descrição"
		  	v-model="projeto.description"
		  	:disabled="isVisualizar"
		  )
    div.date-pickers
      el-row
        el-divider(
          content-position="left"
        ) <label className="required"> Data de início </label>
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
        ) <label className="required"> Data de término </label>
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
      ) <label className="required"> Tags </label>
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
  div.col
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Time </label>
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
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Link do contrato </label>
      el-input(
		  	placeholder="Link do contrato"
		  	v-model="projeto.contractLink"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Contato do cliente </label>
      el-input(
		  	placeholder="Contato do cliente"
		  	v-model="projeto.customer.contact"
		  	v-mask="['(##)#####-####']"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Nome do cliente </label>
      el-input(
        type="textarea"
		  	placeholder="Nome do cliente"
		  	v-model="projeto.customer.name"
        @blur="validateName(projeto.customer.name)"
        :class="errorMessageName ? 'required-field': ''"
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
    invalid: {
      type: Boolean,
      required: false,
      default: false
    },
    errorMessageName: String,
  },

  watch: {
      invalid: {
         immediate: false,

         handler(newValue) {
            if(newValue) {
               this.validateName(newValue);
            }
         }
      }
   },

  
  data() {
    return {
      customDatePicker: {
            boundariesPadding: 0,
            gpuAcceleration: false
      },
      dados: [],
      errorMessageName: "",
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

    validateName(name) {
      if(!name || name.trim().length == 0) {
        this.errorMessageName = 'Campo obrigatório *'
        this.$emit("setValidName", false);
      } else {
        this.errorMessageName = '';
        this.$emit("setValidName", true);
      }
    },
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

.required:after {
  content: " *";
  color: #EB4C4F;
}
</style>
