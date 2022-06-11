import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import setupSwagger from './swagger'
import setupApolloServer from './apollo-server'
import setupStaticFiles from './static-files'
import express from 'express'

const app = express()
setupApolloServer(app)
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
