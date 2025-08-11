
<script setup>
import {useRoute} from 'vue-router';

const route = useRoute()
const store = useAppStore()

</script>

<template>
<container>
  <v-responsive
    class="align-center fill-height mx-auto"
      max-width="1200">
      <h1>Why we</h1>
      <v-Row class="aling-center">
       <v-Col cols="12" md="6">
        <v-card-title class="text-h5">
          Why us
        </v-card-title>
        <v-card-text class="text-h6">
          Get a selection of the best places and activities suitable for your family.
          From exciting outdoor adventures to cozy cafes and playgrounds—we have everything
          to make your family day special.
        </v-card-text>
      </v-Col>



    <!-- Левая колонка с одним текстовым блоком -->
        <v-col cols="12" md="6">
          <div class="text-block">
          <h2>Заголовок</h2>
          <p>Текстовое описание...</p>
          </div>
        </v-col>




     </v-Row>
  </v-responsive>
</container>

</template>


<style scoped>

</style>
