<template>
  <Quote :author-image="quotes.voiceOfKhalifa.authorImage" author-image-position="right" type="voiceOfKhalifa">
    <template #title>
      {{ quotes.voiceOfKhalifa.title }}
    </template>

    <template #quote>
      <span class="merriweather" v-html="quotes.voiceOfKhalifa.quote" />
    </template>

    <template #author>
      <div v-html="quotes.voiceOfKhalifa.author" />
    </template>
  </Quote>
</template>

<script setup lang="ts">
  import { quotes } from '@/components/common/quotes'
  import Quote from './common/Quote.vue';

</script>
<style scoped></style>
