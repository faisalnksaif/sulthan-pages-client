<template>
  <QuotePage type="mission" />
</template>

<script lang="ts" setup>
import QuotePage from '~/components/common/QuotePage.vue';

useHead({
  title: "Quthubuzzaman Sheikh Yusuf Sultan Shah Qadiri | Sulthan Pages",
  meta: [
    {
      name: "description",
      content: "Learn about the life, teachings, and legacy of Quthubuzzaman Sheikh Yusuf Sultan Shah Qadiri in Aluva, Ernakulam."
    },
    {
      name: "keywords",
      content: "Quthubuzzaman, Sheikh Yusuf Sultan Shah Qadiri, Mahan, Sufi Saint, Spiritual Guide, Aluva, Threeqath, Ernakulam, Sulthan Pages, Qadiriyya Order"
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
        "name": "Quthubuzzaman Sheikh Yusuf Sultan Shah Qadiri",
        "alternateName": "Quthubuzzaman",
        "birthPlace": "Aluva, Ernakulam",
        "description": "A renowned Sufi saint and spiritual guide known for divine wisdom.",
        "url": "https://sulthanpages.com/"
      })
    }
  ]
})
</script>