<template>
  <QuotePage type="voiceOfKhalifa" />
</template>

<script lang="ts" setup>
import QuotePage from '~/components/common/QuotePage.vue';

useHead({
  title: "Sheikh Abbas Faisy Vazhikkadav | Sulthan Pages",
  meta: [
    {
      name: "description",
      content: "Learn about the life, teachings, and legacy of Quthubuzzaman Sheikh Yusuf Sultan Shah Qadiri in Aluva, Ernakulam."
    },
    {
      name: "keywords",
      content: "Abbas Usthad, Abbas Faizy, Chungam, Malappuram, Quthubuzzaman Eduland, Sulthan Pages, Qadiriyya Order"
    }
  ],
  link: [
    { rel: "canonical", href: "https://sulthanpages.com/" }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Sheikh Abbas Faisy Vazhikkadav",
        "alternateName": "Abbas Usthad",
        "birthPlace": "Chungam, Malappuram",
        "description": "A renowned Sufi saint and spiritual guide known for divine wisdom.",
        "url": "https://sulthanpages.com/"
      })
    }
  ]
})
</script>