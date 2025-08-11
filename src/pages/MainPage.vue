<script setup>
import mainPageImgLeft from '../assets/mainPage_left.jpg'
import mainPageImgRight from '../assets/mainPage_right.jpg'
import {onMounted, ref} from 'vue';
import { useAppStore } from '@/plugins/store';
import {read, utils} from 'xlsx'

//Firebase methods
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";

const store = useAppStore()
const excelFile = ref('')
const categories = ref([])

const onChange = (event) => {
  let files = event.target.files, f = files[0]
  let reader = new FileReader()
  let categoryRaw;
  reader.onload = async function(event) {
    let data = new Uint8Array(event.target.result);
    let workbook = read(data, {type: "array"});
    let sheetAreaTable = workbook.SheetNames[11]
    let worksheetAreaTable = workbook.Sheets[sheetAreaTable]
    categoryRaw = utils.sheet_to_json(worksheetAreaTable)
    await saveToDataBase(categoryRaw)
  }
  reader.readAsArrayBuffer(f)
}

const saveToDataBase = async (categoryRaw) => {
  const db = getFirestore();
  for (let i = 0; i < categoryRaw.length; i++) {
    const areaObject = {
      name: categoryRaw[i].Nimi ?? '',
      address: categoryRaw[i].Osoite ?? '',
      area: categoryRaw[i].Alue ?? '',
      postcode: categoryRaw[i].Postinumero ?? '',
      city: categoryRaw[i].Kunta ?? '',
      website: categoryRaw[i].Nettisivu ?? '',
      openHours: {
        Monday: categoryRaw[i].Ma ?? '',
        Tuesday: categoryRaw[i].Ti ?? '',
        Wednesday: categoryRaw[i].Ke ?? '',
        Thursday: categoryRaw[i].To ?? '',
        Friday: categoryRaw[i].Pe ?? '',
        Saturday: categoryRaw[i].La ?? '',
        Sunday: categoryRaw[i].Su ?? ''
      },
      typeOf: categoryRaw[i].Tyyppi ?? '',
      outside: categoryRaw[i].Outside ?? '',
      payment: categoryRaw[i].Payment ?? '',
      description: '',
      createdTimestamp: new Date(),
      updatedTimestamp: new Date()
    }

    await addDoc(collection(db, "avoin_kohtaamispaikat"), areaObject);
  }
}

onMounted(async () => {
  if(!store.getCategoriesDataAll.length) {
    await store.fetchData().then(() => {
      categories.value = store.getCategoriesDataAll
    });
  } else {
    categories.value = store.getCategoriesDataAll
  }
})

</script>

<template>
  <v-container class="py-5">
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="1200"
    >
      <VRow class="justify-space-between mt-10">
        <!-- Outdoor Activities -->
        <VCol cols="12" md="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              style="width: 100%"
              :class="{ 'on-hover': isHovering }"
              :elevation="5"
              v-bind="props"
            >
              <v-img content="cover" :src="mainPageImgLeft" class="justify-center align-center text-center">
                <v-card-title class="text-black">
                  <div class="w-60 mx-auto justify-center text-center align-center align-content-center">
                    <RouterLink to="/ulkoaktiviteetit">
                      <p
                        :style="isHovering ? 'background-color: rgb(255,215,45,50%); color: #1e2a38;' : 'background-color: rgb(255,255,255,50%); color: #1e2a38;'"
                        class="text-h4 rounded-6 button-style"
                      >
                        Ulkoaktiviteetit
                      </p>
                    </RouterLink>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </VCol>

        <!-- Indoor Activities -->
        <VCol cols="12" md="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              style="width: 100%"
              :class="{ 'on-hover': isHovering }"
              :elevation="5"
              v-bind="props"
            >
              <v-img :src="mainPageImgRight" class="justify-center align-center text-center">
                <v-card-title class="text-black">
                  <div class="w-60 mx-auto justify-center text-center align-center align-content-center">
                    <RouterLink to="/sisäaktiviteetit">
                      <p
                        :style="isHovering ? 'background-color: rgb(255,215,45,50%); color: #1e2a38;' : 'background-color: rgb(255,255,255,50%); color: #1e2a38;'"
                        class="text-h4 rounded-6 button-style"
                      >
                        Sisäaktiviteetit
                      </p>
                    </RouterLink>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </VCol>
      </VRow>
      <CardCarouser
        class="mt-10 mb-10"
        v-for="(category, index) in categories"
        :carouselSettings="{
          title: category.name,
          data: category.data,
          url: category.name
        }"
      />


    </v-responsive>
  </v-container>
</template>

<style scoped>
.button-style {
  transition: all 0.3s ease;
  padding: 20px 30px;
  border-radius: 6px;
  background-color: rgba(255, 215, 45, 0.6);
  font-weight: bold;
  cursor: pointer;
  color: #1e2a38;
}

.button-style:hover {
  background-color: rgb(255, 215, 45);
  color: white;
  transform: translateY(-5px);
}
</style>
