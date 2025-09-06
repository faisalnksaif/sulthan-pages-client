import apolloClient from '@/appolo/client'
import { gql } from '@apollo/client/core'
import { slugify } from '~/utils'

export default defineEventHandler(async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetPosts {
        posts {
          id
          title
        }
      }
    `,
    fetchPolicy: 'network-only'
  })

  // Return JSON array for nuxt-simple-sitemap
  return data.posts.map((post: any) => ({
    loc: `https://sulthanpages.com/article?id=${post.id}&title=${slugify(post.title)}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  }))
})
