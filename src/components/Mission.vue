<template>
  <div class="parent">
    <div class="child">
      <v-card-title>
        <h2 class="heading poppins-bold">My Mission is the Call to <b>Tawheed</b></h2>
      </v-card-title>
      <v-card-text class="text-h6 pa-5 content">
        <div>
          <q> The noble declaration <b>"La ilaha illallah, Muhammadur Rasulullah"</b> was the divine message upheld by
            every
            Prophet appointed to this world. Each one of them bore witness to this truth, and every bearer of this
            sacred
            message endured trials and tribulations along their path.</q>
        </div>
        <div class="subheading d-flex justify-end mt-2">- Quthubuzzaman Sheikh Yusuf Sulthan Shah Qadiri Chishti</div>
      </v-card-text>
    </div>


  </div>
</template>

<script setup lang="ts">

</script>
<style scoped>
.parent {
  background: url('/home.jpg')
}

.child {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  /* Adjust blur strength as needed */

}
</style>