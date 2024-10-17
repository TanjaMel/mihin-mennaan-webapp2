<script setup>
import HeaderLogo from '../assets/logo1.png'
import{onMounted, ref} from 'vue';
import {useAppStore} from '@/plugins/store';
import {capitalizeTitle} from '@/plugins/utils/projectFunctions';

const store = useAppStore()
const categories = ref(store.getCategories)

onMounted(async () => {
  if(!store.getCategories?.length) {
    await store.fetchSettings().then(() => {
      categories.value = store.getCategories
    });
  }
})

</script>

<template>
  <section>
    <VRow
      class="d-flex justify-space-around align-center text-center custom_header"
    >
      <VCol cols="4">
        <v-btn to="/" variant="plain">
          Etusivu
        </v-btn>
        <v-btn to="/meista" variant="plain">
          Meistä
        </v-btn>
        <v-btn to="/test" variant="plain">
          Test
        </v-btn>
        <v-btn to="/ota-yhteytta" variant="plain">
          Ota yhteyttä
        </v-btn>
      </VCol>
      <VCol cols="4">
        <RouterLink
          to="/"
        >
            <VImg
              class="mx-auto mt-5"
              max-width="200"
              :src="HeaderLogo"
             />
        </RouterLink>
      </VCol>
      <VCol cols="4">
        <v-text-field
          class="w-50"
          label="Etsi..."
          single-line="true"
          prepend-icon="mdi-magnify"
          variant="underlined"
        ></v-text-field>
      </VCol>
    </VRow>

    <VRow class="justify-center align-center mt-10">
      <VCard
        class="justify-space-around"
        elevation="5"
        max-width="1150"
      >
        <RouterLink
          v-for="category in categories"
          :to="'/kategoriat/' + `${category}`.toLowerCase()"
        >
          <VBtn
            variant="plain"
          >
            {{ capitalizeTitle(category) }}
          </VBtn>
        </RouterLink>
        <RouterLink
          :to="'/kartta'"
        >
          <VBtn
            variant="plain"
          >
            kartta
          </VBtn>
        </RouterLink>
      </VCard>
    </VRow>
  </section>
</template>


<style scoped>
.custom_header {
  background-color: #3ba6ff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

</style>
