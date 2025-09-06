// server/api/sitemap-articles.ts
import apolloClient from '@/appolo/client'
import { GET_POSTS } from '@/appolo/graphql/queries'

export default defineEventHandler(async (event) => {
  const { data } = await apolloClient.query({
    query: GET_POSTS,
    variables: { take: 1000, skip: 0 } // fetch enough articles
  })

  // return an XML sitemap response
  setHeader(event, 'Content-Type', 'application/xml')

  const urls = data.posts.map((post: any) => `
    <url>
      <loc>https://sulthanpages.com/article/${post.id}/${slugify(post.title)}</loc>
    </url>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`
})

// utility
function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}
