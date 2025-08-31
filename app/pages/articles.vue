<template>
  <div class="body pb-10">
    <div class=" pr-10 pt-10">
      <div class="poppins-extra-bold text-h4">Articles</div>
      <v-divider />
    </div>

    <div class="merriweather mt-5" style="line-height: 33px; font-size: 1.1em; flex: 10; min-height: 90vh">
      <div v-if="postStore.posts.length === 0 && postStore.loading">
        <v-skeleton-loader type="paragraph" class="mb-2" />
        <v-skeleton-loader type="paragraph" class="mb-2" />
        <v-skeleton-loader type="paragraph" />
      </div>

      <div v-for="article in postStore.posts" class="pa-3">
        <div class="d-flex align-center cursor" @click="goToArticle(article.id)">
          <div>
            <img style="" v-if="article.coverImage" :src="article.coverImage.url" />
          </div>
          <div class="pl-5">
            <div class="merriweather-bold">
              {{ article.title }}
            </div>

            <div style="font-size:.85em" class="text-grey-darken-2">
              {{ article.author }}
            </div>
          </div>

        </div>
        <v-divider />
      </div>


      <div class="text-center mt-5" v-if="postStore.postsCount < postStore.posts.length && postStore.posts > 0">
        <v-btn :loading="postStore.loading" color="black" variant="tonal" @click="loadMore">Load more articles</v-btn>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { usArticlesStore } from '~/stores/articles';
const router = useRouter()

const postStore = usArticlesStore()
const page = ref(1)

onMounted(async () => {
  postStore.fetchPosts(page.value)
})

function loadMore() {
  page.value += 1
  postStore.fetchPosts(page.value)
}

function goToArticle(id: string) {
  router.push({
    path: '/article',        // the actual path of your page
    query: { id }  // query parameter
  })
}

</script>

<style scoped>
.background {
  background: rgba(255, 255, 255, 0.3) !important;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  backdrop-filter: blur(8px);
  object-fit: fill;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
