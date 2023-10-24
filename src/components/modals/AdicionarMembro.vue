<template lang="pug">
div.modal-content
   div.col
      el-row
         el-divider(
            content-position="left"
         ) Nome
         el-input(
            placeholder="Nome"
            v-model="membro.name"
            :disabled="isToDisable"
            )
      div.date-pickers
         el-row
            el-divider(
               content-position="left"
            ) Data de nascimento
            el-date-picker(
               placeholder="Data de nascimento"
               format="DD/MM/YYYY"
               value-format="YYYY-MM-DD"
               style="width: 100%"
               v-model="membro.birthDate"
               :disabled="isToDisable"
                  )
         el-row
            el-divider(
               content-position="left"
            ) Data de entrada
            el-date-picker(
               placeholder="Data de entrada"
               format="DD/MM/YYYY"
               value-format="YYYY-MM-DD"
               style="width: 100%"
               v-model="membro.entryDate"
               :disabled="isToDisable"
                  )
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
         ) Diretoria
         el-select(
            v-model="membro.department"
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
      el-row
         el-divider(
            content-position="left"
            ) Função
         el-select(
            v-model="membro.role"
            placeholder="Selecione a função"
            value-key="id"
            :disabled="isToDisable"
         )
            el-option(
               v-for="funcao in funcoes",
               :key="funcao.id",
               :label="funcao.value",
               :value="funcao.value"
            )

   div.col
      el-row
         el-divider(
            content-position="left"
         ) Email
         el-input(
            placeholder="Email"
            v-model="membro.email"
            :disabled="isToDisable"
            @blur="validateEmail"
            )
         el-text.error-email(
            v-if="errorEmailInUse || errorInvalidEmail"
         ) {{ errorEmailInUse || errorInvalidEmail }}
      el-row
         el-divider(
            content-position="left"
            ) Senha
         el-input(
            type="password"
            placeholder="Senha"
            v-model="membro.password"
            :disabled="isVisualizar"
         )
      el-row
         el-divider(
            content-position="left"
         ) Confirmar a senha
         el-input(
            type="password"
            placeholder="Confirmar a senha"
            v-model="membro.confirmPassword"
            @input="validatePassword"
            :disabled="isVisualizar"
         )
         el-text.verifyPassword(
            v-if="errorMessage"
         ) {{ errorMessage }}

      el-row
         el-divider(
            content-position="left"
         ) Telefone
         el-input(
            placeholder="Telefone"
            v-model="membro.phone"
            v-mask="['(##)#####-####']"
            :disabled="isToDisable"
            )
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
      errorInvalidEmail: String,
      errorEmailInUse: String,
   },

   data() {
      return {
         dados: [],
         errorInvalidEmail: "",
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

      validatePassword() {
         if (this.membro.password !== this.membro.confirmPassword) {
            this.errorMessage = 'As senhas não são iguais!';
            this.$emit("setValid", false);
         } else {
            this.errorMessage = '';
            this.$emit("setValid", true);
         }
      },
      validateEmail() {
         if (!this.membro.email) {
            this.errorInvalidEmail = 'O campo de email não pode estar vazio.';
         } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(this.membro.email)) {
               this.errorInvalidEmail = 'Formato de email inválido.';
            } else {
               this.errorInvalidEmail = '';
            }
         }
      },
   },

   computed: {
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      },

      isToDisable() {
         return this.isVisualizar || !this.isLeadership;
      }
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

.verifyPassword {
   color: red;
   margin-top: 5px;
   margin-left: 15px;
}

.error-email {
   color: red;
   margin-top: 5px;
   margin-left: 15px;
   font-size: 14px;
}
</style>
