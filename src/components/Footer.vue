<template>
  <div class="footer pl-10 ">
    <div class="left">
      <div>
        <img class="logo" src="/logo.png">
      </div>
      <div>Powered by </div>
      Shah Jeelani Association <br>
      <b>Quthbuzzaman Eduland </b> <br>
      Chungam, Inkel City, Malappuram, Kerala

      <div class="mt-4">
        <v-btn
          class="mr-3 insta"
          href="https://www.instagram.com/sulthan_pages/?utm_source=qr&igsh=MWE3bTRpdzJ2M2M3OA%3D%3D#"
          icon="fab fa-instagram"
          variant="flat"
        />

        <v-btn
          class="mr-3"
          color="green"
          href="https://wa.me/+971567292689"
          icon="fab fa-whatsapp"
          target="_blank"
          variant="flat"
        />

        <v-btn
          class="mr-3"
          color="blue"
          href="mailto:sulthanpages@outlook.com"
          icon="fas fa-envelope"
          variant="flat"
        />

      </div>

      <div class="mt-4">

        <v-btn append-icon="fas fa-phone" class="mr-3" href="tel:+919496808398" variant="tonal">IND</v-btn>
        <v-btn append-icon="fas fa-phone" class="mr-3" href="tel:+971567292689" variant="tonal">UAE</v-btn>
      </div>
    </div>

    <div class="text-center text-grey ma-5">
      Copyright © 2025 Sulthan Pages
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
  background: black;
  padding: 40px;
  color: rgb(225, 222, 222);
  line-height: 25px;
}

.insta {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}
</style>
