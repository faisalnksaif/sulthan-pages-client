<template>
  <Home />
  <Mission />
  <VoiceOfKhalifa class="mb-12" />
  <RecentPosts class="mb-12" />
  <FeaturedArticles />
  <Categories />
  <ContactUs />
  <!-- <Categories class="mb-12" /> -->
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Categories from '~/components/Categories.vue'
import { useCategoriesStore } from '~/stores/categories'
import { useFeaturedPostsStore } from '~/stores/featured-posts'
import { useRecentPostsStore } from '~/stores/recent-posts'

const recentPostStore = useRecentPostsStore()
const featuredPostStore = useFeaturedPostsStore()
const categoriesStore = useCategoriesStore()

useHead({
  title: 'Sulthan Pages - Quthubuzzaman Sheikh Yusuf Sulthan Shah Qadiri Chishty',
  meta: [
    {
      name: 'description',
      content: 'Learn about Quthubuzzaman Sheikh Yusuf Sulthan Shah Qadiri Chishty, Mahan, Qutubuzzaman, and related topics.'
    },
    {
      name: 'keywords',
      content: 'Qutubuzzaman, Quthubuzzaman, mahan, Sheikh Yusuf Sulthan Shah Qadiri Chishty'
    },
    { property: 'og:title', content: 'Sulthan Pages' },
    { property: 'og:description', content: 'Learn about Quthubuzzaman Sheikh Yusuf Sulthan Shah Qadiri Chishty, Mahan, Qutubuzzaman, and related topics.' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sulthan Pages",
        "url": "https://yourwebsite.com"
      })
    }
  ]
})

await useAsyncData('featured-posts', () =>
  featuredPostStore.fetchPosts()
)

onMounted(async () => {
  recentPostStore.fetchPosts()
  categoriesStore.fetchCategories()
})
</script>
