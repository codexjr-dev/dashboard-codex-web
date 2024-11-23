<template>
    <div>
       <el-card>
          <el-table :data="dados" stripe>
             <el-table-column prop="name" label="Nome" :width="150"></el-table-column>
             <el-table-column prop="description" label="Descrição"></el-table-column>
             <el-table-column prop="team" label="Time" :formatter="formatList" :width="210">
                <template v-slot="scope">
                   <div v-for="(member, index) in scope.row.team" :key="index">
                      <div>{{ index + 1 }}) {{ member.name }}</div>
                   </div>
                </template>
             </el-table-column>
             <el-table-column prop="startDate" label="Data de início" :formatter="formatDate"
                :width="150"></el-table-column>
             <el-table-column label="Ações" align="right">
                <template v-slot="scope">
                   <div class="actions">
                      <div class="actions-button" v-if="isLeadership || isOnTeam(scope.row)"
                         @click="handleAddNews(scope.$index, scope.row)" :style="'background: #A8CDE8'">
                         <el-icon>
                            <Plus />
                         </el-icon>
                      </div>
                      <div class="actions-button" @click="handleViewNews(scope.$index, scope.row)"
                         :style="'background: #E8A8CE'">
                         <el-icon>
                            <List />
                         </el-icon>
                      </div>
                      <div class="actions-button" v-if="isLeadership" @click="handleEditProject(scope.$index, scope.row)"
                         :style="'background: #4b53c6'">
                         <el-icon>
                            <Edit />
                         </el-icon>
                      </div>
                      <div class="actions-button" @click="handleViewProject(scope.$index, scope.row)"
                         :style="'background: #67c23a'">
                         <el-icon>
                            <View />
                         </el-icon>
                      </div>
                      <div class="actions-button" v-if="isLeadership"
                         @click="handleDeleteProject(scope.$index, scope.row)" :style="'background: #e07c72'">
                         <el-icon>
                            <DeleteFilled />
                         </el-icon>
                      </div>
                   </div>
                </template>
             </el-table-column>
          </el-table>
       </el-card>
 
       <el-dialog center :before-close="closeModalWithoutRequest" :title="titleModal" @close="closeModal"
          v-model="showAddProjectModal" fullscreen="true">
          <adicionar-projeto :titleModal="titleModal" :isVisualizar="isVisualizar" :invalid="invalid"
             :projeto="novoProjeto" @setValidField="setValidField"></adicionar-projeto>
          <template v-slot:footer>
             <span class="dialog-footer">
                <el-button v-if="!isVisualizar" @click="isEditar ? editProject() : saveProject()" type="primary"
                   color="#4b53c6">
                   Salvar
                </el-button>
             </span>
          </template>
       </el-dialog>
 
       <el-dialog center :before-close="closeModalWithoutRequest" :title="titleModal" @close="closeModal"
          v-model="showAddNewsModal">
          <add-news-modal :titleModal="titleModal" :news="newsToBeCreated"></add-news-modal>
          <template v-slot:footer>
             <span class="dialog-footer">
                <el-button @click="saveNews()" type="primary" color="#4b53c6">
                   Salvar
                </el-button>
             </span>
          </template>
       </el-dialog>
    </div>
 </template>

<script>
    import scriptModule from './ProjectList.js'

    export default {
        name: scriptModule.name,
        mounted: scriptModule.mounted,
        data: scriptModule.data,
        methods: scriptModule.methods,
    }
</script>

<style lang="scss" scoped>
    @import './ProjectList.scss';
</style>