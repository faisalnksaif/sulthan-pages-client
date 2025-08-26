<template>
  <div class="footer pl-10">
    <div>
      <img class="logo" src="/logo.png">
    </div>
    Powered by <br>
    <b>Quthbuzzaman Eduland </b> <br>
    Chungam, Inkel City, Malappuram, Kerala

    <div class="mt-4 ">
      <v-btn class="mr-3" icon="fab fa-instagram" variant="tonal" />
      <v-btn class="mr-3" icon="fas fa-envelope" variant="tonal" />
      <v-btn class="mr-3" icon="fas fa-phone" variant="tonal" />
      <v-btn class="mr-3" icon="fab fa-whatsapp" variant="tonal" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
.logo {
  width: 10vw;
  min-width: 100px;
  margin-left: -5px;
}

.footer {
  background: #494848;
  padding: 20px;
  color: white;
}
</style>
