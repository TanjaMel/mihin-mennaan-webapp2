<script setup>
import {ref} from 'vue';
import { capitalizeTitle, deleteLine } from '@/plugins/utils/projectFunctions';
import mainPageImgLeft from '../assets/mainPage_left.jpg'

/*
`@/assets/category${capitalizeTitle(props.carouselSettings.title)}.jpg`
 */

const props = defineProps(['carouselSettings'])
const data = ref(
  props.carouselSettings.data.sort((a,b) => {
    return new Date(b.createdTimestamp.seconds) - new Date(a.createdTimestamp.seconds);
  }).slice(0, 3)
)


const imgUrl = new URL(`/src/assets/category${capitalizeTitle(deleteLine(props.carouselSettings.title))}.jpg`, import.meta.url)
</script>

<template>
  <v-item-group
    selected-class="bg-primary"
  >
    <VCardText class="mb-0 pb-0 d-flex flex-row">
      <VCardTitle class="text-h4">{{capitalizeTitle(props.carouselSettings.title)}}</VCardTitle>
      <RouterLink :to="'/kategoriat/' + `${props.carouselSettings.url}`.toLowerCase()">
        <VCardTitle class="text-h6 align-content-end cursor-pointer" style="color: #176FF2">Näytä kaikki</VCardTitle>
      </RouterLink>
    </VCardText>
    <v-container class="pa-1">
      <VRow
        class="justify-space-between mt-5"
      >
        <VCol
          v-for="place in data"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ isSelected, selectedClass, toggle }">
            <v-card
              elevation="6"
              class="pa-0 gradient_on_card"
              height="200"
              dark
              @click="toggle"
            >
              <img
                :src="imgUrl"
                class="h-100 w-100 pa-0 imgClass"
              />
              <VCol cols="12" class="h-100 pl-5 pt-5 justify-start align-start textOnTopOfImg">
                <p class="titleCardText">
                  {{place.name}}
                </p>
                <p class="titleCardSubtitle">
                  {{place.area + ', ' + place.city}}
                </p>
              </VCol>
            </v-card>
          </v-item>
        </VCol>
      </VRow>
    </v-container>
  </v-item-group>
</template>


<style scoped>
.imgClass {
  position: absolute;
  z-index: 0;
  box-shadow: 10px 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%)
}
.textOnTopOfImg {
  position: relative;
  z-index: 99;
  backgroup-color: black;
}
.titleCardText {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  text-wrap: wrap;
}
.titleCardSubtitle {
  font-weight: 500;
  font-size: 1.1rem;
  color: white;
  text-wrap: wrap;
}
</style>
