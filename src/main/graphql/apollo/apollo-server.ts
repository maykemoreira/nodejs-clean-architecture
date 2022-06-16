import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import { authDirectiveTransformer } from '@/main/graphql/directives'
import { GraphQLError } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else if (checkError(error, 'ApolloError')) {
      response.http.status = 500
    }
  })
}

let schema = makeExecutableSchema({ typeDefs, resolvers })
schema = authDirectiveTransformer(schema)

export const setupApolloServer = (): ApolloServer => {
  return new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [{
      requestDidStart: async () => ({
        willSendResponse: async ({ response, errors }) => {
          handleErrors(response, errors)
        }
      })
    }]
  })
}
