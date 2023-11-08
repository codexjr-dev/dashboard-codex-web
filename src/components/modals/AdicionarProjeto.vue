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
        @blur="validate(this.projeto.name, 'setValidProjectName', 'errorMessageName')"
        :class="errorMessageName ? 'required-field' : ''"
        :disabled="isToDisable"
      )
      el-text.verify(
        v-if="errorMessageName"
      ) {{ errorMessageName }}
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Descrição </label>
      el-input(
		  	placeholder="Descrição"
		  	v-model="projeto.description"
        @blur="validate(this.projeto.description, 'setValidProjectDescription', 'errorMessageProjectDescription')"
        :class="errorMessageProjectDescription ? 'required-field' : ''"
		  	:disabled="isToDisable"
		  )
      el-text.verify(
        v-if="errorMessageProjectDescription"
      ) {{ errorMessageProjectDescription }}
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
        @blur="validate(this.projeto.contractLink, 'setValidProjectContractLink', 'errorMessageProjectContractLink')"
        :class="errorMessageProjectContractLink ? 'required-field' : ''"
        :disabled="isToDisable"
		  )
      el-text.verify(
        v-if="errorMessageProjectContractLink"
      ) {{ errorMessageProjectContractLink }}
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Contato do cliente </label>
      el-input(
		  	placeholder="Contato do cliente"
		  	v-model="projeto.customer.contact"
        @blur="validate(this.projeto.customer.contact, 'setValidCustomerPhone', 'errorMessageCustomerPhone')"
		  	:class="errorMessageCustomerPhone ? 'required-field' : ''"
        v-mask="['(##)#####-####']"
        :disabled="isToDisable"
		  )
      el-text.verify(
        v-if="errorMessageCustomerPhone"
      ) {{ errorMessageCustomerPhone }}
    el-row
      el-divider(
        content-position="left"
      ) <label className="required"> Nome do cliente </label>
      el-input(
		  	placeholder="Nome do cliente"
		  	v-model="projeto.customer.name"
        @blur="validate(this.projeto.customer.name, 'setValidCustomerName', 'errorMessageCustomerName')"
        :class="errorMessageCustomerName ? 'required-field' : ''"
        :disabled="isToDisable"
		  )
      el-text.verify(
        v-if="errorMessageCustomerName"
      ) {{ errorMessageCustomerName }}
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
    validProjectName: {
      type: Boolean,
      required: false,
      default: false
    },
    validCustomerName: {
      type: Boolean,
      required: false,
      default: false
    },
    validCustomerPhone: {
      type: Boolean,
      required: false,
      default: false
    },
    validProjectContractLink: {
      type: Boolean,
      required: false,
      default: false
    },
    validProjectDescription: {
      type: Boolean,
      required: false,
      default: false
    },
    errorMessageName: String,
    errorMessageCustomerName: String,
    errorMessageCustomerPhone: String,
    errorMessageProjectContractLink: String,
    errorMessageProjectDescription:String
  },

  watch: {
    invalid: {
      immediate: false,
      handler(newValue) {
        if(newValue) {
          this.validate();
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
      errorMessageCustomerName: "",
      errorMessageCustomerPhone: "",
      errorMessageProjectContractLink: "",
      errorMessageProjectDescription: "",
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

    setFieldErrorMessage(errorMessageField, message) {
      this[errorMessageField] = message;
    },

    validate(field, setValidField, errorMessageField) {
      if(!field || field.trim().length == 0) {
        this.$emit(setValidField, false);
        this.setFieldErrorMessage(errorMessageField, "* Campo obrigatório");
      } else {
        this.$emit(setValidField, true);
        this.setFieldErrorMessage(errorMessageField, "");
      }
    },
  },

  computed: {
    isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"));
      },

      isToDisable() {
         return this.isVisualizar || !this.isLeadership;
      },
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

.date-pickers {
  display: flex;
  gap: 2%;
  margin-bottom: 1vh;
}

.message {
  margin-top: 10px;
}

.required-field {
   --el-border-color: #EB4C4F;
}

.required:after {
  content: " *";
  color: #EB4C4F;
}

.verify {
  color: #EB4C4F;
  margin-top: 5px;
  margin-left: 15px;
}
</style>
