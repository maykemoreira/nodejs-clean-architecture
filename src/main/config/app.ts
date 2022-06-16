import setupRoutes from '@/main/config/routes'
import setupMiddlewares from '@/main/config/middlewares'
import setupSwagger from '@/main/config/swagger'
import setupStaticFiles from '@/main/config/static-files'
import { setupApolloServer } from '@/main/graphql/apollo'
import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  const server = setupApolloServer()
  await server.start()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  server.applyMiddleware({ app })
  return app
}
