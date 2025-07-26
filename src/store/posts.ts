import { provideApolloClient } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apolloClient from '@/appolo/client'
import { GET_POSTS } from '@/appolo/graphql/queries'

export interface Post {
  id: string
  title: string
  content: string
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchPosts () {
    loading.value = true
    error.value = null

    try {
      const { data } = await provideApolloClient(apolloClient)(() =>
        apolloClient.query<{ posts: Post[] }>({
          query: GET_POSTS,
          variables: { take: 25, skip: 0 },
          fetchPolicy: 'network-only',
        }),
      )

      posts.value = data.posts
    } catch (error_: any) {
      error.value = error_
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
  }
})
