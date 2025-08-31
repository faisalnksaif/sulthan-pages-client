<template>
  <Quote :author-image="quotes.mission.authorImage" background="./home.jpg" type="mission">
    <template #title>
      {{ quotes.mission.title }}
    </template>

    <template #quote>
      <span class="merriweather" v-html="quotes.mission.quote" />
    </template>

    <template #author>
      {{ quotes.mission.author }}
    </template>
  </Quote>

</template>

<script setup lang="ts">
import { quotes } from './common/quotes'
import Quote from './common/Quote.vue';

</script>
<style scoped></style>
