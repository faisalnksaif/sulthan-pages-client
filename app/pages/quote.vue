<template>
  <div>
    <div style="height: 60vh; position: relative">
      <v-parallax scale=".5" src="/home.jpg" style="height: 60vh;">
        <div style="background: rgba(0, 0, 0, 0.7); height: 100%">
          <div class="d-flex align-center flex-row justify-center fill-height">
            <div class="d-flex flex-column fill-height justify-center align-center text-white pa-10">
              <div class="poppins-extra-bold text-h4 text-center">{{ quoteItem.title }}</div>
              <div class="poppins-bold mt-2 text-center" v-html="quoteItem.author" />
            </div>
          </div>
        </div>
      </v-parallax>
    </div>

    <div class="body-1 d-md-flex justify-space-between align-start">
      <!-- Left: image + quote (1/3 width) -->
      <div class="left-section d-sm-flex flex-sm-row flex-md-column justify-md-center justify-sm-space-around pa-10"
        style="flex: 1">
        <img class="author-image" :src="quoteItem.authorImage" loading="lazy">

        <div class="quote d-flex justify-center align-center">
          <div>
            <v-icon icon="mdi-format-quote-open" size="20" style="margin-top:-10px" />
            <span class="merriweather mt-5" v-html="quoteItem.quote" />
            <v-icon icon="mdi-format-quote-close" size="20" style="margin-top:-10px" />
          </div>

        </div>
      </div>

      <!-- Right: article (2/3 width) -->
      <div class="right-section pl-10 pr-10 pt-sm-10 pb-10 merriweather "
        style="line-height: 33px; font-size: 1.1em; flex: 10" v-html="quoteItem.article" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { quotes } from '@/components/common/quotes'

const route = useRoute()
const type = (route.query.type as string)

console.log({ type })

const quoteItem = (quotes as any)[type]

useHead({
  title: quoteItem?.title || 'Article',
  meta: [
    { name: 'description', content: quoteItem?.quote || '' },
    { property: 'og:title', content: quoteItem?.title },
    { property: 'og:description', content: quoteItem?.quote },
    { property: 'og:image', content: quoteItem?.authorImage },
  ],
})

</script>
<style scoped>
.body-1 {
  background: #f7f7f7;
}

.author-image {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 10%;
}

.quote {
  /* border: 1px solid grey; */
  background: rgb(238, 238, 238);
  padding: 20px;
  border-radius: 50px;
  line-height: 30px;
  margin-top: 10px;
  max-width: 300px;
}
</style>
