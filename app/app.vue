<template>
  <v-app>
    <AppBar />
    <NuxtPage />
    <Footer />
  </v-app>
</template>
<script setup>
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