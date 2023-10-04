<template>
  <v-app>
    <v-main class="main-container">
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
.main-container {
  background-color: #1E1E1E;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.content {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;

}
</style>
