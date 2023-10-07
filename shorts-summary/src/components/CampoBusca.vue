<template>
  <v-container class="campoBusca">
      <v-text-field
        id="form"
        v-model="urlInput"
        @submit.prevent="enviarParaBackend"
        @keydown.enter.prevent="enviarParaBackend"
        label="Insira a URL do Shorts"
        :rules="[youtubeShortsURL]"
        variant="outlined"
        base-color="purple-lighten-5"
        bg-color="#202024"
        dense
        clearable
        class="mt-5">
      </v-text-field>
      <v-tooltip text="Resumir Shorts">
        <template v-slot:activator="{ props }">
          <v-btn
          @click="enviarParaBackend"
          v-bind="props"
          icon="mdi-play-circle-outline"
          color="primary"
          class="d-flex">
          </v-btn>
        </template>
      </v-tooltip>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import logo from '../assets/logo.svg'
export default defineComponent({
  name: 'CampoBusca',
  data () {
    return {
      logo,
      urlInput: ''
    }
  },
  methods: {
    youtubeShortsURL: (v: string) => {
      const regex = new RegExp(
        '^(https?://)?(www\\.)?youtube\\.com/shorts/[A-Za-z0-9_-]+$'
      )
      return regex.test(v) || 'URL inválida'
    },
    enviarParaBackend() {
      const url = this.urlInput;
      this.$emit('enviar-url', url); // Emitir o evento com a URL
    },
  },
})
</script>
<style scoped>
.campoBusca {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 60%;
}
</style>