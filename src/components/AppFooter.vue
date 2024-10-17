<script setup>
import FooterLogo from '@/assets/footer_logo.jpg'

</script>


<template>
  <section class="custom_footer">
    <VRow
      class="d-flex justify-space-around align-center text-center custom_header ma-0"
    >
      <VCol cols="4">
        <VCardText>
          © 2024 All Rights Reserved
        </VCardText>
      </VCol>
      <VCol cols="4">
        <VImg
          class="mx-auto mt-5"
          max-width="75"
          :src="FooterLogo"
        />
      </VCol>
      <VCol cols="4">
        <RouterLink to="/tietosuojaseloste">
          <VCardText>
            Tietosuojaseloste
          </VCardText>
        </RouterLink>
      </VCol>
    </VRow>
  </section>
</template>


<style scoped>
.custom_footer {
  height: 15vh;
  background-color: #3ba6ff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

</style>
