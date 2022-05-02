import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import setupSwagger from './config-swagger'
import setupStaticFiles from './static-files'
import express from 'express'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
