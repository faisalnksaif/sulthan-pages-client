<template>
  <Quote :author-image="quotes.voiceOfKhalifa.authorImage" author-image-position="right" type="voiceOfKhalifa">
    <template #title>
      {{ quotes.voiceOfKhalifa.title }}
    </template>

    <template #quote>
      <span v-html="quotes.voiceOfKhalifa.quote" />
    </template>

    <template #author>
      <div v-html="quotes.voiceOfKhalifa.author" />
    </template>
  </Quote>
</template>

<script setup lang="ts">
  import { quotes } from './common/quotes'

</script>
<style scoped></style>
