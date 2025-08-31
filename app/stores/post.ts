import { provideApolloClient } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apolloClient from '@/appolo/client'
import { GET_POST } from '@/appolo/graphql/queries'

export interface Article {
  id: string
  title: string
  content: {
    document: any
  }
  author: string
  coverImage: {
    url: string
  } | null
}

export const usePostStore = defineStore('post', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchPost (id: string) {
    loading.value = true
    error.value = null

    try {
      const { data } = await provideApolloClient(apolloClient)(() =>
        apolloClient.query<{ post: Article }>({
          query: GET_POST,
          variables: { id },
          fetchPolicy: 'network-only',
        }),
      )

      return data.post
    } catch (error_: any) {
      error.value = error_
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchPost,
  }
})
