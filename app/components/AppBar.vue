<template>
  <div class="appbar">
    <v-app-bar color="rgb(0, 0, 0, .6)" scroll-behavior="fully-hide inverted" scroll-threshold="1">
      <v-app-bar-title>
        <img class="logo" src="/logo.png" loading="lazy">
      </v-app-bar-title>

      <!-- Mobile Menu Icon -->
      <v-app-bar-nav-icon class="d-sm-none" color="white" @click="drawer = !drawer" />

      <!-- Desktop Buttons -->
      <template #append>
        <div class="d-none d-sm-flex">
          <v-btn class="text-none poppins" color="white" :to="'/'" variant="text">Home</v-btn>
          <v-btn class="text-none poppins" color="white" :href="'/our-guides'" variant="text">Our Guides</v-btn>
          <v-btn class="text-none poppins" color="white" :href="'/about-us'" variant="text">About Us</v-btn>
          <!-- <v-btn class="text-none poppins" color="white" variant="text">Categories</v-btn> -->
          <v-btn class="text-none poppins" color="white" :to="'/#contact-us'" variant="text">Contact</v-btn>
        </div>

      </template></v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      class="d-sm-none"
      color="rgb(0, 0, 0, .8)"
      location="right"
      temporary
    >
      <v-list class="d-flex flex-column list">
        <v-btn class="text-none poppins" color="white" :to="'/'" variant="plain">Home</v-btn>
        <v-btn class="text-none poppins" color="white" :href="'/our-guides'" variant="plain">Our Guides</v-btn>
        <v-btn class="text-none poppins" color="white" :href="'/about-us'" variant="plain">About Us</v-btn>
        <!-- <v-btn class="text-none poppins" color="white" variant="text">Categories</v-btn> -->
        <v-btn class="text-none poppins" color="white" :to="'/#contact-us'" variant="plain">Contact</v-btn>
      </v-list>
    </v-navigation-drawer>

  </div>

</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)
</script>
<style>
.appbar .logo {
  width: 100px;
}

.appbar  .v-btn {
  color: white !important;
}

.appbar  .v-btn--active .v-btn__overlay {
  background: transparent !important;
  /* remove tonal bg */
  color: white !important;
  /* keep text white */
}

</style>
