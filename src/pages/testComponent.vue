<script setup>
import { useAppStore } from '@/plugins/store';
import {onMounted, ref} from 'vue'
import {capitalizeTitle} from '@/plugins/utils/projectFunctions';

const store = useAppStore()
const test = ref(store.getTestData())

//Задание! Отрендерить все названия категорий с сылками на них в SingleCategoryPage
/*
Выглядеть рендер должен так

1) Museot
2) Leikkipuistot
....
....
....

 */
onMounted(async () => {
  if(!store.getTestData?.length) {
    await store.getTestData().then(() => {
      test.value = store.getTestData
      });
  }
  })


</script>

<template>
  <v-container>
    <ul>
      <RouterLink
        v-for="category in test"
        :to="'/kategoriat/' + `${category}`.toLowerCase()"
      >
      <li></li>
        {{ capitalizeTitle(category) }}
        </RouterLink>
    </ul>

  </v-container>
</template>

<style scoped>

</style>
