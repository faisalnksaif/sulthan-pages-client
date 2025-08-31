import { provideApolloClient } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apolloClient from '@/appolo/client'
import { GET_POSTS } from '@/appolo/graphql/queries'

export interface Article {
  id: string
  title: string
  author: string
  coverImage: {
    url: string
  } | null
}

const PAGE_SIZE = 25

export const usArticlesStore = defineStore('articles', () => {
  const posts = ref<Article[]>([])
  const postsCount = ref(-1)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchPosts(page: number) {
    loading.value = true
    error.value = null

    try {
      const { data } = await provideApolloClient(apolloClient)(() =>
        apolloClient.query<{ posts: Article[], postsCount: number }>({
          query: GET_POSTS,
          variables: { take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE },
          fetchPolicy: 'network-only',
        }),
      )

      postsCount.value = data.postsCount
      posts.value.push(...data.posts)
    } catch (error_: any) {
      error.value = error_
    } finally {
      loading.value = false
    }
  }

  return {
    postsCount,
    posts,
    loading,
    error,
    fetchPosts,
  }
})
