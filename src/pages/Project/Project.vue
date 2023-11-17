<template>
    <div class="page">
        <div class="header">
            <p class="title"> {{ project.name }} </p>
            <el-button class="exit" type="danger" @click="handleClosePage" circle>
                <el-icon class="exitIcon"><Close /></el-icon>
            </el-button>
        </div>

        <div class="content">
            <div class="col">
                <p class="colTitle">Projeto</p>                   
                <el-card class="externCol">
                    <p class="rowTitle">Descrição</p>
                    <el-card class="projInfo">
                        <el-scrollbar height="80px">
                            <el-text class="desc">
                                {{ project.description }}
                            </el-text>
                        </el-scrollbar>
                    </el-card>

                    <p class="rowTitle">Datas</p>
                    <el-card class="projInfo">
                        <div class="lineFormat">
                            <el-text class="dateText">Data de início:</el-text>
                            <el-text class="dateFormat"> 
                                    {{ formatDate(project.startDate) }}
                            </el-text>
                        </div>

                        <div class="lineFormat" style="margin-top: 2%;">
                            <el-text class="dateText">Data de término:</el-text>
                            <el-text class="dateFormat">
                                    {{ formatDate(project.finishDate) }}
                            </el-text>
                        </div>
                    </el-card>

                    <p class="rowTitle">Tags</p>
                    <el-card class="projInfo">
                        
                    </el-card>
                </el-card>
            </div>

            <div class="col">
                <p class="colTitle">Time</p>
                <el-card class="externCol">

                </el-card>
            </div>

            <div class="col">
                <p class="colTitle">Cliente</p>
                <el-card class="externCol">
                    <el-text class="rowTitle">Nome</el-text>
                    <el-card class="projInfo">
                        <el-text class="desc">
                            {{ customer.name }}
                        </el-text>
                    </el-card>

                    <el-text class="rowTitle">Telefone</el-text>
                    <el-card class="projInfo">
                        <el-text class="custTel">
                            {{ customer.contact }}
                        </el-text>
                    </el-card>

                    <el-text class="rowTitle">Contrato</el-text>
                    <el-card class="projInfo">
                        <div class="lineFormat">
                            <el-text class="linkText">
                                {{ project.contractLink }}
                            </el-text>
                            <el-button class="copyButton" @click="copyLink">
                                <el-icon><CopyDocument /></el-icon>
                            </el-button>
                        </div>
                    </el-card>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import scriptModule from './Project.js'

    export default {
        name: scriptModule.name,
        mounted: scriptModule.mounted,
        data: scriptModule.data,
        methods: scriptModule.methods,
    }
</script>

<style lang="scss" scoped>
    @import './Project.scss';
</style>