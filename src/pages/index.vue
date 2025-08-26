<template>
  <AppBar />
  <Home />
  <Mission />
  <VoiceOfKhalifa class="mb-12" />
  <RecentPosts class="mb-12" />
  <FeaturedArticles class="mb-12" />
  <Footer />
  <!-- <Categories class="mb-12" /> -->
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useFeaturedPostsStore } from '@/store/featured-posts'
  import { useRecentPostsStore } from '@/store/recent-posts'

  const recentPostStore = useRecentPostsStore()
  const featuredPostStore = useFeaturedPostsStore()

  onMounted(() => {
    recentPostStore.fetchPosts()
    featuredPostStore.fetchPosts()
  })
</script>
