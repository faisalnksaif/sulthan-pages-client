<template>
  <AppBar />
  <div style="height: 60vh; position: relative">
    <v-parallax scale=".5" src="/about.jpg" style="height: 60vh;">
      <div style="background: rgba(0, 0, 0, 0.5); height: 100%" />
    </v-parallax>
  </div>
  <div class="body pb-10">
    <div class=" pr-10 pt-10">
      <div class="poppins-extra-bold text-h4">About Us</div>
    </div>

    <div class=" right-section  merriweather mt-5" style="line-height: 33px; font-size: 1.1em; flex: 10">
      <div>
        Sulthan Pages is a spiritual magazine devoted to reviving the Prophetic path through those who carry its light
        in
        this age — the true successors of the Prophet Muhammad ﷺ.
      </div>

      <div class="mt-5">
        We seek to deepen hearts in Tawheed, not just as belief, but as lived realization — guided by those who inherit
        the Prophet’s ﷺ spiritual legacy. Through powerful words, timeless wisdom, and contemporary reflection, our
        pages call readers to the love of Allah, the love of His Messenger ﷺ, and the path of those rightly guided.
      </div>

      <div class="mt-5">
        This is not just a publication — it is a movement. A return. A voice that echoes the call of Quthbuzzaman — to
        awaken the Ummah, realign the soul, and walk the road that leads to Allah.
      </div>
    </div>

  </div>

  <Footer />

</template>

<script lang="ts" setup>

</script>
<style scoped>
.background {
  background: rgba(255, 255, 255, 0.3) !important;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  backdrop-filter: blur(8px);
  object-fit: fill;
}
</style>
