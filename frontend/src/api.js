import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { getToken } from './auth'

export const initGraphqlClient = uri => {
  const httpLink = createHttpLink({ uri })

  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = getToken()
    operation.setContext({
      headers: {
        'x-api-key': 'da2-mmdwi7widbcyzbjcukm6aagkia'
      }
    })
    return forward(operation)
  })

  const link = middlewareLink.concat(httpLink)

  return new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'Party':
            return `Party:${object.code}`
          default:
            return defaultDataIdFromObject(object)
        }
      }
    }),
    link
  })
}
