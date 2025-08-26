<template>
  <div>
    <v-card-title class="d-flex justify-center flex-column align-center">
      <h2 class="heading poppins-bold">Featured Articles</h2>
      <div class="sp-underline" />
    </v-card-title>

    <div>
      <v-sheet>
        <v-slide-group :show-arrows="mobile ? false : 'always'">
          <v-slide-group-item v-for="post in featuredPostsStore.posts" :key="post.id">
            <div class="ma-2 d-flex">
              <Post
                :id="post.id"
                :key="post.id"
                :author="post.author"
                :image="post.coverImage?.url || undefined"
                style="max-width: 400px;"
                :title="post.title"
              />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify'
  import { useFeaturedPostsStore } from '@/store/featured-posts'

  const { mobile } = useDisplay()

  const featuredPostsStore = useFeaturedPostsStore()
</script>
