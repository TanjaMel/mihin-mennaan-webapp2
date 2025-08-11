<script setup>
import {useRoute} from 'vue-router';


const route = useRoute()

</script>

<template>
  <v-container class="my-5">
    <v-responsive
        class="flex-row fill-height mx-auto"
        max-width="1200"
      >
      <VRow>
        <VCardTitle>Ota yhteyttä</VCardTitle>
      </VRow>
      <VRow class="justify-space-around mx-2 my-5">
          <VCol
            cols="12"
            md="3"
          >
            <VCard elevation="6"
                   class="pa-0 d-flex flex-column justify-space-between h-100"
                   dark
            >
              <v-img
                cover
                src="@/assets/contactUs/contactUs1.jpg"
                class="flex-grow-0"
              />
              <VCardText class="d-flex flex-column flex-grow-1 justify-start">
                123456789
                mihin_mennaan@gmail.com
              </VCardText>
            </VCard>
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <VCard elevation="6"
                   class="pa-0 d-flex flex-column justify-space-between h-100"
                   dark
            >
              <v-img
                cover
                src="@/assets/contactUs/contactUs2.jpg"
                class="flex-grow-0"
              />
              <VCardText class="d-flex flex-column flex-grow-1 justify-start">
                123456789
                roman@gmail.com
              </VCardText>
            </VCard>
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <VCard elevation="6"
                   class="pa-0 d-flex flex-column justify-space-between h-100"
                   dark
            >
              <v-img
                cover
                src="@/assets/contactUs/contactUs3.jpg"
                class="flex-grow-0"
              />
              <VCardText class="d-flex flex-column flex-grow-1 justify-start">
                0400264255
                tatyana_melnikova@hotmail.com
              </VCardText>
            </VCard>
          </VCol>
      </VRow>
    </v-responsive>
  </v-container>
</template>



<style scoped>

</style>
