<script setup>

</script>

<template>
  <v-app>
    <section class="justify-space-between">
      <AppHeader/>
        <router-view class="component-container" />
      <AppFooter/>
    </section>
  </v-app>
</template>
<style scoped>
#app {
  font-family: "Roboto", sans-serif;
}
.component-container {
  min-height: 70vh;
}
</style>
