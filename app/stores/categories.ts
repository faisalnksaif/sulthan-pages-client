
import { provideApolloClient } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apolloClient from '@/appolo/client'
import { GET_CATEGORIES } from '@/appolo/graphql/queries'

export interface Category {
  id: string
  name: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const categories: Ref<Category[]> = ref([])

  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const { data } = await provideApolloClient(apolloClient)(() =>
        apolloClient.query<{ categories: Category[] }>({
          query: GET_CATEGORIES,
          fetchPolicy: 'network-only',
        }),
      )

      categories.value = data.categories
    } catch (error_: any) {
      error.value = error_
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchCategories,
    categories
  }
})
