<template>
  <div>
    <v-card-title class="d-flex justify-center flex-column align-center">
      <h2 class="heading poppins-bold">Recent Posts</h2>
      <div class="sp-underline" />
    </v-card-title>

    <div class="child d-sm-flex justify-center posts-wrapper">
      <Post class="post" />
      <Post class="post" />
      <Post class="post" />
      <Post class="post" />
    </div>

    <div class="d-flex justify-end">
      <v-btn class="poppins-bold mr-10" href="/posts" variant="plain">See more posts</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<style>
.posts-wrapper {
  flex-wrap: wrap;
  gap: 16px;
  /* spacing between items */
  /* justify-content: center; */
}

.post {
  flex: 0 0 calc(25% - 12px);
  /* 4 per row with small gap */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
</style>
