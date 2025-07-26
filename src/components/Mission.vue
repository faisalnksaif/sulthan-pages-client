<template>
  <Quote :author-image="quotes.mission.authorImage" background="./home.jpg" type="mission">
    <template #title>
      {{ quotes.mission.title }}
    </template>

    <template #quote>
      <span v-html="quotes.mission.quote" />
    </template>

    <template #author>
      {{ quotes.mission.author }}
    </template>
  </Quote>

</template>

<script setup lang="ts">
  import { quotes } from './common/quotes'

</script>
<style scoped></style>
