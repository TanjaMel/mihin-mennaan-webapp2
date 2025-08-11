<script setup>
import {useRoute} from 'vue-router';
import {useAppStore} from '@/plugins/store';
import {onMounted, ref, watch} from 'vue';
import placeAtenium from '@/assets/placeAteneum.jpg'

const route = useRoute()
const store = useAppStore()
//мы вытаскиваем весь массив и фильтруем его по елементу с названием соответствующим названию в ссылке

/*
1) Вызываем геттер который выдаст объект с ключами "name" и "data"
2) После получения объекта, мы обращаемся по ключу к массиву "data"
3) Вызываем у этого массива метов filter
4) Фильтр перебирает все элементы внутри массива, и проверяет сходство имени в элементе массива
с указанным route.params.place
5) Получаем отфильтрованный массив с 1 элементов внутри
6) Обращаемся к [0] элементу этого массива и сохраняем его в переменную data.value
7) Таким образом мы в переменную получаем объект, к которому уже можно обращаться внутри компонента

store.getDataByCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0]
 */
const data = ref()
const openHours = ref()

watch(route, () => {
  data.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0]
  openHours.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0].openHours
})

onMounted(async () => {
  if(!store.getCategoriesDataAll.length) {
    await store.fetchData().then(() => {
      data.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0]
      openHours.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0].openHours
    });
  } else {
    data.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0]
    openHours.value = store.getCurrentCategory(route.params.category).data.filter((el) => el.name.toLowerCase() === route.params.place)[0].openHours
  }
})


//Вызов кстомной функции которая при рендеринге листа преобразует и переводит дни недели, также сортирует его по порядку
const parseOpenHours = () => {
  //Получаем в переменную Кейс все ключи из объекта openHours, ключи это дни недели на англ
  const keys = Object.keys(openHours.value)
  //Создаем массик который будем возвращать назад в рендерящийся компонент
  let array = []
  //Создаем объект с переводом слов с англ на финский
  const translate = {
    monday: 'Maanantai',
    tuesday: 'Tiistai',
    wednesday: 'Keskiviikko',
    thursday: 'Torstai',
    friday: 'Perjantai',
    saturday: 'Lauantai',
    sunday: 'Sunnuntai'
  }
  //Создаем объект с порядком дней недели
  const sorter = {
    'Maanantai': 1,
    'Tiistai': 2,
    'Keskiviikko': 3,
    'Torstai': 4,
    'Perjantai': 5,
    'Lauantai': 6,
    'Sunnuntai': 7
  }

  //Перебираем выжимку ключей из openHours
  for(let i = 0; i < keys.length; i++) {
    //На лету создаем кастомный объект с ключём day и hours
    let obj = {
      //обращаемся к объекту translate, по перебранному ключу из списка [keys[i]]
      //выходе перебора получаем значение из объекта translate по ключу ['maanantai'] !!! с маленькой буквы для совпадения
      day: translate[keys[i].toLowerCase()],
      //В часы просто записываем часы нужного нам дня
      hours: openHours.value[keys[i]]
    }

    //записываем кастомный объект в список
    array.push(obj)
  }

  //На списке вызываем встроенный метод sort
  //Метод сорт перебирает через лууп все элементы массива
  //За раз он берет 2 элемента и сравнивает их, по логике а-б
  //Меньшее или большее (зависит от а-б или б-а) значение он ставит в начало списка
  //Перебором через все элементы он ставит самое маленькое вперед, большое назад
  array.sort((a, b) => {
    let day1 = a.day
    let day2 = b.day
    //тут мы по ключу (наш день на финском) обращаемся к объекту sorter
    //и вызываем его значение (1-7), если osorter[day1] будет меньше чем sorter[day2]
    //то программа ПОМЕНЯЕТ МЕСТАМИ ЭЛЕМЕНТЫ А И Б в нашем основном массиве, а не в сортере
    //сортер это абстракция сравнения
    return sorter[day1] - sorter[day2]
  })

  //Возвращаем измененный и переименованный массив
  return array
}


</script>

<template>
 <v-container>
   <v-responsive
     class="align-center  fill-height mx-auto"
     max-width="1200"
   >
     <h1>{{route.params.place}}</h1>
     {{data}}

   <VRow class="justify-space-between mt-10">
     <VCol
       cols="12"
       md="6"
     >
       <v-card
       style="width: 100%"
       :elevation="5"
       >
         <v-img
           content="cover"
           :src="placeAtenium"
           class="justify-center align-center text-center"
          />
       </v-card>
     </VCol>
     <VCol
       cols="12"
       md="6"
       v-if="openHours"
     >
       <v-card>
         <v-card-title>
           <div>
             <p class="text-h4 rounded-6">
               Avoina
             </p>
             <ul>
               <li
                v-for="(weekday, index) in parseOpenHours()"
               >
                 {{weekday.day}} : {{weekday.hours}}
               </li>
             </ul>
           </div>
         </v-card-title>

       </v-card>

     </VCol>
   </VRow>
   </v-responsive>

 </v-container>
</template>

<style scoped>

</style>
