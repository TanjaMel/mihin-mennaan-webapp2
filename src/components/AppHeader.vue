<script setup>
import HeaderLogo from '../assets/logo1.png'
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/plugins/store';
import { capitalizeTitle } from '@/plugins/utils/projectFunctions';

const store = useAppStore();
const categories = ref(store.getCategories);

onMounted(async () => {
  if (!store.getCategories?.length) {
    await store.fetchSettings().then(() => {
      categories.value = store.getCategories;
    });
  }
});
</script>

<template>
  <section class="w-100">
    <VRow
      class="w-100 pa-0 ma-0 justify-space-between align-center custom_header"

    >
      <!-- Menu buttons -->
      <VRow class="pa-0 ma-0 justify-center flex-nowrap w-33">
        <v-btn to="/" variant="text" class="menu-btn">Etusivu</v-btn>
        <v-btn to="/meista" variant="text" class="menu-btn">Meistä</v-btn>
        <v-btn to="/why-we" variant="text" class="menu-btn">Why we</v-btn>
        <v-btn to="/ota-yhteytta" variant="text" class="menu-btn">Ota yhteyttä</v-btn>
      </VRow>

      <!-- Logo -->
      <VRow class="pa-0 ma-0 justify-center w-33">
        <RouterLink to="/">
          <VImg
            class="logo"
            width="120"
            height="auto"
            :src="HeaderLogo"
        />
        </RouterLink>
      </VRow>


      <!-- Search -->
      <VRow class="justify-center w-33">
        <v-text-field
          class="search-field"
          label="Etsi..."
          single-line
          prepend-icon="mdi-magnify"
          variant="outlined"

        ></v-text-field>
      </VRow>

    </VRow>

    <!-- Categories row -->
    <VRow class="w-100 ma-0 px-10 categories-row justify-center align-center mt-5">

        <VCard class="categories-card" elevation="5">
          <VRow class="pa-0 ma-0  justify-center">
              <RouterLink
                v-for="category in categories"
                :key="category"
                :to="'/kategoriat/' + `${category}`.toLowerCase()"
                class="category-link"
              >
                <VBtn class="category-btn ma-2" variant="outlined">
                  {{ capitalizeTitle(category) }}
                </VBtn>
              </RouterLink>
              <RouterLink to="/kartta" class="category-link">
                <VBtn class="category-btn ma-2" variant="outlined">Kartta</VBtn>
              </RouterLink>
          </VRow>
        </VCard>

    </VRow>
  </section>
</template>

<style scoped>
.custom_header {
  background-color: #1e2a38;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.menu-btn {
  color: #ffffff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.3s;
}

.menu-btn:hover {
  color: #3ba6ff;
}

.logo {
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.search-field {
  max-width: 80%;
  border-radius: 6px;
  color: #ffffff;
}
.search-field .v-input__label {
  color: white !important;
}

.categories-row {
  margin-top: 20px;
}

.categories-card {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}

.category-link {
  margin-right: 10px;
}

.category-btn {
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  border-radius: 20px;
  color: #1e2a38;
  transition: background-color 0.3s, color 0.3s;
}

.category-btn:hover {
  background-color: #3ba6ff;
  color: white;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .menu-btn {
    font-size: 14px;
    margin-right: 10px;
  }

  .logo {
    width: 100px;
  }

  .search-field {
    max-width: 250px;
  }
}
</style>
