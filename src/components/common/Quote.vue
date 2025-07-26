<template>
  <div class="parent" :style="{ backgroundImage: props.background ? `url(${props.background})` : '' }">
    <div
      class="child d-sm-flex justify-space-between align-center"
      :class="props.authorImagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'"
    >
      <div class="d-flex flex-column justify-center align-center flex-reverse">
        <img v-if="authorImage" class="author-image" :src="authorImage">
      </div>

      <div class="ma-sm-10">
        <v-card-title class="d-flex justify-center flex-column align-center">
          <h2 class="heading poppins-bold text-center justify-center d-flex">
            <slot name="title" />
          </h2>
          <div class="sp-underline" />
        </v-card-title>
        <v-card-text class="text-h6 pa-5 content">
          <div>
            <div class="d-flex flex-row">
              <span>
                <v-icon icon="fas fa-solid fa-quote-left" size="15" style="margin-top:-10px" />
                <slot name="quote" />
                <v-icon icon="fas fa-solid fa-quote-right" size="15" style="margin-top:-10px" />
                <v-btn class="text-caption poppins" :href="`#/quote?type=${type}`" variant="plain">Read more</v-btn>
              </span>

            </div>
          </div>
        </v-card-text>
        <div class="subheading mt-2 poppins-bold text-center">
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
