<template lang="pug">
div.modal-content
   div.col
      el-row
         el-divider(
            content-position="left"
         ) *Nome
         el-input(
            placeholder="Nome"
            v-model="membro.name"
            @blur="validateName"
            :class="errorMessageName ? 'required-field': ''"
            :disabled="isToDisable"
            )
         el-text.verify(
            v-if="errorMessageName"
         ) {{ errorMessageName }}
      div.date-pickers
         div.col
            el-divider(
               content-position="left"
            ) *Data de nascimento
            div(:class="errorMessageBirth ? 'required-field': ''")
               el-date-picker(
                  placeholder="Data de nascimento"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  v-model="membro.birthDate"
                  @blur="validateBirth"
                  :disabled="isToDisable"
               )
               div.message
                  el-text.verify(
                     v-if="errorMessageBirth"
                  ) {{ errorMessageBirth }}
         div.col
            el-divider(
               content-position="left"
            ) *Data de entrada
            div(:class="errorMessageEntry ? 'required-field': ''")
               el-date-picker(
                  placeholder="Data de entrada"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  v-model="membro.entryDate"
                  @blur="validateEntry"
                  :disabled="isToDisable"
               )
               div.message
                  el-text.verify(
                     v-if="errorMessageEntry"
                  ) {{ errorMessageEntry }}
      el-row
         el-divider(
            content-position="left"
         ) Habilidades
         el-select(
            multiple
            collapse-tags
            collapse-tags-tooltip
            v-model="membro.habilities"
            placeholder="Selecione habilidades"
            value-key="id"
            :disabled="isVisualizar"
         )
            el-option(
               v-for="habilidade in habilidades",
               :key="habilidade.id",
               :label="habilidade.value",
               :value="habilidade.value"
            )
      el-row
         el-divider(
            content-position="left"
         ) *Diretoria
         el-select(
            v-model="membro.department"
            @blur="validateDepartament"
            :class="errorMessageDepartament ? 'required-field': ''"
            placeholder="Selecione a diretoria"
            value-key="id"
            :disabled="isToDisable"
         )
            el-option(
               v-for="diretoria in diretorias",
               :key="diretoria.id",
               :label="diretoria.value",
               :value="diretoria.value"
            )
         el-text.verify(
            v-if="errorMessageDepartament"
         ) {{ errorMessageDepartament }}
      el-row
         el-divider(
            content-position="left"
            ) Cargos
         el-select(
            v-model="membro.role"
            @blur="validateRole"
            :class="errorMessageRole ? 'required-field': ''"
            placeholder="Selecione o cargo"
            value-key="id"
            :disabled="isToDisable"
         )
            el-option(
               v-for="funcao in funcoes",
               :key="funcao.id",
               :label="funcao.value",
               :value="funcao.value"
            )
         el-text.verify(
            v-if="errorMessageRole"
         ) {{ errorMessageRole }}

   div.col
      el-row
         el-divider(
            content-position="left"
         ) *Email
         el-input(
            placeholder="Email"
            v-model="membro.email"
            :disabled="isToDisable"
            @blur="validateEmail"
            :class="errorEmailInUse || errorInvalidEmail ? 'required-field': ''"
            )
         el-text.error-email(
            v-if="errorEmailInUse || errorInvalidEmail"
         ) {{ errorEmailInUse || errorInvalidEmail }}
      el-row
         el-divider(
            content-position="left"
            ) *Senha
         el-input(
            type="password"
            placeholder="Senha"
            v-model="membro.password"
            @blur="validatePasswordEmpty"
            :class="errorMessagePassword ? 'required-field': ''"
            @input="validatePassword"
            :disabled="isVisualizar"
         )
         el-text.verify(
            v-if="errorMessagePassword"
         ) {{ errorMessagePassword }}
      el-row
         el-divider(
            content-position="left"
         ) *Confirmar a senha
         el-input(
            type="password"
            placeholder="Confirmar a senha"
            v-model="membro.confirmPassword"
            @blur="validateConfirmPassword"
            :class="errorMessage ? 'required-field': ''"
            @input="validatePassword"
            :disabled="isVisualizar"
         )
         el-text.verify(
            v-if="errorMessage"
         ) {{ errorMessage }}

      el-row
         el-divider(
            content-position="left"
         ) *Telefone
         el-input(
            placeholder="Telefone"
            v-model="membro.phone"
            @blur="validatePhone"
            :class="errorMessagePhone ? 'required-field': ''"
            v-mask="['(##)#####-####']"
            :disabled="isToDisable"
            )
         el-text.verify(
            v-if="errorMessagePhone"
         ) {{ errorMessagePhone }}
      el-row
         el-divider(
            content-position="left"
         ) Observações
         el-input(
            v-model="membro.observations"
            type="textarea"
            placeholder="Observações"
            :disabled="isToDisable"
            )
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
   name: 'AdicionarMembro',

   props: {
      membro: {
         type: Object,
         required: true,
      },
      isVisualizar: {
         type: Boolean,
         required: false,
         default: false
      },
      invalid: {
         type: Boolean,
         required: false,
         default: false
      },
      errorInvalidEmail: String,
      errorEmailInUse: String,
      errorMessageName: String,
      errorMessageBirth: String,
      errorMessageEntry: String,
      errorMessageDepartament: String,
      errorMessageRole: String,
      errorMessagePassword: String,
      errorMessage: String,
      errorMessagePhone: String
   },

   watch: {
      invalid: {
         immediate: false,

         handler(newValue) {
            if(newValue) {
               this.validateName();
               this.validateBirth();
               this.validateEntry();
               this.validateDepartament();
               this.validateRole();
               this.validateEmail();
               this.validatePasswordEmpty();
               this.validateConfirmPassword();
               this.validatePhone();
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
         errorInvalidEmail: "",
         errorMessageName: "",
         errorMessageBirth: "",
         errorMessageEntry: "",
         errorMessageDepartament: "",
         errorMessageRole: "",
         errorMessagePassword: "",
         errorMessage: "",
         errorMessagePhone: "",
         habilidades: [
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
            },
            {
               id: 7,
               value: 'Comunicação',
            },
            {
               id: 8,
               value: 'Gestão de Projetos',
            },
            {
               id: 9,
               value: 'Gestão de Pessoas',
            },
            {
               id: 10,
               value: 'Negociação',
            },
            {
               id: 11,
               value: 'Documentação',
            }
         ],

         diretorias: [
            {
               id: 1,
               value: 'Presidência',
            },
            {
               id: 2,
               value: 'Gente & Gestão',
            },
            {
               id: 3,
               value: 'Negócios',
            },
            {
               id: 4,
               value: 'Marketing',
            },
            {
               id: 5,
               value: 'Qualidade',
            },
            {
               id: 6,
               value: 'Projetos',
            },
         ],

         funcoes: [
            {
               id: 1,
               value: 'Presidente',
            },
            {
               id: 2,
               value: 'Diretor(a)',
            },
            {
               id: 3,
               value: 'Assessor(a)'
            },
            {
               id: 4,
               value: 'Conselheiro(a)'
            },
            {
               id: 5,
               value: 'Pós-Júnior'
            },
            {
               id: 6,
               value: 'Guardiã(o)'
            },
            {
               id: 7,
               value: 'Trainee'
            },
            {
               id: 8,
               value: 'Ex-Trainee'
            },
         ],
      }
   },

   methods: {
      ...mapActions({
         findById: 'findById',
      }),

      validateEmail() {
         if (!this.membro.email) {
            this.errorInvalidEmail = 'O campo de email não pode estar vazio.';
            this.$emit("setValidEmail", false);
         } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(this.membro.email)) {
               this.errorInvalidEmail = 'Formato de email inválido.';
               this.$emit("setValidEmail", false);
            } else {
               this.errorInvalidEmail = '';
               this.$emit("setValidEmail", true);
            }
         }
      },
      
      validateName() {
         if(!this.membro.name || this.membro.name.trim().length === 0) {
            this.errorMessageName = '*Campo obrigatório';
            this.$emit("setValidName", false);
         } else {
            this.errorMessageName = '';
            this.$emit("setValidName", true);
         }
      },

      validateBirth() {
         if(!this.membro.birthDate) {
            this.errorMessageBirth = '*Campo obrigatório';
            this.$emit("setValidBirth", false);
         } else {
            this.errorMessageBirth = '';
            this.$emit("setValidBirth", true);
         }
      },

      validateEntry() {
         if(!this.membro.entryDate) {
            this.errorMessageEntry = '*Campo obrigatório';
            this.$emit("setValidEntry", false);
         } else {
            this.errorMessageEntry = '';
            this.$emit("setValidEntry", true);
         }
      },

      validateDepartament() {
         if(!(['Presidência', 'Gente & Gestão', 'Marketing', 'Negócios', 
      'Projetos', 'Qualidade'].includes(this.membro.department))) {
            this.errorMessageDepartament = '*Campo obrigatório';
            this.$emit("setValidDepartament", false);
         } else {
            this.errorMessageDepartament = '';
            this.$emit("setValidDepartament", true);
         }
      },

      validateRole() {
         if(!['Presidente','Diretor(a)','Assessor(a)','Conselheiro(a)','Pós-Júnior',
         'Guardiã(o)','Trainee','Ex-Trainee'].includes(this.membro.role)) {
            this.errorMessageRole = '*Campo obrigatório';
            this.$emit("setValidRole", false);
         } else {
            this.errorMessageRole = '';
            this.$emit("setValidRole", true);
         }
      },

      validatePasswordEmpty() {
         if(!this.membro.password || this.membro.password.trim().length === 0) {
            this.errorMessagePassword = '*Campo obrigatório';
            this.$emit("setValidPassword", false);
         } else {
            this.errorMessagePassword = '';
            this.$emit("setValidPassword", true);
         }
      },

      validateConfirmPassword() {
         if(!this.membro.confirmPassword || this.membro.confirmPassword.trim().length === 0) {
            this.errorMessage = '*Campo obrigatório';
            this.$emit("setValidConfirm", false);
         } else {
            this.errorMessage = '';
            this.$emit("setValidConfirm", true);
         }
      },

      validatePhone() {
         if(!this.membro.phone || this.membro.phone.trim().length === 0) {
            this.errorMessagePhone = '*Campo obrigatório';
            this.$emit("setValidPhone", false);
         } else {
            this.errorMessagePhone = '';
            this.$emit("setValidPhone", true);
         }
      },
   },

   computed: {
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      },

      isToDisable() {
         return this.isVisualizar || !this.isLeadership;
      },

      validatePassword() {
         if (this.membro.password !== this.membro.confirmPassword) {
            this.errorMessage = 'As senhas não são iguais!';
            this.$emit("setValid", false);
         } else {
            this.errorMessage = '';
            this.$emit("setValid", true);
         }
      }
   },
}

</script>

<style lang="scss" scoped>
.required-field {
   --el-border-color: red;
}
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
.verify {
   color: red;
   margin-top: 2px;
   margin-left: 15px;
}

.error-email {
   color: red;
   margin-top: 5px;
   margin-left: 15px;
   font-size: 14px;
}
</style>
