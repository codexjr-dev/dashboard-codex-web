<template>
<div id="home">
  <div id="loginContainer">
    <div class="infoCard">
      <el-row id="title">
        <h2>Bem-vindo, empresário júnior</h2>
      </el-row>
      <el-row id="subtitle">
        <p>
          Por ter uma rotatividade de membros extremamente alta, a
          organização dos dados da empresa júnior se torna difícil de ser gerenciada com assertividade,
          pois em meio às várias planilhas e pastas muitas informações acabam se perdendo
          ou ficando muito “escondidas”. O problema se evidencia no momento da transição de diretorias,
          em que raramente tudo é passado para frente, pois nem mesmo os antigos diretores sabem onde estão
          alguns dados.
        </p>
      </el-row>
      <el-column id="buttons">
        <el-row>
          <el-button class="button" round size="large" @click="cadastrarEj()">Cadastrar EJ</el-button>
        </el-row>
        <el-row>
          <el-button class="button" round type="primary" size="large" @click="entrar()">Entrar</el-button>
        </el-row>
      </el-column>
    </div>
  </div>
</div>
</template>

<script>
import scriptModule from './Home.js';

export default {
  name: scriptModule.name,
  mounted: scriptModule.mounted,
  methods: scriptModule.methods,
}
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
