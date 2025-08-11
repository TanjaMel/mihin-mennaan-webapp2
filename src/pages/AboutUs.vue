
<script setup>
import {useRoute} from 'vue-router';
import {useAppStore} from '@/plugins/store';

const route = useRoute()
const store = useAppStore()
</script>

<template>
  <v-container class="my-5">
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="1200">
      <h1>Meistä</h1>

      <VRow class="align-center">
        <VCol
          cols="12"
          md="6"
        >
          <v-card-text class="text-h6">
            Hi! We’re Roma and Tanja, proud parents of two active boys. During parental leave, we’ve been reflecting on where to take the kids, as staying home can get pretty dull. We’ve started exploring Finland from new perspectives, including playgrounds and just interesting places, and we’re excited to share our adventures!
          </v-card-text>
        </VCol>
        <VCol
        cols="12"
        md="6"
        >
          <v-card
          style="width: 100%"
          elevation="5"
          >
            <v-img
          content="cover"
          src="@/assets/aboutUs.jpg"
          class="align-content-end"
            />

          </v-card>

        </VCol>
      </VRow>
    </v-responsive>
  </v-container>
</template>



<style scoped>

</style>
