<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import { useAppStore } from '@/plugins/store';

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const locations = ref([...store.getCloseData])
const pageSize = ref(12)
const currentPage = ref(1)

watch(currentPage, (newPage) => {
  router.push({ path: route.path, query: { page: newPage }})
})

onMounted( async () => {
  if(!store.getCategoriesDataAll.length) {
    await store.fetchData().then(() => {
      locations.value = store.getCloseData
      console.log(locations.value)
    });
  }

  if(route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
})

const nextPage = (event) => {
  currentPage.value = event
}
const prevPage = (event) => {
  currentPage.value = event
}
</script>

<template>
  <v-container class="my-5 pv-5">
    <v-responsive
    class="align-center fill-height mx-auto"
    max-width="1200"
    >
      <VRow>
        <VCardTitle>Ulkoaktiviteetit {{currentPage}}</VCardTitle>
      </VRow>
      <VRow
        v-if="locations.length"
        class="justify-space-around mx-2"
      >
        <VCol
        cols="12"
        md="3"
        v-for="(place, index) in locations[currentPage - 1]"
        >
          <VCard
            elevation="6"
            class="pa-0 d-flex flex-column justify-space-between h-100"
            dark
          >
            <v-img
              cover
              src="@/assets/background.jpg"
              class="flex-grow-0"
            />
            <VCardText
              class="d-flex flex-column flex-grow-1 justify-start"
            >
              {{place.name}}
            </VCardText>
            <VCardActions class="flex-grow-0 align-end justify-end">
              <RouterLink :to="'/kategoriat' + `${place.category}`.toLowerCase() + `/${place.name.toLowerCase()}`">
                <VBtn>Avaa</VBtn>
              </RouterLink>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
      <v-pagination
        class="mt-10"
        v-model="currentPage"
        @next="nextPage($event)"
        @prev="prevPage($event)"
        :length="locations.length"
      ></v-pagination>
    </v-responsive>
  </v-container>
</template>


<style scoped>

</style>
