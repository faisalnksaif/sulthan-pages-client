<template>
  <div class="parent" :style="{ backgroundImage: props.background ? `url(${props.background})` : '' }">
    <div class="child d-sm-flex justify-space-between align-center"
      :class="props.authorImagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'">
      <div class="d-flex flex-column justify-center align-center flex-reverse">
        <img v-if="authorImage" class="author-image" :src="authorImage" loading="lazy">
      </div>

      <div class="ma-sm-10">
        <v-card-title class="d-flex justify-center flex-column align-center">
          <h2 class="heading poppins-extra-bold text-center justify-center d-flex">
            <slot name="title" />
          </h2>
          <div class="sp-underline" />
        </v-card-title>
        <v-card-text class="text-h6 pa-5 content">
          <div>
            <div class="d-flex flex-row">
              <span>
                <v-icon icon="mdi-format-quote-open" size="20" style="margin-top:-10px" />
                <slot name="quote" class="merriweather" />
                <v-icon icon="mdi-format-quote-close" size="20" style="margin-top:-10px" />
                <div :class="`text-${authorImagePosition === 'left' ? 'right' : 'left'}`">
                  <v-btn class="text-caption poppins mt-2" color="brown" :href="`/quote/${type}`" variant="tonal">Read
                    more</v-btn>
                </div>
              </span>

            </div>
          </div>
        </v-card-text>
        <div class="subheading mt-2 merriweather-bold text-center">
          <slot name="author" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  background: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  authorImagePosition: {
    type: String,
    default: 'left',
  },
  type: {
    type: String,
  },
})
</script>
<style scoped>
.parent {
  background-size: cover;
}

.child {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}

.author-image {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 10%;
}
</style>
