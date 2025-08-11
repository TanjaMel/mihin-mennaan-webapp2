<script setup>
import { useAppStore } from '@/plugins/store';
import {onMounted, ref} from 'vue'
import {capitalizeTitle} from '@/plugins/utils/projectFunctions';

const store = useAppStore()
const test = ref(store.getTestData())


onMounted(async () => {
  if(!store.getTestData?.length) {
    await store.getTestData().then(() => {
      test.value = store.getTestData
      });
  }
  })


</script>

<template>
  <v-container class="mt-12 pa-0">
    <v-responsive class="fill-height mx-auto" max-width="1200">

      <v-card class="pa-6 mx-auto" max-width="1200" outlined>
        <v-row class="align-center">
              <v-Col cols="12" md="6">
                <v-card-title class="text-h2">
                  Why us
                </v-card-title>
                <v-card-text class="text-h6">
                  Get a selection of the best places and activities suitable for your family.
                  From exciting outdoor adventures to cozy cafes and playgrounds—we have everything
                  to make your family day special.
                </v-card-text>
              </v-Col>

              <v-Col cols="12" md="6">
                <v-Row>
                  <v-Col cols="12" sm="6">
                    <v-card-title class="text-h6">
                    Everything in One Place:
                    </v-card-title>
                    <v-card-text class="text-h6">
                    Find all the best family-friendly spots and activities without endless searching.
                    </v-card-text>
                  </v-Col>
                  <v-Col cols="12" sm="6">
                      <v-card-title class="text-h6">
                      Daily Inspiration:
                      </v-card-title>
                      <v-card-text class="text-h6">
                      Fresh ideas every day to keep your family outings exciting and memorable.
                      </v-card-text>
                  </v-Col>
                  <v-Col cols="12" sm="6">
                    <v-card-title class="text-h6">
                    Safety Guaranteed:
                    </v-card-title>
                    <v-card-text class="text-h6">
                    Only trusted and safe options for worry-free family fun.
                    </v-card-text>
                  </v-Col>
                  <v-Col cols="12" sm="6">
                    <v-card-title class="text-h6">
                    Build Connections:
                    </v-card-title>
                    <v-card-text class="text-h6">
                    Meet new friends for your kids and connect with other parents along the way.
                    </v-card-text>
                  </v-Col>
                </v-Row>
              </v-Col>
            </v-Row>
          </v-card>
    </v-responsive>
  </v-container>

  <v-container class="pa-0 text-center">
    <v-responsive class="fill-height mx-auto" max-width="1200">
      <v-card style="width: 100%"
              elevation="5">
          <v-img
            content="cover"
            src="@/assets/aboutUs.jpg"
            class="mx-auto rounded-lg shadow-lg"
          />
      </v-card>
    </v-responsive>
  </v-container>


  <v-container class="pa-0 mt-n4">
    <v-responsive class="fill-height mx-auto" max-width="1200">
      <v-card class="pa-6 mx-auto" max-width="1200" outlined>

        <v-Row class="align-center">
          <v-Col cols="12" sm="6">
                <v-card-title class="text-h6">
                  COMMUNITY
                </v-card-title>
                <v-card-text class="text-h6">
                  Explore new places and unlock the chance to broaden your social circle!
                  Meet new friends for your children and connect with other parents who share your journey.
                  Discover a supportive community while creating lasting memories together!
              </v-card-text>
          </v-Col>
          <v-Col cols="12" sm="6">
                <v-card-title class="text-h6">
                  ADVENTURES
              </v-card-title>
              <v-card-text class="text-h6">
                  Discover exciting new places to create unforgettable memories with your child!
                  Enjoy quality time together while experiencing joy and positivity in every moment.
                  Let the adventures begin!
              </v-card-text>
          </v-Col>
          <v-divider class="my-6 mx-auto" thickness="3px" length="80%" color="grey"></v-divider>
          <v-Col cols="12" sm="6">
                <v-card-title class="text-h6">
                INSPIRATION
              </v-card-title>
              <v-card-text class="text-h6">
                Find fresh ideas for family outings and activities!
                Our project not only highlights exciting places but also offers creative suggestions to make every outing special.
                Inspire your family to explore, play, and bond in new ways!
              </v-card-text>
          </v-Col>
          <v-Col cols="12" sm="6">
                <v-card-title class="text-h6">
                CONVENIENCE
              </v-card-title>
              <v-card-text class="text-h6">
                Everything You Need in One Place! We’ve curated an extensive selection of amazing spots just for you.
                Planning your day has never been easier—let the adventure begin with ease and excitement!
              </v-card-text>
          </v-Col>
        </v-Row>
      </v-card>
    </v-responsive>
  </v-container>
</template>



<style scoped>

</style>
