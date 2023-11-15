<template>
    <div class="page">
        <div class="header">
            <p class="title"> {{ title }} </p>
            <el-button class="exit" type="danger" @click="handleClosePage" :icon="CircleClose" circle />
        </div>
    </div>
</template>

<script>
    import scriptModule from './Project.js'

    export default {
        name: scriptModule.name,
        mounted: scriptModule.mounted,
        methods: scriptModule.methods,
    }
</script>

<style lang="scss" scoped>
    @import './Project.scss';
</style>