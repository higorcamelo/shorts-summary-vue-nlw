<template>
  <v-app>
    <v-main class="main-container">
      <v-container class="titulo text-center align-center">
        <v-img
          src="./src/assets/play.svg"
          width="128"
          max-width="300"
          max-height="300">
        </v-img>
        <h1 class="content">Shorts Summary</h1>
      </v-container>
      <CampoBusca/>
      <h2 class="text-resumo">Resumo</h2>
      <p class="select-short">Escolha um Short para resumir</p>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CampoBusca from './components/CampoBusca.vue'

export default defineComponent({
  name: 'App',

  components: {
    CampoBusca,
  },

  data () {
    return {
      //
    }
  },
})
</script>
<style scoped>
.main-container {
  background-color: #1E1E1E;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.titulo{
  display: flex;
  flex-direction: column;
}

.content {
  font-family: 'Roboto', sans-serif;
  margin-top: -5;
  margin: 0;
  padding: 0;
  color: #996fff;
}
.text-resumo {
  text-align: justify;
  color: aliceblue;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin-top: 90px;
}
.select-short {
  text-align: justify;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #7c7c8a;
  user-select: none;
}
</style>
