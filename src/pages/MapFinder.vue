<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import {ref} from 'vue';
const center = ref({ lat: 60.19452390079231, lng: 24.93359032861102 })

const searchInput = ref('')


</script>

<template>
  <v-container class="mt-10">
    <v-responsive>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <GoogleMap
            api-key="AIzaSyDkRyWYRwJ-bQYSCPneXrvirFNdNjFs-nQ"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="11"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VCardText>
            <VTextField
              v-model="searchInput"
            />
          </VCardText>
        </VCol>
      </VRow>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
