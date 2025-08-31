<template>
  <Home />
  <Mission />
  <VoiceOfKhalifa class="mb-12" />
  <RecentPosts class="mb-12" />
  <FeaturedArticles />
  <ContactUs />
  <!-- <Categories class="mb-12" /> -->
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useFeaturedPostsStore } from '~/stores/featured-posts'
import { useRecentPostsStore } from '~/stores/recent-posts'

const recentPostStore = useRecentPostsStore()
const featuredPostStore = useFeaturedPostsStore()

useHead({
  title: 'Sulthan Pages - Sheikh Yusuf Sulthan Shah Qadiri Chishty',
  meta: [
    {
      name: 'description',
      content: 'Learn about Sheikh Yusuf Sulthan Shah Qadiri Chishty, Mahan, Qutubuzzaman, and related topics.'
    },
    {
      name: 'keywords',
      content: 'Qutubuzzaman, Quthubuzzaman, mahan, Sheikh Yusuf Sulthan Shah Qadiri Chishty'
    },
    { property: 'og:title', content: 'Sulthan Pages' },
    { property: 'og:description', content: 'Learn about Sheikh Yusuf Sulthan Shah Qadiri Chishty, Mahan, Qutubuzzaman, and related topics.' },
  ],
})

onMounted(() => {
  recentPostStore.fetchPosts()
  featuredPostStore.fetchPosts()
})
</script>
