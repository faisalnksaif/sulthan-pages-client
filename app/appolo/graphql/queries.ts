// src/graphql/queries.ts
import { gql } from '@apollo/client/core'

export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($take: Int!, $skip: Int!) {
    posts(take: $take, skip: $skip, orderBy: { createdAt: desc }) {
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

export const GET_FEATURED_POSTS = gql`
  query GetFeaturedPosts($take: Int!, $skip: Int!) {
    posts(
      take: $take
      skip: $skip
      orderBy: { createdAt: desc }
      where: { tags: { some: { name: { equals: "Featured" } } } }
    ) {
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
    postsCount(where: { tags: { some: { name: { equals: "Featured" } } } })
  }
`

export const GET_POSTS = gql`
  query GetPosts($take: Int!, $skip: Int!) {
    posts(
      take: $take
      skip: $skip
      orderBy: { createdAt: desc }
    ) {
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

export const GET_POSTS_IN_CATEGORY = gql`
  query GetPosts($take: Int!, $skip: Int!, $categoryId: ID) {
    posts(
      take: $take
      skip: $skip
      orderBy: { createdAt: desc }
      where: { category: { id: { equals: $categoryId } } }
    ) {
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
    postsCount(where: { category: { id: { equals: $categoryId } } })
  }
`


export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      content {
        document
      }
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
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image {
        url
      }
    }
  }
`

