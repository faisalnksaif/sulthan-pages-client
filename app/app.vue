<template>
  <v-app>
    <AppBar />
    <NuxtPage />
    <Footer v-if="showFooter" />
  </v-app>
</template>
<script setup>
const route = useRoute()

// const showFooter = computed(() => route.path !== '/registration-form')

useHead({
  link: [
    { rel: 'canonical', href: 'https://sulthanpages.com/' }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Sulthan Pages",
        "url": "https://sulthanpages.com",
        "logo": "https://sulthanpages.com/logo.png"
      })
    }
  ]
})
</script>