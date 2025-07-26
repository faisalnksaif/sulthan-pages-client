<template>
  <!-- <NavBar /> -->
  <Home />
  <Mission />
  <VoiceOfKhalifa class="mb-12" />
  <RecentPosts class="mb-12" />
  <FeaturedArticles class="mb-12" />
  <Categories class="mb-12" />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { usePostsStore } from '@/store/posts'

  const postStore = usePostsStore()

  onMounted(() => {
    postStore.fetchPosts()
  })
</script>
