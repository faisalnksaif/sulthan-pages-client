<template>
  <div>
    <v-app-bar color="rgb(0, 0, 0, .6)" scroll-behavior="fully-hide inverted">
      <v-app-bar-title>
        <img class="logo" src="/logo.png">
      </v-app-bar-title>

      <!-- Mobile Menu Icon -->
      <v-app-bar-nav-icon class="d-sm-none" color="white" @click="drawer = !drawer" />

      <!-- Desktop Buttons -->
      <template #append>
        <div class="d-none d-sm-flex">
          <v-btn class="text-none poppins" color="white" variant="text">Home</v-btn>
          <v-btn class="text-none poppins" color="white" variant="text">Our Guides</v-btn>
          <v-btn class="text-none poppins" color="white" variant="text">About Us</v-btn>
          <v-btn class="text-none poppins" color="white" variant="text">Categories</v-btn>
          <v-btn class="text-none poppins" color="white" variant="text">Contact</v-btn>
        </div>

      </template></v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      class="d-sm-none"
      color="rgb(0, 0, 0, .6)"
      location="right"
      temporary
    >
      <v-list nav>
        <v-list-item class="text-white" title="Home" />
        <v-list-item class="text-white" title="Our Guides" />
        <v-list-item class="text-white" title="About Us" />
        <v-list-item class="text-white" title="Categories" />
        <v-list-item class="text-white" title="Contact" />
      </v-list>
    </v-navigation-drawer>

  </div>

</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)
</script>
<style>
.logo {
  width: 100px;
}
</style>
