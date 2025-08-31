<template>
  <div>
    <v-card-title class="d-flex justify-center flex-column align-center mt-10">
      <h2 class="heading poppins-extra-bold">Categories</h2>
      <div class="sp-underline" />
    </v-card-title>

    <div class="mt-5 d-sm-flex justify-center ">
      <v-sheet>
        <v-slide-group ref="slider" :show-arrows="false">
          <v-slide-group-item v-for="category in categoryStore.categories" :key="category.id">
            <v-chip class="poppins-bold ma-2 pa-5" @click="() => onClick(category)">{{ category.name }}</v-chip>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore, type Category } from '~/stores/categories';

const router = useRouter()
const categoryStore = useCategoriesStore()

function onClick(category: Category) {
  router.push({
    path: '/articles',        // the actual path of your page
    query: { id: category.id, name: category.name }  // query parameter
  })
}

</script>
<style scoped>
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
