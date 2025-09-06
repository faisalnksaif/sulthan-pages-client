<template>
  <v-card class="mx-auto ma-3 pa-0 card-fixed-height d-flex flex-column" color="grey-lighten-3" elevation="0"
    min-width="300" shadow="0" style="border-radius: 10px" @click="() => goToPage()">
    <v-img cover crossorigin="anonymous" height="200px" referrerpolicy="no-referrer"
      :src="`${image || 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'}`" width="100%" />

    <div class="d-flex flex-column justify-space-between flex-grow-1 content-container">
      <div class="merriweather-bold text-body-1 pa-3 pb-0 title-clamp text-start">
        {{ props.title }}
      </div>

      <div class="poppins pa-3 mt-auto text-start text-body-2">
        {{ props.author }}
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: String,
  },
})

const router = useRouter()

const goToPage = () => {
  router.push({
    path: `/article`,        // the actual path of your page
    query:{
      id: props.id,
      title: props.title
    }
  })
}

</script>

<style scoped>
.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* show 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.4em;
  max-height: calc(1.7em * 2);
  min-height: calc(1.7em * 2);
  /* Force it to occupy exactly 2 lines space */
}
</style>
