<script setup>
import FooterLogo from '@/assets/logo1.png'
</script>

<template>
  <section className="custom_footer">
    <VRow class="d-flex justify-space-between align-center custom_header ma-0">
      <VCol cols="12" md="4" class="footer-left">
        <VCardText class="footer-text">
          © 2024 All Rights Reserved
        </VCardText>
      </VCol>

      <VCol cols="12" md="4" class="footer-center">
        <VImg
          class="footer-logo"
          width="80"
          height="80"
          :src="FooterLogo"
        />
      </VCol>

      <VCol cols="12" md="4" class="footer-right text-md-right">
        <RouterLink to="/tietosuojaseloste" class="footer-link">
          <VCardText class="footer-text">
            Tietosuojaseloste
          </VCardText>
        </RouterLink>
        <RouterLink to="/contact" class="footer-link">
          <VCardText class="footer-text">
            Contact Us
          </VCardText>
        </RouterLink>
      </VCol>
    </VRow>

  </section>
</template>
<style scoped>
.custom_footer {
  background-color: #1c1c1c;
  color: white;
  padding: 30px 0;
  box-shadow: 0 5px 15px rgb(0 0 0 / 0.1);
}

.footer-left, .footer-center, .footer-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-text {
  font-size: 14px;
  font-weight: 300;
}

.footer-logo {
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.1);
}

.footer-link {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 400;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #3ba6ff;
}

</style>
