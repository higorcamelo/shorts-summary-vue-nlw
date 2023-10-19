<template>
  <v-app>
    <v-main class="main-container">
      <v-container class="titulo text-center align-center">
        <v-img
          src="./src/assets/play.svg"
          width="128"
          max-width="300"
          max-height="300"
          alt="Ícone de Play"
        ></v-img>
        <h1 class="content">Shorts Summary</h1>
      </v-container>
      <CampoBusca @enviar-url="receberURL" />
      <h2 class="summary-title">Resumo</h2>
      <div class="summary-text-container">
        <h3 :class="getTextStyle(selectedShortText)" class="text-resumo">{{ selectedShortText }}</h3>
      </div>
    </v-main>
  </v-app>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import CampoBusca from './components/CampoBusca.vue'
import { parseURL } from './components/CampoBuscaHandler.ts'
import { selectedShortText } from './components/CampoBuscaHandler.ts'

export default defineComponent({
  name: 'App',

  components: {
    CampoBusca,
  },

  data() {
    return {
      selectedShortText
    }
  },
  methods: {
    async receberURL(url: string) {
      try {
        await parseURL(url)
      } catch (error) {
        console.error(error)
        selectedShortText.value = 'Erro ao obter informações do vídeo'
      }
    },
    getTextStyle(text: string) {
      if (text === 'Escolha um Short para resumir') {
        return 'select-short'
      } else {
        return 'custom-style'
      }
    }
  }
})
</script>

<style scoped>
/* Estilos globais */
.main-container {
  background-color: #1E1E1E;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

/* Estilos específicos do componente */
.titulo {
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

.summary-title {
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

.custom-style {
  text-align: justify;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: aliceblue;
  user-select: text;
}

.text-resumo {
  white-space: pre-line;
}

.summary-text-container {
  max-width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>