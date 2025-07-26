// src/graphql/queries.ts
import { gql } from '@apollo/client/core'

export const GET_POSTS = gql`
  query GetPosts($take: Int!, $skip: Int!) {
    posts(take: $take, skip: $skip) {
      id
      title
      author
      createdAt
      updatedAt
      coverImage {
        url
      }
      tags {
        name
      }
    }
    postsCount
}
`
