// src/apollo/client.ts
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://165.22.209.234:3000/api/graphql',
})

// Optional: auth header if needed
const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default apolloClient
