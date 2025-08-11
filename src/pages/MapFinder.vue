<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import {onMounted, ref} from 'vue';
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import {useAppStore} from '@/plugins/store';

const store = useAppStore()
const center = ref({ lat: 60.19452390079231, lng: 24.93359032861102 })
const searchInput = ref('')
const map_api = ref('')


onMounted(async () => {
  if(!store.map_api) {
    await store.fetchMapApi().then(() => {
      map_api.value = store.getMapConfig
    });
  } else {
    map_api.value = store.getMapConfig
  }

  console.log(map_api.value)
})
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
            :api-key="map_api"
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
