import apolloClient from '@/appolo/client'
import { gql } from '@apollo/client/core'

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
    loc: `https://sulthanpages.com/article/${post.id}/${slugify(post.title)}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  }))
})

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/special chars with "-"
    .replace(/(^-|-$)+/g, '')   // trim leading/trailing "-"
}
