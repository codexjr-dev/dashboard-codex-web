<template>
    <div class="page">
        <div class="header">
            <p class="title"> {{ title }} </p>
            <el-button class="exit" type="danger" @click="handleClosePage" circle>
                <el-icon class="exitIcon"><Close /></el-icon>
            </el-button>
        </div>

        <div class="content">
            <div class="col">
                <p class="colTitle">Projeto</p>                   
                <el-card class="externCol">
                    <el-card class="projDesc">
                        <el-text class="desc">
                            {{ description }}
                        </el-text>
                    </el-card>

                    <el-card>
                        
                    </el-card>

                    <el-card>
                        
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