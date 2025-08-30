<template>
  <AppBar />
  <div style="height: 80vh; position: relative">
    <v-parallax scale=".9" src="/guide.png" style="height: 80vh; background: white !important">
      <div style="background: rgba(0, 0, 0, 0.3); height: 100%" />
    </v-parallax>
  </div>
  <div class="body pb-10">
    <div class=" pr-10 pt-10">
      <div class="poppins-extra-bold text-h4">Our Guides</div>
    </div>

    <div class=" right-section  merriweather mt-5" style="line-height: 33px; font-size: 1.1em; flex: 10">
      <div>
        Sulthan Pages takes its inspiration and direction from the luminous legacy of two great inheritors of the
        Prophetic path — Quthbuzzaman Sheikh Yusuf Sulthan, whose life and teachings continue to guide hearts even after
        his passing, and his true khalifa, Sheikh Abbas Faizy, who carries this living trust forward today.
      </div>

      <div class="mt-5">
        They are not merely scholars or writers, but beacons of guidance, calling hearts to Allah through a complete
        Tawheed that transforms belief into life.
      </div>

      <div class=" pr-10 pt-10">
        <div class="poppins-extra-bold text-h5">Quthbuzzaman Sheikh Yusuf Sulthan</div>

        <div class="mt-5">
          A spiritual leader of rare depth and courage, Sheikh Yusuf Sulthan — known as Quthbuzzaman, the Pole of our
          Age — devoted his life to reviving the Ummah’s connection to Allah through pure Tawheed, deep love for the
          Prophet ﷺ, and active submission to Divine guidance in every sphere of life. His teachings remain a source of
          knowledge, spiritual clarity, and unshakable truth for seekers of Allah.</div>
      </div>

      <div class=" pr-10 pt-10">
        <div class="poppins-extra-bold text-h5">Sheikh Abbas Faizy</div>

        <div class="mt-5">
          The true khalifa of Sheikh Yusuf Sulthan, Sheikh Abbas Faizy carries this luminous path forward. With unwavering dedication, he guides seekers to live by La ilaha illa Allah in its fullest meaning — not as mere belief, but as a reality that shapes the soul, the home, and the world. His words and example continue to awaken hearts and inspire a generation to walk the road to Allah.</div>
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
