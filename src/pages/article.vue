<template>
  <div>
    <div style="height: 60vh; position: relative">
      <v-parallax scale=".1" :src="`${post?.coverImage?.url}`" style="height: 60vh;">
        <div class="background">
          <div class="d-flex align-center flex-row justify-center fill-height">
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
              <v-img
                class="author-img"
                cover
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
                :src="`${post?.coverImage?.url || 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'}`"
              />

            </div>
          </div>
        </div>
      </v-parallax>
    </div>

    <div class="body pl-10 pr-10 pt-10">
      <div class="poppins-extra-bold text-h4">{{ post?.title }}</div>
      <div class="poppins-bold mt-2 mb-5">{{ post?.author }}</div>
      <div class="right-section  merriweather" style="line-height: 33px; font-size: 1.1em; flex: 10">
        <DocumentRenderer v-if="post" :document="post.content.document" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { type Article, usePostStore } from '@/store/post'

  const postStore = usePostStore()
  const route = useRoute()
  const id = route.query.id as string

  const post = ref<Article | undefined>(undefined)

  onMounted(async () => {
    post.value = await postStore.fetchPost(id)
    console.log(post.value?.content.document[0])
  })
</script>

<style scoped>
.body {
  background: #f7f7f7;
}

@media screen and (min-width: 1000px) {
  .body {
    padding-left: 15% !important;
    padding-right: 15% !important;
  }

  .author-img{
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 600px) {
  .author-img {
    width: 500px !important;
    height: 500px !important;
  }
}

.author-img {
  border-radius: 5px;
  margin-bottom: 10px;
  width: 50vw;
  height: 400px;
}

.background {
  background: rgba(255, 255, 255, 0.3) !important;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  backdrop-filter: blur(8px);
  object-fit: fill;
}
</style>
