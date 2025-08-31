<template>
  <div>
    <v-card-title class="d-flex justify-center flex-column align-center">
      <h2 class="heading poppins-extra-bold">Recent Posts</h2>
      <div class="sp-underline" />
    </v-card-title>

    <v-sheet class="mx-auto">
      <v-slide-group :key="sliderKey" ref="slider" show-arrows="always">
        <v-slide-group-item v-for="post in recentPostsStore.posts" :key="post.id">
          <div class="ma-2 d-flex recent-post">
            <Post :id="post.id" :author="post.author" :image="post.coverImage?.url || undefined"
              style="max-width: 400px;" :title="post.title" />
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRecentPostsStore } from '~/stores/recent-posts'

const recentPostsStore = useRecentPostsStore()
const slider = ref<InstanceType<typeof import('vuetify/components').VSlideGroup>>()
const sliderKey = ref(0)

watch(
  () => recentPostsStore.posts,
  async (newPosts) => {
    if (newPosts.length) {
      await nextTick()
      sliderKey.value += 1
    }
  },
  { immediate: true }
)
</script>

<style>
@media screen and (max-width: 1000px) {
  .v-slide-group__next {
    position: absolute !important;
    margin-top: 91%;
    right: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, .5);
    color: white;
    height: 40px;
    width: 30px;
    font-size: 15px;
  }

  .v-slide-group__prev {
    position: absolute !important;
    margin-top: 91%;
    right: 0;
    margin-right: 60px;
    z-index: 99999;
    background: rgba(0, 0, 0, .5);
    color: white;
    height: 40px;
    width: 40px;
    font-size: 15px;
  }
}
</style>
