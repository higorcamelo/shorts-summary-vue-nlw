<template>
  <v-app>
    <v-main>
      <CampoBusca/>
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
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}
</style>