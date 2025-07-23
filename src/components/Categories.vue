<template>
  <div>
    <v-card-title class="d-flex justify-center flex-column align-center">
      <h2 class="heading poppins-bold">Categories</h2>
      <div class="sp-underline"></div>
    </v-card-title>

    <div class="child d-sm-flex justify-center posts-wrapper">
      <Post class="post" />
      <Post class="post" />
      <Post class="post" />
      <Post class="post" />
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