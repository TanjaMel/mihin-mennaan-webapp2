<script setup>

import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import { capitalizeTitle } from '@/plugins/utils/projectFunctions'
import { useAppStore } from '@/plugins/store';


/*
  const route показывает нам нынешний путь на страницу "например localhost:3000/PlaceInside
  const router это сам роутер, с которым мы можем взаимодействовать изнутри компонента, что бы
    передвигать по ссылкам, а так же создаем внутри ссылки параметр
  const categoryData получает динамически дробленный массив данных из геттера getOpenPlaces
  const pageSize дефолтно определяет количество элементов на странице при отрисовке
  const currentPage содержит в себе нынещнюю страницу, которую мы можем динамически менять
 */
const route = useRoute()
const router = useRouter()
const store = useAppStore()
const categoryData = ref([...store.getDataByCategory(route.params.category)])
const currentPage = ref(1)
const pageSize = ref(12)

watch(route, () => {
  categoryData.value = store.getDataByCategory(route.params.category)
})


watch(currentPage, (newPage) => {
  /*
    Как только currentPage изменился (в пагинации например),
    мы обращаемся к router (навигация всего приложения) и
    пушим в него новое значение:
      path: route.path (путь не меняется, потому мы передаем просто сам путь)
      query: {page: newPage} (и прибавляем к пути параметр в ссылке, в данном случае он будет page=newPage

      был путь: http://localhost:3000/kategoriat/luontopolut

      стал путь: http://localhost:3000/kategoriat/luontopolut?page=2

      Это делается для того, что бы браузер записал и запомнил параметр page,
      что бы возвращаясь на страницу кнопкой (назад), после просмотра одного
      конкретного места, мы могли вернуть на ту страницу, на которой остановились
   */
  router.push({ path: route.path, query: { page: newPage }})
})



onMounted(async () => {

  /*
    При рендеринге (отрисовке) страницы, мы проверяем есть ли у нас дата в хранилище,
    если её там нету, то мы запрашиваем её с сервера через внутренний action - fetchData()
   */
  if(!store.getCategoriesDataAll.length) {
    await store.fetchData().then(() => {
      categoryData.value = store.getDataByCategory(route.params.category)
    });
  }

  /*
   Так же при рендеринге (отрисовке) мы проверяем на наличие параметра page в пути нашей страницы
   и если он там есть, мы сохраняем его в переменную currentPage.

   !Важно помнить что параметр всегда возвращается в типе данных string (текст)
   И его надо преобразовывать в number через встроенный метод parseInt()
   */
  if(route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
})


/*
  Функция вызываемая изнутри компонента v-pagination
  Срабатывает тогда, когда пользователь кликнул на стрелочку "вперед"
  В параметр event передается номер страницы внутри пагинации, послче чего
  он сохраняется в переменную currentPage
 */
const nextPage = (event) => {
  currentPage.value = event
}

/*
  Функция вызываемая изнутри компонента v-pagination
  Срабатывает тогда, когда пользователь кликнул на стрелочку "назад"
  В параметр event передается номер страницы внутри пагинации, послче чего
  он сохраняется в переменную currentPage
 */
const prevPage = (event) => {
  currentPage.value = event
}

</script>

<template>
  <v-container class="my-10 py-10">
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="1200"
    >
      <VRow>
        <VCardTitle>{{ capitalizeTitle(route.params.category) }}</VCardTitle>
      </VRow>
      <!--
         Проверяем всю VRow на наличие даны внутри переменной categoryData.
         Отрисовка html темплейта происходит быстрее чем получение данных с сервера,
         Если внутренние функции начнут отрисовку с данными которые "undefined"
         это сломает страницу и она не будет дальше грузиться
        -->
      <VRow
        v-if="categoryData.length"
        class="justify-space-around mx-2"
      >
        <!--
          Здесь мы делаем перебор VCol и каждый раз отрисовываем его и его содержимое,
          получая данные по итерации:
          v-for="(place, index) in categoryData[currentPage - 1]"

          place становится каждым элементов внутри categoryData[currentPage - 1]
          index иногда нужен для различия элементов по нему

          categoryData является массивом массивов = [[12][12][12]]
          то есть мы обращаемся уже к каждому конкретному массиву
          categoryData["динамический номер страницы" - 1]

          -1 делаем потому, что массив начинается с 0, а рендеринг пагинации с 1

          Таким образом мы говорим, что в 1 ячейку пагинации, мы грузим данные с 0 ячейки массива
        -->
        <VCol
          cols="12"
          md="3"
          v-for="(place, index) in categoryData[currentPage - 1]"
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
              <RouterLink :to="'/kategoriat/' + `${route.params.category}`.toLowerCase() + `/${place.name.toLowerCase()}`">
                <VBtn>Avaa</VBtn>
              </RouterLink>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
      <!--
        Сама пагинация:
          v-model="currentPage" - данный метод привязывает переменную currentPage к номеру страницы на пагинации
          Таким образом, если мы поменяем currentPage где то внутри кода, он поменяется и внутри пагинации

          Методы next & prev вызываются когда пользователь кликает на стрелочки, внутрь них передаётся всегда номер страницы (уже измененный).
          На самом деле, v-pagination умеет сам сохранять параметр в v-model="currentPage", по этому эти методы не обязательны. Их можно
          использовать например, когда ты хочешь сделать анимацию по краям экрана при передвижении. Или анимировать сами карточки при смене
          страницы.
          @next="nextPage($event)"
          @prev="prevPage($event)"

          Параметр :length указывают для отрисовки номеров страниц (сколько чанков, столько и страниц)
          :length="categoryData.length"
      -->
      <v-pagination
        class="mt-10"
        v-model="currentPage"
        @next="nextPage($event)"
        @prev="prevPage($event)"
        :length="categoryData.length"
      ></v-pagination>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
