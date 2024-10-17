
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
            Hei! Olemme Roma ja Tanya - 2 älykkään pojan vanhempia.
            Äitiyslomalla mietimme paljon, minne mennään lasten kanssa, koska on tylsää olla koko ajan kotona.
            Aloitimme Suomen tutkimisen uusilta puolilta, minkä päätimme jakaa!
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
